import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'

const request = axios.create({
  baseURL: 'https://qc6nzx.fn.thelarkcloud.com',
  timeout: 5000
})
// // 请求拦截
// request.interceptors.request.use(
//   config => {
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// // 响应拦截
// request.interceptors.response.use(
//   response => {
//     const res = response.data
//     if (res.code !== 200) {
//       if (res.status === 401) {
//         MessageBox.confirm('登录信息已过期，请重新登录！', '退出登录', {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         })
//       } else {
//         Message({
//           message: res.codeMessage || 'Error',
//           type: 'error',
//           duration: 5 * 1000
//         })
//       }
//       return Promise.reject(new Error(res.codeMessage || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )


export default request