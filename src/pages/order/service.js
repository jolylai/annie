import Request from "../../utils/request";

export const query = data =>
  Request({
    url: "/api/order/list",
    method: "POST",
    data
  });
