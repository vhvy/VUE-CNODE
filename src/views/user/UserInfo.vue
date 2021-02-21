<template>
  <div class="user-info-wrap">
    <div class="user-banner">
      <mu-button @click="handleBack" large icon color="#fff" class="back-btn">
        <mu-icon value="chevron_left"></mu-icon>
      </mu-button>
      <img :src="info.avatar_url" alt="avatar" class="user-avatar" />
      <p class="user-name">{{ info.loginname }}</p>
    </div>
    <Tabs :tabs="tabs" :tab="tab" @click-tab="handleToggleTab" class="tabs" />
    <UserProfile :create_at="create_at" :info="info" />
  </div>
</template>

<script>
import { getUserDetails } from "@/api/user";
import Tabs from "@/components/Tabs";
import UserProfile from "@/components/UserProfile";
import { formatTime } from "@/utils/time";

const tabs = {
  info: "资料",
  post: "主题",
  reply: "回复",
};

export default {
  data() {
    return {
      loginname: null,
      info: {},
      tabs,
      tab: "info",
    };
  },
  components: {
    Tabs,
    UserProfile,
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      const loginname = this.$route.params?.loginname;
      if (!loginname) {
        this.$router.back();
      } else {
        this.loginname = loginname;
        this.getUserInfo();
      }
    },
    handleBack() {
      this.$router.back();
    },
    async getUserInfo() {
      const loading = this.$loading();
      try {
        const { body } = await getUserDetails(this.loginname);
        if (body.success) {
          this.info = body.data;
        }
      } catch (error) {
        console.log(error);
      }
      loading?.close();
    },
    handleToggleTab(tab) {
      this.tab = tab;
      this.$toast.message(
        "因为用户回复和用户主题暂无API，所以此处就搁置了；未来如果有相应API，可以用`is`来做"
      );
    },
  },
  computed: {
    create_at() {
      if (!this.info?.loginname) {
        return "";
      } else {
        return formatTime(new Date(this.info.create_at));
      }
    },
  },
  watch: {
    $route(next, last) {
      if (
        next.name === "UserInfo" &&
        next?.params?.loginname !== last?.params?.loginname
      ) {
        this.loadData();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.user-info-wrap {
  position: relative;
  .back-btn {
    position: absolute;
    top: 0px;
    left: 0px;
  }

  $banner-height: 20vh;
  .user-banner {
    background: #444;
    height: $banner-height;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    .user-avatar {
      width: 7vh;
      height: 7vh;
      border-radius: 50%;
      margin: -10px 0 5px;
    }

    .user-name {
      color: #fff;
      font-size: 14px;
    }
  }

  .tabs {
    justify-content: space-around;
    position: relative;
  }
}
</style>
