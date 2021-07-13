<script lang="ts">
import Vue from "vue"
import Vuetify from "vuetify"
import HomeContent from "../components/home/Content.vue";
// imprt VueRouter from "vue-router"
import { createLocalVue, mount,RouterLinkStub } from '@vue/test-utils'
import {describe, expect, it,beforeEach} from '@jest/globals'
Vue.use(Vuetify)

describe('Homeコンポーネントのテスト', () => {
  const localVue = createLocalVue()
  let vuetify
   beforeEach(() => {
    vuetify = new Vuetify()
  })
  const wrapper = mount(HomeContent,{
      localVue,
      vuetify
    });
  it('v-cartタグの数が１つかの確認', () => {
    // expect(wrapper.contains('.card-content')).toBe(true)
    expect(wrapper.element).toMatchSnapshot();
  });
  it("card-contentが存在しているのかの確認", () => {
    expect(wrapper.findAll('.homeMain').length).toEqual(1)
  });
  it('v-showがtrueにっているのかの確認', () => {
    expect(wrapper.isVisible()).toBeTruthy();
  });
});
</script>
