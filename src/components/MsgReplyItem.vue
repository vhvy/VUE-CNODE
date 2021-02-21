<template>
  <li class="reply-item">
    <img :src="data.author.avatar_url" alt="avatar" class="avatar" />
    <div class="reply-info-wrap">
      <div class="reply-info">
        <router-link
          class="reply-link"
          :to="{ name: 'UserInfo', params: { loginname: data.author.loginname } }"
          >{{ data.author.loginname }}</router-link
        >
        在
        <router-link
          class="reply-link"
          :to="{
            name: 'PostInfo',
            params: {
              id: data.topic.id,
              reply_id: data.id,
            },
          }"
          >{{ data.topic.title }}</router-link
        >
        中回复了你
      </div>
      <p class="reply-body">
        {{ data.reply.content }}
      </p>
      <div class="reply-status">
        <span class="read-status" :class="{ 'not-read': !data.has_read }"
          >{{ data.has_read ? "已" : "未" }}读</span
        >
        <span class="time">{{ data.past_time }}</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  data() {
    return {
      msg: "",
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.reply-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .reply-info-wrap {
    .reply-link {
      border-bottom: 1px solid;
    }
    .reply-body {
      background: #fafafa;
      padding: 3px 5px;
      border-radius: 3px;
      min-height: calc(1em + 8px);
      margin: 5px 0 10px;
    }

    .reply-status {
      font-size: 12px;

      .time {
        &::before {
          content: " · ";
        }
      }

      .read-status {
        background: #3f84ed;
        color: #fff;
        padding: 2px 4px;
        border-radius: 3px;
        margin-left: 0.5em;

        &.not-read {
          border: 1px solid #ff4081;
          background: #fff;
          color: #ff4081;
        }
      }
    }
  }
}
</style>
