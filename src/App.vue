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
          :columns="cityColumns"
          @cancel="cityShowPicker = false"
          @confirm="handlePickerConfirm"
      ></van-picker>
    </van-popup>

    <!-- 滚动导航 -->
    <div class="tab-box">
      <van-tabs v-model:active="tabActive" scrollspy sticky type="card" :offset-top="44">
        <van-tab title="标题1">
          <card-box title="标题1">
            标题1
          </card-box>
        </van-tab>
        <van-tab title="标题1">
          <card-box title="标题1">
            标题1
          </card-box>
        </van-tab>
        <van-tab title="标题1">
          <card-box title="标题1">
            标题1
          </card-box>
        </van-tab>
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
const cityValue = ref('杭州') // 城市选中项
const cityShowPicker = ref(false) // 选择城市弹出框
const cityColumns = ref(['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华']) // 城市列表


// 请求地址
const baseURL = 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf'

onMounted(() => {
  getList()
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


// 初始化 echarts
const echartsInit = () => {
  const myChart = echarts.init(document.querySelector('#map') as HTMLElement);
  let option = {};
  myChart.setOption(option);
}

// 点击选中城市
const handlePickerConfirm = (value: string) => {
  cityValue.value = value;
  cityShowPicker.value = false;
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

