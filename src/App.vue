<template>
  <div class="wrapper">
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
</style>

