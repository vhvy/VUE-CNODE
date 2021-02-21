<template>
  <div class="user-wrap">
    <div class="banner">
      <div class="banner-bg"></div>
      <img
        :src="userInfo.avatar_url"
        alt="头像"
        class="user-avatar"
        @click="goUserProfile"
      />
      <p class="user-name">{{ userInfo.loginname }}</p>
    </div>
    <mu-list class="list">
      <mu-list-item
        button
        v-for="{ label, icon, name } of config"
        :key="name"
        :to="{ name }"
        class="item"
      >
        <mu-icon :value="icon" class="icon-before"></mu-icon>
        <mu-list-item-title>{{ label }}</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-list-item button class="item" @click="confirmLogout">
        <mu-icon value="eject" class="icon-before"></mu-icon>
        <mu-list-item-title>退出登录</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      config: [
        {
          label: "收藏的主题",
          icon: "star",
          name: "MyCollect",
        },
        {
          label: "新建主题",
          icon: "create",
          name: "NewPost",
        },
      ],
    };
  },
  methods: {
    async confirmLogout() {
      const { result } = await this.$confirm("确定要退出登录吗?");
      result && this.handleLogout();
    },
    handleLogout() {
      this.$store.commit("user/LOGOUT");
    },
    goUserProfile() {
      this.$router.push({
        name: "UserInfo",
        params: {
          loginname: this.userInfo.loginname,
        },
      });
    },
  },
  computed: {
    ...mapState("user", {
      userInfo: (s) => s.userInfo,
    }),
  },
};
</script>

<style scoped lang="scss">
.user-wrap {
  height: 100%;
  .banner {
    height: 20vh;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    .banner-bg {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: url(//static2.cnodejs.org/public/images/cnodejs_light.svg)
        no-repeat center / 50% #444;
      filter: blur(3px);
    }

    .user-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      z-index: 1;
    }

    .user-name {
      color: #fff;
      margin-top: 10px;
      font-weight: 600;
      z-index: 1;
    }
  }

  .icon-before {
    margin-right: 16px;
  }

  .list {
    padding: 0px;
    margin: 8px 0;
    background-color: #fff;
  }

  .item {
    position: relative;
    &:not(:last-child)::after {
      content: "";
      border-top: 1px solid #eee;
      position: absolute;
      bottom: 0;
      right: 0;
      left: 56px;
    }
  }
}
</style>
