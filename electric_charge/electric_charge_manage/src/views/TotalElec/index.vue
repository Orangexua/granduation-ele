<template>
  <div id="main">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>总表计量</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>新增设备</el-breadcrumb-item>    -->
    </el-breadcrumb>
    <el-card style="" v-if="isreloadData">
      <el-form :model="groupForm" :rules="groupFormRules" ref="groupForm">
        <el-form-item
            style="width: 400px"
            label="选择用户"
            prop="uid"
            :label-width="'120px'"
        >
          <el-select v-model="groupForm.uid" placeholder="请选择用户" @change="selectChanged">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :value="item.id"
              :label="item.username"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div id="app-one" v-if="isreloadData">
      </div>
      <div id="app-two">
      </div>
      <div id="app-three">
      </div>
      <div id="app-four">
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts/core';
import { TooltipComponent } from 'echarts/components';
import { FunnelChart, GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { getUserList } from "@/api/user";

export default{
  data() {
    return {
      numberone: 0,
      numbertwo: 0,
      numberthree: 0,
      numberfour: 0,
      tableData: [],
      isreloadData: true,
      form: {
        name: "",
        phone: ""
      },
      groupForm: {
        name: "",
        electric_total: 0,
        uid: undefined
      },
      groupFormRules: {
        uid: [{ required: true, message: "请选择用户", trigger: "blur" }]
      },
      dialogFormVisible: false,
      total: 0,
      page: 1,
      pageSize: 10,
      userList: [],
      dialogType: "add"
    }
  },
  mounted() {
    this.toolTipOne(),
    this.toolTipTwo(),
    this.toolTipThree(),
    this.toolTipFour(),
    this.getUser()
  },
  methods: {
    realtime(m, n) {
      return Math.random()*(m-n)+n;
    },
    toolTipOne() {
      echarts.use([TooltipComponent, GaugeChart, CanvasRenderer]);
      var chartDom = document.getElementById('app-one');
      var myChart = echarts.init(chartDom);
      this.numberone = Math.round(Math.random()*(70-20)+20);
      var option;
      option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}'
            },
            data: [
              {
                value: this.numberone,
                name: '上月结余'
              }
            ]
          }
        ]};
      option && myChart.setOption(option);
    },
    toolTipTwo() {
      echarts.use([TooltipComponent, GaugeChart, CanvasRenderer]);
      var chartDom = document.getElementById('app-two');
      var myChart = echarts.init(chartDom);
      var option;
      this.numbertwo = Math.round(Math.random()*(40-20)+20);
      option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}'
            },
            data: [
              {
                value: this.numbertwo,
                name: '使用户数'
              }
            ]
          }
        ]};
      option && myChart.setOption(option);
    },
    toolTipThree() {
      echarts.use([TooltipComponent, GaugeChart, CanvasRenderer]);
      var chartDom = document.getElementById('app-three');
      var myChart = echarts.init(chartDom);
      this.numberthree = Math.round(Math.random()*(100-80)+80);
      var option;
      option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}'
            },
            data: [
              {
                value: this.numberthree,
                name: '电量存余'
              }
            ]
          }
        ]};
      option && myChart.setOption(option);
    },
    toolTipFour() {
      echarts.use([TooltipComponent, GaugeChart, CanvasRenderer]);
      var chartDom = document.getElementById('app-four');
      var myChart = echarts.init(chartDom);
      this.numberfour =  Math.round(Math.random()*(100-80)+80);
      var option;
      option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}'
            },
            data: [
              {
                value: this.numberfour,
                name: '实时耗电'
              }
            ]
          }
        ]};
      option && myChart.setOption(option);
    },
    getUser() {
      getUserList().then((res) => {
        this.userList = res.data.list;
        console.log(this.userList);
      });
    },
    selectChanged() {
      this.numberfour = Math.round(Math.random()*(100-80)+80);
      this.numberthree= Math.round(Math.random()*(100-80)+80);
      this.numbertwo = Math.round(Math.random()*(100-80)+80);
      this.numberone = Math.round(Math.random()*(100-80)+80);
      this.toolTipOne(),
      this.toolTipTwo(),
      this.toolTipThree(),
      this.toolTipFour(),
      console.log('sdsdc', this.numberfour);
    }
  }
}

</script>

<style lang="less" scoped>
#main {
  width: 100%;
  height: 95%;
  top: 0;
  left: 0;
  #app-one , #app-two , #app-three , #app-four{
    display: inline-block;
    width: 270px;
    height: 270px;
    top: 0;
    left: 120px;
    margin: 0 80px;
    border: 3px solid #5370C6;
    border-radius: 35%;
  }
}
</style>
