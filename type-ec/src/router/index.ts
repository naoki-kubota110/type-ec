import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import ItemDetail from "../views/ItemDetail.vue";
import CartItem from "../views/CartItem.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/item/:id",
    name: "ItemDetail",
    component: ItemDetail
  },
  {
    path: "/cartitem",
    name: "CartItem",
    component: CartItem 
  },
  {
    path: "/notfound",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "*",
    redirect: "notfound"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
