<template>
  <div>
    <div class="btn-box">
      <mu-button color="success" full-width large @click="handleScan"
        >扫描</mu-button
      >
    </div>
    <mu-bottom-sheet :open.sync="open">
      <mu-list @item-click="pickerCamera">
        <mu-sub-header>选择一个摄像头</mu-sub-header>
        <mu-list-item
          button
          v-for="{ id, label } of cameras"
          :key="id"
          :data-id="id"
        >
          <mu-list-item-title>{{ label }}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
    <transition name="fade">
      <div class="qrcode-container" v-show="show">
        <div :id="domId" class="qrcode-box"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    qrbox: {
      type: Number,
      default: 250,
    },
    fps: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      show: false,
      instance: null,
      cameras: [],
      camerasId: null,
      open: false,
      domId: "qr-code-full-region",
    };
  },
  methods: {
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
    },
    handleScan() {
      this.getUserCameras();
    },
    handleCloseScan() {
      this.$emit("close");
    },
    pickerCamera(v) {
      this.camerasId = v.$attrs["data-id"];
      this.open = false;
      this.show = true;
      this.startScan();
    },
    startScan() {
      const instance = new window.Html5Qrcode(this.domId);
      instance
        .start(
          this.camerasId,
          {
            fps: 10,
            qrbox: 250,
          },
          (qrCodeMessage) => {
            instance.stop();
            this.show = false;
            this.$emit("scan-success", qrCodeMessage);
            this.$toast.success({
              message: "扫描成功!",
              position: "top",
            });
          }
        )
        .catch((err) => {
          instance.stop();
          this.show = false;
          console.log(`Unable to start scanning, error: ${err}`);
        });
    },
    async getUserCameras() {
      const handleError = () => {
        this.$toast.error({
          message: "找不到摄像头!",
          position: "top",
        });
      };

      try {
        const devices = await window.Html5Qrcode.getCameras();
        if (devices && devices?.length > 0) {
          this.cameras = devices;
          this.open = true;
        } else {
          handleError();
        }
      } catch (error) {
        console.log(error);
        handleError();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.btn-box {
  padding: 0 20px 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.qrcode-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background: rgba($color: #000000, $alpha: 0.6);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -50%;
}

.qrcode-box {
}
</style>
