<template>
  <div class="up-dialog">
    <el-dialog
        v-model="visible"
        center
        :fullscreen="true"
        :close-on-press-escape="false"
        :show-close="false"
    >
      <div class="head">
        <table>
          <tr>
            <td><img class="head-img" src="@/assets/img/errorTip.png" alt="success"></td>
            <td class="head-words">自动匹配失败</td>
          </tr>
        </table>
      </div>
      <div class="words">稍后将进行数据匹配步骤，请慎重选择数据，以免造成解析错误。</div>
      <template #footer>
    <span class="dialog-footer">
      <el-button class="cancel" @click="reload">重新上传</el-button>
      <el-button class="confirm" type="primary" @click="dataMatch">数据匹配</el-button>
    </span>
      </template>

    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: 'UpDialog',
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    reload() {
      this.visible = false;
      this.$router.push({path: '/'})
    },
    dataMatch() {
      this.visible = false;
      sessionStorage.setItem('editable', 'true')
      axios.get('/investigation/match/data?uuid=' + sessionStorage.getItem('uuid'))
          .then(res => {
            if (res.data.code === '0000') {
              sessionStorage.setItem('inputData', JSON.stringify(res.data.data.excelData))
              this.$router.push({path: '/check'});
            } else {
              this.$message.error('获取数据失败，请检查重试');
            }
          })
    }
  }
  // setup(props, context) {
  //   const visible = ref(false);
  //   const router = useRouter();
  //   const button = {
  //     reload() {
  //       visible.value = false;
  //       router.push({path: '/'})
  //     },
  //     dataMatch() {
  //       visible.value = false;
  //       sessionStorage.setItem('editable', 'true')
  //       axios.get('/investigation/match/data?uuid=' + sessionStorage.getItem('uuid'))
  //           .then(res => {
  //             if (res.data.code === '0000') {
  //               sessionStorage.setItem('inputData', JSON.stringify(res.data.data.excelData))
  //               router.push({path: '/check'});
  //             } else {
  //               this.$message.error('获取数据失败，请检查重试');
  //             }
  //           })
  //     }
  //   }
  //   return {visible, button};
  // }
}
</script>
<style lang="scss" scoped>
@import "src/assets/css/UpDialog";
</style>