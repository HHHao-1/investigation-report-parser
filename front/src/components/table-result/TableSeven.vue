<template>
  <div class="table-seven">
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
          prop="type"
          label="类型"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="coinType"
          label="币种"
      >
      </el-table-column>
      <el-table-column
          show-overflow-tooltip
          prop="address"
          label="地址"
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

export default {
  name: 'TableSeven'
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
      this.baseData = res.userData[0].addressList;
      this.dataTotal = this.baseData.length;
      this.tableData = this.baseData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    });
  },
  watch: {
    userIndex(index) {
      localforage.getItem('data').then(res => {
        this.baseData = res.userData[index].addressList;
        this.dataTotal = this.baseData.length;
        this.tableData = this.baseData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      })
    }
  },
  methods: {
    currentChange(page) {
      this.currentPage = page;
      this.tableData = this.baseData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    },
  },
}
</script>
<style lang="scss" scoped>
.table-seven {
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

  &::v-deep th:last-child .cell {
    margin-left: 50px;
  }

  &::v-deep td:last-child .cell {
    margin-left: 50px;
    padding-right: 30px;
  }
}
</style>