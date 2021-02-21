<template>
  <div>
    <mu-load-more
      :refreshing="refreshing"
      :loading="loading"
      loading-text="Loading..."
      :loaded-all="loaded"
      @refresh="refreshData"
      @load="loadMoreData"
      class="post-list-wrap"
      ref="list_el"
    >
      <PostList :list="list" />
    </mu-load-more>
  </div>
</template>

<script>
import { getIndexPost } from "@/api/index";
import PostList from "@/components/PostList";

export default {
  components: {
    PostList,
  },
  props: {
    loading: Boolean,
    tab: {
      type: String,
      default: "all",
    },
  },
  data() {
    return {
      page: 1,
      limit: 20,
      list: [],
      refreshing: false,
      loaded: false,
      scrollTime: 300,
    };
  },
  created() {
    this.loadMoreData();
  },
  methods: {
    goTop() {
      const el = this.$refs.list_el.$el;
      if (!el) return;

      const step = (el.scrollTop / this.scrollTime) * (1000 / 60);
      function scroll() {
        const nextStep = el.scrollTop - step;
        if (nextStep > 0) {
          el.scrollTo(0, nextStep);
          window.requestAnimationFrame(scroll);
        } else {
          el.scrollTo(0, 0);
        }
      }

      window.requestAnimationFrame(scroll);
    },
    async loadMoreData(clean = false) {
      if (this.loading) return;
      this.$emit("start-load");
      try {
        const { body } = await getIndexPost({
          page: this.page,
          limit: this.limit,
          tab: this.tab,
        });
        if (!body.success) return;
        this.page++;
        if (body.data.length < this.limit) {
          this.loaded = true;
        }
        if (clean) {
          this.list = [...body.data];
        } else {
          this.list = [...this.list, ...body.data];
        }
      } catch (error) {
        console.log(error);
      }

      this.$emit("end-load");
    },
    refreshData() {
      if (this.refreshing) return;
      this.refreshing = true;
      this.page = 1;
      this.loadMoreData(true).then(() => {
        this.refreshing = false;
        this.goTop();
      });
    },
  },
  watch: {
    tab() {
      this.refreshData();
    },
  },
};
</script>

<style scoped>
.post-list-wrap {
  height: 100%;
  overflow: auto;
}
</style>
