<template>
  <el-popover
      placement="bottom-start"
      trigger="click"
      :show-arrow="false"
      v-model:visible="visible"
  >
    <div class="dropdown" style="display: inline-flex">
      <el-scrollbar>
        <div v-for="(item,index) in inputData"
             :key="index" class="text item text2"
             :class="text1Click===index?'text1Click':''"
             @click.stop="clickRight1(index)"
        >
          {{ index }}
          <i class="el-icon-arrow-right el-icon--right"></i>
        </div>
      </el-scrollbar>
      <el-scrollbar>
        <!--        <div style="" v-show="card1">-->
        <div v-for="(item,index) in inputData2level"
             v-show="card1"
             :key="index" class="text item text2"
             :class="[text2Click===index?'text2Click':'',isFirst?'':'text2']"
             @click.stop="clickRight2(index,scope.column)"
        >
          {{ index }}
          <!--          <i class="el-icon-arrow-right el-icon&#45;&#45;right" v-show="isFirst"-->
          <!--             @click.stop="clickRight3(index,item,scope.column)"></i>-->
          <i class="el-icon-arrow-right el-icon--right" v-show="isFirst"></i>
        </div>
      </el-scrollbar>
      <el-scrollbar>
        <div style="" v-show="card2">
          <div v-for="(item,index) in showData "
               :key="index" class="text item"
               :class="[text3Click===index?'text3Click':'',canNotInput?'canNotInput':'text2',canNotInput?'':'.text3']"
               @click.stop="clickRight4(item,scope.column)">
            {{ item }}
          </div>
        </div>
      </el-scrollbar>
    </div>
    <template #reference>
      <div class="label must">
        {{ text }}
        <i class="el-icon--right el-icon-arrow-down"></i>
      </div>
    </template>
  </el-popover>
</template>
<script>

import common from "@/assets/js/common";

export default {
  name: 'Dropdown',
  props: ['text', 'scope', 'isFirst', 'table'],
  components: {},
  data() {
    return {
      card1: false,
      card2: false,
      visible: false,
      text1Click: undefined,
      text2Click: undefined,
      text3Click: undefined,
      tempProcessData: {},
      tempData: {},
      tableData1: [],
      tableData2: [],
      inputData: JSON.parse(sessionStorage.getItem('inputData')),
      inputData2level: {},
      showData: [],
      sheetDto: {},
      mapDto: {},
      level2Data: {},
      canNotInput: false
    }
  },
  updated() {
  },
  methods: {
    hidden(seconds) {
      this.canNotInput = false
      this.visible = false
      setTimeout(() => {
        this.card1 = false;
        this.card2 = false;
        this.text1Click = undefined;
        this.text2Click = undefined;
        this.text3Click = undefined;
      }, seconds)
    },
    clickRight1(index) {
      this.card2 = false
      this.canNotInput = false
      if (!this.card1) {
        this.card1 = !this.card1;
      }
      this.text1Click = index;
      this.inputData2level = this.inputData[index].columnInfoMap
    },
    clickRight2(index, column) {
      if (this.isFirst) {
        if (!this.card2) {
          this.card2 = !this.card2
        }
        this.text2Click = index;
        this.level2Data = this.inputData2level[index]
        this.showData = JSON.parse(JSON.stringify(this.inputData2level[index].showDataList))
        if (this.showData.length === 0) {
          this.showData[0] = '暂无数据'
          this.canNotInput = true
        }
        return
      }
      this.text2Click = index;
      this.showData = this.inputData2level[index].showDataList
      const array = []
      for (const element of this.showData) {
        this.tempProcessData[column.property] = element
        array.push(JSON.parse(JSON.stringify(this.tempProcessData)))
      }
      this.tempData = array;
      this.mapDto = {
        name: (() => {
          if (column.label.indexOf('地址') !== -1) {
            return column.label.slice(2)
          } else {
            return column.label
          }
        })(),
        sheetName: this.text1Click,
        columnIndex: this.inputData2level[index].columnPosition,
        columnName: this.inputData2level[index].columnName,
        data: null,
      }
      this.$emit('tableDate', this.table, this.tempData, this.mapDto, column);
      this.visible = !this.visible;
      this.hidden(100);
      common.layout('auto');
    },
    // clickRight3(index) {
    //   if (!this.card2) {
    //     this.card2 = !this.card2
    //   }
    //   this.text2Click = index;
    //   this.level2Data = this.inputData2level[index]
    //   this.showData = this.inputData2level[index].showDataList
    //   if (this.showData.length === 0) {
    //     this.showData[0] = '暂无数据'
    //     this.canNotInput = true
    //   }
    // },
    clickRight4(item, column) {
      if (this.canNotInput) {
        debugger
        this.visible = !this.visible;
        this.hidden(100);
        common.layout('auto');
        return
      }
      const array = []
      this.tempProcessData[column.property] = item
      array.push(JSON.parse(JSON.stringify(this.tempProcessData)))
      this.tempData = array;
      this.mapDto = {
        name: (() => {
          if (column.label.indexOf('地址') !== -1) {
            return column.label.slice(2)
          } else {
            return column.label
          }
        })(),
        sheetName: this.text1Click,
        columnIndex: this.level2Data.columnPosition,
        data: item,
      }
      this.$emit('tableDate', this.table, this.tempData, this.mapDto, column);
      this.visible = !this.visible;
      this.hidden(100);
      common.layout('auto');
    },
  },
}
</script>
<style lang="scss" scoped>
.dropdown {
  height: 200px;
  width: auto !important;

  .text {
    font-size: 12px;
    font-weight: 400;
    color: #323334;
    line-height: 17px;
    width: auto;
  }

  .text2 {
    &:hover {
      cursor: pointer;
      background: #F3F5FB;
    }
  }

  .canNotInput {
    &:hover {
      cursor: default;
      background: rgb(255, 255, 255, 0);
    }
  }

  .text1Click, .text2Click, .text3Click {
    background: #F3F5FB;
  }

  .item {
    padding: 11px 14px 5px 12px;
  }

  .el-icon-arrow-right, .el-icon-a {
    float: right;
    line-height: 17px;
  }

  .label {
    //pointer-events: none;
  }

  .el-icon-arrow-down, .el-icon-arrow-right, .text3 {
    //pointer-events: auto;

    &:hover {
      cursor: pointer;
    }
  }
}

.label {
  //pointer-events: none;
  &:hover {
    cursor: pointer;
  }
}

.el-icon-arrow-down, .el-icon-arrow-right {
  //pointer-events: auto;

  //&:hover {
  //  cursor: pointer;
  //}
}

.el-scrollbar {
  height: 204px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  border: 1px solid #C5C9D5;
}

</style>