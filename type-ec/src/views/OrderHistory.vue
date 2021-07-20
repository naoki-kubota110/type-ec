<template>
<v-container>
  <div v-if="ordered.length !==0">
  <h2 class="text-center">注文履歴</h2>
    <v-simple-table class="mt-5 mb-5 text-center">
      <template v-slot:default>
        <thead id="thead">
          <tr>
            <th class="text-center"><big>商品イメージ</big></th>
            <th class="text-center"><big>商品名 , 数量</big></th>
            <th class="text-center"><big>トッピング</big></th>
            <th class="text-center"><big>注文日時 , 配達予定日時</big></th>
            <th class="text-center">ー</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order,index) in ordered" :key="index">
            <td class="text-center">
              <div  v-for="(it,index) in order.itemInfo" :key="index">
                <p class="mt-2">【{{index + 1}}】{{it.name}}</p>
                <img id="imgHis" :src="require(`@/assets/img/${it.imagePath}`)" class="mb-1">
                </div> 
            </td>
            <td class="text-center">
              <p v-for="(it,index) in order.itemInfo" :key="index">
              【{{index + 1}}】{{it.name}}({{it.size === "M"? "Short": "Venti"}}) × {{it.num}}杯<br>
                小計：{{it.price * it.num.toLocaleString('ja-JP')}}円
              </p>
            </td>
            <td class="text-center" id="notspace">
              <div v-for="(it,idx) in order.itemInfo" :key="idx">
                <div v-for="(topping,index) in it.toppings" :key="index">
                【{{idx + 1}}】{{topping}}
                </div>
                <p v-if="it.toppings.length !== 0">小計：{{it.toppings.length * 50 * it.num}}円</p>
                <p v-else>【{{idx + 1}}】トッピング無し</p>
              </div>
            </td>
            <td class="text-center" id="notspace">
              <div>
                注文日時<br>
                {{order.orderTime}}
              </div>
              <div>
              配達予定日時<br>
              {{order.time}}
              </div>
            </td>
            <td class="text-center">
              <v-btn>キャンセル</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
  <div class="text-center" v-else>
    <img src="../../public/img/cartEmpty.png" id="logImg">
    <h2 class="mt-5">注文履歴はありません。</h2>
    <router-link to="/">
      <v-btn  color="#0d5c35" dark rounded class="mt-5" id="router">トップページに戻る</v-btn>
    </router-link>
  </div>

</v-container>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
@Component({
   created(){
    this.$store.dispatch("fetchOrdered")
  },
})
export default class OrderHistory extends Vue{
  get ordered(){
    return  this.$store.state.orders
  }
}
</script>

<style scoped>
#logImg{
  width: 300px;
}
#notspace{
  white-space: nowrap;
}
#imgHis{
  height: 150px;
  width: 150px;
}
</style>