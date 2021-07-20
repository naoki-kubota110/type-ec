<template>
 <v-container>
   <v-row justify="center" class="mt-5">
      <v-col cols="12" sm="10" md="8" lg="6">
          <v-card>
              <v-card-title id="cardTitle">商品を検索する</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form>
                  <div align="center">
                    <v-text-field
                      label="商品名 or キーワードで検索"
                      hide-details="auto"
                      v-model="search_term"
                    ></v-text-field><p/>
                    <p v-if="notMatch">{{errosMsg}}</p>
                  <v-btn color="#0d5c35"  @click="searchBtn" id="searchBtn">検索</v-btn>&nbsp;
                  <v-btn outlined @click="removeBtn">クリア</v-btn>
                  </div>
                </v-form>
              </v-card-text>
          </v-card>
      </v-col>
  </v-row>
  <v-row v-if="showSearchItem">
    <v-col  cpl="4" v-for="(item,index) in searchBox" :key="index" align="center" class="mt-5">
        <v-card id="item" elevation="5">
          <router-link :to='{name: "ItemDetail", params: {id: item.id}}' id="router">
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
import { Component, Vue,Prop,Emit} from 'vue-property-decorator';
import { itemList} from "../../types/index";

@Component({
})
export default class Search extends Vue{
  @Prop() private defaultItems!:itemList[]
  @Emit() public changeFlgFalse(){}
  @Emit() public changeFlgTrue(){}
  
  private search_term = ""
  private notMatch = false
  private errosMsg = ""
  private showSearchItem = false
  private searchItem:itemList[] = []
  get searchBox(){
    return this.searchItem
  }

  searchBtn():void{
    const searchFilter :itemList[] = this.defaultItems.filter((item :any) => {
      return 0 <= String(item.name).indexOf(this.search_term)
    })
    if(this.search_term === ""){
      this.errosMsg = "商品名、またはキーワードを入力してください"
      this.notMatch = true
      this.searchItem = this.defaultItems
      this.search_term = ""
    }else if(searchFilter.length === 0){
      this.errosMsg = "該当商品が見つかりません"
      this.notMatch =true
      this.searchItem = this.defaultItems
      this.search_term = ""
    }else{
      this.changeFlgFalse()
      this.searchItem = searchFilter
      this.showSearchItem = true
      this.notMatch = false
    }
  }
  removeBtn():void{
    this.showSearchItem = false
    this.search_term = ""
    this.changeFlgTrue()
    this.notMatch = false
    this.searchItem = this.defaultItems
  }
}
</script>
<style scoped>
#searchBtn{
  color: #fff;
}

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