import request from './request'

// const netWork = 'https://qc6nzx.fn.thelarkcloud.com'

export function getDrawResult() {
  return request({
    url: `/lottery`,
    method: 'get'
  })
}