<template>
    <a-input-group compact :size="size" style="width:auto;min-width:220px">
        <a-button icon="minus" type="primary" @click="minus" :disabled="min && value <= min"></a-button>
        <a-input-number class="v-input-number" :value="value" :min="min" :max="max" :step="step" @change="onChange" style="text-align:center" :formatter="value => `${value}${unit}`"></a-input-number>
        <!-- <a-input :value="unit" style="width:40px;" readOnly></a-input> -->
        <a-button icon="plus" type="primary" @click="plus" :disabled="max && max <= value"></a-button>
    </a-input-group>
</template>

<script>
export default {
    name: 'VInputNumber',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: [String, Number],
        size: {
            type: String,
            default: 'default'
        },
        min: {
            type: [String, Number],
            default: 0
        },
        max: {
            type: [String, Number],
            default: 2000
        },
        step: {
            type: [String, Number],
            default: 1
        },
        unit: {
            type: String,
            default: ''
        }
    },
    methods: {
        onChange(value) {
            this.$emit('change', value)
        },
        minus() {
            let value = Number(this.value) - Number(this.step)
            this.$emit('change', value < Number(this.min) ? Number(this.min) : value)
        },
        plus() {
            let value = Number(this.value) + Number(this.step)
            this.$emit('change', value > Number(this.max) ? Number(this.max) : value)
        }
    }
}
</script>

<style lang="css" scoped>
.v-input-number >>> .ant-input-number-handler-wrap {
    display: none;
}
</style>
