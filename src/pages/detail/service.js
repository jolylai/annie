import Request from "../../utils/request";

// 获取商品详情
export const query = ({ id }) =>
  Request({
    url: `/api/goods/${id}`
  });

export const addToCart = params =>
  Request({
    url: `/api/cart/addGoods`,
    method: "POST",
    data: params
  });
