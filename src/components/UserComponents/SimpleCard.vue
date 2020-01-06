<template>
  <div class="ant-card ant-card-bordered ant-card-wider-padding ant-card-padding-transition">
    <div style="padding:12px">
      <slot></slot>
    </div>
    <div class="ant-card-actions" style="padding:12px">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleCard'
}
</script>
