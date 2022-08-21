<template>
  <div class="card-box">
    <div class="card-title">{{ title.title }}</div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

const title = defineProps({
  type: String,
  default: "自定义标题",
})

</script>

<style scoped lang="less">
@import "../assets/style/global";

.card-box {
  width: 100%;
  min-height: 50px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;

  .card-title {
    font-weight: 500;
    font-size: 16px;
    color: #262A30;
    line-height: 16px;
    position: relative;
    padding-left: 20px;

    &:after {
      position: absolute;
      left: 0;
      content: "";
      width: 6px;
      height: 16px;
      background: @bg-color;
      margin-right: 10px;
    }
  }

  .card-body {
    padding-top: 10px;
  }
}
</style>
