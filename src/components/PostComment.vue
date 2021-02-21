<template>
  <ul class="post-comment-wrap" @click="handleClick">
    <li
      class="post-comment"
      v-for="{ author, content, date, id, is_uped, ups } of list"
      :key="id"
    >
      <div class="left-wrap">
        <div class="user-info">
          <img :src="author.avatar_url" alt="avatar" class="user-avatar" />
          <div class="user-profile">
            <span class="user-name">{{ author.loginname }}</span>
            <span class="comment-date">{{ date }}</span>
          </div>
        </div>
        <div class="comment-wrap">
          <div class="comment-body" v-html="content"></div>
        </div>
      </div>
      <div class="right-wrap">
        <div class="like-wrap">
          <mu-icon
            :data-id="id"
            data-type="like"
            :value="is_uped ? 'favorite' : 'favorite_border'"
            class="like-btn"
            size="16"
            :class="is_uped ? 'active' : ''"
          ></mu-icon>
          <span class="like-count" v-if="ups.length > 0">{{ ups.length }}</span>
        </div>
        <mu-icon
          :data-id="id"
          data-type="action"
          value="more_vert"
          class="action-btn"
          size="16"
        ></mu-icon>
      </div>
    </li>
  </ul>
</template>

<script>
import { getPastTime } from "@/utils/time";

export default {
  props: {
    replies: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClick({ target }) {
      const { type, id } = target.dataset || {};
      switch (type) {
        case "like":
          this.$emit("like", id);
          break;
        case "action":
          this.$emit("action", id);
          break;
      }
    },
  },
  computed: {
    list() {
      return this.replies.map((z) => ({
        ...z,
        date: getPastTime(z.create_at),
      }));
    },
  },
};
</script>

<style scoped lang="scss">
.post-comment-wrap {
  .post-comment {
    display: flex;
    margin-bottom: 20px;

    .left-wrap {
      flex: 1;
    }

    .right-wrap {
      width: 16px;
      display: flex;
      flex-flow: column;
      justify-content: space-between;

      .like-wrap {
        display: flex;
        flex-flow: column;
        align-items: center;
        .like-count {
          line-height: 1.2;
          font-size: 12px;
        }
        .like-btn {
          &.active {
            color: red;
          }
        }
      }

      .action-btn {
        margin-bottom: 5px;
      }
    }

    $avatar-size: 35px;
    .user-info {
      display: flex;

      .user-avatar {
        width: $avatar-size;
        height: $avatar-size;
        margin-right: 10px;
        border-radius: 50%;
      }

      .user-profile {
        position: relative;
        flex: 1;
        display: flex;
        flex-flow: column nowrap;
        font-size: 14px;
        justify-content: space-between;

        .user-name {
          font-weight: bold;
        }

        .comment-date {
          font-size: 12px;
          color: rgba($color: #000000, $alpha: 0.6);
        }
      }
    }

    .comment-wrap {
      margin-left: $avatar-size + 10px - 5px;
      border-bottom: 1px solid #ccc;
      .comment-body {
        /deep/.markdown-text {
          margin-top: 8px;
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
