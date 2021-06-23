<template>
<v-container>
<v-layout row rap justify-center>
    <v-row justify="center" class="ma-1 mt-5">
        <v-col justify="center" align="center">
            <v-card flat>
                <img :src="require(`@/assets/img/${itemDetail.imagePath}`)" id="img" class="gray lighten-2" alt="画像" width="400" height="280" justify-center>
            </v-card>
        </v-col>
        <v-col align="left" valign="middle">
            <h2 class="ma-2 mt-5">{{itemDetail.name}}</h2><br/>
            <h4>{{itemDetail.description}}</h4>
        </v-col>
    </v-row>
    <v-row>
        <v-spacer></v-spacer> 
        <v-col cols="6" justify="center" align="left">
          <v-main valign="middle">
            <h4 style="font-weight : bold">サイズを選択</h4>  
            <v-radio-group row v-model="size">
              <v-radio :label="'並盛 : ' + itemDetail.priceM.toLocaleString('ja-JP') + '円'" value="M" color="warning"></v-radio>
               <v-radio :label="'大盛 : ' + itemDetail.priceL.toLocaleString('ja-JP') + '円'" value="L" color="warning"></v-radio>
            </v-radio-group>
            <div>
              <h4 style="font-weight : bold">数量を選択</h4>  
              <v-select :items="items" v-model="selectNum"></v-select>
            </div>
          </v-main>
           <h4 style="font-weight : bold">トッピングを選択（各200円）</h4>  
            <v-col v-for="(topping,index) in toppings" :key="index">
          <v-checkbox v-model="checkTopping" :label="topping.name" :value="topping.name" color="orange"></v-checkbox>

            </v-col>
            <div align="center">
                <h2>ご注文金額合計：{{size === "M"?
                  (itemDetail.priceM * selectNum) + (this.checkTopping.length * 200)
                   :
                   (itemDetail.priceL * selectNum) + (this.checkTopping.length * 200)
                   }}円(税込)</h2>
                     <router-link :to="{name: 'CartItem'}">

                <v-btn color="orange" dark @click="addCart"><strong>カートに入れる</strong></v-btn>
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
  created(){
    this.$store.dispatch("fetchItem")
    this.$store.dispatch("fetchToppings")
  },
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
  public size = ""
  items = [
      {text:'1皿',value:1},
      {text:'2皿',value:2},
      {text:'3皿',value:3},
      {text:'4皿',value:4},
      {text:'5皿',value:5},
      {text:'6皿',value:6},
      {text:'7皿',value:7},
      {text:'8皿',value:8},
      {text:'9皿',value:9},
      {text:'10皿',value:10},
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
    if(this.$store.getters.orderId === null){
      this.$store.dispatch("newCart",cartItem)
    }else{
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