<template>
    <div>
        <a-input :value="value" allowClear placeholder="请输入宝贝链接" @change="onChange" @blur="startSearch" @pressEnter="startSearch"></a-input>
        <item-show-card :options="seachResultFilter" v-if="seachResultFilter.title"></item-show-card>
    </div>
</template>

<script>
import API from '@/api/opensourceapi' //开源api
import queryString from 'query-string'

const formItemConfig = {
    taobao_product: {
        label: '宝贝链接',
        placeholder: '输入商品链接'
    }
}
export default {
    name: 'LinkSearch',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'taobao_product'
        }
    },
    data() {
        return {
            seachResultFilter: {},
            searchResult: {}
        }
    },
    methods: {
        changeLink() {
            //转换链接
        },
        clear() {
            this.searchResult = {}
            this.seachResultFilter = {}
        },
        onChange(e) {
            this.$emit('change', e.target.value)
        },
        async startSearch({ target: { value: link } }) {
            if (!link) {
                this.clear()
                return
            }
            let parseUrl = queryString.parseUrl(link)
            parseUrl.url && parseUrl.query.id && this.$emit('change', `${parseUrl.url}?id=${parseUrl.query.id}`)
            let itemid = parseUrl.query.id // 商品或店铺id
            let commond = '' //各种口令
            try {
                const res = await API.exec('getTBItemData')(itemid)
                this.searchResult = res
                this.seachResultFilter = {
                    imgSrc: res.data.item.images[0],
                    title: res.data.item.title,
                    prevSubtext: `店铺名称 : ${res.data.seller.shopName}`,
                    suffSubtext: `收藏数量 : ${res.data.item.favcount}`
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
