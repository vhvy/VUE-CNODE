<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Footer v-show="footerShow" />
  </div>
</template>

<script>
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Footer,
  },
  computed: {
    footerShow() {
      return this.$store.state.global.footerShow;
    },
  },
};
</script>

<style lang="scss">
@import url(https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css);
@import "@/styles/reset.scss";
#app {
  position: relative;
}
</style>
