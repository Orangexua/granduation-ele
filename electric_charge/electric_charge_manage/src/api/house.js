import request from "../utils/request";

export const getHouse = function (params) {
  return request({
    url: "/house",
    method: "GET",
    params
  });
};

export const addHouse = function (data) {
  return request({
    url: "/house",
    method: "POST",
    data
  });
};

export const editHouse = function (data, id) {
  return request({
    url: "/house/" + id,
    method: "PUT",
    data
  });
};

export const delHouse = function (id) {
  return request({
    url: "/house/" + id,
    method: "DELETE"
  });
};
