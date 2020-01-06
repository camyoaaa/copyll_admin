<template>
    <div class="main">
        <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">

            <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="账户或密码错误" />
            <a-form-item>
                <a-input size="large" type="text" placeholder="11位手机号码" v-decorator="[
                'username',
                {initialValue:$route.params.username,
                rules: [{ required: true, message: '请输入正确的手机号',pattern: /^1[34578]\d{9}$/ },], validateTrigger: 'change'}
              ]">
                    <remote-icon slot="prefix" type="icon-shouji"></remote-icon>
                    <!-- <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/> -->
                </a-input>
            </a-form-item>

            <a-form-item>
                <a-input size="large" type="password" autocomplete="false" placeholder="请输入密码" v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]">
                    <remote-icon slot="prefix" type="icon-mima"></remote-icon>
                    <!-- <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/> -->
                </a-input>
            </a-form-item>

            <a-form-item>
                <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
                <router-link :to="{ name: 'recover', params: { user: 'aaa'} }" class="forge-password" style="float: right;">忘记密码</router-link>
            </a-form-item>

            <a-form-item style="margin-top:24px">
                <a-button size="large" type="primary" htmlType="submit" class="login-button" :loading="state.loginBtn" :disabled="state.loginBtn">登录</a-button>
            </a-form-item>
            <div class="user-login-other">
                还没账号？
                <router-link :to="{ name: 'register' }">注册新用户</router-link>
            </div>
        </a-form>

        <two-step-captcha v-if="requiredTwoStepCaptcha" :visible="stepCaptchaVisible" @success="stepCaptchaSuccess" @cancel="stepCaptchaCancel"></two-step-captcha>
    </div>
</template>

<script>
import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { sendSmsCaptcha, get2step } from '@/api/login'

export default {
    components: {
        TwoStepCaptcha
    },
    data() {
        return {
            customActiveKey: 'tab1',
            loginBtn: false,
            // login type: 0 email, 1 username, 2 telephone
            loginType: 0,
            isLoginError: false,
            requiredTwoStepCaptcha: false,
            stepCaptchaVisible: false,
            form: this.$form.createForm(this),
            state: {
                time: 60,
                loginBtn: false,
                // login type: 0 email, 1 username, 2 telephone
                loginType: 0,
                smsSendBtn: false
            }
        }
    },
    created() {
        // get2step({})
        //     .then(res => {
        //         this.requiredTwoStepCaptcha = res.result.stepCode
        //     })
        //     .catch(() => {
        //         this.requiredTwoStepCaptcha = false
        //     })
        // this.requiredTwoStepCaptcha = true
    },
    methods: {
        ...mapActions(['Login', 'Logout']),
        // handler
        handleUsernameOrEmail(rule, value, callback) {
            const { state } = this
            const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
            if (regex.test(value)) {
                state.loginType = 0
            } else {
                state.loginType = 1
            }
            callback()
        },
        handleSubmit(e) {
            e.preventDefault()
            const {
                form: { validateFields },
                state,
                customActiveKey,
                Login
            } = this

            state.loginBtn = true

            const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']

            validateFields(['username', 'password'], { force: true }, (err, values) => {
                if (!err) {
                    const loginParams = { ...values }
                    loginParams.username = values.username
                    loginParams.phone = values.username
                    loginParams.password = md5(values.password)
                    loginParams.rememberMe = values.rememberMe
                    Login(loginParams)
                        .then(res => this.loginSuccess(res))
                        .catch(err => this.requestFailed(err))
                        .finally(() => {
                            state.loginBtn = false
                        })
                } else {
                    setTimeout(() => {
                        state.loginBtn = false
                    }, 600)
                }
            })
        },
        stepCaptchaSuccess() {
            this.loginSuccess()
        },
        stepCaptchaCancel() {
            this.Logout().then(() => {
                this.loginBtn = false
                this.stepCaptchaVisible = false
            })
        },
        loginSuccess(res) {
            this.$router.push({ name: 'home' })
            // 延迟 1 秒显示欢迎信息
            setTimeout(() => {
                this.$notification.success({
                    message: '欢迎',
                    description: `${timeFix()}，欢迎回来`
                })
            }, 1000)
            this.isLoginError = false
        },
        requestFailed(err) {
            console.log(err)
            this.isLoginError = true
            this.$notification['error']({
                message: '错误',
                description: ((err.response || {}).data || {}).message || `请求出现错误，请稍后再试`,
                duration: 4
            })
        }
    }
}
</script>

<style lang="less" scoped>
.user-layout-login {
    label {
        font-size: 14px;
    }

    .getCaptcha {
        display: block;
        width: 100%;
        height: 40px;
    }

    .forge-password {
        font-size: 14px;
    }

    button.login-button {
        padding: 0 15px;
        font-size: 16px;
        height: 40px;
        width: 100%;
    }

    .user-login-other {
        text-align: center;
        margin-top: 24px;
        line-height: 22px;

        .item-icon {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.2);
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
                color: #1890ff;
            }
        }

        .register {
            float: right;
        }
    }
}
</style>
