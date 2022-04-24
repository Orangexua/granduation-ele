import request from "../utils/request";

export const pay = function (data) {
  return request({
    url: "/pay",
    method: "POST",
    data
  });
};

export const payByAdmin = function (data) {
  return request({
    url: "/payByAdmin",
    method: "POST",
    data
  });
};

export const userPayPrice = function () {
  return request({
    url: "/pay/userPrice",
    method: "GET"
  });
};
