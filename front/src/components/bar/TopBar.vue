<template>
  <div class="top-bar">
    <div class="banner">
      <img class="banner-img" src="@/assets/img/topBanner.png" alt="top-banner">
    </div>
    <div class="logo">
      <img class="logo-img" src="@/assets/img/logo1.png" alt="chaindigg" @click="toHome"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  methods: {
    toHome() {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped lang="scss">
@import "src/assets/css/TopBar";
</style>
