<template>
  <div>
    <a-card style="height:100%">
      <a-tabs defaultActiveKey="1" style="margin:-10px" size="large">
        <a-tab-pane tab="任务查询" key="1"><task-table /></a-tab-pane>
        <a-tab-pane tab="积分日志" key="2"><score-table /></a-tab-pane>
        <a-tab-pane tab="推广用户" key="3"><user-table /></a-tab-pane>
        <a-tab-pane tab="推广收益" key="4"><gain-table /></a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import TaskTable from './tasktable'
import ScoreTable from './scoretable'
import UserTable from './usertable'
import GainTable from './gaintable'
const platForm = [
  {
    label: '淘宝任务',
    value: 'taobao',
    children: [
      {
        label: '流量任务',
        value: 'flow',
        children: [
          { label: 'APP流量', value: 'app' },
          { label: 'PC流量', value: 'pc' },
          { label: '店铺直访', value: 'shop' },
          { label: '商品直访', value: 'product' }
        ]
      },
      {
        label: '收藏任务',
        value: 'favorite',
        children: [
          { label: '搜索收藏', value: 'search' },
          { label: '商品收藏', value: 'product' },
          { label: '店铺收藏', value: 'shop' },
          { label: '商品推荐', value: 'recommend' },
          { label: '开团提醒', value: 'remind' }
        ]
      },
      {
        label: '加购任务',
        value: 'cart',
        children: [
          { label: '搜索加购', value: 'search' },
          { label: '商品加购', value: 'product' },
          { label: '淘抢购', value: 'shop' }
        ]
      },
      {
        label: '直播任务',
        value: 'live',
        children: [
          { label: '达人关注', value: 'talent' },
          { label: '达人普通粉', value: 'fans' },
          { label: '观看直播', value: 'watch' },
          { label: '微淘点赞', value: 'like' }
        ]
      },
      {
        label: '文章任务',
        value: 'article',
        children: [
          { label: '文章阅读数量', value: 'number' },
          { label: '文章阅读人数', value: 'people' },
          { label: '文章引导进店', value: 'guide' }
        ]
      }
    ]
  },
  {
    label: '京东任务',
    value: 'jingdong',
    children: [
      {
        label: '流量任务',
        value: 'flow',
        children: [{ label: '搜索流量', value: 'search' }]
      },
      {
        label: '收藏任务',
        value: 'favorite',
        children: [
          { label: '搜索收藏', value: 'search' },
          { label: '直接收藏', value: 'direct' }
        ]
      },
      {
        label: '加购任务',
        value: 'cart',
        children: [
          { label: '搜索加购', value: 'search' },
          { label: '直接加购', value: 'direct' }
        ]
      },
      {
        label: '关注任务',
        value: 'live',
        children: [
          { label: '达人关注', value: 'talent' },
          { label: '店铺关注', value: 'shop' }
        ]
      }
    ]
  },
  {
    label: '拼多多任务',
    value: 'pinduoduo',
    children: [
      {
        label: '流量任务',
        value: 'flow',
        children: [{ label: '搜索流量', value: 'search' }]
      },
      {
        label: '收藏任务',
        value: 'favorite',
        children: [
          { label: '搜索收藏', value: 'search' },
          { label: '商品收藏', value: 'product' },
          { label: '店铺收藏', value: 'shop' }
        ]
      }
    ]
  }
]
export default {
  components: { TaskTable, ScoreTable, UserTable, GainTable },
  methods: {
    filter(inputValue, path) {
      console.log(path)
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    },
    onChange(value, selectedOptions) {
      console.log(value, selectedOptions)
    }
  },
  data() {
    return {
      options: platForm
    }
  }
}
</script>
