<template>
<v-container>
  <div v-if="cartLength">
  <h2 class="text-center"><v-icon>mdi-cart</v-icon>ショッピングカート</h2>
  <v-simple-table class="mt-5">
      <template v-slot:default>
        <thead id="thead">
          <tr>
            <th class="text-center"><big>商品イメージ</big></th>
            <th class="text-center"><big>商品名</big></th>
            <th class="text-center"><big>サイズ</big></th>
            <th class="text-center"><big>個数</big></th>
            <th class="text-center"><big>価格（税込）</big></th>
            <th class="text-center"><big>トッピング（各50円）</big></th>
            <th class="text-center"><big>小計（税込）</big></th>
            <th class="text-center"><big>ー</big></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in cartInfo" :key="index">
            <td class="text-center"> 
              <img :src="require(`@/assets/img/${item.imagePath}`)" id="imgCart" class="mt-3 mb-3">
            </td>
            <td class="text-center">{{ item.name }}</td>
            <td class="text-center">
              {{item.size === "M"? "Short":"Venti" }}
            </td>
            <td class="text-center">
              {{ item.num }}杯
            </td>
            <td class="text-center">
              {{ item.price}}円
            </td>
            <td class="text-center">
              <div v-for="(topping,index) in item.toppings" :key="index">
                <p v-if="item.toppings.length !==0">
                  {{topping}}
                </p>
                <p v-else>
                  無し
                </p>
              <!-- {{ item.toppings.length !==0 ? topping : "無し"}} -->
              </div>
            </td>
            <td class="text-center">
              {{ item.toppings.length !==0 ? 
              ((item.price * item.num) + (50 * item.toppings.length * item.num)).toLocaleString('ja-JP')
               : 
               (item.price * item.num).toLocaleString('ja-JP')}}円
            </td>
            <td class="text-center">
              <v-btn @click="deleteCart(index)">削除</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div align="center" class="mt-5">
        <h2>ご注文金額合計：{{sumPrice.toLocaleString('ja-JP')}}円(税込)</h2>
        <h2>内消費税：{{tax.toLocaleString('ja-JP')}}円</h2>
        <v-btn class="mt-5" v-if="!showorder" color="#0d5c35" dark rounded href="#orderForm" @click="showOrder">注文に進む</v-btn>
        <v-btn v-if="showorder" rounded color="#0d5c35" dark class="mt-5" @click="showOrder">閉じる</v-btn>
    </div>
    <transition>
      <div v-show="showorder">
        <Order/>
      </div>
    </transition>

  </div>
  <div v-else class="text-center" id="emptyCart">
    <img src="../../public/img/cartEmpty.png" id="cartImg">
    <h2 class="mt-5">カートに商品がありません。</h2>
    <router-link to="/" id="router">
      <v-btn color="#0d5c35" dark rounded class="mt-5">トップページに戻る</v-btn>
    </router-link>
  </div>
</v-container>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import Order from '../components/Order.vue'
import firebase from 'firebase'
@Component({
  components: {
    Order
  },
})
export default class CartItem extends Vue{
  private showorder = false

  created(){
    this.$store.dispatch("fetchCart")
  }

  get itemArray(){
    // this.$store.dispatch("fetchCart")
    this.$store.dispatch("fetchCart")
    if(this.$store.getters.uid !== null){
      return ""
    }
  }
  get cartInfo(){
    return this.$store.state.cart.itemInfo
  }
  get cartLength(){
    if(this.$store.getters.cart === null){
      return false
    }else if(this.$store.getters.cart.length === 0){
      return false
    }else{
      return true
    }
  }
  get sumPrice(){
    let sum = 0
    this.$store.getters.cart.forEach(item => {
      sum += ((item.price * Number(item.num)) + (item.toppings.length * 50 * item.num))
    })
    return sum
  }
  get tax(){
    return Math.floor((this.sumPrice * 0.1) / 1.1)
  }

  deleteCart(index:number):void{
    const deleteItem = this.$store.state.cart
    deleteItem.itemInfo.splice(index,1)
    console.log(deleteItem)
    this.$store.dispatch("deleteCart", deleteItem)
  }
  showOrder():void{
    if(!this.showorder){
      this.showorder = true
    }else{
      this.showorder = false
    }
  }
}
</script>
<style>
#thead{
  background: #DDDDDD;
}
#imgCart{
  height: 150px;
  width: 150px;
}
#emptyCart{
  margin-top: 50px;
}
#cartImg{
  width: 400px;
}
.v-enter,
.v-leave-to{
  opacity: 0;
}
.v-enter-to,
.v-leave{
 opacity: 1;
}
.v-enter-active,
.v-leave-active{
transition: opacity 1s;
}
</style>