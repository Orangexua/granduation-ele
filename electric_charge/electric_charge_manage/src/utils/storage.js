/**
 * 存储sessionStorage
 */
export const setStore = (name, content) => {
  sessionStorage.setItem(name, content);
};
/**
 * 获取localStorage
 */

export const getStore = (params) => {
  return sessionStorage.getItem(params);
};
/**
 * 删除localStorage
 */
export const removeStore = (params) => {
  sessionStorage.removeItem(params);
};
