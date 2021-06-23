<template>
 <v-container>
   <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
          <v-card>
              <v-card-title>商品を検索する</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form>
                  <div  align="center">
                    <v-text-field
                      label="商品名 or キーワードで検索"
                      hide-details="auto"
                      v-model="search_term"
                    ></v-text-field><p/>
                    <p v-if="show">{{errosMsg}}</p>
                  <v-btn color="orange" dark @click="searchBtn">検索</v-btn>&nbsp;
                  <v-btn outlined @click="removeBtn">クリア</v-btn>
                  </div>
                </v-form>
              </v-card-text>
          </v-card>
      </v-col>
  </v-row>
  <v-row v-if="showSearchItem">

  <v-col  cpl="4" v-for="(item,index) in searchBox" :key="index" align="center">
        <v-card id="item" elevation="5">
          <router-link :to='{name: "ItemDetail", params: {id: item.id}}'>

          <div>
            <v-img :src="require(`@/assets/img/${item.imagePath}`)" id="img" class="gray lighten-2"></v-img>
          </div>
          <div>
            <v-card-title>
              <p id="itemName">{{item.name}}</p>
            </v-card-title>
          </div>
          </router-link>
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
</template>

<script lang="ts">
import {mapGetters } from "vuex"
import { Component, Vue} from 'vue-property-decorator';
import { itemList,toppingList } from "@/types";

@Component({
  computed:{
    searchBox(){
      return this.searchItem
    }
  },
})
export default class Search extends Vue{
  search_term = ""
  show = false
  errosMsg = ""
  showSearchItem = false
  searchItem:itemList[] = []
  searchBtn():void{
    const defaultItems = this.$store.state.items
    const searchFilter :itemList[] = defaultItems.filter((item :any) => {
      return 0 <= String(item.name).indexOf(this.search_term)
    })
    if(this.search_term === ""){
      this.errosMsg = "商品名、またはキーワードを入力してください"
      this.show = true
      this.searchItem = defaultItems
    }else if(searchFilter.length === 0){
      this.errosMsg = "該当商品が見つかりません"
      this.show = true
      this.searchItem = defaultItems
    }else{
      this.searchItem = searchFilter
      this.showSearchItem = true
      this.$store.state.flg= false
      this.show = false
    }
  }
  removeBtn():void{
    this.showSearchItem = false
    this.search_term = ""
    this.$store.state.flg = true
    this.show = false
    this.searchItem = []
    this.searchItem = this.$store.state.items
  }
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