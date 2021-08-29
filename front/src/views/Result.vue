<template>
  <div class="result">
    <top-bar/>
    <div class="line-1">
      <el-button class="top-button button-1" size="small" type="primary" @click="toCheck"
                 :class="editable?'':'button-1-e'">重新匹配
      </el-button>
      <el-button class="top-button button-2" size="small" type="primary" @click="reload">重新上传</el-button>
      <el-button class="top-button button-3" size="small" type="primary" @click="download">下载文件</el-button>
    </div>

    <div class="line-2">
      <el-scrollbar style="height: 100%;width: 100%">
        <div style="display: inline-flex;">
          <div class="name-list" v-for="(item,index) in names" :key="index" @click="selectName(index)">
            <span class="name" :class="{click:selectNameIndex===index}" :style="setNameMargin(item,index)">
              <img :src="selectNameIndex===index?nameImg[1]:nameImg[0]" alt="name">
              <span> {{ item }} </span>
            </span>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="line-3">
      <el-scrollbar style="height:100%">
        <div style="display: inline-flex">
          <div class="field-list" v-for="(item,index) in fields" :key="index" @click="selectFiled(index)"
               :style="{width:line3Width[index]}">
            <td class="field" :class="{click:selectFiledIndex===index}">
              <img :src="selectFiledIndex===index?fieldImg2[index]:fieldImg1[index]" alt="name"> {{ item }}
            </td>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="line-4" v-show="!isUserInfo">
      <div class="table">
        <table-one :user-index="selectNameIndex" v-show="selectFiledIndex===0"/>
        <table-two :user-index="selectNameIndex" v-show="selectFiledIndex===1"/>
        <table-three :user-index="selectNameIndex" v-show="selectFiledIndex===2"/>
        <table-four :user-index="selectNameIndex" v-show="selectFiledIndex===3"/>
        <table-five :user-index="selectNameIndex" v-show="selectFiledIndex===4"/>
        <table-seven :user-index="selectNameIndex" v-show="selectFiledIndex===6"/>
      </div>
    </div>
    <div class="line-5" v-show="isUserInfo">
      <div class="user-header">用户信息</div>
      <users-info :user-index="selectNameIndex" :data="data"/>
    </div>
    <div class="line-6" v-show="isUserInfo">
      <div class="login-header">登录信息</div>
      <div class="login-info-table">
        <login-info :user-index="selectNameIndex" :data="data"/>
      </div>
    </div>
  </div>
</template>

<script>
import name1 from '@/assets/img/name1.png'
import name2 from '@/assets/img/name2.png'
import one1 from '@/assets/img/one1.png'
import one2 from '@/assets/img/one2.png'
import two1 from '@/assets/img/two1.png'
import two2 from '@/assets/img/two2.png'
import three1 from '@/assets/img/three1.png'
import three2 from '@/assets/img/three2.png'
import four1 from '@/assets/img/four1.png'
import four2 from '@/assets/img/four2.png'
import five1 from '@/assets/img/five1.png'
import five2 from '@/assets/img/five2.png'
import six1 from '@/assets/img/six1.png'
import six2 from '@/assets/img/six2.png'
import seven1 from '@/assets/img/seven1.png'
import seven2 from '@/assets/img/seven2.png'

import TopBar from '@/components/bar/TopBar.vue'
import TableOne from "@/components/table-result/TableOne";
import TableTwo from "@/components/table-result/TableTwo";
import TableThree from "@/components/table-result/TableThree";
import TableFour from "@/components/table-result/TableFour";
import TableFive from "@/components/table-result/TableFive";
import TableSeven from "@/components/table-result/TableSeven";
import LoginInfo from "@/components/table-result/LoginInfo";
import UsersInfo from "@/components/table-result/UsersInfo";
import common from "@/assets/js/common";
import axios from "axios";

export default {
  name: 'Result',
  components: {
    TopBar,
    TableOne,
    TableTwo,
    TableThree,
    TableFour,
    TableFive,
    TableSeven,
    LoginInfo,
    UsersInfo,
  },
  computed: {
    fullName() {
      return this.firstName + "" + this.lastName
    }
  },
  data() {
    return {
      nameImg: [name1, name2],
      fieldImg1: [one1, two1, three1, four1, five1, six1, seven1],
      fieldImg2: [one2, two2, three2, four2, five2, six2, seven2],
      selectNameIndex: 0,
      selectFiledIndex: 0,
      isUserInfo: false,
      fields: ['流水', '法币交易记录统计', '币币交易记录统计', '充币记录统计', '提币记录统计', '基本信息', '地址信息'],
      line3Width: ['115px', '201px', '200px', '172px', '172px', '143px', '144px'],
      names: [],
      loadingInstance: Object,
      editable: JSON.parse(sessionStorage.getItem('editable')),
    }
  },
  methods: {
    selectName(index) {
      this.selectNameIndex = index;
    },
    selectFiled(index) {
      this.selectFiledIndex = index;
      this.isUserInfo = index === 5;
    },
    setNameMargin(item, index) {
      if (index === 0) {
        return {margin: '16px 21px 0 38px'}
      }
    },
    reload() {
      this.$router.push('/')
    },
    download() {
      axios.get('/investigation/parse/result/url?uuid=' + sessionStorage.getItem('uuid'))
          .then(res => {
            if (res.data.code !== '0000') {
              this.$message.error('下载失败，请检查重试');
            } else {
              window.open(res.data.data);
            }
          })
    },
    toCheck() {
      this.$router.push('/check')
    }
  },
  mounted() {
    this.names = sessionStorage.getItem('names').split(',')
  },
  beforeCreate() {
    if (sessionStorage.getItem('uuid') === null) {
      this.$router.push('/')
    }
    common.layout('100%')
  },
}
</script>
<style lang="scss" scoped>
@import "src/assets/css/Result";
</style>
