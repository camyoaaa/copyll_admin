<template>
  <a-select :value="value" @change="value => $emit('change', value)">
    <a-select-option :value="0">不浏览</a-select-option>
    <a-select-option :value="1">随机浏览</a-select-option>
    <a-select-option :value="2">深度浏览</a-select-option>
  </a-select>
</template>

<script>
export default {
  name: 'ScanDeep',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: ['value']
}
</script>
