<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="20" :lg="18" :xl="16" :xxl="14" :offset="2">
        <a-form layout="horizontal">
          <a-form-item v-bind="itemLayout">
            <span slot="label" style="display:none"></span>
            <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
              <a-icon type="cloud-upload-o" class="upload-icon"/>
              <div class="mask">
                <a-icon type="plus" />
              </div>
              <img :src="option.img"/>
            </div>
          </a-form-item>
          <a-form-item label="昵称" v-bind="itemLayout">
            <a-input placeholder="给自己起个名字" />
          </a-form-item>
          <a-form-item label="真实姓名" v-bind="itemLayout">
            <a-input placeholder="给自己起个名字" />
          </a-form-item>
          <a-form-item label="性别" v-bind="itemLayout">
            <a-radio-group v-model="form.sex">
              <a-radio value="male">男</a-radio>
              <a-radio value="female">女</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="QQ" v-bind="itemLayout">
            <a-input placeholder="exp@admin.com"/>
          </a-form-item>
          <a-form-item label="微信" v-bind="itemLayout">
            <a-input placeholder="exp@admin.com"/>
          </a-form-item>
          <a-form-item label="旺旺" v-bind="itemLayout">
            <a-input placeholder="exp@admin.com"/>
          </a-form-item>
          <a-form-item label="邮箱" v-bind="itemLayout">
            <a-input placeholder="exp@admin.com"/>
          </a-form-item>
          <a-form-item label="登录密码" v-bind="itemLayout">
            <a-input placeholder="登录密码"/>
          </a-form-item>
          <a-form-item label="交易密码" v-bind="itemLayout">
            <a-input placeholder="交易密码"/>
          </a-form-item>
          <a-form-item v-bind="itemLayout">
            <span slot="label"></span>
            <div style="text-align:center">
              <a-button type="primary">提交</a-button>
              <a-button style="margin-left: 8px">保存</a-button>
            </div>
          </a-form-item>
        </a-form>

      </a-col>
    </a-row>

    

  </div>
</template>

<script>
import AvatarModal from './AvatarModal'

export default {
  components: {
    AvatarModal
  },
  computed:{
    itemLayout(){
      return {
        labelCol: {
          sm: { span: 24 },
          md: { span: 6 },
          lg: { span: 8 }
        },
        wrapperCol: {
          sm: { span: 24 },
          md: { span: 18 },
          lg: { span: 16 }
        }
      }
    }
  },
  data () {
    return {
      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },
      form:{
        sex:'male'
      }
    }
  },
  methods: {
    setavatar (url) {
      this.option.img = url
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    left:-20px;
    width: 100%;
    max-width: 120px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
