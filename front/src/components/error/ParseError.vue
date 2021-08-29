<template>
  <div class="error">
    <div class="center">
      <img class="error-img" src="@/assets/img/error.png" alt="top-banner">
      <p class="font-sorry">Sorry... 本次解析失败！</p>
      <p class="font-tip">请 <u class="reUpload" @click="reUpload">重新上传文件</u> 或与我们联系，联系电话400-6988-698</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParseError',
  methods: {
    reUpload() {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/assets/css/ParseError";
</style>
