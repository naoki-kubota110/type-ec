<template>
<v-container>
<v-layout row rap justify-center>
    <v-row justify="center" class="ma-1">
        <v-col justify="center" align="center">
            <v-card flat>
                <img :src="require(`@/assets/img/${itemDetail.imagePath}`)" id="img" class="gray lighten-2" alt="画像" width="400" height="280" justify-center>
            </v-card>
        </v-col>
        <v-col align="left" valign="middle">
            <h2 class="ma-2">{{itemDetail.name}}</h2><br/>
            <p>{{itemDetail.description}}</p>
        </v-col>
    </v-row>
    <v-row class="ma-1">
        <v-spacer></v-spacer> 
        <v-col cols="12" justify="center" align="left">
          <v-main valign="middle">
            <h4 style="font-weight : bold">サイズを選択</h4>  
            <label>
                <input name="size" type="radio" v-model="size" value="M" checked> 
                <span> 普通 {{itemDetail.priceM.toLocaleString('ja-JP')}}円</span>  |  
                <input type="radio" name="size" v-model="size" value="L">
                <span> 大盛り {{itemDetail.priceL.toLocaleString('ja-JP')}}円</span><br>
                {{size}}
            </label><br>
            <div>
             <select v-model="selectNum">
               <span>数量を選択</span>
                <option disabled value="" >Please select one</option>
                <option value=1>1</option>
                <option value=2>2</option>
                <option value=3>3</option>
              </select>
              <span>数量 {{ selectNum}}</span>
            </div>
          </v-main>
            <v-col v-for="(topping,index) in toppings" :key="index" >



          <input type="checkbox" :value="`${topping.name}`" v-model="checkTopping">
          <label>{{topping.name}}</label>

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
      console.log(cartItem)
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