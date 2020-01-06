<template>
    <simple-card class="time-alloc">
        <a-row :gutter="10">
            <a-col v-for="(alloc, index) in alloc24" :key="index" :xs="4" :sm="4" :md="3" :lg="2" :xl="2" :xxl="1">
                <div class="alloc-item">
                    <h3 class="alloc-item-title" :class="{ 'past-hour': index < nowHours }">{{ `${index > 9 ? '' : '0'}${index}.00` }}</h3>
                    <div class="alloc-item-percent">{{ getPercent(alloc) }}</div>
                    <a-input-number v-model="alloc24[index]" class="time-alloc-input" @change="
              value => {
                alloc24[index] = value
              }
            "></a-input-number>
                </div>
            </a-col>
        </a-row>
        <a-row slot="footer">
            <a-col :md="24" :lg="12">
                共 <b class="theme-color">{{ taskDaily }}</b> 个任务,已分配 <b class="theme-color">{{ hadAlloc }}</b> 个,剩余未分配 <b class="theme-color">{{ toAlloc }}</b> 个
            </a-col>
            <a-col :md="24" :lg="12" style="text-align:right">
                <a-radio-group v-model="allocPlan" @change="e => allocPlanChange(e.target.value)" size="small">
                    <a-radio-button value="today">当天完成</a-radio-button>
                    <a-radio-button value="onlyday">仅白天</a-radio-button>
                    <a-radio-button value="curve">曲线分配</a-radio-button>
                    <a-radio-button value="clear">清空</a-radio-button>
                </a-radio-group>
            </a-col>
        </a-row>
    </simple-card>
</template>
<script>
const columns = new Array(24).fill(0).map((t, index) => {
    return {
        title: `${index >= 10 ? '' : '0'}${index}.00`,
        dataIndex: `time${index}`,
        scopedSlots: { customRender: `time${index}` }
    }
})

const slotname = new Array(24).fill(0).map((i, index) => {
    return `time${index}`
})
const data = []
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        time0: `Edrward ${i}`,
        time1: 32,
        time2: `London Park no. ${i}`
    })
}

const roundHours = function() {
    //当前24格式的小时,根据分钟四舍五入
    let currentHours = new Date().getHours()
    let currentMinutes = new Date().getMinutes()
    if (currentMinutes >= 30) {
        let tDate = new Date()
        tDate.setHours(currentHours + 1)
        return tDate.getHours()
    } else {
        return currentHours
    }
}
export default {
    name: 'TimeAlloc',
    model: {
        prop: 'alloc24',
        event: 'change'
    },
    props: {
        alloc24: {
            type: Array,
            default: () => new Array(24).fill(0)
        },
        taskDaily: {
            default: 0,
            type: Number
        }
    },
    data() {
        this.cacheData = data.map(item => ({ ...item }))
        return {
            data: [{ key: 1, time0: '' }],
            columns,
            slotname,
            timeAlloc: new Array(24).fill(0),
            allocPlan: 'today',
            nowHours: roundHours()
        }
    },
    computed: {
        hadAlloc() {
            return this.alloc24.reduce((a, b) => Number(a) + Number(b))
        },
        toAlloc() {
            return this.taskDaily - this.hadAlloc
        }
    },
    watch: {
        hadAlloc(value) {
            if (this.hadAlloc > this.taskDaily) {
                this.$emit('overflow', value)
            }
        },
        taskDaily(value) {
            if (value != this.hadAlloc) {
                this.allocPlanChange(this.allocPlan)
            }
        }
    },
    created() {
        this.allocPlanChange(this.allocPlan)
    },
    methods: {
        getPercent(alloc) {
            return this.hadAlloc == 0 ? `00.00%` : `${Number((alloc * 100) / this.hadAlloc).toFixed(2)}%`
        },
        allocPlanChange(action) {
            if (action == 'clear') {
                this.$emit('change', new Array(24).fill(0))
            } else {
                let startHour = { today: this.nowHours, onlyday: 8, curve: 0 }[action]
                this.$emit('change', this.getRandomAllocArray(this.taskDaily, startHour))
                startHour = null
            }
        },
        getRandomAllocArray(total, startHour) {
            //获取随机分配数组
            let lastHours = 24 - startHour
            let lastHoursArray = new Array(lastHours).fill(0)
            let pastHoursArray = new Array(startHour).fill(0)

            //给今天的时辰分配随机个数的任务
            for (var i = 0; i < total; i++) {
                var num = parseInt(Math.random() * lastHours)
                lastHoursArray[num]++
            }
            return pastHoursArray.concat(lastHoursArray)
        }
    }
}
</script>
<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
.time-alloc {
    .alloc-item {
        text-align: center;
        border: 1px solid @primary-color;
        margin-bottom: 10px;
        border-radius: 5px;
        overflow: hidden;
        .alloc-item-title {
            border-bottom: 1px solid @primary-color;
            margin: 0px;
            color: white;
            background: @primary-color;
        }
        .past-hour {
            background: @primary-5;
        }
        .alloc-item-percent {
            border-bottom: 1px solid @primary-color;
        }
    }
}

.theme-color {
    color: @primary-color;
    font-size: 1.3em;
}
.time-alloc-input {
    width: 100%;
}
</style>
<style lang="css" scoped>
.time-alloc-input >>> .ant-input {
    border-color: transparent !important;
}

.time-alloc-input >>> .ant-input-number-handler-wrap {
    display: none;
}
</style>
