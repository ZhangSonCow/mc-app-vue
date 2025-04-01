import axios from 'axios';
import { useRouter } from 'vue-router';
import { BASE_API } from '../../config/env.js';

const router = useRouter();

// 创建axios实例
const service = axios.create({
  baseURL: BASE_API,
  timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    const res = response.data;
    if (res.code !== 200) {
      // 处理业务错误
      return Promise.reject(new Error(res.msg || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    // 对响应错误做点什么
    if (error.response.status === 401) {
      // 处理token过期
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

// 封装GET请求
export function get(url, params, config = {}) {
  return service({
    method: 'get',
    url,
    params,
    ...config
  });
}

// 封装POST请求
export function post(url, data, config = {}) {
  return service({
    method: 'post',
    url,
    data,
    ...config
  });
}

// 封装PUT请求
export function put(url, data, config = {}) {
  return service({
    method: 'put',
    url,
    data,
    ...config
  });
}

// 封装DELETE请求
export function del(url, config = {}) {
  return service({
    method: 'delete',
    url,
    ...config
  });
}

export default service;