<template>
  <div class="table-three">
    <el-table
        :stripe="true"
        :data="tableData"
        style="width: 100%"
        height="calc(100vh - 441px)"
    >
      <template #empty>
        <img class="no-data" src="@/assets/img/noData.png" alt="NoData">
        <div>暂无数据</div>
      </template>
      <el-table-column
          prop="time"
          label="时间段"
          width="185">
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="tradingOn"
          label="交易对"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="buyAmount"
          label="买入数量"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="buyTotal"
          label="买入交易额"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="sellAmount"
          label="卖出数量"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="sellTotal"
          label="卖出交易额"
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
import moment from "moment";

export default {
  name: 'TableThree'
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
      this.baseData = res.userData[0].currencyTransactionRecordList;
      this.dataTotal = this.baseData.length;
      this.setTableData();
    });
  },
  watch: {
    userIndex(index) {
      localforage.getItem('data').then(res => {
        this.baseData = res.userData[index].currencyTransactionRecordList;
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
        s.time = moment.unix(s.fromTime).utc().format('YYYY-MM-DD HH:mm:ss') + ' 至\r\n' + moment.unix(s.toTime).utc().format('YYYY-MM-DD HH:mm:ss');
      });
      this.tableData = tableData;
    },
  },
}
</script>
<style lang="scss" scoped>
.table-three {
  @import "src/assets/css/ElTableStyle";

  &::v-deep td:first-child .cell {
    margin-left: 10px;
  }

  &::v-deep th:first-child .cell {
    margin-left: 10px;
  }

  &::v-deep td:nth-child(2) .cell {
    margin-left: 100px;
  }

  &::v-deep th:nth-child(2) .cell {
    margin-left: 100px;
  }

  &::v-deep td:nth-child(3) .cell {
    margin-left: 70px;
  }

  &::v-deep th:nth-child(3) .cell {
    margin-left: 70px;
  }

  &::v-deep td:nth-child(4) .cell {
    margin-left: 70px;
  }

  &::v-deep th:nth-child(4) .cell {
    margin-left: 70px;
  }

  &::v-deep td:nth-child(5) .cell {
    margin-left: 70px;
  }

  &::v-deep th:nth-child(5) .cell {
    margin-left: 70px;
  }


  &::v-deep td:last-child .cell {
    margin-left: 70px;
  }

  &::v-deep th:last-child .cell {
    margin-left: 70px;
  }

  &::v-deep td:last-child .cell {
    padding-right: 30px;
  }
}
</style>