<template>
  <div class="card-box">
    <div class="card-title">
      <span class="card-text">{{ title }}</span>
      <span class="card-tag">{{ tag }}</span>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  title: String,
  tag: String
});

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
    line-height: 16px;
    position: relative;
    padding-left: 15px;
    display: flex;
    align-items: center;

    .card-text {
      font-weight: 500;
      font-size: 16px;
      color: #262A30;
      margin-right: 10px;
    }

    .card-tag {
      font-size: 12px;
      border: 1px solid @bg-color;
      color: @bg-color;
      padding:1px 5px;
      box-sizing: border-box;
      border-radius: 2px;
    }

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
