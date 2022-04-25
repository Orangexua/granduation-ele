<template>
  <div id="main">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>总表计量</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>新增设备</el-breadcrumb-item>    -->
    </el-breadcrumb>
    <el-card>
      <div id="app-one">
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

export default{
  data() {
    return {
      numberone: 0,
      numbertwo: 0,
      numberthree: 0,
      numberfour: 0
    }
  },
  created: function(){
    console.log(this.numberfour)
  },
  mounted() {
    this.toolTipOne(),
    this.toolTipTwo(),
    this.toolTipThree(),
    this.toolTipFour()
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
                name: '上月结余/千元'
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
                name: '使用户数/百户'
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
                name: '电量存余kw/h'
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
                name: '实时耗电Kw/h'
              }
            ]
          }
        ]};
      option && myChart.setOption(option);
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
    width: 300px;
    height: 300px;
    top: 0;
    left: 90px;
    margin: 0 90px;
    border: 1px solid rgb(143, 139, 139);
    border-radius: 20%;
    > .dia {
      width: 0px;
      height: 0px;
      border: 10px solid #000;
      border-radius: 50%;
    }
  }
}
</style>
