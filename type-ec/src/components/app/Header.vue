<template>
<v-app-bar app color="#0d5c35">
  <v-app-bar-nav-icon>
    <v-icon id="menu" @click="sidenav()">mdi-menu</v-icon>
  </v-app-bar-nav-icon>
  <v-toolbar-title>
    <router-link to="/" id="router">
    <div id="headerFont"><strong><v-icon id="btn">mdi-coffee</v-icon> Starbucks Coffee</strong></div>
    </router-link>
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <div v-if="$store.getters.uid">
    <router-link to="/cartitem" id="router">
      <v-btn text retain-focus-on-click><v-icon id="btn">mdi-cart</v-icon></v-btn>
    </router-link>
    <router-link to="/orderhistory" id="router">
      <v-btn  id="btn" retain-focus-on-click text class="mx-5 link" outlined>注文履歴</v-btn>
    </router-link>
    <v-btn @click="logout()" id="btn" retain-focus-on-click text class="mx-1link" outlined>ログアウト</v-btn>
  </div>
  <div v-else>
    <v-btn @click="login()" id="btn" retain-focus-on-click text class="mx-1 link" outlined>ログイン</v-btn>
  </div>
</v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Emit} from 'vue-property-decorator';

@Component({
})
export default class Header extends Vue{
  @Emit() private sidenav(){}
  @Emit() private login(){}
  @Emit() private logout(){}
}
</script>
<style scoped>
#headerImg{
  width: 250px;
  height:40px;
  margin-top: 5px;
}
#menu{
  color:#fff;
}
#router{
   text-decoration: none;
}
#btn{
  color: #fff;
}
#headerFont{
  color:#fff;
}
</style>