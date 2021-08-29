<template>
  <div class="title-bar">
    <div class="left">
      <div>
        <img src="@/assets/img/checkLeft1.png" alt="icon"/>
      </div>
      <div>
        {{ text }}
      </div>
    </div>
    <div class="right">
      <el-button class="right-button" v-show="editable" :disabled="step>5" @click="jumpNext">跳过</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TitleBar',
  props: ['text', 'editable', 'step', 'jump'],
  methods: {
    jumpNext() {
      // this.$emit('jump')
      this.jump();
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/TitleBar";
</style>