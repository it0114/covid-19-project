<template>
  <div class="wrapper">
    <!-- 滚动导航 -->
    <div class="tab-box">
      <van-tabs v-model:active="tabActive" scrollspy sticky type="card">
        <van-tab v-for="index in 8" style="margin: 200px 0" :title="'选项 ' + index">
          内容 {{ index }}
        </van-tab>
      </van-tabs>
    </div>

    <!-- 选择地区 -->

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

:deep(.van-tabs__wrap) {
  .van-tabs__nav--card {
    margin: 0;
    padding: 10px 0;
    box-sizing: content-box;
    border: none;
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
    background: #3FADFB;
    color: #fff;
  }
}

</style>

