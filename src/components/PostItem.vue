<template>
  <li :is="tag" class="post-item" :class="{ border: showBorder }">
    <div class="post-details">
      <img
        class="user-avatar"
        data-event="user"
        :data-id="data.author.loginname"
        :src="data.author.avatar_url"
        alt="avatar"
      />
      <div class="user-info">
        <span
          class="user-name"
          data-event="user"
          :data-id="data.author.loginname"
          >{{ data.author.loginname }}</span
        >
        <div class="post-info">
          <span class="create-time">{{ pastTime }}</span>
          <span class="reply-count">评论{{ data.reply_count }}</span>
          <span class="visit-count" v-if="showVisit">浏览{{ data.visit_count }}</span>
        </div>
      </div>
      <div
        v-if="!!tabName"
        class="post-tab"
        :data-event="data.top ? false : 'tab'"
        :data-id="data.tab"
      >
        {{ tabName }}
      </div>
    </div>
    <p class="post-title" data-event="post" :data-id="data.id" v-if="showTitle">
      {{ data.title }}
    </p>
  </li>
</template>

<script>
import tabAlias from "@/constants/tab";
import { getPastTime } from "@/utils/time";

export default {
  props: {
    tag: {
      default: "li",
      type: String,
    },
    data: Object,
    showTitle: {
      default: true,
      type: Boolean,
    },
    showBorder: {
      default: true,
      type: Boolean,
    },
    showVisit: {
      defalut: false,
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    tabName() {
      return this.data.top ? "置顶" : tabAlias[this.data.tab];
    },
    pastTime() {
      return getPastTime(this.data.create_at);
    },
  },
};
</script>

<style scoped lang="scss">
.post-item {
  padding: 8px 10px;
  font-size: 14px;

  &.border {
    border-bottom: 1px solid #f3f3f3;
  }

  .post-details {
    display: flex;
    justify-content: space-between;

    .user-avatar {
      $size: 40px;
      width: $size;
      height: $size;
      border-radius: 50%;
    }

    .user-info {
      flex: 1;
      margin: 0 8px;

      .user-name {
        font-weight: bold;
      }

      .post-info {
        color: rgba($color: #000000, $alpha: 0.6);
        font-size: 12px;

        .create-time {
          margin-right: 5px;
        }

        .reply-count {
          margin-right: 5px;
        }
      }
    }

    .post-tab {
      background-color: #e2e0e0;
      height: 20px;
      padding: 3px 5px;
      border-radius: 5px;
      font-size: 12px;
      color: rgba($color: #000000, $alpha: 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .post-title {
    margin-top: 2vw;
  }
}
</style>
