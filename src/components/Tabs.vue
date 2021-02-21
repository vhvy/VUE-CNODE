<template>
  <ul class="tabs-wrap" :style="tabsStyle" @click="handleTabClick">
    <li
      ref="items"
      class="tab-item"
      v-for="(k, v) in tabs"
      :key="v"
      :data-id="v"
    >
      {{ k }}
    </li>
    <li class="active-bar" :style="activeBarStyle"></li>
  </ul>
</template>

<script>
export default {
  props: {
    tab: {
      type: String,
      default: "all",
    },
    between: {
      type: Boolean,
      default: false,
    },
    tabs: Object,
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeIndex: -1,
    };
  },
  methods: {
    handleTabClick({ target }) {
      const id = target.dataset.id;
      if (!id || this.loading) return;
      const items = this.$refs.items;
      const activeIndex = items.findIndex((el) => el === target);
      this.activeIndex = activeIndex;
      this.$emit("click-tab", id);
    },
  },
  mounted() {
    this.activeIndex = 0;
  },
  computed: {
    tabsStyle() {
      if (this.between) {
        return {
          "justify-content": "space-between",
        };
      }
      return {};
    },
    activeBarStyle() {
      if (this.activeIndex === -1) return {};
      // dom尚未渲染到页面时不计算属性

      const items = this.$refs.items;

      const el = items[this.activeIndex];
      // 获取当前选中tab dom

      const left = el.offsetLeft + "px";
      const width = el.offsetWidth + "px";
      return {
        left,
        width,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.tabs-wrap {
  position: absolute;
  left: 0;
  right: 0;
  background: #fff;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
  padding-left: 15px;
  box-shadow: 0px 0px 3px 0px rgba($color: #000000, $alpha: 0.2);
  z-index: 1;

  .tab-item {
    font-size: 14px;
    padding: 0 7px;
  }

  .active-bar {
    position: absolute;
    content: "";
    bottom: 5px;
    height: 2px;
    background: #77b327;
    transition: left ease 0.3s;
    transform-origin: right center;
  }
}
</style>
