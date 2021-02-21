<template>
  <div>
    <mu-bottom-sheet :open="open" @close="closeBottomSheet">
      <mu-list @item-click="handleItemClick">
        <mu-list-item
          button
          v-for="{ icon, color, type, text } of config"
          :key="type"
          :data-type="type"
        >
          <mu-list-item-action>
            <mu-icon :value="icon" :color="color"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ text }}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>

<script>
export default {
  props: {
    config: Array,
    open: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeBottomSheet() {
      this.$emit("close");
    },
    handleItemClick(e) {
      this.$emit("item-click", e);
    },
  },
};
</script>

<style scoped>
</style>
