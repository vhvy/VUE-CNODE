<template>
  <ul class="post-list-box" @click="handleClick">
    <PostItem v-for="item of list" :key="item.id" :data="item" />
  </ul>
</template>

<script>
import PostItem from "@/components/PostItem";

export default {
  props: {
    list: Array,
  },
  components: {
    PostItem,
  },
  data() {
    return {};
  },
  methods: {
    handleClick({ target }) {
      const { event, id } = target.dataset;
      if (!event || !id) return;
      switch (event) {
        case "user":
          this.$router.push({
            name: "UserInfo",
            params: {
              loginname: id,
            },
          });
          break;
        case "post":
          this.$router.push({
            name: "PostInfo",
            params: {
              id,
            },
          });
          break;
        case "tab":
          this.$emit("click-tab", id);
          break;
      }
    },
  },
};
</script>

<style scoped>
</style>
