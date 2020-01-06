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
        { key: 'id', dataIndex: 'id', title: 'ID' },
        { key: 'name', dataIndex: 'name', title: '任务名称' },
        { key: 'type', dataIndex: 'type', title: '任务类型' },
        { key: 'progress', dataIndex: 'progress', title: '任务进度', scopedSlots: { customRender: 'progress' } },
        { key: 'spend', dataIndex: 'spend', title: '消耗积分' },
        { key: 'status', dataIndex: 'status', title: '任务状态' },
        { key: 'details', dataIndex: 'details', title: '商品ID(关键词)/店铺URL', scopedSlots: { customRender: 'details' } },
        { key: 'actions', dataIndex: 'actions', title: '操作', scopedSlots: { customRender: 'actions' } }
      ],
      sourceData: [{ key: '123', id: '123', name: '测试任务', type: '商品收藏', total: 300, done: 290, spend: 2000, status: '进行中', details: 'xxxx' }]
    }
  },
  methods: {
    getPercent(total, done) {
      return Math.round((done * 100) / total)
    }
  }
}
</script>
