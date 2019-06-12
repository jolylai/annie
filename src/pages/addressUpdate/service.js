import Request from "../../utils/request";

// 获取省市区列表
export const createAddress = data =>
  Request({
    url: "/api/address/create",
    method: "POST",
    data
  });

// 更新地址
export const updateAddress = data =>
  Request({
    url: "/user/address/update",
    method: "POST",
    data
  });

// 删除地址
export const removeAddress = data =>
  Request({
    url: "/user/address/:id",
    method: "DELETE",
    data
  });
