import Request from "../../utils/request";

export const homepage = data =>
  Request({
    url: "/homepage-v3",
    method: "GET",
    data
  });

export const product = data =>
  Request({
    url: "/product/filter",
    method: "GET",
    data
  });

export const goodsList = data =>
  Request({
    url: "/api/goods/list",
    method: "POST",
    data
  });
