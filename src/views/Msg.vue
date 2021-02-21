<template>
  <div class="msg-wrap">
    <header class="msg-header">
      <h3>我的消息</h3>
      <mu-button icon small color="primary" @click="handleSetAllRead">
        <mu-icon value="done_all"></mu-icon>
      </mu-button>
    </header>
    <mu-load-more
      :refreshing="refreshing"
      :loading="loading"
      loading-text="Loading..."
      :loaded-all="loaded"
      @refresh="refreshData"
      @load="loadData"
      class="msg-list-wrap"
    >
      <ul class="post-list-box" @click="handleReplyListClick">
        <MsgReplyItem v-for="data of list" :data="data" :key="data.id" />
      </ul>
    </mu-load-more>
  </div>
</template>

<script>
import { getMsg, setMsgAllRead } from "@/api/msg";
import { getPastTime } from "@/utils/time";
import MsgReplyItem from "@/components/MsgReplyItem";

export default {
  data() {
    return {
      readMsg: [],
      notReadMsg: [],
      refreshing: false,
      loading: false,
      loaded: false,
      data: [],
    };
  },
  components: {
    MsgReplyItem,
  },
  created() {
    this.getCount();
    this.loadData();
  },
  methods: {
    handleReplyListClick() {},
    async handleSetAllRead() {
      try {
        const { result: isConfirm } = await this.$confirm(
          "确定要将所有消息设置为已读吗?",
          "提示"
        );
        if (!isConfirm) return;
        const result = await setMsgAllRead();
        if (result?.body?.success) {
          this.$toast.success({
            message: "设置成功！",
            position: "top",
          });
          this.refreshData();
        }
      } catch (error) {
        console.log(error);
      }
    },
    getCount() {
      this.$store.dispatch("msg/getCount");
    },
    async loadData() {
      if (this.loading) return;
      this.loading = true;
      try {
        const result = await getMsg();
        if (result?.body?.success) {
          this.readMsg = result.body.data.has_read_messages;
          this.notReadMsg = result.body.data.hasnot_read_messages;
        }
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
      this.loaded = true;
    },
    async refreshData() {
      this.refreshing = true;
      this.loadData().then(() => {
        this.refreshing = false;
      });
    },
  },
  computed: {
    list() {
      let list = [...this.readMsg, ...this.notReadMsg];

      list.sort((a, b) => {
        const aTime = new Date(a.create_at).getTime();
        const bTime = new Date(b.create_at).getTime();

        a.past_time = getPastTime(a.create_at);
        b.past_time = getPastTime(b.create_at);
        a.reply.content = a.reply.content.replace(/<[^>]+>/g, "");
        b.reply.content = b.reply.content.replace(/<[^>]+>/g, "");

        return aTime > bTime ? 1 : -1;
      });

      return list;
    },
  },
};
</script>

<style scoped lang="scss">
.msg-wrap {
  background: #fff;
  height: 100%;

  .msg-header {
    height: 50px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
