<template>
  <transition name="fade">
    <div class="reply-fixed" v-if="open" @click.self="handleClose">
      <div class="form-wrap">
        <mu-text-field
          multi-line
          :rows="3"
          :rows-max="6"
          :value="value"
          @input="handleChange"
          class="content-field"
        ></mu-text-field>
        <a class="send-btn" @click="handleReply">回复</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    open: Boolean,
    value: String
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    handleChange(e) {
      const text = e || "";
      this.$emit("input", text);
    },
    async handleReply() {
      this.$emit("send-reply");
    },
  },
};
</script>

<style scoped lang="scss">
.reply-fixed {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  background: rgba($color: #000000, $alpha: 0.4);
  z-index: 2000;

  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
    z-index: -1;
  }

  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.3s ease;
  }

  .form-wrap {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    background: #fff;
    padding: 10px;
    display: flex;

    .content-field {
      flex: 1;
    }

    .send-btn {
      width: 50px;
      height: 30px;
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }
  }
}
</style>
