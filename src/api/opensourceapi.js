import Vue from 'vue'
const Jsonp = Vue.jsonp;

class OpenSourceApi {
  exec(funname, otherargs) {
    let execfun = this[funname]
    if (typeof execfun !== 'function') {
      return function () {
        throw new Error(`function '${funname}' is not exist`)
      }
    }
    return otherargs ? this[funname](...otherargs) : this[funname]
  }
  getTBItemData(itemNumId) {
    const timeout = 5000
    let param = {
      AntiCreep: true,
      H5Request: true,
      type: 'jsonp',
      dataType: 'jsonp',
      data: `{"itemNumId":"${itemNumId}","detail_v":"3.3.2"}`
    }
    let jsonpUrl = 'https://acs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/'
    return Jsonp(jsonpUrl, {
      ...param,
      timeout
    })
  }
}

export default new OpenSourceApi()