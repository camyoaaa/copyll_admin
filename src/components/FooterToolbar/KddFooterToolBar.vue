<template>
    <div :class="prefixCls" style="min-height:80px;line-height:auto">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'FooterToolBar',
    props: {
        prefixCls: {
            type: String,
            default: 'ant-pro-footer-toolbar'
        },
        extra: {
            type: [String, Object],
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
</style>
