<template>
  <a-card>
    <div style="display:flex;margin:-15px -20px">
      <div class="img"><img :src="options.imgSrc" alt="" width="80" height="80" /></div>
      <div style="margin-left:20px">
        <h2 style="font-size:18px">{{ options.title }}</h2>
        <a-row style="color:#ccc;line-height:normal">
          <a-col :span="12">
            {{ options.prevSubtext }}
          </a-col>
          <a-col :span="12">
            {{ options.suffSubtext }}
          </a-col>
        </a-row>
      </div>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'ItemShowCard',
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          imgSrc: '//mapp.alicdn.com/1567136347993D2C9Kl7VvpATQim.png',
          title: '淘宝商品',
          prevSubtext: '店铺 : 淘宝店铺',
          suffSubtext: '收藏数量 : 0'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
