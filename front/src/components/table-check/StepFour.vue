<template>
  <div class="base-info">
    <div class="line-1">
      <div class="title">买入方向</div>
      <div class="table-one">
        <el-table
            :stripe="true"
            :data="tableData1"
            style="width: 100%"
            :header-cell-class-name="thClass.one"
            :max-height="319"
        >
          <template #empty>
            <img class="no-data" src="@/assets/img/noData.png" alt="NoData">
            <div>{{ editable ? '无数据展示，请点击各项的下拉箭头进行选择' : '暂无数据' }}</div>
          </template>
          <el-table-column
              prop="buySell"
              label="买卖方向"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :is-first="true" :table="1" @tableDate="getDate"
                        ref="close11"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="coin"
              label="币种"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="1" @tableDate="getDate" ref="close12"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="amount"
              label="数量"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="1" @tableDate="getDate" ref="close13"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="legalTender"
              label="法币"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="1" @tableDate="getDate" ref="close14"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="volume"
              label="交易额"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="1" @tableDate="getDate" ref="close15"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="time"
              label="时间"
              :formatter="format"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="1" @tableDate="getDate" ref="close16"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="null"
              label="订单号"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="1" @tableDate="getDate" ref="close17"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="UID"
              label="UID"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="1" @tableDate="getDate" ref="close17"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="line-2">
      <div class="title">卖出方向</div>
      <div class="table-two">
        <el-table
            :stripe="true"
            :data="tableData2"
            style="width: 100%"
            :header-cell-class-name="thClass.two"
            :max-height="319"
        >
          <template #empty>
            <img class="no-data" src="@/assets/img/noData.png" alt="NoData">
            <div>{{ editable ? '无数据展示，请点击各项的下拉箭头进行选择' : '暂无数据' }}</div>
          </template>
          <el-table-column
              prop="buySell"
              label="买卖方向"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :is-first="true" :table="2" @tableDate="getDate"
                        ref="close21"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="coin"
              label="币种"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="2" @tableDate="getDate" ref="close22"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="amount"
              label="数量"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="2" @tableDate="getDate" ref="close23"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="legalTender"
              label="法币"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="2" @tableDate="getDate" ref="close24"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="volume"
              label="交易额"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="2" @tableDate="getDate" ref="close25"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="time"
              label="时间"
              :formatter="format"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="2" @tableDate="getDate" ref="close26"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="null"
              label="订单号"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="2" @tableDate="getDate" ref="close27"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="UID"
              label="UID"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="2" @tableDate="getDate" ref="close27"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import Dropdown from "@/components/table-operate/Dropdown"
import * as moment from "moment";

export default {
  name: 'BaseInfo',
  components: {
    Dropdown,
  },
  data() {
    return {
      editable: JSON.parse(sessionStorage.getItem('editable')),
      thClass: {},
      must: {one: [1, 2, 3, 4, 5], two: [1, 2, 3, 4, 5]},
      tableData1: [],
      tableData2: [],
      sheetDto1: {
        pageName: this.text + '-买入方向',
        map: []
      },
      sheetDto2: {
        pageName: this.text + '-卖出方向',
        map: []
      },
    }
  },
  props: ['text'],
  watch: {
    tableData1: {
      handler: function () {
        if (this.tableData1.length === 0 || this.tableData2.length === 0) {
          this.canNext = false
          return
        }
        this.canNext = (this.tableData1[0].coin || 'e') !== 'e'
            && (this.tableData1[0].amount || 'e') !== 'e'
            && (this.tableData1[0].legalTender || 'e') !== 'e'
            && (this.tableData1[0].volume || 'e') !== 'e'
            && (this.tableData1[0].time || 'e') !== 'e'
            && (this.tableData2[0].coin || 'e') !== 'e'
            && (this.tableData2[0].amount || 'e') !== 'e'
            && (this.tableData2[0].legalTender || 'e') !== 'e'
            && (this.tableData2[0].volume || 'e') !== 'e'
            && (this.tableData2[0].time || 'e') !== 'e';
      },
      deep: true,
    },
    tableData2: {
      handler: function () {
        if (this.tableData1.length === 0 || this.tableData2.length === 0) {
          this.canNext = false
          return
        }
        this.canNext = (this.tableData1[0].coin || 'e') !== 'e'
            && (this.tableData1[0].amount || 'e') !== 'e'
            && (this.tableData1[0].legalTender || 'e') !== 'e'
            && (this.tableData1[0].volume || 'e') !== 'e'
            && (this.tableData1[0].time || 'e') !== 'e'
            && (this.tableData2[0].coin || 'e') !== 'e'
            && (this.tableData2[0].amount || 'e') !== 'e'
            && (this.tableData2[0].legalTender || 'e') !== 'e'
            && (this.tableData2[0].volume || 'e') !== 'e'
            && (this.tableData2[0].time || 'e') !== 'e';
      },
      deep: true,
    },
  },
  mounted() {
    this.thClass = {
      one: ({columnIndex}) => {
        if (this.must.one.indexOf(columnIndex) !== -1) return 't1 must';
        return 't1';
      },
      two: ({columnIndex}) => {
        if (this.must.two.indexOf(columnIndex) !== -1) return 't2 must';
        return 't2';
      }
    }
    if (!this.editable && (sessionStorage.getItem('checkData') || 'e') !== 'e') {
      this.tableData1 = JSON.parse(sessionStorage.getItem('checkData')).legalTenderBuyList
      this.tableData2 = JSON.parse(sessionStorage.getItem('checkData')).legalTenderSellList
    }
  },
  methods: {
    format(row, column) {
      let data = row[column.property]
      if ((data || 'e') === 'e') {
        return ''
      }
      const res = moment.unix(data).utc().format('YYYY-MM-DD HH:mm:ss')
      if (res === 'Invalid date' || res.indexOf('1970') !== -1) {
        return data
      }
      return res
    },
    getDate(table, data, mapDto, column) {
      if (table === 1) {
        for (let i = this.tableData1.length - 1; i > -1; i--) {
          if (this.tableData1[i][column.property] !== undefined) {
            delete this.tableData1[i][column.property]
          }
          if (JSON.stringify(this.tableData1[i]) === '{}') {
            this.tableData1.splice(i, 1)
          }
        }
        for (let i = this.sheetDto1.map.length - 1; i > -1; i--) {
          if (this.sheetDto1.map[i].name === column.label) {
            this.sheetDto1.map.splice(i, 1)
          }
        }
        for (let i = 0; i < data.length; i++) {
          this.tableData1[i] = {
            ...this.tableData1[i],
            ...data[i]
          }
        }
        this.sheetDto1.map.push(mapDto)
      } else if (table === 2) {
        for (let i = this.tableData2.length - 1; i > -1; i--) {
          if (this.tableData2[i][column.property] !== undefined) {
            delete this.tableData2[i][column.property]
          }
          if (JSON.stringify(this.tableData2[i]) === '{}') {
            this.tableData2.splice(i, 1)
          }
        }
        for (let i = this.sheetDto2.map.length - 1; i > -1; i--) {
          if (this.sheetDto2.map[i].name === column.label) {
            this.sheetDto2.map.splice(i, 1)
          }
        }
        for (let i = 0; i < data.length; i++) {
          this.tableData2[i] = {
            ...this.tableData2[i],
            ...data[i]
          }
        }
        this.sheetDto2.map.push(mapDto)
      }
    },
    close(seconds) {
      this.$refs.close11.hidden(seconds)
      this.$refs.close12.hidden(seconds)
      this.$refs.close13.hidden(seconds)
      this.$refs.close14.hidden(seconds)
      this.$refs.close15.hidden(seconds)
      this.$refs.close16.hidden(seconds)
      this.$refs.close17.hidden(seconds)
      this.$refs.close21.hidden(seconds)
      this.$refs.close22.hidden(seconds)
      this.$refs.close23.hidden(seconds)
      this.$refs.close24.hidden(seconds)
      this.$refs.close25.hidden(seconds)
      this.$refs.close26.hidden(seconds)
      this.$refs.close27.hidden(seconds)
    },
  },
}
</script>
<style lang="scss" scoped>
@import "src/assets/css/NoData";

.base-info {
  @include table-base;

  .line-1 {
    @import "src/assets/css/ElTableStyle";
    background-color: #FFFFFF;
    padding: 0 40px 0 40px;
    position: relative;
    max-height: 391px;

    .table-one {
      padding-bottom: 26px;
    }
  }

  .line-2 {
    @import "src/assets/css/ElTableStyle";
    padding: 0 40px 0 40px;
    margin-top: 16px;
    background-color: #FFFFFF;
    position: relative;
    max-height: 391px;

    .table-two {
      padding-bottom: 26px;
    }
  }
}
</style>