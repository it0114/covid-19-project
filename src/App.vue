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
          @cancel="cityShowPicker = false"
          @confirm="handlePickerConfirm"
      ></van-picker>
    </van-popup>

    <!-- 滚动导航 -->
    <div class="tab-box">
      <van-tabs v-model:active="tabActive" scrollspy sticky type="card" :offset-top="44">
        <!-- 选择地区后发生改变的数据 start -->
        <van-tab title="疫情数据">
          <card-box title="疫情数据">
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
              <tbody>
              <tr v-for="(item,index) in listData.listChildren" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.today.confirm }}</td>
                <td>{{ item.total.confirm }}</td>
                <td>{{ item.total.heal }}</td>
                <td>{{ item.total.dead }}</td>
              </tr>
              </tbody>
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
import CardBox from "./components/CardBox.vue"

// 定义数据
const listData = useListDataStore()
const tabActive = ref(0)  // 电梯滚动导航选中
const cityValue = ref('') // 城市选中项
const cityShowPicker = ref(false) // 选择城市弹出框
const cityColumns = ref([]) // 城市列表


// 请求地址
const baseURL = 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf'

onMounted(async () => {
  await getList()
  await renderCityListData()
})

// 函数方法

// 初始化获取数据
const getList = async () => {
  const res = await axios.post(baseURL)
  const data = res.data.data
  // console.log(data);
  // 1. 存储数据到 pinia 中
  listData.storageList(data)
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
  cityValue.value = childrenList[0].name
  let children = childrenList[0].children
  listData.storageChildren(children)

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
@import "./assets/global";

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
    }

    tbody {
      tr:nth-child(odd) {
        background: #f5f4f4;
      }
    }
  }
}


</style>

