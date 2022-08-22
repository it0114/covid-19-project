<template>
  <div class="wrapper">
    <!-- 标题 -->
    <div class="header-title">
      <h3>疫情实时大数据报告</h3>
    </div>
    <!-- 选择地区 -->
    <van-sticky>
      <van-field
          v-model="cityValue"
          is-link
          readonly
          sticky
          label="所选城市"
          placeholder="选择城市"
          @click="cityShowPicker = true"
      ></van-field>
    </van-sticky>
    <!-- 地区弹窗 -->
    <van-popup v-model:show="cityShowPicker" round position="bottom">
      <van-picker
          title="选择城市"
          :columns="cityColumns"
          :default-index="cityDefaultAction"
          @cancel="cityShowPicker = false"
          @confirm="handlePickerConfirm"
      ></van-picker>
    </van-popup>
    <!-- 滚动导航 -->
    <div class="tab-box">
      <van-tabs v-model:active="tabActive" scrollspy sticky type="card" :offset-top="44">
        <!-- 选择地区后发生改变的数据 start -->
        <van-tab title="疫情看板">
          <card-box title="疫情看板" tag="全国">
            <card-block-item
                v-for="(item,index) in bulletinBoardData"
                :key="index"
                v-bind="item"
            ></card-block-item>
          </card-box>
        </van-tab>
        <van-tab title="疫情饼图">
          <card-box title="疫情饼图" tag="全国">
            <div class="charts-pie"></div>
          </card-box>
        </van-tab>
        <van-tab title="疫情表格">
          <card-box title="疫情表格" tag="省市">
            <table>
              <thead>
              <tr>
                <th>地区</th>
                <th>新增确诊</th>
                <th>累计确诊</th>
                <th>治愈</th>
                <th>死亡</th>
              </tr>
              </thead>
              <!--<transition-group tag="tbody" enter-active-class="animate__animated animate__fadeIn">-->
              <tbody>
              <tr v-for="(item,index) in listData.listChildren" :key="item.name + index + Math.random()">
                <td>{{ item.name }}</td>
                <td>{{ item.today.confirm }}</td>
                <td>{{ item.total.confirm }}</td>
                <td>{{ item.total.heal }}</td>
                <td>{{ item.total.dead }}</td>
              </tr>
              </tbody>
              <!--</transition-group>-->
            </table>
          </card-box>
        </van-tab>
        <van-tab title="疫情折线图">
          <card-box title="疫情折线图" tag="省市">
            <div class="charts-line"></div>
          </card-box>
        </van-tab>
        <!-- 选择地区后发生改变的数据 end-->
      </van-tabs>
    </div>
    <!-- 别拉了, 有底线的 -->
    <div class="footer-box">
      - 别拉了, 有底线的 -
    </div>

  </div>
</template>

<script setup lang="ts">

// 引入文件
import axios from "axios"
import {useListDataStore} from "@/stores/listData";
import {onMounted, ref} from "vue";
import * as echarts from 'echarts';
import "animate.css"
import CardBox from "./components/CardBox.vue"
import CardBlockItem from "./components/CardBlockItem.vue"

// 定义数据
const listData = useListDataStore()
const tabActive = ref(0)  // 电梯滚动导航选中
const cityValue = ref('') // 城市选中项
const cityShowPicker = ref(false) // 选择城市弹出框
const cityColumns = ref([]) // 城市列表
const cityDefaultAction = ref(0) // 默认选中
const bulletinBoardData = ref([]) // 看板数据
const pieData = ref([]) // 饼图数据
const lineData = ref({
  xAxisData: [],
  seriesData: []
}) // 折线图数据
let pieChart = <any>''
let lineChart = <any>''

// 请求地址
const baseURL = 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf'

onMounted(async () => {
  await getList()
  await renderCityListData()
  await renderBulletinBoardData()
  await renderPieData()
  await renderLineData()
})

// 函数方法

// 初始化获取数据
const getList = async () => {
  const res = await axios.post(baseURL)
  const data = res.data.data
  // console.log(data);
  // 1. 存储数据到 pinia 中
  listData.storageList(data) // 总数据
  listData.storageChinaAdd(data.diseaseh5Shelf.chinaAdd)  // 看板新增
  listData.storageChinaTotal(data.diseaseh5Shelf.chinaTotal) // 看板总数
  // console.log(listData.list);
}

// 渲染城市列表
const renderCityListData = () => {
  let childrenList = listData.list.diseaseh5Shelf.areaTree[0].children

  // 1. 清空当前的数组
  cityColumns.value = []
  // 2. 排序 (a~z)
  childrenList = childrenList.sort((str1, str2) => {
    return str1.name.localeCompare(str2.name, 'zh');
  });
  // 3. 赋值给 城市列表
  childrenList.forEach(item => {
    (cityColumns.value as any).push({
      text: item.name,
      data: {...item}
    }) // 遇事不决, 类型断言
  })
  // 4. 设置默认选中的值
  cityValue.value = childrenList[6].name
  let children = childrenList[6].children
  listData.storageChildren(children)
  cityDefaultAction.value = 6
}

// 渲染看板数据
const renderBulletinBoardData = () => {
  (bulletinBoardData.value as Array<Object>) = [
    {
      text: '本土现有确诊',
      icon: new URL('./assets/images/card-block-item/icon1.png', import.meta.url).href,
      num: listData.chinaTotal.localConfirm,
      num1: listData.chinaAdd.localConfirmH5,
      bgColor: 'rgba(255,146,76,0.1)',
      color: '#FF924C',
    },
    {
      text: '现有确诊',
      icon: new URL('./assets/images/card-block-item/icon2.png', import.meta.url).href,
      num: listData.chinaTotal.nowConfirm,
      num1: listData.chinaAdd.nowConfirm,
      bgColor: 'rgba(64,172,251,0.1)',
      color: '#40ACFB',
    },
    {
      text: '累计确诊',
      icon: new URL('./assets/images/card-block-item/icon3.png', import.meta.url).href,
      num: listData.chinaTotal.confirm,
      num1: listData.chinaAdd.confirm,
      bgColor: 'rgba(63,210,167,0.1)',
      color: '#3FD2A7',
    },
    {
      text: '无症状感染者',
      icon: new URL('./assets/images/card-block-item/icon4.png', import.meta.url).href,
      num: listData.chinaTotal.noInfect,
      num1: listData.chinaAdd.noInfect,
      bgColor: 'rgba(36,188,185,0.1)',
      color: '#24BCB9',
    },
    {
      text: '境外输入',
      icon: new URL('./assets/images/card-block-item/icon5.png', import.meta.url).href,
      num: listData.chinaTotal.importedCase,
      num1: listData.chinaAdd.importedCase,
      bgColor: 'rgba(253,111,86,0.1)',
      color: '#FD6F56',
    },
    {
      text: '累计死亡',
      icon: new URL('./assets/images/card-block-item/icon6.png', import.meta.url).href,
      num: listData.chinaTotal.dead,
      num1: listData.chinaAdd.dead,
      bgColor: 'rgba(142,136,235,0.1)',
      color: '#8E88EB',
    }
  ]
}

// 渲染饼图数据
const renderPieData = async () => {
  (pieData.value as any) = [
    {value: listData.chinaTotal.localConfirm, name: '本土现有确诊'},
    {value: listData.chinaTotal.nowConfirm, name: '现有确诊'},
    {value: listData.chinaTotal.confirm, name: '累计确诊'},
    {value: listData.chinaTotal.noInfect, name: '无症状感染者'},
    {value: listData.chinaTotal.importedCase, name: '境外输入'},
    {value: listData.chinaTotal.dead, name: '累计死亡'}
  ]
  await chartsPieInit()
}

// 初始化饼图
const chartsPieInit = () => {
  if (pieChart !== '' && pieChart !== null && pieChart !== undefined) {
    echarts.dispose(document.querySelector('.charts-pie') as HTMLElement);
  }
  pieChart = echarts.init(document.querySelector('.charts-pie') as HTMLElement);
  let option = {
    color: ['#6AB2F9', '#71D5B1', '#F9DE59', '#F1A25C', '#ED8166', '#9B93EB',],
    legend: {
      selectedMode: true, // 是否可以隐藏饼图对应的板块
      top: '5%',//图例距离整个容器底部的距离
      left: 'center',//图例距离整个容器左边
      data: ['本土现有确诊', '现有确诊', '累计确诊', '无症状感染者', '境外输入', '累计死亡'],//图例文字内容
      itemHeight: 9,//图例图标的高度
      itemWidth: 9,//图例图标的宽度
      itemGap: 25,//图例图标与文字间的间距
      icon: "circle",//设置图例图标的形状为实心圆，这个不填，默认是矩形
      textStyle: {
        fontSize: 12,//图例文字字体大小
        color: '#8A90A3'//图例文字颜色
      },
      // 默认隐藏/显示的图例
      selected: {
        '现有确诊': false,
        '累计确诊': false
      }
    },
    series: [
      {
        name: '疫情数据',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '60%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
        },
        // 设置中间文字
        label: {
          show: false,
          position: 'center',
          formatter: '{text|{b}}\n {value|{c}人} \n {percentage|{d}%}',
          rich: {
            text: {
              color: "#666",
              fontSize: 14,
              align: 'center',
              verticalAlign: 'middle',
            },
            value: {
              color: "#333",
              fontSize: 18,
              align: 'center',
              verticalAlign: 'middle',
              padding: 10,
            },
            percentage: {
              color: "#666",
              fontSize: 18,
              align: 'center',
              verticalAlign: 'middle',
            }
          },
        },
        emphasis: {
          label: {
            show: true,
          }
        },
        labelLine: {
          show: false
        },
        data: pieData.value
      }
    ]
  };
  pieChart.setOption(option);
  //监听窗口变动实时渲染
  window.addEventListener("resize", function () {
    pieChart.resize();
  });
  // 饼图事件
  getDefaultSelected(pieChart, option)
}

// 饼图事件
const getDefaultSelected = (myChart: any, option: Object) => {
  let index = 0;
  myChart.dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    dataIndex: 0,
  });//默认高亮
  myChart.on('mouseover', (e: any) => {
    if (e.dataIndex !== index) {
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: index,
      });
    }
  });
  myChart.on('mouseout', (e: any) => {
    index = e.dataIndex;
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: e.dataIndex,
    });
  });
}

// 渲染折线图数据
const renderLineData = async () => {
  lineData.value.xAxisData = []
  lineData.value.seriesData = []

  // 定义
  let addData: never[] = []
  let totalData: never[] = []
  let healData: never[] = []
  let deadData: never[] = []
  // 标题
  const titleArr = [
    {name: '新增确诊', data: addData},
    {name: '累计确诊', data: totalData},
    {name: '治愈', data: healData},
    {name: '死亡', data: deadData},
  ]
  titleArr.forEach(({name, data}) => {
    (lineData.value.seriesData as Array<Object>).push({
      name,
      type: 'line',
      // stack: 'Total',
      data
    })
  })
  listData.listChildren.forEach(item => {
    // x轴
    (lineData.value.xAxisData as Array<string>).push(item.name);
    // 数据
    (addData as Array<number>).push(item.today.confirm);
    (totalData as Array<number>).push(item.total.confirm);
    (healData as Array<number>).push(item.total.heal);
    (deadData as Array<number>).push(item.total.dead);
  })
  await chartsLineInit()
}

// 初始化折线图
const chartsLineInit = () => {
  if (lineChart !== '' && lineChart !== null && lineChart !== undefined) {
    echarts.dispose(document.querySelector('.charts-line') as HTMLElement);
  }
  lineChart = echarts.init(document.querySelector('.charts-line') as HTMLElement);
  let option = {
    color: ['#4EB4FF', '#F2CA6B', '#9ECA7F', '#DE6E6A'],
    legend: {
      icon: 'circle',
      top: '2%',
      right: 'center',
      left: 'center',
      itemWidth: 6,
      itemGap: 20,
      textStyle: {
        color: '#556677'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    dataZoom: [// 滚动条
      {
        type: 'slider',
        realtime: true,
        startValue: 0, // 重点
        // 重点-dataX.length表示x轴数据长度
        endValue: lineData.value.xAxisData.length - (lineData.value.xAxisData.length - 4),
        xAxisIndex: [0],
        bottom: '10',
        left: '30',
        height: 8,
        borderColor: 'rgba(0,0,0,0)',
        textStyle: {
          color: '#999',
        },
        zoomLock: true // 锁定
      },
    ],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: lineData.value.xAxisData
    },
    yAxis: {
      type: 'value',
      name: '单位 : 人'
    },
    series: lineData.value.seriesData
  };
  lineChart.setOption(option);
  //监听窗口变动实时渲染
  window.addEventListener("resize", function () {
    lineChart.resize();
  });
}

// 点击选中城市
const handlePickerConfirm = (value: any, index: number) => {
  // 改变当前选中值
  cityValue.value = value.text;
  // 隐藏弹框
  cityShowPicker.value = false;
  // 获取子数据
  let children = value.data.children
  // console.log(children);
  // 保存子数据
  listData.storageChildren(children)
  // console.log(listData.listChildren);
}

</script>

<style scoped lang="less">
@import "./assets/style/global";

.wrapper {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background: #F6F7F8;
  padding-bottom: 30px;

  .header-title {
    text-align: center;
    padding: 20px 0;
    background: @bg-color;

    h3 {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
  }

  :deep(.van-tabs__wrap) {
    .van-tabs__nav--card {
      margin: 0;
      padding: 10px 0;
      box-sizing: content-box;
      border: 1px solid #E9ECF0;
      border-right: none;
      border-left: none;
    }

    .van-tab--card {
      border: none;
    }

    .van-tab {
      margin: 0 5px;
      padding: 5px 10px;
      box-sizing: border-box;
      background: #EAF6FD;
      border-radius: 4px;
      color: #999;
    }

    .van-tab--active {
      background: @bg-color;
      color: #fff;
    }
  }

  .card-box {
    width: 95%;
    margin: 10px auto;
  }

  .footer-box {
    font-size: 14px;
    text-align: center;
    color: #666;
    padding: 20px 0;
  }

  table {
    width: 100%;
    text-align: center;

    tr, td, th {
      border: 1px solid #ccc;
      padding: 5px;
      font-size: 14px;
      box-sizing: border-box;
      white-space: nowrap;
    }

    tbody {
      tr:nth-child(odd) {
        background: #F6F8FA;
      }
    }
  }

  .charts-pie {
    width: 100%;
    height: 400px;
  }

  .charts-line {
    width: 100%;
    height: 300px;
  }
}
</style>
