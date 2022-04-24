import axios from "axios";
import { getStore } from "./storage";
import router from "../router";
import { Message } from "element-ui";

const request = axios.create({
  baseURL: "http://localhost:9001",
  timeout: 5000
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = `Bearer ${getStore("token")}`;
    // config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiLnlKjmiLcxIiwicGFzc3dvcmQiOiIxMjM0NTY3ODkiLCJwaG9uZSI6IjEzNzc3Nzc3Nzc3IiwiYWRkcmVzcyI6IuS4iua1t-W4gua1puS4nOaWsOWMuiIsInJvbGUiOjAsImNyZWF0ZV90aW1lIjoiMjAyMi0wNC0xOVQxNjowMDowMC4wMDBaIiwiaWF0IjoxNjUwNDQ2NzIwfQ.U3eC2a7NGDc66Uqc28Q2DmXvdn6rIsNt7xjlv5Yyx2I`;
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.data.code !== 1) {
      return Promise.reject(response.data.msg);
    }
    return response.data;
  },
  function (error) {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误(400)";
          break;
        case 401:
          Message.error("未授权，请重新登录");
          router.push("/login");
          error.message = "未授权，请重新登录(401)";
          break;
        case 403:
          Message.error("没有权限");
          router.push("/login");
          error.message = "拒绝访问(403)";
          break;
        case 404:
          error.message = "请求出错(404)";
          break;
        case 408:
          error.message = "请求超时(408)";
          break;
        case 500:
          error.message = "服务器错误(500)";
          break;
        case 501:
          error.message = "服务未实现(501)";
          break;
        case 502:
          error.message = "网络错误(502)";
          break;
        case 503:
          error.message = "服务不可用(503)";
          break;
        case 504:
          error.message = "网络超时(504)";
          break;
        case 505:
          error.message = "HTTP版本不受支持(505)";
          break;
        default:
          error.message = `连接出错(${error.response.status})!`;
      }
    } else {
      error.message = "服务器连接超时";
    }
    return Promise.reject(error.message);
  }
);

export default request;
