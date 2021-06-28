<template>
<v-container id="itemDetail">
<v-layout row rap justify-center>
    <v-row justify="center" class="ma-1 mt-5" id="card">
        <v-col justify="center" align="center">
            <v-card flat id="card">
              <img :src="require(`@/assets/img/${itemDetail.imagePath}`)" id="imgDetail">
            </v-card>
        </v-col>
        <v-col>
          <h2 class="" id="detailTitle"><big>{{itemDetail.name}}</big></h2><br/>
          <h3>{{itemDetail.description}}</h3>
        </v-col>
    </v-row>
    <v-row>
        <v-spacer></v-spacer> 
        <v-col cols="6" justify="center" align="left">
          <v-main valign="middle" id="detailMain">
            <h3 style="font-weight : bold">サイズを選択</h3>  
            <v-radio-group row v-model="size">
              <v-radio :label="'Short : ' + itemDetail.priceM.toLocaleString('ja-JP') + '円'" value="M" color="#0d5c35"></v-radio>
               <v-radio :label="'Venti : ' +  itemDetail.priceL.toLocaleString('ja-JP')+ '円'" value="L" color="#0d5c35"></v-radio>
            </v-radio-group>
            <div>
              <h3 style="font-weight : bold">数量を選択</h3>  
              <v-select :items="items" v-model="selectNum"></v-select>
            </div>
          </v-main>
           <h3 style="font-weight : bold">トッピングを選択（各50円）</h3>  
            <div id="checkbox">
              <div v-for="(topping,index) in toppings" :key="index" id="check">
               <v-checkbox v-model="checkTopping" :label="topping.name" :value="topping.name" color="#0d5c35" id="check"></v-checkbox>
              </div>
             </div>
            <div align="center">
              <h2>ご注文金額合計：{{size === "M"?
                (itemDetail.priceM * selectNum) + (this.checkTopping.length * 50)
                  :
                  (itemDetail.priceL * selectNum) + (this.checkTopping.length * 50)
                  }}円(税込)</h2>
              <router-link :to="{name: 'CartItem'}" id="router">
                <v-btn color="#0d5c35" dark @click="addCart" class="mb-5 mt-3">カートに入れる</v-btn>
              </router-link>
            </div>
        </v-col>
    </v-row>
</v-layout>
</v-container>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import { newCart,addCart } from "@/types";

@Component({
  // created(){
  //   this.$store.dispatch("fetchItem")
  //   this.$store.dispatch("fetchToppings")
  //   this.$store.dispatch("fetchCart")
  // },
  computed:{
    itemDetail(){
    let itemdetail = ""
    this.$store.state.items.forEach((item) => {
      if(item.id ===Number(this.$route.params.id)){
        itemdetail = item
        this.itemId = item.id
        this.priceL = item.priceL
        this.priceM = item.priceM
        this.itemName = item.name
        this.imagePath = item.imagePath
      }
    })
      return itemdetail
    },
  toppings(){
    return this.$store.state.toppings
  },
  },
})
export default class ItemDetail extends Vue{
  private itemId:number= null
  private priceM:number = null
  private priceL:number= null
  private itemName = ""
  private imagePath = ""
  private selectNum = 1
  public size = "M"
  items = [
      {text:'1',value:1},
      {text:'2',value:2},
      {text:'3',value:3},
      {text:'4',value:4},
      {text:'5',value:5},
      {text:'6',value:6},
      {text:'7',value:7},
      {text:'8',value:8},
      {text:'9',value:9},
      {text:'10',value:10},
    ]
  private price:number = null
  private checkTopping = []
  private addCart(){
    if(this.size === "M"){
      this.price = this.priceM
    }else{
      this.price = this.priceL
    }
      let cartItem:newCart = {
        id: new Date().getTime().toString(),
        status: 0,
        itemInfo :[{
        itemId: this.itemId,
        name: this.itemName,
        price: this.price,
        num: this.selectNum,
        size: this.size,
        imagePath: this.imagePath,
        toppings : this.checkTopping
        }]
      }
    if(this.$store.getters.uid === null){
      alert("ログインしてください")
      this.$store.dispatch("login")
    }else if(this.$store.state.cart === null){
      console.log("new")
      this.$store.dispatch("newCart",cartItem)
    }else{
      console.log("add")
      const copy = this.$store.getters.cart
      const info = [...copy,cartItem.itemInfo[0]]
      const addCartItem:addCart = {
        id: this.$store.state.cart.id,
        orderId: this.$store.getters.orderId,
        status: 0,
        itemInfo: info
      }
      this.$store.dispatch("addCart", addCartItem)
    }
  }
}
</script>
<style scoped>
#card{
  padding-top:20px;
}
#detailTitle{
  margin-top: 30px;
}
#checkbox{
  display:flex !important;
  width: 100%;
  flex-wrap: wrap;
}
#check{
  width: 180px;
}
#itemDetail{
  background-color:#f4f2ef;
  width: 100%
}
.v-main{
  padding: 0px 0px 0px !important
}
</style>