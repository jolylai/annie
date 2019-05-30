import Taro from "@tarojs/taro";
import { baseUrl, noConsole } from "../config";

export default options => {
  const { url, method = "GET", data = {} } = options;
  if (!noConsole) {
    console.log(
      `${new Date().toLocaleString()}【 M=${url} 】P=${JSON.stringify(data)}`
    );
  }
  return Taro.request({
    url: baseUrl + url,
    data,
    header: {
      "Content-Type": "application/json"
    },
    method: method.toUpperCase()
  }).then(res => {
    const { statusCode, data } = res;

    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(
          `${new Date().toLocaleString()}【 M=${url} 】【接口响应：】`,
          data
        );
      }
      if (!data.status) {
        Taro.showToast({
          title: data.message,
          icon: "none",
          mask: true
        });
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  });
};
