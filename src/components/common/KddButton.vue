<template>
  <a-button type="primary" :ghost="!hover" @mouseenter="hover = true" @mouseleave="hover = false" shape="round" size="default">
    <slot></slot>
  </a-button>
</template>

<script>
export default {
  data() {
    return {
      hover: false
    }
  }
}
</script>
