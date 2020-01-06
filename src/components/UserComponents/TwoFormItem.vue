<template>
  <div class="two-form-item">
    <div class="item mr24">
      <label class="label">{{ labels[0] }} : </label>
      <slot name="item1"></slot>
    </div>
    <div class="item">
      <label class="label lg">{{ labels[1] }} : </label>
      <slot name="item2"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwoFormItem',
  props: {
    labels: {
      type: Array,
      default: () => {
        return ['任务日期', '每日任务数量']
      }
    }
  }
}
</script>

<style lang="less" scoped>
.two-form-item {
  display: flex;
  flex-wrap: wrap;
  .item {
    margin-bottom: 12px;
    label {
      display: inline-block;
      width: 100px;
      text-align: right;
      padding-right: 10px;
      &.lg {
        width: 110px;
      }
    }
  }
  .mr24 {
    margin-right: 24px;
  }
}
</style>
