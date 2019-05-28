import * as homeApi from "./service";
import { goodsList } from "./service";

export default {
  namespace: "home",
  state: {
    banner: [],
    brands: [],
    products_list: [],
    goodsList: [],
    page: 1
  },
  effects: {
    *load(_, { call, put }) {
      const { status, data } = yield call(homeApi.homepage, {});
      if (status === "ok") {
        yield put({
          type: "updateState",
          payload: {
            banner: data.banner,
            brands: data.brands
          }
        });
      }
    },

    *queryGoodsList({ payload }, { call, put }) {
      const { pageNumber = 1, prevGoodsList = [] } = payload;
      const response = yield call(goodsList, {
        pageNumber,
        pageSize: 10
      });
      if (response.status) {
        const { list } = response.body;
        yield put({
          type: "updateState",
          payload: { goodsList: [...prevGoodsList, ...list] }
        });
      }
    }
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
