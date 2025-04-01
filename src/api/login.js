import request from '@/utils/request'

/**
 * 登录接口
 * @param {Object} data - 登录参数 { username, password }
 */
export const login = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/**
 * 登出接口
 * @param {string} token - 可选的 JWT Token（通常由请求拦截器自动添加）
 */
export const logout = () => {
  return request({
    url: '/logout',
    method: 'post'
  })
}