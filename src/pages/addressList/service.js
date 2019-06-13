import Request from "../../utils/request";

export const queryAddressList = data =>
  Request({
    url: "/api/address/list",
    method: "POST",
    data
  });
