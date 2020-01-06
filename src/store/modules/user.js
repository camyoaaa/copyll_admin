import Vue from 'vue'
import {
  login,
  getInfo,
  logout
} from '@/api/login'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

class USERSTATE {
  constructor() {
    this.userid = '';
    this.username = '';
    this.token = '';
    this.avatar = '';
    this.realname = '';
    this.sex = '';
    this.phone = '';
    this.email = '';
    this.qq = '';
    this.wx = '';
    this.ww = '';
    this.vip = '';
    this.kscore = '';
    this.tscore = '';
    this.registIP = '';
    this.registTime = '';
    this.lastLoginTime = '';
    this.lastLoginIP = '';
  }
}

const user = {
  state: new USERSTATE(),

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERSTATE: (state, payload) => {
      for (const key in state) {
        state[key] = payload[key]
      }
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        console.log('login', login);
        login(userInfo).then(response => {
          commit('SET_USERSTATE', response.user)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          commit('SET_USERSTATE', response.user)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      });
    },
    // 登出
    Logout({
      commit,
      state
    }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_USERSTATE', new USERSTATE())
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user