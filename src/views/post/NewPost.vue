<template>
  <div class="create-post-wrap">
    <AppBar title="创建新主题" />
    <div class="form-box">
      <mu-form :model="form" label-width="100">
        <mu-form-item prop="title" label="标题">
          <mu-text-field v-model="form.title"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="content" label="正文">
          <mu-text-field
            multi-line
            :rows="12"
            v-model="form.content"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="tab" label="节点">
          <mu-select v-model="form.tab" full-width>
            <mu-option
              v-for="(v, k) in tabs"
              :key="k"
              :label="v"
              :value="k"
            ></mu-option>
          </mu-select>
        </mu-form-item>

        <mu-button full-width color="success" @click="confirmSubmit"
          >发表</mu-button
        >
      </mu-form>
    </div>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import { createNewPost } from "@/api/post";
import { mapState } from "vuex";
import { tabs } from "@/constants/tab";
// import { getUserCollect } from "@/api/post";

export default {
  components: {
    AppBar,
  },
  data() {
    return {
      form: {
        title: "",
        content: "",
        tab: "ask",
      },
      tabs,
    };
  },
  methods: {
    async confirmSubmit() {
      if (this.form.title.trim() == "") {
        return this.$alert("文章标题不能为空！");
      }
      if (this.form.content.trim() == "") {
        return this.$alert("文章内容不能为空！");
      }
      const { result } = await this.$confirm("确定要发表当前主题吗?");
      result && this.sendPost();
    },
    async sendPost() {
      const data = {
        ...this.form,
      };
      data.title = data.title.trim();
      data.content = data.content.trim();

      try {
        const result = await createNewPost(data);
        console.log(result);
        const { success, topic_id, error_msg = "发表失败" } = result.body;
        if (success) {
          this.$toast.success("发表成功!");
          setTimeout(() => {
            this.$router.replace({
              name: "PostInfo",
              params: {
                id: topic_id,
              },
            });
          }, 800);
        } else {
          this.$toast.error(error_msg);
        }
      } catch (error) {
        console.log(error);
        this.$toast.error(error.message);
      }
    },
  },
  computed: {
    ...mapState("user", {
      username: (s) => s.userInfo.loginname,
    }),
  },
};
</script>

<style scoped lang="scss">
.create-post-wrap {
  height: 100%;
  .form-box {
    padding: 10px;
    background: #fff;
    height: calc(100% - 48px);
  }
}
</style>
