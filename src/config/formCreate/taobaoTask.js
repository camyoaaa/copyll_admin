class FormItem {
  constructor() {


    this.formItemLayout = {
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
    };

    this.link = {
      label: '',
      layout: this.formItemLayout,
      type: 'taobao',

    };
  }
}

export default {
  flow: {
    type: [

    ]
  }
}