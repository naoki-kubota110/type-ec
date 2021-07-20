<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list>
      <v-list-item>
        <div><h4>メニュー</h4></div>
      </v-list-item>
      <v-divider></v-divider>
      <div v-if="uid">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img v-if="photoURL" :src="photoURL">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{userName}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="(item,index) in loginItems" :key="index" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>

      <div v-else>
        <v-list>
          <v-list-item v-for="(item,index) in logoutItems" :key="index" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import {navItem} from '../../types/index'
@Component({
})
export default class SideNav extends Vue{
  @Prop() private userName!: string
  @Prop() private photoURL!:any
  @Prop() private uid!:string
  @Prop() private drawer!:boolean
  
  loginItems :navItem[] = [
    {name:'ホーム',icon:'mdi-home',link:'/'},
    {name:'カート',icon:'mdi-cart',link:'/cartitem'},
    {name:'注文履歴',icon:'mdi-playlist-check',link:'/orderhistory'}
  ]
  logoutItems : navItem[] = [
    {name:'ホーム',icon:'mdi-home',link:'/'},
  ]
}
</script>