import request from "../utils/request";

export const getPrice = function () {
  return request({
    url: "/price",
    method: "GET"
  });
};

export const changePrice = function (data) {
  return request({
    url: "/price",
    method: "POST",
    data
  });
};
