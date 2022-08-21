<template>
  <div class="card-block-item"
       :style="{background:dataInfo.bgColor}">
    <div class="left">
      <img :src="dataInfo.icon" alt="图标">
      <span class="text">{{ dataInfo.text }}</span>
    </div>
    <div class="right">
      <span class="num" :style="{color:dataInfo.color}">{{ dataInfo.num }}</span>
      <span class="unit">{{ dataInfo.unit }}</span>
    </div>
  </div>
</template>
<script setup>

import {defineProps} from "vue";

const dataInfo = defineProps({
  icon: {
    type: String,
    default: new URL('../assets/images/card-block-item/test.png', import.meta.url).href
  },
  text: {
    type: String,
    default: "标题"
  },
  num: {
    type: Number,
    default: 1
  },
  unit: {
    type: String,
    default: "人"
  },
  bgColor: {
    type: String,
    default: "#EAF6FF"
  },
  color: {
    type: String,
    default: "#4EB4FF"
  },
});

</script>


<style lang="less" scoped>
.card-block-item {
  width: 100%;
  height: 60px;
  border-radius: 4px;
  background: #EAF6FF;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  .left {
    display: flex;
    align-items: center;

    .text {
      font-weight: 500;
      font-size: 14px;
      color: #5C626B;
      letter-spacing: 0;
    }

  }

  .right {
    display: flex;
    align-items: center;

    .num {
      font-weight: 500;
      font-size: 15px;
      color: #4EB4FF;
      letter-spacing: 0;
      margin-right: 5px;
    }

    .unit {
      font-weight: 400;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.50);
      line-height: 12px;
    }
  }


}
</style>
