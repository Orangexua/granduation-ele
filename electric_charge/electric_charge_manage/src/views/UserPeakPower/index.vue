<template>
  <div id="user">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>日用电量</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>新增设备</el-breadcrumb-item>    -->
    </el-breadcrumb>
    <el-card>
      <div id="main" class="btn draw-outline"></div>
    </el-card>
    
  </div>
</template>

<script>

import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  MarkAreaComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.toolPeakPower();
  },
  methods: {
    toolPeakPower() {
      echarts.use([
        TitleComponent,
        ToolboxComponent,
        TooltipComponent,
        GridComponent,
        VisualMapComponent,
        MarkAreaComponent,
        LineChart,
        CanvasRenderer,
        UniversalTransition
      ]);
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: '昨日电量详情',
          subtext: '数据/kwh'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // prettier-ignore
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} W'
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 6,
              color: 'green'
            },
            {
              gt: 6,
              lte: 8,
              color: 'red'
            },
            {
              gt: 8,
              lte: 14,
              color: 'green'
            },
            {
              gt: 14,
              lte: 17,
              color: 'red'
            },
            {
              gt: 17,
              color: 'green'
            }
          ]
        },
        series: [
          {
            name: 'Electricity',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            markArea: {
              itemStyle: {
                color: 'rgba(#182d38, 0.4)'
              },
              data: [
                [
                  {
                    name: '早峰谷',
                    xAxis: '07:30'
                  },
                  {
                    xAxis: '10:00'
                  }
                ],
                [
                  {
                    name: '晚峰谷',
                    xAxis: '17:30'
                  },
                  {
                    xAxis: '21:15'
                  }
                ]
              ]
            }
          }
        ]
      };
      option && myChart.setOption(option);
    }
  }
}

</script>

<style lang="less" scoped>
#user {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  // border: 1px solid #000;
  #main {
    width: 800px;
    height: 500px;
    margin-top: 1px ;
    margin-left: 180px ;
  }
  .draw-outline {
    box-shadow: inset 0 0 0 4px #dfebeb;
    color: #dfebeb;
    -webkit-transition: color 0.25s 0.125s;
    transition: color 0.25s 0.125s;
    position: relative;
  }
  .draw-outline::before, .draw-outline::after {
    border: 0 solid transparent;
    box-sizing: border-box;
    content: '';
    pointer-events: none;
    position: absolute;
    width: 0;
    height: 0;
  }
  .draw-outline::before {
    top: 0;
    right: 0;
  }
  .draw-outline::after {
    left: 0;
    bottom: 0;
  }
  .draw-outline::after {
    border-top-width: 4px;
    border-left-width: 4px;
  }
  .draw-outline::before {
    border-bottom-width: 4px;
    border-right-width: 4px;
  }
  .draw-outline:hover {
    color: #2b1880;
  }
  .draw-outline:hover::before, .draw-outline:hover::after {
    border-color: #151f58;
    -webkit-transition: border-color 0s, height 0.25s, width 0.25s;
    transition: border-color 0s, height 0.25s, width 0.25s;
    width: 100%;
    height: 100%;
  }
  .draw-outline:hover::before {
    -webkit-transition-delay: 0s, 0s, 0.25s;
            transition-delay: 0s, 0s, 0.25s;
  }
  .draw-outline:hover::after {
    -webkit-transition-delay: 0.5s, 0.5s, 0.75s;
            transition-delay: 0.5s, 0.5s, 0.75s;
  }

  .btn {
    background: none;
    border: none;
    cursor: pointer;
    line-height: 1.5;
    font: 700 1.2rem 'Roboto Slab', sans-serif;
    padding: 1em 2em;
    letter-spacing: 0.05rem;
  }
  .btn:focus {
    outline: 2px dotted #071e5c;
  }
}
</style>