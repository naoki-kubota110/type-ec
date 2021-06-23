<template>
<v-app-bar app color="#FFAB40">
  <v-app-bar-nav-icon @click="sideNav">
    <v-icon>mdi-menu</v-icon>
  </v-app-bar-nav-icon>
  <v-toolbar-title>
    <router-link to="/"><p>らくらくカレー</p></router-link>
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <div v-if="$store.getters.uid">
    <router-link to="/cartitem">
      <v-btn text retain-focus-on-click><v-icon>mdi-cart</v-icon></v-btn>
    </router-link>
    <router-link to="/cartitem">
      <v-btn @click="logout" id="btn" retain-focus-on-click text class="mx-2 link" outlined>注文履歴</v-btn>
     </router-link>
    <v-btn @click="logout" id="btn" retain-focus-on-click text class="mx-1link" outlined>ログアウト</v-btn>
  </div>
  <div v-else>
    <router-link to="cartitem">
      <v-btn text retain-focus-on-click><v-icon>mdi-cart</v-icon></v-btn>
    </router-link>
    <v-btn @click="login" id="btn" retain-focus-on-click text class="mx-1 link" outlined>ログイン</v-btn>
  </div>
</v-app-bar>
</template>

<script lang="ts">
import { mapActions } from "vuex"
import { Component, Vue} from 'vue-property-decorator';
import firebase from 'firebase'

@Component({
  methods: {
    ...mapActions(["sideNav","login","setLoginUser", "setLogoutUser", "logout"])
  },
    created(){
    firebase.auth().onAuthStateChanged(user=> {
      if(user){
        this.setLoginUser(user)
      }else{
        this.setLogoutUser()
      }
    })
  }
})
export default class Header extends Vue{
}
</script>