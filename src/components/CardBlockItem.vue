<template>
  <div class="card-block-item"
       :style="{background:bgColor}">
    <div class="left">
      <img :src="icon" alt="图标">
      <span class="text">{{ text }}</span>
    </div>
    <div class="right">
      <div class="right-text">
        <div class="right-item">
          <span class="name"> {{ name || '总数' }}</span>
          <span class="num" :style="{color:color}">{{ num }}</span>
        </div>
        <div class="right-item">
          <span class="name"> {{ name1 || '较上日' }}</span>
          <span class="num" :style="{color:color}">+{{ num1 }}</span>
        </div>
      </div>
      <span class="unit">{{ unit || '人' }}</span>
    </div>
  </div>
</template>
<script setup>

import {defineProps} from "vue";

const props = defineProps({
  icon: {
    type: String,
    default: new URL('../assets/images/card-block-item/test.png', import.meta.url).href
  },
  text: {
    type: String,
    default: "标题"
  },
  name: {
    type: String,
    default: "总数"
  },
  num: {
    type: Number,
    default: 1
  },
  unit: {
    type: String,
    default: "人"
  },
  name1: {
    type: String,
    default: "较上日"
  },
  num1: {
    type: Number,
    default: 1
  },
  unit1: {
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
  margin-bottom: 10px;

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

    .right-item {
      width: 120px;
      margin: 5px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .name {
        font-weight: 400;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.50);
        line-height: 12px;
        margin-right: 5px;
      }

      .num {
        flex: 1;
        font-weight: 500;
        font-size: 15px;
        color: #4EB4FF;
        letter-spacing: 0;
        text-align: right;
        margin-right: 10px;
      }
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
