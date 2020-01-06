import api from './index'
import {
  kaxios,
  laxios
} from '@/utils/request'



export function save(formdata) {
  return kaxios({
    url: '/task/save',
    method: 'post',
    data: formdata
  })
}

export function getList() {
  return kaxios({
    url: '/task/list',
    method: 'get',
  })
}