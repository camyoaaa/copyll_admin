export function _debounce(fn, wait) { //函数去抖动
  //函数防抖：将几次操作合并为一此操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。
  var timeout = null;
  return function () {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  }
}

export function _throttle(fn, delay) {
  //函数节流：使得一定时间内只触发一次函数。原理是通过判断是否到达一定时间来触发函数。
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        func.apply(context, args);
        timer = null;
      }, delay);
    }
  }
}

export function generateRandomNumber(start, end) { //随机生成某个范围内的整数
  return start + Math.floor(Math.random() * (end - start));
}
export function generateOrderID() { //获取订单号
  return `${new Date().getTime()}${generateRandomNumber(100000,999999)}`
}