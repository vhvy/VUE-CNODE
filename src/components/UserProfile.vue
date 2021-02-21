<template>
  <ul class="user-profile">
    <li class="user-profile-item">
      <span class="label">创建时间</span>
      <span class="value">{{ create_at }}</span>
    </li>
    <li class="user-profile-item">
      <span class="label">Github</span>
      <a class="value" :href="`https://github.com/${info.githubUsername}`"
        >https://github.com/{{ info.githubUsername }}</a
      >
    </li>
    <li class="user-profile-item">
      <span class="label">微博</span>
      <span class="value"></span>
    </li>
    <li class="user-profile-item">
      <span class="label">个性签名</span>
      <span class="value"></span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    create_at: String,
    info: Object,
  },
};
</script>

<style scoped lang="scss">
.user-profile {
  padding: 0 10px;
  background: #fff;
  .user-profile-item {
    padding: 14px 0;
    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }

    .label {
      display: inline-block;
      width: 70px;
      color: #999;
    }

    .value {
      color: rgba($color: #000000, $alpha: 0.8);
    }
  }
}
</style>
