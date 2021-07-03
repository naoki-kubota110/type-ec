<template>
  <div>
    <Search :defaultItems="items" @change-flg-false="changeFalse()" @change-flg-true="changeTrue()"/>
　<HomeContent :items="items" :flg="flg"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import HomeContent from '../components/home/Content.vue'
import Search from '../components/home/Search.vue'
import { itemList} from "../types/index";
@Component({
  components:{
    HomeContent,
    Search
  },
})
export default class Home extends Vue{
  created(){
    this.$store.state.flg = true
  }
  get items():itemList[]{
    return this.$store.state.items;
  }
  get flg():boolean{
    return this.$store.state.flg
  }
  changeFalse(){
    this.$store.state.flg=false
  }
  changeTrue(){
    this.$store.state.flg=true
  }
}
</script>