<template>
  <div id="user">
    <div id="main"></div>
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
  border: 1px solid #000;
  #main {
    width: 500px;
    height: 400px;
    margin-top: 100px ;
    margin-left: 180px ;
  }
}
</style>