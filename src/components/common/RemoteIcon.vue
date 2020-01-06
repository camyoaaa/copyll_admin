
<script>
import { Icon } from 'ant-design-vue'
const RemoteIcon = Icon.createFromIconfontCN({ // 远程图标
  scriptUrl: '//at.alicdn.com/t/font_1564998_85evcfnfh2g.js'
})
export default {
  name: 'RemoteIcon',
  extends: RemoteIcon
}
</script>
<style lang="less" scoped>
  .anticon{
    font-size: 16px;
  }
</style>
