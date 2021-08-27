import request from './request'

// const netWork = 'https://qc6nzx.fn.thelarkcloud.com'
//                  https://qc6nzx.fn.thelarkcloud.com/getLotteryItem
function getDrawResult() {
  return request({
    url: `/lottery`,
    method: 'get'
  })
}

function getDrawList() {
  return request({
    url: 'getLotteryItem',
    method: 'get'
  })
}



export { getDrawResult, getDrawList }