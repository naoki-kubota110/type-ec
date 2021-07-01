<template>
  <v-app>
    <Header></Header>
    <SideNav id="side"></SideNav>
    <v-main id="main">
      <div class="text-center" id="loading" v-if="loading">
        <Loading/>
      </div>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import SideNav from '../components/SideNav.vue'
import Loading from '../components/Loading.vue'
import firebase from 'firebase'
import { mapActions,mapState,mapGetters } from "vuex"

@Component({
  components: {
    Header,
    Footer,
    SideNav,
    Loading
  },
  methods:{
     ...mapActions(["fetchItem","fetchToppings","fetchCart","fetchOrdered"]),
     ...mapGetters(["flg"])
  },
  created(){
    this.fetchItem()
    this.fetchToppings()
    firebase.auth().onAuthStateChanged(user=> {
      if(user){
        this.setLoginUser(user)
      }else{
        this.setLogoutUser()
      }
    })
  }
})
export default class App extends Vue{
  get loading(){
    return this.$store.state.loading
  }
}
</script>
<style>
#app{
 /* background-color:#f4f2ef; */
}
#loading{
  margin-top:200px;
}
</style>
