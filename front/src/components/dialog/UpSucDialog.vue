<template>
  <div class="up-dialog">
    <!--    <el-button type="text" @click="visible = true">点击打开 Dialog</el-button>-->
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
            <td><img class="head-img" src="@/assets/img/successTip.png" alt="success"></td>
            <td class="head-words">自动匹配成功</td>
          </tr>
        </table>
      </div>
      <div class="words">已为您自动进行数据匹配，您可直接查看匹配结果也可检查匹配数据是否准确。</div>
      <template #footer>
    <span class="dialog-footer">
      <el-button class="cancel" @click="checkData">检查数据</el-button>
      <el-button class="confirm" type="primary" @click="viewResult">查看结果</el-button>
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
    checkData() {
      this.visible = false;
      sessionStorage.setItem('editable', 'false')
      axios.get('/investigation/parse/result/check?uuid=' + sessionStorage.getItem('uuid'))
          .then(res => {
            if (res.data.code === '0000') {
              sessionStorage.setItem('checkData', res.data.data)
              this.$router.push({path: '/check'})
            } else {
              this.$message.error('请求数据失败，请检查重试')
            }
          })

    },
    viewResult() {
      this.visible = false;
      sessionStorage.setItem('editable', 'false')
      this.$router.push({path: '/result'})
    }
  },
  // setup() {
  //   const visible = ref(false);
  //   const router = useRouter();
  //   const button = {
  //     checkData(){
  //       debugger
  //       visible.value = false;
  //       sessionStorage.setItem('editable', 'false')
  //       axios.get('/investigation/parse/result/check?uuid=' + sessionStorage.getItem('uuid'))
  //           .then(res => {
  //             if (res.data.code === '0000') {
  //               sessionStorage.setItem('checkData', res.data.data)
  //               router.push({path: '/check'})
  //             } else {
  //               this.$message.error('请求数据失败，请检查重试')
  //             }
  //           })
  //
  //     },
  //     viewResult(){
  //       visible.value = false;
  //       sessionStorage.setItem('editable', 'false')
  //       router.push({path: '/result'})
  //     }
  //   }
  //   return {visible, button};
  // }
}
</script>
<style lang="scss" scoped>
@import "src/assets/css/UpDialog";
</style>