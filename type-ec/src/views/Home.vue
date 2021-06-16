<template>
<v-app>
  <v-container>
    <v-row>
      <v-col cpl="4" v-for="(item,index) in itemBox" :key="index" align="center">
        <v-card id="item" elevation="5">
          <div>
            <v-img :src="require(`@/assets/img/${item.imagePath}`)" id="img" class="gray lighten-2"></v-img>
          </div>

          <div>
            <v-card-title>
              <p id="itemName">{{item.name}}</p>
            </v-card-title>
          </div>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="9">
              <div>
                <p>普通:{{item.priceM}}円  大盛り:{{item.priceL}}円</p>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</v-app>
</template>

<script lang="ts">
import { mapActions } from "vuex"
import { Component, Vue} from 'vue-property-decorator';
import firebase from 'firebase'
import {itemList} from '../types/index'

@Component({
  created(){
    this.$store.dispatch("fetchItem")
    console.log(this.$store.state.items)
  },
 computed: {
   itemBox(){
     return this.$store.state.items;
   },
 }

})
export default class Home extends Vue{
}
</script>
<style>
#img{
 height:200px;
 width:300px;
 border-bottom: solid 0.5px gray;
 border-radius:10px 10px 0 0;
 background-color: white;
}
#item{
  height:325px;
  width:300px;
  border-radius: 10px;
  border: solid 0.5px gray;
  background-color: antiquewhite;
}
#price{
  font-size: 25px;
}
#itemName{
  color:black;
  text-decoration: none;
  font-size: 18px;
  font-weight:bold;
}
#itemName:hover{
  color:orange;
}
</style>