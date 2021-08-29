<template>
  <div class="base-info">
    <div class="line-1">
      <div class="title">登录信息</div>
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
              prop="time"
              label="登录时间"
              :formatter="format"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="1" @tableDate="getDate"
                        ref="close11"/>
            </template>
          </el-table-column>
          <el-table-column
              show-overflow-tooltip
              prop="ip"
              label="IP"
          >
            <template #header="scope" v-if="editable">
              <dropdown :scope="scope" :text="scope.column.label" :table="1" @tableDate="getDate"
                        ref="close12"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import Dropdown from "@/components/table-operate/Dropdown"
import moment from "moment";

export default {
  name: 'BaseInfo',
  components: {
    Dropdown,
  },
  data() {
    return {
      editable: JSON.parse(sessionStorage.getItem('editable')),
      thClass: {},
      must: {one: [0, 1,]},
      tableData1: [],
      canNext: false,
      sheetDto: {
        pageName: this.text + '-登录信息',
        map: []
      },
    }
  },
  // props: ['text'],
  props: {
    text: String,
  },
  watch: {
    tableData1: {
      handler: function () {
        if (this.tableData1.length === 0) {
          this.canNext = false
          return
        }
        this.canNext = (this.tableData1[0].time || 'e') !== 'e' && (this.tableData1[0].ip || 'e') !== 'e';
      },
      deep: true,
    },
  },
  mounted() {
    this.thClass = {
      one: ({columnIndex}) => {
        if (this.must.one.indexOf(columnIndex) !== -1) return 't1 must';
        return 't1';
      }
    }
    if (!this.editable && (sessionStorage.getItem('checkData') || 'e') !== 'e') {
      this.tableData1 = JSON.parse(sessionStorage.getItem('checkData')).loginList
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
      // if (table === 1) {
      //   if (data.length !== 0) {
      //     let a
      //     const b = JSON.parse(JSON.stringify(data[0]))
      //     for (const prop in b) {
      //       a = prop
      //     }
      //     if (this.tableData1[0] !== undefined) {
      //       if (this.tableData1[0][a] !== undefined) {
      //         for (let i = 0; i < this.sheetDto.map.length; i++) {
      //           if (this.sheetDto.map[i].name === a) {
      //             this.sheetDto.map.splice(i, 1)
      //           }
      //         }
      //       }
      //     }
      //     for (let x = 0; x < this.tableData1.length; x++) {
      //       if (this.tableData1[x] !== undefined) {
      //         delete this.tableData1[x][a]
      //       }
      //     }
      //   } else {
      //     this.tableData1.forEach(s => {
      //       delete s[column.property]
      //     })
      //     for (let i = this.tableData1.length - 1; i > -1; i--) {
      //       if (JSON.stringify(this.tableData1[i]) === '{}') {
      //         this.tableData1.splice(i, 1)
      //       }
      //     }
      //   }
      //   for (let i = 0; i < data.length; i++) {
      //     if (JSON.stringify(this.tableData1[i]) === '{}') {
      //       this.tableData1.splice(i, 1)
      //     }
      //     this.tableData1[i] = {
      //       ...this.tableData1[i],
      //       ...data[i]
      //     }
      //   }
      //   this.sheetDto.map.push(mapDto)
      // }
      if (table === 1) {
        for (let i = this.tableData1.length - 1; i > -1; i--) {
          if (this.tableData1[i][column.property] !== undefined) {
            delete this.tableData1[i][column.property]
          }
          if (JSON.stringify(this.tableData1[i]) === '{}') {
            this.tableData1.splice(i, 1)
          }
        }
        for (let i = this.sheetDto.map.length - 1; i > -1; i--) {
          if (this.sheetDto.map[i].name === column.label) {
            this.sheetDto.map.splice(i, 1)
          }
        }
        for (let i = 0; i < data.length; i++) {
          this.tableData1[i] = {
            ...this.tableData1[i],
            ...data[i]
          }
        }
        this.sheetDto.map.push(mapDto)
      }
    },
    close(seconds) {
      this.$refs.close11.hidden(seconds)
      this.$refs.close12.hidden(seconds)
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