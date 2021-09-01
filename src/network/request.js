import axios from 'axios'

const request = axios.create({
  baseURL: 'https://qc6nzx.fn.thelarkcloud.com',
  timeout: 5000
})

export default request