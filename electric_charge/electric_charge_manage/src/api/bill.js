import request from "../utils/request";

export const getBill = function (params) {
  return request({
    url: "/bill",
    method: "GET",
    params
  });
};
