/**
 * 猎流接口
 */
import Vue from 'vue'
import axios from 'axios'
import queryString from 'query-string'
import md5 from 'md5'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

// 创建 axios 实例
const laxios = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL1, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
laxios.interceptors.request.use(config => {


  let settingKey = config.method == 'post' ? 'data' : 'params'
  config[settingKey] = {
    ...config[settingKey],
    ...new ExtraParams({
      url: config.url,
      params: config[settingKey]
    })
  }; //添加额外的参数

  console.log('config[settingKey]', config[settingKey]);
  return config
}, err)

// response interceptor
laxios.interceptors.response.use((response) => {
  return response.data
}, err)

class ExtraParams {
  constructor({
    url,
    params
  }) {
    this.format = 'json';
    this.ver = 5;
    this.timestamp = Math.ceil(Date.now() / 1000);
    this.signkey = this.getSignkey({
      url,
      params
    })
  }
  getSignkey({
    url,
    params
  }) {
    const userSecretpem = 'abcdefghijklmnopqrxtuvwxyz';
    params = {
      ...params,
      timestamp: this.timestamp
    };
    const paramstr = queryString.stringify(params, {
      sort: (a, b) => a.localeCompare(b)
    });
    console.log('paramstr', paramstr, `${url}?${paramstr}&${userSecretpem}`);
    return md5(encodeURIComponent(`${url}?${paramstr}&${userSecretpem}`));
  }
}

export default laxios