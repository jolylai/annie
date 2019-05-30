import request from "../../utils/request";

export const query = data =>
  request({
    url: "/api/cart/list",
    method: "POST",
    data
  });

export const deleteOne = ({ goodsId }) =>
  request({
    url: `/api/cart/deleteone/${goodsId}`,
    method: "GET"
  });

export const createOrder = params => {
  return request({
    url: `/api/order/create`,
    method: "POST",
    data: params
  });
};
