<template>
  <a-checkbox-group :value="value" style="margin-top:9px" @change="value => $emit('change', value)">
    <a-col :span="6">
      <a-checkbox :value="0" disabled>浏览详情</a-checkbox>
    </a-col>
    <a-col :span="6">
      <a-checkbox :value="1">查看评论</a-checkbox>
    </a-col>
    <a-col :span="6">
      <a-checkbox :value="2">关联商品</a-checkbox>
    </a-col>
    <a-col :span="6">
      <a-checkbox :value="3">货比三家</a-checkbox>
    </a-col>
  </a-checkbox-group>
</template>

<script>
export default {
  name: 'ScanContent',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: Array
  }
}
</script>
