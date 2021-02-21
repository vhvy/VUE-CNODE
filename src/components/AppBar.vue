<template>
  <div class="appbar-wrap">
    <mu-button icon @click="handleLeftClick">
      <mu-icon value="chevron_left"></mu-icon>
    </mu-button>
    <span class="title">{{ title }}</span>
    <mu-button :ripple="rightIcon !== ''" icon @click="handleRightClick">
      <mu-icon :value="rightIcon"></mu-icon>
    </mu-button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    rightIcon: {
      default: "",
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleLeftClick() {
      this.$router.back();
    },
    handleRightClick() {
      this.$emit("click-right");
    },
  },
};
</script>

<style scoped lang="scss">
.appbar-wrap {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 3px 0px rgba($color: #000000, $alpha: 0.3);

  .title {
    display: flex;
    align-items: center;
  }
}
</style>
