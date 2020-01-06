<template>
  <div class="v-input-group">
    <a-input-group compact :size="size">
      <a-button icon="minus" type="primary" @click="minus"></a-button>
      <a-input style="width:100px;margin-top:1px" :value="value" @change="onChange">
        <span slot="addonAfter">秒</span>
      </a-input>
      <a-button icon="plus" type="primary" @click="plus"></a-button>
    </a-input-group>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'number',
    event: 'change'
  },
  props: {
    size: {
      type: String,
      default: 'default'
    },
    min: {
      type: [String, Number],
      default: 'default'
    },
    max: {
      type: [String, Number],
      default: 'default'
    },
    step: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
      value: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.$emit(value)
      }
    }
  },
  methods: {
    onChange(e) {
      const { value } = e.target
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        this.value = value
      }
    },
    minus() {
      let value = Number(this.value) - Number(this.step)
      let min = Number(this.min)
      this.value = value > min ? value : min
    },
    plus() {
      let value = Number(this.value) + Number(this.step)
      let max = Number(this.max)
      this.value = value < max ? value : max
    }
  }
}
</script>

<style lang="css">
.ant-input-group {
  width: auto;
}
</style>
