import axios from 'axios'

export default function axiosInterceptor(reLogin, getToken) {
  axios.interceptors.request.use(
    config => {
      // 后端接口加自定义header
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
      config.headers['access-token'] = getToken && getToken()

      return config
    },
    err => {
      return Promise.reject(err)
    },
  )

  axios.interceptors.response.use(
    res => {
      if (
        res &&
        res.status === 200 &&
        res.data &&
        (res.data.status === 401 || res.data.status === 303 || res.data.status === 606)
      ) {
        reLogin && reLogin()
        return Promise.reject(new Error('无权限'))
      } else {
        return res
      }
    },
    err => {
      return Promise.reject(err)
    },
  )
}
