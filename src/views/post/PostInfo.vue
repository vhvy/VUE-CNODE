<template>
  <div class="post-wrap">
    <AppBar
      :rightIcon="info.is_collect ? 'star' : 'star_border'"
      title="主题详情"
      @click-right="handleBarAction"
    />
    <PostItem
      v-if="loaded"
      :show-border="false"
      :show-title="false"
      tag="div"
      :data="info"
      :showVisit="true"
    />
    <div class="post-body" v-if="loaded">
      <h4 class="title">{{ info.title }}</h4>
      <div class="post-content" v-html="info.content"></div>
      <PostComment
        :replies="info.replies"
        @like="handleLike"
        @action="handleAction"
      />
    </div>
    <ActionSheet
      :open="openAction"
      :config="isLogin ? actionList : noAuthAction"
      @close="handleCloseAction"
      @item-click="handleActionItemClick"
    />
    <ReplyPopup
      @send-reply="handleSendReply"
      @close="handleCloseReply"
      v-model="replyContent"
      :open="openReply"
    />
    <mu-button
      v-if="isLogin"
      icon
      color="primary"
      class="fixed-reply-btn"
      @click="handleFixedReplyClick"
    >
      <mu-icon value="reply"></mu-icon>
    </mu-button>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import PostItem from "@/components/PostItem";
import PostComment from "@/components/PostComment";
import ActionSheet from "@/components/ActionSheet";
import {
  getPostDetails,
  sendReply,
  collectPost,
  deCollectPost,
} from "@/api/post";
import { mapState } from "vuex";
import { toggleReplyLike } from "@/api/post";
import ReplyPopup from "@/components/ReplyPopup";
import config from "@/config";

const { baseTitle } = config;

export default {
  props: {
    id: String,
    title: String,
  },
  components: {
    AppBar,
    PostItem,
    PostComment,
    ActionSheet,
    ReplyPopup,
  },
  data() {
    return {
      info: {},
      loaded: false,
      openAction: false,
      openReply: false,
      currentCommentId: null,
      replyContent: "",
      actionList: [
        {
          icon: "reply",
          color: "orange",
          type: "reply",
          text: "回复",
          auth: true,
        },
        {
          icon: "content_copy",
          color: "blue",
          type: "copy",
          text: "复制",
          auth: false,
        },
      ],
    };
  },
  created() {
    this.getPostInfo();
  },
  methods: {
    handleFixedReplyClick() {
      this.currentCommentId = null;
      this.handleOpenReply();
    },
    async handleSendReply() {
      const content = this.replyContent.trim();
      if (content === "") {
        return this.$alert("回复内容不能为空!");
      }
      const res = await this.$confirm("确定要发送此回复吗?");
      if (!res) return;

      let data = {
        content,
      };

      if (this.currentCommentId != null) {
        data.reply_id = this.currentCommentId;
      }
      const load = this.$loading();
      try {
        const res = await sendReply(this.id, data);
        if (res?.body?.success) {
          this.$toast.message("回复成功!");
          this.replyContent = "";
          this.handleCloseReply();
          this.getPostInfo(true);
        } else {
          this.$toast.error("回复失败!");
        }
      } catch (error) {
        this.$toast.error("回复失败!");
        console.log(error);
      }
      load.close();
    },
    handleCloseReply() {
      this.openReply = false;
    },
    handleCloseAction() {
      this.openAction = false;
    },
    handleActionItemClick(v) {
      this.handleCloseAction();
      const type = v.$el.dataset.type;
      switch (type) {
        case "reply":
          this.handleClickReplyBtn();
          break;
        case "copy":
          this.handleCopy(this.currentCommentId);
          break;
      }
    },
    handleClickReplyBtn() {
      const reply = this.info.replies.find(
        (i) => i.id === this.currentCommentId
      );
      const username = "@" + reply.author.loginname + "\n";
      this.replyContent = username + this.replyContent;
      this.handleOpenReply();
    },
    handleOpenReply() {
      this.openReply = true;
    },
    handleCopy(id) {
      const val = this.info.replies.find((i) => i.id === id).content;
      let text = "";
      let dom = document.createElement("div");
      dom.innerHTML = val;
      text = dom.innerText;

      dom = document.createElement("textarea");
      dom.value = text;
      document.body.append(dom);
      dom.select();
      document.execCommand("copy");
      document.body.removeChild(dom);
      this.$toast.success("复制成功！");
    },
    async handleAction(id) {
      this.currentCommentId = id;
      this.openAction = true;
    },
    async checkLogin() {
      if (!this.isLogin) {
        return this.$confirm("你还没有登录，确定要登录吗?", "提示").then(
          ({ result }) => {
            if (result) {
              this.$router.push({
                name: "Login",
                query: {
                  redirect: this.$route.fullPath,
                },
              });
            }
            return false;
          }
        );
      }
      return true;
    },
    async handleLike(id) {
      const checkLogin = await this.checkLogin();
      if (!checkLogin) return;
      const reply = this.info.replies.find((i) => i.id === id);
      if (reply.author.loginname === this.loginname) {
        return this.$toast.info("自己不能给自己点赞!");
      }
      if (reply.is_uped) {
        reply.ups = reply.ups.filter((i) => i !== this.userId);
      } else {
        reply.ups.push(this.userId);
      }
      reply.is_uped = !reply.is_uped;

      function rollback() {
        reply.is_uped = !reply.is_uped;
        if (reply.is_uped) {
          reply.ups.push(this.userId);
        } else {
          reply.ups = reply.ups.filter((i) => i !== this.userId);
        }
      }

      try {
        const res = await toggleReplyLike(id);
        if (!res.body.success) {
          rollback();
        }
      } catch (error) {
        rollback();
        console.log(error);
      }
    },
    async handleBarAction() {
      const checkLogin = await this.checkLogin();
      if (!checkLogin) return;
      const isCollect = this.info.is_collect;
      const fn = isCollect ? deCollectPost : collectPost;
      this.info.is_collect = !isCollect;

      const rollback = () => {
        this.info.is_collect = !isCollect;
      };

      try {
        const { body } = await fn(this.id);
        if (!body?.success) {
          rollback();
        }
      } catch (error) {
        console.log(error);
        rollback();
      }
    },
    async getPostInfo(updateReplies = false) {
      this.loaded = false;
      const loading = this.$loading();
      try {
        const { body } = await getPostDetails(this.id, this.isLogin);
        if (body.success) {
          if (!updateReplies) {
            this.info = body.data;
            document.title = this.info.title + " - " + baseTitle;
          } else {
            this.info.replies = body.data.replies;
          }
        }
      } catch (error) {
        console.log(error);
      }
      loading?.close();
      this.loaded = true;
    },
  },
  computed: {
    ...mapState("user", {
      isLogin: (s) => s.isLogin,
      userId: (s) => s.userInfo.id,
      loginname: (s) => s.userInfo.loginname,
    }),
    noAuthAction() {
      return this.actionList.filter((i) => !i.auth);
    },
  },
  watch: {
    id() {
      this.getPostInfo();
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/md.scss";
</style>

<style scoped lang="scss">
.post-wrap {
  background: #fff;
  min-height: 100%;

  .fixed-reply-btn {
    position: fixed;
    right: 20px;
    bottom: 20px;
    box-shadow: 1px 1px 3px 0px rgba($color: #000000, $alpha: 0.6);
    background: #fff;
  }

  .post-body {
    padding: 0 10px 10px;

    .title {
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 600;
    }

    .post-content {
      overflow: hidden;
      padding-bottom: 10px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
