<template>
  <div class="global-footer">
    <mu-bottom-nav :value="$route.fullPath" ref="navs">
      <mu-bottom-nav-item
        v-for="{ title, icon, path } of config"
        :title="title"
        :icon="icon"
        :key="icon"
        :value="path"
        :to="path"
      >
      </mu-bottom-nav-item>
    </mu-bottom-nav>
    <!-- <span class="not-readmsg-count" v-if="msgCount > 0">{{ msgCount }}</span> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      config: [
        {
          title: "首页",
          icon: "home",
          path: "/",
        },
        {
          title: "消息",
          icon: "forum",
          path: "/msg",
        },
        {
          title: "我的",
          icon: "account_circle",
          path: "/my",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      msgCount: (s) => s.msg.count,
    }),
  },
};
</script>

<style scoped lang="scss">
.global-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 0px 3px 0px #ccc;
}
</style>
