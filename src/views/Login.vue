<template>
  <div class="login-wrap">
    <div class="logo-box">
      <img
        src="//static2.cnodejs.org/public/images/cnodejs_light.svg"
        alt="logo"
        class="logo"
      />
    </div>
    <mu-form ref="form" :model="form" class="login-form">
      <mu-form-item label="TOKEN" :rules="rules.token" prop="token">
        <mu-text-field v-model="form.token" prop="username"></mu-text-field>
      </mu-form-item>
      <mu-button
        :disabled="!checkToken(form.token)"
        color="primary"
        full-width
        large
        @click="handleSubmit"
        >提交</mu-button
      >
      <mu-button
        style="margin-top: 20px"
        color="error"
        full-width
        large
        @click="clearToken"
        >清空本地TOKEN</mu-button
      >
    </mu-form>
    <QrcodeScanner @scan-success="setToken" />
  </div>
</template>

<script>
import QrcodeScanner from "@/components/QrcodeScanner";

export default {
  components: {
    QrcodeScanner,
  },
  data() {
    return {
      form: {
        token: process.env.CNODE_KEY || "",
      },
      rules: {
        token: [
          {
            validate: (val) => !!val,
            message: "必须输入Token！",
          },
          {
            validate: this.checkToken,
            message: "请输入合法的Token(UUID)！",
          },
        ],
      },
    };
  },
  methods: {
    setToken(token) {
      this.form.token = token;
    },
    clearToken() {
      this.$store.commit("user/CLEANTOKEN");
      this.form.token = "";
      this.$toast.success({
        message: "清空成功!",
        position: "top",
      });
    },
    checkToken(val) {
      return /^[a-z0-9]{8}(-[a-z0-9]{4}){3}-[a-z0-9]{12}$/g.test(val);
    },
    async handleSubmit() {
      const { status, msg } = await this.$store.dispatch("user/login", {
        token: this.form.token,
      });

      if (status) {
        this.$toast.success({
          message: "登录成功!",
          position: "top",
        });
        setTimeout(() => {
          this.$router.replace({
            path: this.$route.query.redirect || "/",
          });
        }, 200);
      } else {
        this.$toast.error({
          message: msg,
          position: "top",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login-wrap {
  height: 100%;
  overflow: hidden;
  background: #fff;

  .logo-box {
    background-color: #444;
    height: 20vh;
    padding-top: 5vh;

    .logo {
      width: 50vw;
      margin: 0 auto;
      display: block;
    }
  }

  .login-form {
    width: auto;
    box-sizing: border-box;
    margin: 10vw 10px 10px;
    border-radius: 10px;
    padding: 10px;
    background: #fff;
  }
}
</style>
