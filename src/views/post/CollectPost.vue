<template>
  <div class="collect-wrap">
    <AppBar title="收藏的主题" />
    <PostList :list="list" />
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import AppBar from "@/components/AppBar";
import { mapState } from "vuex";
import { getUserCollect } from "@/api/post";

export default {
  components: {
    PostList,
    AppBar,
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    // this.getCollect();
  },
  activated() {
    this.getCollect();
  },
  methods: {
    async getCollect() {
      const loading = this.$loading();
      try {
        const { body } = await getUserCollect(this.username);
        if (body?.success) {
          this.list = body.data;
        }
      } catch (error) {
        console.log(error);
      }
      loading?.close();
    },
  },
  computed: {
    ...mapState("user", {
      username: (s) => s.userInfo.loginname,
    }),
  },
};
</script>

<style scoped lang="scss">
.collect-wrap {
  background-color: #fff;
}
</style>
