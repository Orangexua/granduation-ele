import request from "../utils/request";

export const getUserList = function () {
  return request({
    url: "/user",
    method: "GET"
  });
};

export const getUserDetail = function () {
  return request({
    url: "/user/detail",
    method: "GET"
  });
};

export const login = function (data) {
  return request({
    url: "/login",
    method: "POST",
    data
  });
};

export const register = function (data) {
  return request({
    url: "/register",
    method: "POST",
    data
  });
};
