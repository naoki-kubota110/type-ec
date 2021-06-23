<template>
<v-container>
<div v-if="ordered">
<h1 class="text-center">注文履歴</h1>
<v-row>
<v-simple-table class="mt-5">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
            商品イメージ
          </th>
          <th class="text-center">
            商品名、数量
          </th>
          <th class="text-center">
            <p>トッピング</p>
          </th>
          <th class="text-center">
            注文日時
          </th>
          <th class="text-center">
            -
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order,index) in ordered" :key="index">
          <td class="text-center"> 
            <div v-for="(it,index) in order.itemInfo" :key="index">
              <p>【{{index + 1}}】{{it.name}}</p>

              <img id="img" :src="require(`@/assets/img/${it.imagePath}`)"  alt="画" width="30" height="30" justify-center>
            </div>
          </td>
          <td class="text-center">
            <p v-for="(it,index) in order.itemInfo" :key="index">
              【{{index + 1}}】{{it.name}}({{it.size === "M"? "並盛": "大盛"}}) × {{it.num}}皿<br>
              小計：{{it.price * it.num}}円
            </p>
          </td>
          <td class="text-center">
            <div v-for="(it,idx) in order.itemInfo" :key="idx">
              <div v-for="(topping,index) in it.toppings" :key="index">
               【{{idx + 1}}】{{topping}}
              </div>
              <p>小計：{{it.toppings.length * 200 * it.num}}</p>
            </div>
          </td>
          <td class="text-center">{{order.orderTime}}</td>
          <td class="text-center">
            <v-btn>キャンセル</v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-row>
</div>
<div class="text-center" v-else>
  <h2 class="mt-5">注文履歴はありません</h2>
  <router-link to="/">
  <v-btn  color="orange" dark rounded class="mt-5">トップページに戻る</v-btn>
  </router-link>
</div>

</v-container>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import { mapActions,mapGetters } from "vuex"
@Component({
})
export default class OrderHistory extends Vue{
  get ordered(){
      let arry = this.$store.state.orders.slice().reverse();
      return  arry
  }
  created(){
    console.log("created")
    this.$store.dispatch("fetchOrdered")
  }
}
</script>