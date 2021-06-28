<script lang="ts">
import Vue from 'vue'
import Vuetify from 'vuetify'
import Home from 'views/Home.vue';
import VueRouter from 'vue-router'
import { createLocalVue, mount,RouterLinkStub } from '@vue/test-utils'
import assert from 'assert'
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()


describe('Counter', () => {
  const localVue = createLocalVue()
  let vuetify
   beforeEach(() => {
    vuetify = new Vuetify()
  })
  it('v-cartタグの数が１つかの確認', () => {
    const wrapper = mount(Home,{
      localVue,
      vuetify
    });
    expect(wrapper.findAll('.v-card').length).toEqual(1)
  });
  it('card-contentが3つ存在しているのかの確認', () => {
    const wrapper = mount(Home,{
      localVue,
      vuetify
    });
    expect(wrapper.findAll('.homeMain').length).toEqual(1)
  });
  it('v-showがtrueにっているのかの確認', () => {
    const wrapper = mount(Home,{
      localVue,
      vuetify
    });
    expect(wrapper.isVisible()).toBeTruthy();
  });
});



</script>