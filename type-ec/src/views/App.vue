<template>
<v-app>
    <Header></Header>
    <SideNav></SideNav>
    <v-main>
      <router-view/>
    </v-main>
<Footer/>

</v-app>
</template>

<script lang="ts">
import { Component, Vue ,Watch, Prop} from 'vue-property-decorator';
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import SideNav from '../components/SideNav.vue'


@Component({
  components: {
    Header,
    Footer,
    SideNav
  }
})


export default class App extends Vue{

}
</script>
