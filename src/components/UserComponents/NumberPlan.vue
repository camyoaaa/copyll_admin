<template>
  <div>
    <a-radio-group buttonStyle="solid" :value="form.plan" @change="onPlanChange" v-if="!onlycustom">
      <a-radio-button value="born">新品期</a-radio-button>
      <a-radio-button value="grow">成长期</a-radio-button>
      <a-radio-button value="ripe">成熟期</a-radio-button>
      <a-radio-button value="maintain">维护期</a-radio-button>
      <a-radio-button value="custom">自定义</a-radio-button>
    </a-radio-group>
    <simple-card>
      <a-row v-if="!onlycustom && form.plan != 'custom'">
        <label style="line-height:32px">{{ taskPlanTips }}</label>
      </a-row>
      <a-row v-else style="margin-bottom:-12px">
        <two-form-item>
          <a-range-picker slot="item1" :value="form.dateRange" @change="onDateRangeChange" />
          <v-input-number slot="item2" :value="form.taskDaily" :min="50" :step="50" unit="个" @change="onDailyChange" />
        </two-form-item>
      </a-row>
      <slot slot="footer" name="footer"></slot>
    </simple-card>
  </div>
</template>

<script>
import moment from 'moment'

const taskPlan = {
  born: {
    taskDaily: 60,
    taskDuration: 7,
    tips: '商品上线初期，销量较低，仅需引入基本流量'
  },
  grow: {
    taskDaily: 100,
    taskDuration: 14,
    tips: '有一定销量基础，需逐步增加流量投入，支撑成为爆款'
  },
  ripe: {
    taskDaily: 300,
    taskDuration: 21,
    tips: '热销宝贝，销量增长最快阶段，需引入大量流量、销量'
  },
  maintain: {
    taskDaily: 450,
    taskDuration: 30,
    tips: '销量平稳阶段，维持转化率，保持排名稳定'
  }
}

export default {
  name: 'NumberPlan',
  model: {
    prop: 'form',
    event: 'change'
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          plan: 'born',
          taskDaily: 0,
          dateRange: [moment(), moment()]
        }
      }
    },
    onlycustom: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    taskPlanTips() {
      return (taskPlan[this.form.plan] || {}).tips
    }
  },
  methods: {
    initModel(type) {
      return {
        ...this.form,
        plan: type,
        taskDaily: type != 'custom' ? taskPlan[type].taskDaily : this.form.taskDaily,
        dateRange: type != 'custom' ? [moment(), moment().add(taskPlan[type].taskDuration, 'days')] : this.form.dateRange
      }
    },
    onPlanChange({ target: { value } }) {
      this.$emit('change', this.initModel(value))
    },
    onDateRangeChange(dateRange) {
      this.$emit('change', { ...this.form, dateRange: dateRange })
    },
    onDailyChange(number) {
      this.$emit('change', { ...this.form, taskDaily: number })
    }
  }
}
</script>

<style lang="scss" scoped></style>
