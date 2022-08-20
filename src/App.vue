<template>
  <div class="wrapper">
    <!-- 标题 -->
    <div class="header-title">
      <h3>疫情实时大数据报告</h3>
    </div>
    <!-- 选择地区 -->

    <!-- 滚动导航 -->
    <div class="tab-box">
      <van-tabs v-model:active="tabActive" scrollspy sticky type="card">
        <van-tab title="标题1">
          <card-box title="标题1">
            标题1
          </card-box>
        </van-tab>
      </van-tabs>
    </div>


    <!-- 选择地区后发生改变的数据 start -->


    <!-- 选择地区后发生改变的数据 end-->

    <!-- 返回顶部 -->
  </div>
</template>


<script setup lang="ts">

// 引入文件
import axios from "axios"
import {useListDataStore} from "@/stores/listData";
import {onMounted, ref} from "vue";
import * as echarts from 'echarts';
import CardBox from "./components/CardBox.vue"

// 定义数据
const listData = useListDataStore()
const tabActive = ref(0)  // 电梯滚动导航选中

// 请求地址
const baseURL = 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf'

onMounted(() => {
  getList()
  // echartsInit()
})


// 函数方法
const getList = async () => {
  const res = await axios.post(baseURL)
  const data = res.data.data
  // console.log(data);
  // 1. 存储数据到 pinia 中
  listData.storageData(data)
  console.log(listData.list);
}


const echartsInit = () => {
  const myChart = echarts.init(document.querySelector('#map') as HTMLElement);
  let option = {};
  myChart.setOption(option);
}

</script>

<style scoped lang="less">
@import "./assets/global";

.wrapper {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background: #F6F7F8;

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
}


</style>

