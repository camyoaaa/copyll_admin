const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 4
    },
    md: {
      span: 3
    },
    lg: {
      span: 2
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 20
    },
    md: {
      span: 21
    },
    lg: {
      span: 22
    }
  }
}

const taobaoFlowTypes = [{
    value: 'app',
    label: 'APP流量'
  },
  {
    value: 'pc',
    label: 'PC流量'
  },
  {
    value: 'shop_visit',
    label: '店铺直访'
  },
  {
    value: 'item_visit',
    label: '商品直访'
  }
]
export default {
  formItemLayout,
  taobaoFlowTypes
}