<template>
<div>
  <h1>{{itemdetail.name}}</h1>
  <p>{{itemdetail.priceM}}</p>

</div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';


@Component({
  created(){
    console.log(this.$store.state.toppings)
    let  itemId = this.$route.params.id
    let defaultItems = this.$store.state.items
    defaultItems.forEach((item) => {
      if(item.id === itemId){
        this.itemdetail = item
      }
    })
  },
  mounted(){
    console.log("mouht")
  },
  computed:{

  }
})
export default class ItemDetail extends Vue{
  itemdetail = ""
}
</script>