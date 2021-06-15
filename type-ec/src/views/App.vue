<template>
    <v-main>
      <Header></Header>
      <router-view/>
      <div id="main">
      <h1>hello</h1>

      </div>
    </v-main>
</template>

<script lang="ts">
import { Component, Vue ,Watch, Prop} from 'vue-property-decorator';
import Header from '../components/Header.vue'

@Component({
  components: {
    Header
  }
})


export default class App extends Vue{

}
</script>
