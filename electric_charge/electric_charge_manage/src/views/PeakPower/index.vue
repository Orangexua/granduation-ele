<template>
  <div id="user">
    <el-card style="height: 100%">
      <div id="main">(1)</div>
      <div id="sun">(2)</div>
      <div class="message">
        <div class="price" style="margin:30px 0 0 60px">
          <h4 style="color:#F7170F">详情请注意：</h4>
          <h5>1.周电量详情，展示总表一周的电量详情</h5>
          <h5>2.区域用量详情，对服务小区整体的用电情况，进行汇总</h5>
          <h5>4.小区详情图表可下载</h5>
        </div> 
      </div>
    </el-card>
  </div>
</template>

<script>

import { getHouse} from "../../api/house";
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

export default {
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      form: {
        name: ""
      },
      Data: [
        { value: 40, name: '长安小区' },
        { value: 38, name: '河野别墅' },
        { value: 32, name: '静园花苑' },
        { value: 30, name: '芜湖市大司马小区' },
        { value: 28, name: '黄河湖畔' },
        { value: 26, name: '台北小区' },
        { value: 22, name: '春园' }
      ]
    }
  },
  mounted() {
    this.toolPeakPower();
    this.toolUserSunburst();
    this.getList();
  },
  methods: {
    toolPeakPower() {
      echarts.use([GridComponent, BarChart, CanvasRenderer]);

      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [1200, 2000, 3000, 800, 700, 340, 1300],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
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
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 200],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: this.Data
          }
        ]
      };

      option && myChart.setOption(option);
    },
    getList() {
      getHouse({
        page: this.page,
        pageSize: this.pageSize,
        ...this.form
      }).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.total;
        this.tableData.forEach(element => {
          this.Data.name = element.name;
          console.log(element.name)
        });
        console.log(this.Data)
      });
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
    width: 500px;
    height: 400px;
    margin-top: 20px ;
    margin-left: 20px ;
  }
  #sun {
    position:absolute;
    width: 600px;
    height: 600px;
    top: 150px;
    right: 50px;
    border: 1px solid #000;
  }
  .message {
    margin-top: 100px;
  }
}
</style>