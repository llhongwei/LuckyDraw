import request from './request'

// https://qc6nzx.fn.thelarkcloud.com/lottery
export function getDrawResult() {
  return request({
    url: `lottery`,
    method: 'get'
  })
}

// https://qc6nzx.fn.thelarkcloud.com/getLotteryItem
export function getDrawList(data) {
  return request({
    url: 'getLotteryItem',
    method: 'post',
    data
  })
}

// https://qc6nzx.fn.thelarkcloud.com/login
export function userLogin(data) {
  return request({
    url: 'login',
    method: 'post',
    data
  })
}

// https://qc6nzx.fn.thelarkcloud.com/getOreNums
export function getOreNums(data) {
  return request({
    url: 'getOreNums',
    method: 'post',
    data
  })
}

// // https://qc6nzx.fn.thelarkcloud.com/updateOreNum
export function updateOreNum(data) {
  return request({
    url: 'updateOreNum',
    method: 'post',
    data
  })
}

// https://qc6nzx.fn.thelarkcloud.com/changeLotteryItemStatus
export function changeLotteryItemStatus(data) {
  return request({
    url: 'changeLotteryItemStatus',
    method: 'post',
    data
  })
}

// https://qc6nzx.fn.thelarkcloud.com/setLotteryItem
export function setLotteryItem(data) {
  return request({
    url: 'setLotteryItem',
    method: 'post',
    data
  })
}

// https://qc6nzx.fn.thelarkcloud.com/getLuckyItemCount
export function getLuckyItemCount() {
  return request({
    url: 'getLuckyItemCount',
    method: 'get'
  })
}

// https://qc6nzx.fn.thelarkcloud.com/updateLotteryItem
export function updateLotteryItem(data) {
  return request({
    url: 'updateLotteryItem',
    method: 'post',
    data
  })
}

// https://qc6nzx.fn.thelarkcloud.com/deleteLotteryItem
export function deleteLotteryItem(data) {
  return request({
    url: 'deleteLotteryItem',
    method: 'post',
    data
  })
}