<template>
  <i :class="['iconfont', `icon-${type}`]"></i>
</template>

<script>
export default {
  name: 'FontIcon',
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>
