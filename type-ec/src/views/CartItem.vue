<template>
<v-container>
<div v-if="cartLength">
<h1 class="text-center">ショッピングカート</h1>
<v-row>
<v-simple-table class="mt-5">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
            商品イメージ
          </th>
          <th class="text-center">
            商品名
          </th>
          <th class="text-center">
            サイズ
          </th>
          <th class="text-center">
            個数
          </th>
          <th class="text-center">
            価格（税込）
          </th>
          <th class="text-center">
            トッピング（各200円）
          </th>
          <th class="text-center">
            小計（税込）
          </th>
          <th class="text-center">
            ー
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in itemArray" :key="index">
          <td class="text-center"> <img :src="require(`@/assets/img/${item.imagePath}`)" id="img"  alt="画" width="30" height="30" justify-center></td>
          <td class="text-center">{{ item.name }}</td>
          <td class="text-center">{{item.size === "M"? "並盛":"大盛り" }}</td>
          <td class="text-center">{{ item.num }}皿</td>
          <td class="text-center">{{ item.price.toLocaleString('ja-JP') }}円</td>
          <td class="text-center"><p v-for="(topping,index) in item.toppings" :key="index">{{topping}}</p></td>
          
          <td class="text-center">{{ item.toppings.length !==0 ? ((item.price * item.num) + (200 * item.toppings.length * item.num)).toLocaleString('ja-JP') : (item.price * item.num).toLocaleString('ja-JP')}}円</td>
          <td class="text-center"><v-btn @click="deleteCart(index)">削除</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-row>
 <v-row class="mt-5">
  <v-col align="center">
      <h2>消費税：{{tax}}円</h2>
      <h2>ご注文金額合計：{{sumPrice}}円(税込)</h2>
      <v-btn class="mt-5" v-if="!showorder" color="orange" dark rounded href="#orderForm" @click="showOrder">注文に進む</v-btn>
      <v-btn v-if="showorder" rounded color="orange" dark class="mt-5" @click="showOrder">閉じる</v-btn>
  </v-col>
</v-row>
<div v-show="showorder">
  <Order/>
</div>
</div>
<div v-else class="text-center">
  {{orderArray}}
  <h2 class="mt-5">カートに商品がありません</h2>
  <router-link to="/">
  <v-btn v-if="show" color="orange" dark rounded class="mt-5">トップページに戻る</v-btn>
  </router-link>
</div>

</v-container>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import { mapActions,mapGetters } from "vuex"
import Order from '../components/Order.vue'
@Component({
  components: {
    Order
  },
  created(){
    // this.$store.dispatch("fetchOrders")
  },
computed:{
  itemArray(){
    if(this.$store.getters.cart !== null && this.$store.state.cart.status === 0){
      return this.$store.getters.cart
    }else{
      return "kara"
    }
  },
  orderArray(){
    this.$store.state.orders
  },
  sumPrice(){
    let sum = 0
    this.$store.getters.cart.forEach(item => {
      sum += ((item.price * Number(item.num)) + (item.toppings.length * 200 * item.num))
    })
    return sum
  },
  cartLength(){
    if(this.$store.getters.cart === null){
      return false
    }else if(this.$store.getters.cart.length === 0){
      return false
    }else{
      return true
    }
  },
  tax(){
    return Math.floor((this.sumPrice * 0.1) / 1.1)
  }
},
})
export default class CartItem extends Vue{
  private show = true
  private showorder = false
  private headers = [
    {text:'',value:'img',sortable:false},
    {text:'商品名',value:'name'},
    {text:'価格(税抜)',value:'price'},
    {text:'数量',value:'num'},
    {text:'小計',value:'sum'},
    {text:"delete",value:'delete',sortable:false},
  ]
  deleteCart(index){
    const deleteItem = this.$store.state.cart
    deleteItem.itemInfo.splice(index,1)
    console.log(deleteItem)
    this.$store.dispatch("deleteCart", deleteItem)
  }
  showOrder(){
    if(!this.showorder){
      this.showorder = true
    }else{
      this.showorder = false
    }

  }
}
</script>