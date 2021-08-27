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

//返回值示例
/*[ { id: 0,
  name: '坐垫',
  img:
    'https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qc6nzx/c54f6bafe2e5c1c3_1630037785447.png' }
]*/


export {getDrawResult, getDrawList}