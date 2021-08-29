<template>
  <div class="progress-bar">
    <div class="line1">
      <div class="step">
        <div class="step-in">
          <img src="@/assets/img/finish.png" alt="finish">
          <div class="step-word w-0">上传文件</div>
        </div>
        <div class="line success-line"></div>
      </div>
      <div class="step">
        <div class="step-in">
          <img src="@/assets/img/finish.png" alt="finish" v-if="step>2&&!fail[1]">
          <img src="@/assets/img/fail.png" alt="fail" v-else-if="step>=2&&fail[1]">
          <div :class="['icon',step===2?'editing':'']" v-else>
            <div style="position: relative;top:-3px">2</div>
          </div>
          <div :class="['step-word','w-1',step>1 && fail[1]?'w-error':'']">登录信息数据匹配</div>
        </div>
        <div :class="['line', step>2?'success-line':'',fail[1]&&fail[2]?'error-line':'']"></div>
      </div>
      <div class="step">
        <div class="step-in">
          <img src="@/assets/img/finish.png" alt="finish" v-if="step>3&&!fail[2]">
          <img src="@/assets/img/fail.png" alt="fail" v-else-if="step>=3&&fail[2]">
          <div :class="['icon',step===3?'editing':'']" v-else>
            <div style="position: relative;top:-3px">3</div>
          </div>
          <div :class="['step-word','w-1',step>2 && fail[2]?'w-error':'']">充币提币数据匹配</div>
        </div>
        <div :class="['line', step>3?'success-line':'',fail[2]&&fail[3]?'error-line':'']"></div>
      </div>
      <div class="step">
        <div class="step-in">
          <img src="@/assets/img/finish.png" alt="finish" v-if="step>4&&!fail[3]">
          <img src="@/assets/img/fail.png" alt="fail" v-else-if="step>=4&&fail[3]">
          <div :class="['icon',step===4?'editing':'']" v-else>
            <div style="position: relative;top:-3px">4</div>
          </div>
          <div :class="['step-word','w-1',step>3 && fail[3]?'w-error':'']">法币买入卖出数据匹配</div>
        </div>
        <div :class="['line', step>4?'success-line':'',fail[3]&&fail[4]?'error-line':'']"></div>
      </div>
      <div class="step-last">
        <div class="step-in">
          <img src="@/assets/img/finish.png" alt="finish" v-if="step>5&&!fail[4]">
          <img src="@/assets/img/fail.png" alt="fail" v-else-if="step>=5&&fail[4]">
          <div :class="['icon',step===5?'editing':'']" v-else>
            <div style="position: relative;top:-3px">5</div>
          </div>
          <div :class="['step-word','w-1',step>4&&fail[4]?'w-error':'',fail[4]&&fail[5]?'error-line':'']">币币兑换数据匹配</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ProgressBar',
  components: {},
  props: ['step', 'editable', 'fail'],
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
@import "src/assets/css/ProgressBar";
</style>