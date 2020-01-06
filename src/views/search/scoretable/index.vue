<template>
  <div>
    <special-cascader
      @change="
        select => {
          tstypes = select
        }
      "
    ></special-cascader>
    <a-range-picker v-model="daterange" style="width:250px"></a-range-picker>
    <a-input style="width:400px">
      <a-select slot="addonBefore" v-model="searchBy">
        <a-select-option v-for="(by, index) in searchByList" :key="index" :value="by.value">{{ by.label }}</a-select-option>
      </a-select>
    </a-input>
    <a-button type="primary">查询</a-button>
    <a-row style="margin-top:20px">
      <a-table :columns="columns" :dataSource="sourceData" style="width:100%">
        <template slot="progress" slot-scope="text, record">
          <div style="width:80%">
            <a-progress :percent="getPercent(record.total, record.done)" />
          </div>
          {{ record.done }} / {{ record.total }}
        </template>

        <template slot="details" slot-scope="record">
          ID: <br />
          关键词:<br />
        </template>
      </a-table>
    </a-row>
  </div>
</template>

<script>
export default {
  created() {
    this.daterange = [this.$moment(), this.$moment()]
  },
  data() {
    return {
      tstypes: '',
      daterange: [],
      searchBy: 'id',
      searchByList: [
        { value: 'id', label: '任务ID' },
        { value: 'otherid', label: '商品/店铺ID' },
        { value: 'keywords', label: '关键词' },
        { value: 'remark', label: '备注' }
      ],
      columns: [
        { key: 'score', dataIndex: 'score', title: '积分' },
        { key: 'changetime', dataIndex: 'changetime', title: '变更时间' },
        { key: 'ids', dataIndex: 'ids', title: '任务ID/充值ID', scopedSlots: { customRender: 'ids' } },
        { key: 'type', dataIndex: 'type', title: '类型' },
        { key: 'remark', dataIndex: 'remark', title: '备注' }
      ],
      sourceData: [{ key: '123', score: 3000, id: '123', changetime: '2019-10-26 10:44:16', id: 121231, type: '系统录入', remark: '新用户注册赠送' }]
    }
  },
  methods: {
    getPercent(total, done) {
      return Math.round((done * 100) / total)
    }
  }
}
</script>
