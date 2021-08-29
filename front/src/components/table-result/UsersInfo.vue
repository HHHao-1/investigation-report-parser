<template>
  <div class="users-info">
    <table class="user-body-1">
      <tr>
        <td><span>姓名： </span>{{ tableData.userName }}</td>
        <td><span>手机号： </span>{{ tableData.phoneNumber }}</td>
        <td><span>邮箱： </span>{{ tableData.email }}</td>
        <td><span>身份证号： </span>{{ tableData.idNumber }}</td>
      </tr>
    </table>
    <table class="user-body-2">
      <tr>
        <td><span>国家： </span>{{ tableData.country }}</td>
        <td><span>支付宝： </span>{{ tableData.alipay }}</td>
        <td><span>微信： </span>{{ tableData.wechat }}</td>
        <td><span>银行卡号： </span>{{ tableData.bankCardNumber }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import localforage from "localforage";

export default {
  name: 'UsersInfo'
  ,
  props: ['userIndex']
  ,
  data() {
    return {
      tableData: [],
    }
  },
  mounted() {
    localforage.getItem('data').then(res => {
      this.tableData = res.userData[0].userInfo;
    });
  },
  watch: {
    userIndex(index) {
      localforage.getItem('data').then(res => {
        this.tableData = res.userData[index].userInfo;
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.users-info {
  td {
    width: 270px;
  }

  span {
    font-size: 14px;
    font-weight: 400;
    color: #323333;
    line-height: 20px;
  }

  .user-body-1 {
    margin: 0 0 16px 40px;
  }

  .user-body-2 {
    margin: 0 0 0 40px;
  }
}
</style>