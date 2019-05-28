import Request from "../../utils/request";

// 获取商品详情
export const query = ({ id }) =>
  Request({
    url: `/api/goods/detail/${id}`
  });
