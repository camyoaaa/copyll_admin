<template>
    <div>
        <a-row :gutter="24">
            <a-col :md="24" :lg="16">
                <a-form>
                    <a-form-item label="客服电话">
                        <a-input v-model="serviceTel"></a-input>
                    </a-form-item>
                    <a-form-item label="客服QQ">
                        <a-input v-model="serviceQQ"></a-input>
                    </a-form-item>
                    <a-form-item label="客服微信">
                        <a-input v-model="serviceWX"></a-input>
                    </a-form-item>
                    <a-form-item label="客服邮箱">
                        <a-input v-model="serviceEmail"></a-input>
                    </a-form-item>
                    <a-form-item label="联系地址">
                        <a-input v-model="serviceAddress"></a-input>
                    </a-form-item>
                    <a-form-item label="微信二维码">
                        <a-input v-model="serviceQRCode"></a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary">提交</a-button>
                        <a-button style="margin-left: 8px">保存</a-button>
                    </a-form-item>
                </a-form>
            </a-col>
            <a-col :md="24" :lg="8">
                <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
                    <div class="mask">
                        <a-icon type="plus" />
                    </div>
                    <img :src="imageUrl"/>
                </div>
                <div style="margin:20px;text-align:center">
                    <a-button type="primary" @click="$refs.modal.edit(1)">上传二维码</a-button>
                </div>
                
                <avatar-modal ref="modal" @ok="setavatar"></avatar-modal>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import AvatarModal from './AvatarModal.vue'
function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}
export default {
    components: { AvatarModal },
    data() {
        return {
            serviceTel: '',
            serviceQQ: '',
            serviceWX: '',
            serviceEmail: '',
            serviceAddress: '',
            serviceQRCode: '',
            previewVisible: false,
            previewImage: '',
            loading: false,
            imageUrl: 'http://yun.zx350zx.com/images/qrcode.png'
        }
    },
    methods: {
        setavatar(url) {
            console.log(url)
            this.imageUrl = url
        }
    }
}
</script>

<style lang="less" scoped>
.ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 200px;
    // border-radius: 50%;
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
        background: rgba(0, 0, 0, 0.4);
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

    img,
    .mask {
        width: 100%;
        max-width: 200px;
        height: 100%;
        // border-radius: 50%;
        overflow: hidden;
    }
}
</style>