<template>
  <div class="index-wrap">
    <header @click="handleGoTop" class="index-header" />
    <Tabs
      :tabs="tabs"
      class="tabs"
      @click-tab="handleToggleTab"
      :tab="tab"
      :loading="loading"
    />
    <TabPostList
      :tab="tab"
      class="post-list"
      ref="post_list"
      :loading="loading"
      @click-tab="handleToggleTab"
      @start-load="handleStartLoad"
      @end-load="handleEndLoad"
    />
  </div>
</template>

<script>
import TabPostList from "@/components/TabPostList";
import Tabs from "@/components/Tabs";
import tabs from "@/constants/tab";

export default {
  components: {
    TabPostList,
    Tabs,
  },
  data() {
    return {
      tab: "all",
      lastTime: 0,
      tabs,
      loading: false,
    };
  },
  methods: {
    handleStartLoad() {
      this.loading = true;
    },
    handleEndLoad() {
      this.loading = false;
    },
    handleGoTop() {
      const nowTime = Date.now();
      const diff = nowTime - this.lastTime;
      if (diff > 200) {
        this.lastTime = nowTime;
      } else {
        this.$refs.post_list.goTop();
      }
    },
    handleToggleTab(tab) {
      this.tab !== tab && !this.loading && (this.tab = tab);
    },
  },
};
</script>

<style scoped lang="scss">
.index-wrap {
  $height: 50px;
  $tab-height: 50px;

  height: 100%;
  position: relative;

  .tabs {
    top: $height;
  }

  .index-header {
    background: url(//static2.cnodejs.org/public/images/cnodejs_light.svg)
      no-repeat center/auto 60%;
    background-color: #444;
    z-index: 1;
    position: absolute;
    top: 0;
    width: 100%;
    height: $height;
    box-shadow: 0px 0px 3px 0px #ccc;
  }

  .post-list {
    background: #fff;
    position: absolute;
    top: $height + $tab-height;
    left: 0;
    right: 0;
    bottom: 56px;
  }
}
</style>
