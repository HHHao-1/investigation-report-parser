<template>
  <div class="table-one">
    <el-table
        :stripe="true"
        :data="tableData"
        style="width: 100%;"
        height="calc(100vh - 441px)"
        class="table"
    >
      <template #empty>
        <img class="no-data" src="@/assets/img/noData.png" alt="NoData">
        <div>暂无数据</div>
      </template>
      <el-table-column
          show-overflow-tooltip
          prop="time"
          label="时间"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="operationDetail"
          label="操作明细"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="operationType"
          label="操作类型"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="beginCoinType"
          label="起始币种"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="beginAmount"
          label="起始数量"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="endCoinType"
          label="结束币种"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="endAmount"
          label="结束数量"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="balance"
          label="币种余额"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="address"
          label="来源地址/目标地址"
          width="200px"
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
  name: 'TableOne'
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
      this.baseData = res.userData[0].flowList;
      this.dataTotal = this.baseData.length;
      this.setTableData();
    });
  },
  watch: {
    userIndex(index) {
      localforage.getItem('data').then(res => {
        this.baseData = res.userData[index].flowList;
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
        s.time = moment.unix(s.time).utc().format('YYYY-MM-DD HH:mm:ss')
      });
      this.tableData = tableData;
    },
  },
}
</script>
<style lang="scss" scoped>
.table-one {
  @import "src/assets/css/ElTableStyle";


  &::v-deep td:first-child .cell {
    margin-left: 10px;
  }

  &::v-deep th:first-child .cell {
    margin-left: 10px;
  }

  &::v-deep td:last-child .cell {
    padding-right: 30px;
  }

  &::v-deep td:last-child .cell {
    padding-right: 30px;
  }
}
</style>