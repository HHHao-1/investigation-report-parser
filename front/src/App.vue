<template>
  <router-view/>
</template>
<script>
// import localforage from "localforage";
//
// export default {
//   data() {
//     return {
//       a: 0,
//     }
//   },
//   mounted() {
//     window.addEventListener('beforeunload', () => {
//       this.clear();
//     });
//   },
//   methods: {
//     async clear() {
//       await localforage.clear();
//     }
//   }
// }
</script>
<style lang="scss">
html {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;

  .el-popover.el-popper {
    width: auto !important;
    min-width: auto;
    height: 204px;
    padding: 0;
    border: none;
  }

  //.drop-pop {
  //  margin: 85px 0 0 0 !important;
  //}
}

#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #F3F5FB;
  font-family: PingFangSC-Regular, PingFang SC, serif;

  table, td, th {
    border: none;
  }
}
</style>
