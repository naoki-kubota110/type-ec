<template>
  <Content 
  :carts="this.$store.getters.cart" :cartLength="cartLength" 
  :sumPrice="sumPrice" 
  @delete-cart="removeCart" />
</template>

<script lang="ts">
import { Component, Vue,Emit} from 'vue-property-decorator';
import Content from '../components/cartItem/Content.vue'
@Component({
  components: {
    Content
  },
})
export default class CartItem extends Vue{
  created(){
    this.$store.dispatch("fetchCart")
    this.$store.dispatch("fetchUserInfo")
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

  removeCart(index:number):void{
    const deleteItem = this.$store.state.cart
    deleteItem.itemInfo.splice(index,1)
    console.log(deleteItem)
    this.$store.dispatch("deleteCart", deleteItem)
  }
}
</script>