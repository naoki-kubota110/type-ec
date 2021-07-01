<template>
<v-app>
  <v-container>
    <v-main align="center" class="homeMain">
      <Search/>
      <input  type="text">
    </v-main>
    <v-row v-show="flg" class="mt-5">
      <v-col cpl="4" v-for="(item,index) in itemBox" :key="index" align="center">
        <v-card id="item" elevation="5" class="v-card">
          <router-link :to='{name: "ItemDetail", params: {id: item.id}}' id="router">
            <div>
              <v-img :src="require(`@/assets/img/${item.imagePath}`)" id="img" class="card-img gray lighten-2"></v-img>
            </div>
            <div class="card-content">
              <v-card-title>
                <p id="itemName">{{item.name}}</p>
              </v-card-title>
            </div>
          </router-link>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="9">
              <div class="card-content">
                <p><strong>Short ¥{{item.priceM}}  Venti ¥{{item.priceL}}</strong></p>
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
import { Component, Vue} from 'vue-property-decorator';
import { mapActions,mapState } from "vuex"
import Search from '../components/Search.vue'
@Component({
  components:{
    Search,
  },
})
export default class Home extends Vue{
  get itemBox(){
    return this.$store.state.items;
  }
  get flg(){
    return this.$store.state.flg
  }
  created(){
    this.$store.state.flg = true
  }
}
</script>

<style>
#img{
 height:280px;
 width:300px;
 border-bottom: solid 0.5px gray;
 border-radius:10px 10px 0 0;
 background-color: white;
 object-fit: cover !important;
}
#item{
  height:390px;
  width:300px;
  border-radius: 10px;
  border: solid 0.5px gray;
  background-color:#f4f2ef;
  color:#3d3935;
}
#price{
  font-size: 25px;
}
#itemName{
  color:#3d3935;
  text-decoration: none;
  font-size: 18px;
  font-weight:bold;
}
#itemName:hover{
  color:#0d5c35;
}
#router{
   text-decoration: none;
}
#btn{
  color: #fff;
}
#card{
  background-color:#f4f2ef;
}
#imgDetail{
height:300px;
 width:300px;
 border-bottom: solid 0.5px gray;
 border-radius:10px 10px 0 0;
 background-color: white;
 object-fit: cover !important;
}
</style>