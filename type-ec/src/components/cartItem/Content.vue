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
          <tr v-for="(item,index) in carts" :key="index">
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
              </div>
            </td>
            <td class="text-center">
              {{ item.toppings.length !==0 ? 
              ((item.price * item.num) + (50 * item.toppings.length * item.num)).toLocaleString('ja-JP')
               : 
               (item.price * item.num).toLocaleString('ja-JP')}}円
            </td>
            <td class="text-center">
              <v-btn @click="deleteCarts(index)">削除</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div align="center" class="mt-5">
        <h2>ご注文金額合計：{{sumPrice.toLocaleString('ja-JP')}}円(税込)</h2>
        <h2>内消費税：{{tax.toLocaleString('ja-JP')}}円</h2>
        <v-btn class="mt-5" v-if="!showOrder" color="#0d5c35" dark rounded href="#orderForm" @click="showOrderBtn()">注文に進む</v-btn>
        <v-btn v-if="showOrder" rounded color="#0d5c35" dark class="mt-5" @click="showOrderBtn()">閉じる</v-btn>
    </div>
    <transition>
      <div v-show="showOrder">
        <Order/>
      </div>
    </transition> 
  </div>

  <div v-else class="text-center" id="emptyCart">
    <img src="../../../public/img/cartEmpty.png" id="cartImg">
    <h2 class="mt-5">カートに商品がありません。</h2>
    <router-link to="/" id="router">
      <v-btn color="#0d5c35" dark rounded class="mt-5" id="router">トップページに戻る</v-btn>
    </router-link>
  </div>

</v-container>
</template>

<script lang="ts">
import { Component, Vue,Prop,Emit,Watch} from 'vue-property-decorator';
import Order from './Order.vue'
@Component({
  components:{
    Order
  },
})
export default class Content extends Vue{
  @Prop() private carts!:any[]
  @Prop() private cartLength!:number
  @Emit() public deleteCart(index:number){}
  
  deleteCarts(index){
    this.deleteCart(index)
  }
  private showOrder = false
  get sumPrice(){
      let sum = 0
      this.carts.forEach(item => {
        sum += ((item.price * Number(item.num)) + (item.toppings.length * 50 * item.num))
      })
      return sum
  }

  get tax(){
    return Math.floor((this.sumPrice * 0.1) / 1.1)
  }
  showOrderBtn(){
    this.showOrder = !this.showOrder
  }
}
</script>
<style scoped>
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
#router{
   text-decoration: none;
}
v-enter,
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