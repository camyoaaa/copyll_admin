<template>
    <div class="main user-layout-register">
        <h3 style="text-align:cenetr">用户注册</h3>
        <a-form ref="formRegister" :form="form" id="formRegister">
            <a-popover v-model="state.hadregist" :trigger="['focus']" content="该手机号已被注册" placement="rightTop">
                <a-form-item>
                    <a-input size="large" placeholder="11 位手机号" @change="phonechange" @blur="phoneblur" v-decorator="['phone', { rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }], validateTrigger: ['change', 'blur'] }]">
                        <remote-icon type="icon-shouji" slot="suffix"></remote-icon>
                    </a-input>
                </a-form-item>
            </a-popover>
            <a-popover placement="rightTop" :trigger="['focus']" :getPopupContainer="trigger => trigger.parentElement" v-model="state.passwordLevelChecked">
                <template slot="content">
                    <div :style="{ width: '240px' }">
                        <div :class="['user-register', passwordLevelClass]">
                            强度：<span>{{ passwordLevelName }}</span>
                        </div>
                        <a-progress :percent="state.percent" :showInfo="false" :strokeColor="passwordLevelColor" />
                        <div style="margin-top: 10px;">
                            <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                        </div>
                    </div>
                </template>
                <a-form-item>
                    <a-input size="large" type="password" @click="handlePasswordInputClick" autocomplete="false" placeholder="至少6位密码，区分大小写" v-decorator="['password', { rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur'] }]">
                        <remote-icon type="icon-mima" slot="suffix"></remote-icon>
                    </a-input>
                </a-form-item>
            </a-popover>
            <a-form-item>
                <a-input size="large" type="password" autocomplete="false" placeholder="确认密码" v-decorator="['password2', { rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur'] }]">
                    <remote-icon type="icon-qrmima" slot="suffix"></remote-icon>
                </a-input>
            </a-form-item>
            <a-row :gutter="16">
                <a-col class="gutter-row" :span="16">
                    <a-form-item>
                        <a-input size="large" type="text" placeholder="验证码" v-decorator="['captcha', { rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur' }]">
                            <!-- <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/> -->
                            <remote-icon slot="suffix" type="icon-yanzhengma2"></remote-icon>
                        </a-input>
                    </a-form-item>
                </a-col>
                <a-col class="gutter-row" :span="8">
                    <a-button class="getCaptcha" size="large" :disabled="state.smsSendBtn" @click.stop.prevent="getCaptcha" v-text="(!state.smsSendBtn && '获取验证码') || state.time + ' s'"></a-button>
                </a-col>
            </a-row>
            <a-form-item>
                <a-button size="large" type="primary" htmlType="submit" class="register-button" :loading="registerBtn" @click.stop.prevent="handleSubmit" :disabled="registerBtn">注册 </a-button>
                <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import md5 from 'md5'
import queryString from 'query-string'
import { mixinDevice } from '@/utils/mixin.js'
import { regist, isRegist, sendSmsCaptcha } from '@/api/login'
import { _debounce } from '@/utils/commonFunc'

const levelNames = {
    0: '低',
    1: '低',
    2: '中',
    3: '强'
}
const levelClass = {
    0: 'error',
    1: 'error',
    2: 'warning',
    3: 'success'
}
const levelColor = {
    0: '#ff0000',
    1: '#ff0000',
    2: '#ff7e05',
    3: '#52c41a'
}
export default {
    name: 'Register',
    components: {},
    mixins: [mixinDevice],
    data() {
        return {
            hadregist: false,
            form: this.$form.createForm(this),
            state: {
                time: 60,
                smsSendBtn: false,
                passwordLevel: 0,
                passwordLevelChecked: false,
                percent: 10,
                progressColor: '#FF0000',
                hadregist: false
            },
            registerBtn: false
        }
    },
    computed: {
        passwordLevelClass() {
            return levelClass[this.state.passwordLevel]
        },
        passwordLevelName() {
            return levelNames[this.state.passwordLevel]
        },
        passwordLevelColor() {
            return levelColor[this.state.passwordLevel]
        }
    },
    methods: {
        phonechange({ target: { value } }) {
            let vm = this
            if (/^1[3456789]\d{9}$/.test(value)) {
                //如果是手机号
                _debounce(vm.isRegist, 300)()
            } else {
                this.state.hadregist = false
            }
        },
        phoneblur() {},

        async isRegist() {
            try {
                let result = await isRegist(this.form.getFieldValue('phone'))
                if (!this.isMobile() && result.isRegist) {
                    this.state.hadregist = result.isRegist
                }
            } catch (error) {
                console.log(error)
            }
        },
        handlePasswordLevel(rule, value, callback) {
            let level = 0

            // 判断这个字符串中有没有数字
            if (/[0-9]/.test(value)) {
                level++
            }
            // 判断字符串中有没有字母
            if (/[a-zA-Z]/.test(value)) {
                level++
            }
            // 判断字符串中有没有特殊符号
            if (/[^0-9a-zA-Z_]/.test(value)) {
                level++
            }
            this.state.passwordLevel = level
            this.state.percent = level * 30
            if (level >= 2) {
                if (level >= 3) {
                    this.state.percent = 100
                }
                callback()
            } else {
                if (level === 0) {
                    this.state.percent = 10
                }
                callback(new Error('密码强度不够'))
            }
        },

        handlePasswordCheck(rule, value, callback) {
            const password = this.form.getFieldValue('password')
            console.log('value', value)
            if (value === undefined) {
                callback(new Error('请输入密码'))
            }
            if (value && password && value.trim() !== password.trim()) {
                callback(new Error('两次密码不一致'))
            }
            callback()
        },

        handlePhoneCheck(rule, value, callback) {
            console.log('handlePhoneCheck, rule:', rule)
            console.log('handlePhoneCheck, value', value)
            console.log('handlePhoneCheck, callback', callback)

            callback()
        },

        handlePasswordInputClick() {
            if (!this.isMobile()) {
                this.state.passwordLevelChecked = true
                return
            }
            this.state.passwordLevelChecked = false
        },

        handleSubmit() {
            const {
                form: { validateFields },
                state,
                $router,
                $notification
            } = this
            validateFields({ force: true }, async (err, values) => {
                if (!err) {
                    console.log(values)
                    state.passwordLevelChecked = false
                    // $router.push({ name: 'registerResult', params: { ...values } })
                    values.password = md5(values.password)
                    if (this.state.hadregist) {
                        $notification['error']({
                            message: '提示',
                            description: '该手机号已被注册,请使用其他手机号',
                            duration: 2
                        })
                        return
                    }
                    if (this.$ls.get('captcha') != values.captcha) {
                        $notification['error']({
                            message: '提示',
                            description: '验证码错误,请重新输入',
                            duration: 2
                        })
                        return
                    }

                    // if (this.smsPhone != values.phone) {
                    //     $notification['error']({
                    //         message: '提示',
                    //         description: '您填写的不是接收验证码短信的手机',
                    //         duration: 2
                    //     })
                    //     return
                    // }
                    try {
                        const guiderid = queryString.parseUrl(window.location.href).query.tid
                        let res = await regist({ username: values.phone, guiderid, phone: values.phone, password: values.password })
                        $notification['success']({
                            message: '提示',
                            description: '注册成功,赠送200积分已到账,快去使用吧!',
                            duration: 2
                        })
                        const timeout = setTimeout(() => {
                            $router.push({ name: 'login', params: { username: values.phone } })
                            window.clearTimeout(timeout)
                        }, 2000)
                    } catch (error) {
                        this.requestFailed(err)
                    }
                }
            })
        },

        getCaptcha(e) {
            e.preventDefault()
            const {
                form: { validateFields },
                state,
                $message,
                $notification
            } = this

            validateFields(['phone'], { force: true }, (err, values) => {
                if (!err) {
                    state.smsSendBtn = true

                    const interval = window.setInterval(() => {
                        if (state.time-- <= 0) {
                            state.time = 60
                            state.smsSendBtn = false
                            window.clearInterval(interval)
                        }
                    }, 1000) //倒计时模块

                    const hide = $message.loading('验证码发送中..', 0)

                    sendSmsCaptcha({ phone: values.phone })
                        .then(res => {
                            this.$ls.set('captcha', res.sixCaptcha, 10 * 60 * 1000) //把验证码存入storage,有效期10分钟
                            this.smsPhone = res.smsPhone
                            setTimeout(hide, 1000)
                            $notification['success']({
                                message: '提示',
                                description: '验证码发送成功，请查看您的手机短信',
                                duration: 8
                            })
                        })
                        .catch(err => {
                            setTimeout(hide, 1)
                            clearInterval(interval)
                            state.time = 60
                            state.smsSendBtn = false
                            this.requestFailed(err)
                        })
                }
            })
        },
        requestFailed(err) {
            this.$notification['error']({
                message: '错误',
                description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
                duration: 4
            })
            this.registerBtn = false
        }
    },
    watch: {
        'state.passwordLevel'(val) {
            console.log(val)
        }
    }
}
</script>
<style lang="less">
.user-register {
    &.error {
        color: #ff0000;
    }

    &.warning {
        color: #ff7e05;
    }

    &.success {
        color: #52c41a;
    }
}

.user-layout-register {
    .ant-input-group-addon:first-child {
        background-color: #fff;
    }
}
</style>
<style lang="less" scoped>
.user-layout-register {
    & > h3 {
        font-size: 16px;
        margin-bottom: 20px;
    }

    .getCaptcha {
        display: block;
        width: 100%;
        height: 40px;
    }

    .register-button {
        width: 50%;
    }

    .login {
        float: right;
        line-height: 40px;
    }
}
</style>
