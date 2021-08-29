<template>
  <div :class="[moveUp?'move-up':'upload']">
    <div class="center">
      <img class="logo-img" src="@/assets/img/logo2.png" alt="chaindigg">
      <span class="logo-words">—— 调证文件解析工具</span>
      <img class="icon" src="@/assets/img/tip1.png" alt="tip">
      <!--      <span class="i-words" v-show="tip1IsShow">请选择文件所属交易所并上传文件</span>-->
      <span class="i-words">{{ tip1IsShow ? '请选择文件所属交易所并上传文件' : '请选择文件所属交易所' }}</span>
      <div :class="['box',b1?'b-1-click':'b-1']" @click="b1Click">
        <div class="b1-logo"></div>
        <div class="exchange-words">币安交易所</div>
      </div>
      <div :class="['box',b2?'b-2-click':'b-2']" @click="b2Click">
        <div class="b2-logo"></div>
        <div class="exchange-words">火币交易所</div>
      </div>
      <div :class="['box',b3?'b-3-click':'b-3']" @click="b3Click">
        <div class="b3-logo"></div>
        <div class="exchange-words">OKEX交易所</div>
      </div>
      <div class="file" v-show="upIsShow">
        <el-upload
            action="/investigation/parse/upload"
            ref="upload"
            class="upload-demo"
            drag=true
            multiple=false
            :show-file-list="false"
            :on-change="handleChange"
            :on-exceed="limitChange"
            accept=".xls,.xlsx"
            limit=1
            :before-upload="beforeUpload"
            :data="uploadParams"
            :name="uploadFileName"
            :on-success="onSuccess"
            :on-error="onError"
        >
          <img class="icon-up" src="@/assets/img/icon-up.png" alt="upload">
          <div class="el-upload__text">将文件直接拖拽至此或点击下方按钮添加上传</div>
          <el-button class="button-up" size="small" type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip" v-show="tip2IsShow">
              <img class="icon2" src="@/assets/img/tip2.png" alt="tip">
              <span class="i-words2">文件格式错误，请重新选择</span>
            </div>
          </template>
        </el-upload>
      </div>
      <up-suc-dialog ref="suc"/>
      <up-err-dialog ref="err"/>
    </div>
  </div>
</template>
<script>
import UpSucDialog from "@/components/dialog/UpSucDialog"
import UpErrDialog from "@/components/dialog/UpErrDialog"
import localforage from "localforage";

export default {
  name: 'Upload',
  components: {
    UpSucDialog,
    UpErrDialog,
  },
  data() {
    return {
      b1: false,
      b2: false,
      b3: false,
      upIsShow: false,
      tip1IsShow: true,
      tip1IsText: '',
      moveUp: false,
      tip2IsShow: false,
      uploadParams: {exchangeId: undefined},
      uploadFileName: 'file',
      loadingInstance: undefined,
    }
  },
  watch: {
    upIsShow: {
      handler(val) {
        this.tip1IsShow = !val;
        this.moveUp = val;
        this.tip2IsShow = false;
      }
    },
  },
  mounted() {
    sessionStorage.removeItem('checkData')
    sessionStorage.removeItem('names')
    sessionStorage.removeItem('uuid')
    sessionStorage.removeItem('editable')
    localforage.removeItem('data')
    localforage.removeItem('uuid')
  },
  methods: {
    handleChange(file) {
      this.tip2IsShow = !(file.name.includes('.xlsx') || file.name.includes('.xls'));
    },
    limitChange(file) {
      if (file.length > 1) {
        this.tip2IsShow = true
      }
    },
    beforeUpload(file) {
      if (!(file.name.includes('.xlsx') || file.name.includes('.xls'))) {
        return false;
      } else {
        this.loadingInstance = this.$loading({
          fullscreen: true,
          lock: true,
          text: '文件解析中 . . .',
        });
      }
    },
    onSuccess(res) {
      this.$nextTick(() => {
        this.loadingInstance.close();
      });
      this.$refs.upload.clearFiles();
      if (res.code === '0000') {
        const userNames = [];
        res.data.userData.forEach(s => {
          userNames.push(s.userInfo.userName);
        })
        sessionStorage.setItem('names', userNames);
        sessionStorage.setItem('uuid', res.data.uuid)
        localforage.setItem('data', res.data);
        this.$refs.suc.visible = true;
      } else {
        if (res.data === null) {
          this.$message.error('系统错误，请重新上传')
          return
        }
        sessionStorage.setItem('uuid', res.data)
        this.$refs.err.visible = true;
      }
    },
    onError() {
      this.$message.error('上传失败')
      this.$nextTick(() => {
        this.loadingInstance.close();
      });
      this.$refs.upload.clearFiles();
    },
    b1Click() {
      this.b1 = !this.b1;
      this.upIsShow = this.b1;
      if (this.b1) {
        this.b2 = false;
        this.b3 = false;
        this.tip1IsShow = false;
      }
      this.uploadParams.exchangeId = 0;
    },
    b2Click() {
      this.b2 = !this.b2;
      this.upIsShow = this.b2;
      if (this.b2) {
        this.b1 = false;
        this.b3 = false;
      }
      this.uploadParams.exchangeId = 1;
    },
    b3Click() {
      this.b3 = !this.b3;
      this.upIsShow = this.b3;
      if (this.b3) {
        this.b1 = false;
        this.b2 = false;
      }
      this.uploadParams.exchangeId = 2;
    },
  },
  setup() {
    const changeStyle = () => {
      const domHtml = document.querySelector('html');
      const domBody = document.querySelector('body');
      const domApp = document.querySelector('#app');
      domHtml.style.height = '100%';
      domBody.style.height = '100%';
      domApp.style.height = '100%';
    }
    changeStyle();
  }
}
</script>
<style lang="scss" scoped>
@import "src/assets/css/Upload";

.upload {
  .b-1 {
    margin-left: -330px;

    .b1-logo {
      @include exchange-logo(url('../assets/img/bian.png'));
    }
  }

  .b-2 {
    .b2-logo {
      @include exchange-logo(url('../assets/img/huobi.png'));
    }
  }

  .b-3 {
    margin-left: 330px;

    .exchange-words {
      width: 105px !important;
    }

    .b3-logo {
      @include exchange-logo(url('../assets/img/okex.png'));
    }
  }

  .b-1-click {
    margin-left: -330px;
    background-image: url("../assets/img/background.png");
    border: 0;

    .b1-logo {
      @include exchange-logo(url('../assets/img/bian-white.png'));
    }

    .exchange-words {
      color: #E3EFFF;
    }
  }

  .b-2-click {
    background-image: url("../assets/img/background.png");
    border: 0;

    .b2-logo {
      @include exchange-logo(url('../assets/img/huobi-white.png'));
    }

    .exchange-words {
      color: #E3EFFF;
    }
  }

  .b-3-click {
    background-image: url("../assets/img/background.png");
    border: 0;
    margin-left: 330px;

    .exchange-words {
      width: 105px !important;
      color: #E3EFFF;
    }

    .b3-logo {
      @include exchange-logo(url('../assets/img/okex-white.png'));
    }
  }
}
</style>