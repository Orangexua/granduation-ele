<template>
  <div id="user">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>日用电量</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div id="main"></div>
      <div id="sun"></div>
      <div class="message">
        <div class="price" style="margin:30px 0 0 60px">
          <h4 style="color:#F7170F">详情请注意：</h4>
          <h5>1.电表峰值详情，展示为昨日24小时的电量详情</h5>
          <h5>2.电表用量详情，对展示服务区域整体的电表使用情况，进行汇总</h5>
          <h5>3.今日的电量详情需在本日的24时进行更新</h5>
          <h5>4.峰值详情图表可下载</h5>
        </div> 
      </div>
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
import { getStore } from "../../utils/storage";
let userInfo = JSON.parse(getStore("userInfo"));

export default {
  data() {
    return {

    }
  },
  mounted() {
    this.changeMessage();
    console.log(userInfo)
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
          text: '总表昨日电量详情',
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
            data: [400, 380, 150, 60, 70, 100, 450, 500, 400, 190, 80, 96, 75, 100, 240, 750, 800, 700, 400, 200],
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
    },
    toolSunburst() {
      var chartDom = document.getElementById('sun');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        silent: true,
        series: [
          {
            radius: ['15%', '80%'],
            type: 'sunburst',
            sort: undefined,
            emphasis: {
              focus: 'ancestor'
            },
            data: [
              {
                value: 8,
                children: [
                  {
                    value: 4,
                    children: [
                      {
                        value: 2
                      },
                      {
                        value: 1
                      },
                      {
                        value: 1
                      },
                      {
                        value: 0.5
                      }
                    ]
                  },
                  {
                    value: 2
                  }
                ]
              },
              {
                value: 4,
                children: [
                  {
                    children: [
                      {
                        value: 2
                      }
                    ]
                  }
                ]
              },
              {
                value: 4,
                children: [
                  {
                    children: [
                      {
                        value: 2
                      }
                    ]
                  }
                ]
              },
              {
                value: 3,
                children: [
                  {
                    children: [
                      {
                        value: 1
                      }
                    ]
                  }
                ]
              }
            ],
            label: {
              color: '#000',
              textBorderColor: '#fff',
              textBorderWidth: 2,
              formatter: function (param) {
                var depth = param.treePathInfo.length;
                if (depth === 2) {
                  return '总表';
                } else if (depth === 3) {
                  return '副表';
                } else if (depth === 4) {
                  return '区域表';
                }
                return '';
              }
            },
            levels: [
              {},
              {
                itemStyle: {
                  color: '#CD4949'
                },
                label: {
                  rotate: 'radial'
                }
              },
              {
                itemStyle: {
                  color: '#F47251'
                },
                label: {
                  rotate: 'tangential'
                }
              },
              {
                itemStyle: {
                  color: '#FFC75F'
                },
                label: {
                  rotate: 0
                }
              }
            ]
          }
        ]
      };
      option && myChart.setOption(option);
    },
    toolUserPeakPower() {
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
          text: '用户昨日电量详情',
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
    },
    toolUserSunburst() {
      var chartDom = document.getElementById('sun');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        silent: true,
        series: [
          {
            radius: ['15%', '80%'],
            type: 'sunburst',
            sort: undefined,
            emphasis: {
              focus: 'ancestor'
            },
            data: [
              {
                value: 8,
                children: [
                  {
                    value: 4,
                    children: [
                      {
                        value: 2
                      },
                      {
                        value: 1
                      },
                      {
                        value: 1
                      },
                      {
                        value: 0.5
                      }
                    ]
                  },
                  {
                    value: 2
                  }
                ]
              },
              {
                value: 4,
                children: [
                  {
                    children: [
                      {
                        value: 2
                      }
                    ]
                  }
                ]
              },
              {
                value: 4,
                children: [
                  {
                    children: [
                      {
                        value: 2
                      }
                    ]
                  }
                ]
              },
              {
                value: 3,
                children: [
                  {
                    children: [
                      {
                        value: 1
                      }
                    ]
                  }
                ]
              }
            ],
            label: {
              color: '#000',
              textBorderColor: '#fff',
              textBorderWidth: 2,
              formatter: function (param) {
                var depth = param.treePathInfo.length;
                if (depth === 2) {
                  return '房源表';
                } else if (depth === 3) {
                  return '副表';
                } else if (depth === 4) {
                  return '设备表';
                }
                return '';
              }
            },
            levels: [
              {},
              {
                itemStyle: {
                  color: '#CD4949'
                },
                label: {
                  rotate: 'radial'
                }
              },
              {
                itemStyle: {
                  color: '#F47251'
                },
                label: {
                  rotate: 'tangential'
                }
              },
              {
                itemStyle: {
                  color: '#FFC75F'
                },
                label: {
                  rotate: 0
                }
              }
            ]
          }
        ]
      };
      option && myChart.setOption(option);
    },
    changeMessage() {
      if (userInfo && userInfo.role === 1) {
        this.toolPeakPower();
        this.toolSunburst()
      }else {
        this.toolUserPeakPower();
        this.toolUserSunburst();
      }
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
  #main {
    width: 600px;
    height: 460px;
    margin: 40px 0 0 30px;
  }
  #sun {
    position: absolute;
    width: 500px;
    height: 460px;
    top: 60px;
    right: 40px;
    margin-top: 100px;
  }
}
</style>