import request from "../../utils/request";

export const bannerList = data =>
  request({
    url: "/api/goods/recommend",
    method: "GET",
    data
  });

export const goodsList = data =>
  request({
    url: "/api/goods/list",
    method: "POST",
    data
  });
