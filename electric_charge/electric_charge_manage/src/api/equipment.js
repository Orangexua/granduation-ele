import request from "../utils/request";

export const getEquipment = function (params) {
  return request({
    url: "/equipment",
    method: "GET",
    params
  });
};

export const addEquipment = function (data) {
  return request({
    url: "/equipment",
    method: "POST",
    data
  });
};

export const editEquipment = function (data, id) {
  return request({
    url: "/equipment/" + id,
    method: "PUT",
    data
  });
};

export const delEquipment = function (id) {
  return request({
    url: "/equipment/" + id,
    method: "DELETE"
  });
};

export const getUserEquipment = function () {
  return request({
    url: "/equipment/user",
    method: "GET"
  });
};
