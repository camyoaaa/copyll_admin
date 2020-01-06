<template>
    <a-affix :offsetBottom="0">
        <div style="background:white">
            <!-- <footer-tool-bar :style="{ width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 221 : 81}px)` : '100%' }"> -->
            <!-- <a-card> -->
            <a-divider></a-divider>
            <div style="display:flex;justify-content:space-between;flex-wrap:wrap;padding:10px;padding-top:0px">
                <div>
                    任务耗时:<b class="theme-color">{{ timeSpend }}</b> 秒,单次消费:<b class="theme-color">{{ singleScoreSpend }}</b> 积分(<b class="theme-color">{{ singleRmbSpend }}</b>元),预计消费:<b class="theme-color">{{ totalSpend }}</b>积分
                </div>
                <div>
                    <a-button size="large" type="primary" icon="deployment-unit" @click="$emit('publish')">发布任务</a-button>
                    <a-button size="large" style="margin-left:20px" icon="save" @click="$emit('save')">保存任务</a-button>
                </div>
            </div>
        </div>
        <!-- </a-card> -->
        <!-- </footer-tool-bar> -->
    </a-affix>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar/KddFooterToolBar'
import { mixin, mixinDevice } from '@/utils/mixin'

export default {
    name: 'FormFooter',
    mixins: [mixin, mixinDevice],
    components: { FooterToolBar },
    props: {
        timeSpend: Number,
        singleScoreSpend: Number,
        singleRmbSpend: Number,
        taskTotalNumber: Number
    },
    computed: {
        totalSpend() {
            return this.taskTotalNumber * this.singleScoreSpend
        }
    }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less'; // 引入官方提供的 less 样式入口文件
.theme-color {
    color: @primary-color;
    font-size: 1.3em;
}
</style>
