<template>
  <v-footer color="#FFAB40" padless height="70px" dark>
    <!-- <v-row justify="center" no-gutters align="center">
    <div v-if="$store.getters.uid"></div>
    <v-col align="center" cols="1" id="cols">
      <router-link id="links" to="/" class="ma-5 link" >
        <v-btn text retain-focus-on-click><v-icon>mdi-home</v-icon></v-btn>
      </router-link>
    </v-col>
    <v-col align="center" cols="1" id="cols">
      <router-link id="links" to="/" class="ma-5 link">
        <v-btn text retain-focus-on-click><v-icon>mdi-cart</v-icon></v-btn>
      </router-link>
    </v-col>
    <v-col align="center" cols="1" id="cols">
      <router-link id="links" to="/" class="ma-5 link" >
        <v-btn text retain-focus-on-click><v-icon>mdi-playlist-check</v-icon></v-btn>
      </router-link>
    </v-col>
  </v-row> -->
    <v-col class="py-4 text-center white--text" cols="12">
    Copyright©︎ {{ new Date().getFullYear() }} —
    <strong>ラクラクカリー All Rights Reserved</strong>
  </v-col>
  </v-footer>
</template>

<style scoped>
#links{
  text-decoration:none;
}
#cols{
  width:50px;
}
</style>