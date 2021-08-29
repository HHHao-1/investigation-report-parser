<template>
  <div class="check" @click="dropdownClose">
    <top-bar/>
    <step-bar :step="step" :fail="fail" :editable="editable" :disabled="step>5"
              @jump="jump"/>
    <title-bar :text="titleText[step-1]" :editable="editable" :step="step" :jump="jump"/>
    <div class="info">
      <step-two v-show="step===2" ref="closeDropdown2" text="基本信息数据匹配"/>
      <step-three v-show="step===3" ref="closeDropdown3" text="充币提币数据匹配"/>
      <step-four v-show="step===4" ref="closeDropdown4" text="法币买入卖出数据匹配"/>
      <step-five v-show="step===5" ref="closeDropdown5" text="币币兑换数据匹配"/>
    </div>
    <div class="bottom">
      <el-button class="bottom-button button-pre" :disabled="step<3" @click="pre">上一步</el-button>
      <el-button class="bottom-button button-next" :disabled="step>5" @click="next">下一步</el-button>
    </div>
  </div>
</template>
<script>
import common from "@/assets/js/common";
import TopBar from "@/components/bar/TopBar";
import StepBar from "@/components/bar/StepBar"
import StepTwo from "@/components/table-check/StepTwo"
import StepThree from "@/components/table-check/StepThree"
import StepFour from "@/components/table-check/StepFour"
import StepFive from "@/components/table-check/StepFive"
import TitleBar from '@/components/bar/TitleBar';
import axios from "axios";
import localforage from "localforage";
import qs from "qs";

export default {
  name: 'Check',
  components: {
    TopBar,
    StepBar,
    StepThree,
    StepFour,
    StepFive,
    TitleBar,
    StepTwo,
  },
  data() {
    return {
      dropdownData: '',
      step: 2,
      screenSize: 0,
      editable: JSON.parse(sessionStorage.getItem('editable')),
      fail: [false, false, false, false, false],
      showMSG: false,
      jumpMSG: false,
      titleText: ['', '基本信息数据匹配', '充币提币数据匹配', '法币买入卖出数据匹配', '币币兑换数据匹配'],
      isNext: false,
      loadingInstance: undefined,
    }
  },
  methods: {
    dropdownClose() {
      if (!this.editable) {
        return
      }
      switch (this.step) {
        case 2:
          this.$refs.closeDropdown2.close(260);
          break
        case 3:
          this.$refs.closeDropdown3.close(260);
          break
        case 4:
          this.$refs.closeDropdown4.close(260);
          break
        case 5:
          this.$refs.closeDropdown5.close(260);
          break
      }
    },
    pre() {
      this.fail[this.step - 2] = false
      return this.step < 2 ? this.step : this.step--;
    },
    nextFun(step, jump) {
      switch (step) {
        case 2:
          // if (this.$refs.closeDropdown2.canNext) {
          if (jump) {
            this.$refs.closeDropdown2.tableData1 = []
            this.$refs.closeDropdown2.sheetDto.map = []
          }
          this.fail[this.step - 1] = false
          this.step > 5 ? this.step : this.step++
          break
          // return this.step > 5 ? this.step : this.step++
          // } else if (!this.$refs.closeDropdown2.canNext && jump) {
          //   this.$refs.closeDropdown2.tableData1 = []
          //   this.$refs.closeDropdown2.sheetDto.map = []
          //   this.fail[this.step - 1] = true
          //   return this.step > 5 ? this.step : this.step++;
          // } else {
          //   this.fail[this.step - 1] = true
          //   this.$message.error('请确认是否有未选择的数据')
          // }
          // break
        case 3:
          // if (this.$refs.closeDropdown3.canNext) {
          if (jump) {
            this.$refs.closeDropdown3.tableData1 = []
            this.$refs.closeDropdown3.tableData2 = []
            this.$refs.closeDropdown3.sheetDto1.map = []
            this.$refs.closeDropdown3.sheetDto2.map = []
          }
          this.fail[this.step - 1] = false
          this.step > 5 ? this.step : this.step++
          break
          // return this.step > 5 ? this.step : this.step++
          // } else if (!this.$refs.closeDropdown3.canNext && jump) {
          //   this.$refs.closeDropdown3.tableData1 = []
          //   this.$refs.closeDropdown3.tableData2 = []
          //   this.$refs.closeDropdown3.sheetDto1.map = []
          //   this.$refs.closeDropdown3.sheetDto2.map = []
          //   this.fail[this.step - 1] = true
          //   return this.step > 5 ? this.step : this.step++;
          // } else {
          //   this.fail[this.step - 1] = true
          //   this.$message.error('请确认是否有未选择的数据')
          // }
          // break
        case 4:
          // if (this.$refs.closeDropdown4.canNext) {
          if (jump) {
            this.$refs.closeDropdown4.tableData1 = []
            this.$refs.closeDropdown4.tableData2 = []
            this.$refs.closeDropdown4.sheetDto1.map = []
            this.$refs.closeDropdown4.sheetDto2.map = []
          }
          this.fail[this.step - 1] = false
          this.step > 5 ? this.step : this.step++
          break
          //   return this.step > 5 ? this.step : this.step++
          // } else if (!this.$refs.closeDropdown4.canNext && jump) {
          //   this.$refs.closeDropdown4.tableData1 = []
          //   this.$refs.closeDropdown4.tableData2 = []
          //   this.$refs.closeDropdown4.sheetDto1.map = []
          //   this.$refs.closeDropdown4.sheetDto2.map = []
          //   this.fail[this.step - 1] = true
          //   return this.step > 5 ? this.step : this.step++;
          // } else {
          //   this.fail[this.step - 1] = true
          //   this.$message.error('请确认是否有未选择的数据')
          // }
          // break
        case 5:
          // if (this.$refs.closeDropdown5.canNext) {
          if (jump) {
            this.$refs.closeDropdown5.tableData1 = []
            this.$refs.closeDropdown5.tableData2 = []
            this.$refs.closeDropdown5.sheetDto1.map = []
            this.$refs.closeDropdown5.sheetDto2.map = []
          }
          this.fail[this.step - 1] = false
          this.step > 5 ? this.step : this.step++
          break
          //   return this.step > 5 ? this.step : this.step++
          // } else if (!this.$refs.closeDropdown5.canNext && jump) {
          //   this.$refs.closeDropdown5.tableData1 = []
          //   this.$refs.closeDropdown5.tableData2 = []
          //   this.$refs.closeDropdown5.sheetDto1.map = []
          //   this.$refs.closeDropdown5.sheetDto2.map = []
          //   this.fail[this.step - 1] = true
          //   return this.step > 5 ? this.step : this.step++;
          // } else {
          //   this.fail[this.step - 1] = true
          //   this.$message.error('请确认是否有未选择的数据')
          // }
          // break
      }
    },
    next() {
      if (this.editable) {
        this.nextFun(this.step, false)
      } else {
        return this.step > 5 ? this.step : this.step++;
      }
    },
    jump() {
      this.nextFun(this.step, true)
    }
  },
  watch: {
    step(newVal) {
      common.layout('auto');
      if (newVal === 5) {
        document.querySelector('.button-next').innerHTML = '提交'
        document.querySelector('.right-button').innerHTML = '跳过并提交'
      } else {
        document.querySelector('.button-next').innerHTML = '下一步'
        document.querySelector('.right-button').innerHTML = '跳过'
      }
      if (newVal > 5) {
        debugger
        const param = []
        param.push(this.$refs.closeDropdown2.sheetDto)
        param.push(this.$refs.closeDropdown3.sheetDto1)
        param.push(this.$refs.closeDropdown3.sheetDto2)
        param.push(this.$refs.closeDropdown4.sheetDto1)
        param.push(this.$refs.closeDropdown4.sheetDto2)
        param.push(this.$refs.closeDropdown5.sheetDto1)
        param.push(this.$refs.closeDropdown5.sheetDto2)
        if (!this.editable) {
          this.$router.push('/result')
          return
        }
        axios.post('/investigation/match/result',
            qs.stringify({
              uuid: sessionStorage.getItem('uuid'),
              matchResult: JSON.stringify(param),
            }), {
              headers: {"content-type": "application/x-www-form-urlencoded"}
            }).then(res => {
          debugger
          if (res.data.code === '0000') {
            if (res.data.data.userData.length === 0) {
              this.$router.push('/error')
            }
            const userNames = [];
            res.data.data.userData.forEach(s => {
              userNames.push(s.userInfo.userName);
            })
            sessionStorage.setItem('names', userNames);
            sessionStorage.setItem('uuid', res.data.uuid)
            localforage.setItem('data', res.data);
            this.$router.push('/result')
          } else {
            // this.step = 5
            // this.$message.error('系统错误，请重新上传')
            this.$router.push('/error')
          }
        })
      }
    },
  },
  mounted() {
    common.layout('auto');
    //监控到屏幕尺寸变化返回一个自执行函数
    window.onresize = () => (() => common.layout('auto'))();
  },
}
</script>
<style lang="scss">
.check {
  width: 100%;

  .bottom {
    //position: relative;
    padding-top: 40px;
    padding-bottom: 70px;
    margin-left: calc(92% - 310px);

    .bottom-button {
      width: 150px;
      height: 40px;
      box-shadow: 0 0 10px 0 rgba(0, 75, 169, 0.3);
      border-radius: 4px;
      border: 1px solid #166BD6;
    }

    .button-pre {
      background-color: rgba(255, 255, 255, 0);
      font-size: 14px;
      font-weight: 400;
      color: #166BD6;
    }

    .button-next {
      background: #166BD6;
      font-size: 14px;
      font-weight: 400;
      color: #FFFFFF;
    }
  }

  .dropdown {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>