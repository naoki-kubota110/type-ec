<script lang="ts">
import { mount } from '@vue/test-utils';
import Hello from 'views/Hello.vue';


describe('Counter', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Hello);
    expect(wrapper.html()).toContain("Hello Vue");
  });
});
</script>