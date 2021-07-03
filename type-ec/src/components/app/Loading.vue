<template>
  <div v-if="loading">
    <h2 class="mb-5">読込中</h2>
    <spinner></spinner>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import Spinner from 'vue-simple-spinner'
@Component({
  components:{
    Spinner
  },
})
export default class Loading extends Vue{
  get loading(){
    return this.$store.state.loading
  }
}
</script>