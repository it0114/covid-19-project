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

// 请求地址
const baseURL = 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf'

onMounted(async () => {
  await getList()
  await renderCityListData()
  await renderBulletinBoardData()
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

// 初始化 echarts
const echartsInit = () => {
  const myChart = echarts.init(document.querySelector('#map') as HTMLElement);
  let option = {};
  myChart.setOption(option);
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
        background: #f5f4f4;
      }
    }
  }
}
</style>
