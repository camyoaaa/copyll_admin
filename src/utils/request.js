import kaxios from './kaxios' // 项目本身axios接口
import laxios from './laxios' // 猎流axios接口

const installer = {
  vm: {},
  install(Vue) {
    if (this.installed) {
      return
    }
    this.installed = true

    Vue.kaxios = kaxios
    Vue.laxios = laxios

    Object.defineProperties(Vue.prototype, {
      $kaxios: {
        get: function get() {
          return kaxios
        }
      },
      $laxios: {
        get: function get() {
          return laxios
        }
      }
    })
  }
}

export {
  installer as VueAxios,
  kaxios as kaxios,
  laxios as laxios
}