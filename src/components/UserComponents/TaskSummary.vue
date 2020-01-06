<template>
    <div>
        任务时长: <b class="theme-color">{{ taskDuration }}</b> 天，共 <b class="theme-color">{{ keywordsNumber }}</b> 个搜索词， 每天任务数量: <b class="theme-color">{{ taskDaily }}</b> 个，合计发布
        <b class="theme-color">{{ taskTotal }}</b> 个任务
    </div>
</template>

<script>
export default {
    name: 'TaskSummary',
    props: {
        taskDuration: {
            type: Number,
            default: 0
        },
        keywordsNumber: {
            type: Number,
            default: 0
        },
        taskDaily: {
            type: Number,
            default: 0
        }
    },
    computed: {
        taskTotal() {
            return Number(this.taskDuration) * Number(this.keywordsNumber) * Number(this.taskDaily)
        }
    }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
.theme-color {
    color: @primary-color;
    font-size: 1.3em;
}
</style>
