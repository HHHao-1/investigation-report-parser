<template>
  <div class="login-info">
    <el-table
        :stripe="true"
        :data="tableData"
        style="width: 100%"
        height="calc(100vh - 643px)"
    >
      <template #empty>
        <img class="no-data" src="@/assets/img/noData.png" alt="NoData">
        <div>暂无数据</div>
      </template>
      <el-table-column
          prop="loginRecord"
          label="登录记录"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="ip"
          label="IP"
      >
      </el-table-column>
    </el-table>
    <el-pagination
        class="pager"
        small
        layout="prev, pager, next"
        :page-size="pageSize"
        :pager-count="pagerCount"
        :total="dataTotal"
        @current-change="currentChange"
        hide-on-single-page
    >
    </el-pagination>
  </div>
</template>
<script>
import localforage from "localforage";
import * as moment from "moment";

export default {
  name: 'LoginInfo'
  ,
  props: ['userIndex']
  ,
  data() {
    return {
      tableData: [],
      pagerCount: 9,
      pageSize: 100,
      currentPage: 1,
      dataTotal: 0,
      baseData: [],
    }
  },
  mounted() {
    localforage.getItem('data').then(res => {
      this.baseData = res.userData[0].loginRecordList;
      this.dataTotal = this.baseData.length;
      this.setTableData();
    });
  },
  watch: {
    userIndex(index) {
      localforage.getItem('data').then(res => {
        this.baseData = res.userData[index].loginRecordList;
        this.dataTotal = this.baseData.length;
        this.setTableData();
      })
    }
  },
  methods: {
    currentChange(page) {
      this.currentPage = page;
      this.setTableData();
    },
    setTableData() {
      const tableData = JSON.parse(JSON.stringify(this.baseData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)));
      tableData.forEach(s => {
        s.loginRecord = moment.unix(s.loginRecord).utc().format('YYYY-MM-DD HH:mm:ss');
      });
      this.tableData = tableData;
    },
  },
}
</script>
<style lang="scss" scoped>
.login-info {
  @import "src/assets/css/ElTableStyle";

  &::v-deep td:first-child .cell {
    margin-left: 10px;
  }

  &::v-deep th:first-child .cell {
    margin-left: 10px;
  }

  &::v-deep th:last-child .cell {
    margin-left: 50px;
  }

  &::v-deep td:last-child .cell {
    margin-left: 50px;
    padding-right: 30px;
  }
}
</style>