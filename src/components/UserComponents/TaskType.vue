<template>
  <a-radio-group :value="value" @change="e => $emit('change', e.target.value)" buttonStyle="solid">
    <a-radio-button v-for="(ra, index) in radios" :value="ra.value" :key="index">{{ ra.label }}</a-radio-button>
  </a-radio-group>
</template>

<script>
export default {
  name: 'TaskType',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: '',
    radios: {
      type: Array,
      default: () => []
    }
  }
}
</script>
