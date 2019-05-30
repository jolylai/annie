import { goodsList, bannerList } from "./service";

export default {
  namespace: "home",
  state: {
    banner: [],
    goodsList: [],
    page: 1
  },
  effects: {
    *qureyBanner(_, { call, put }) {
      const response = yield call(bannerList);
      if (response.status === true) {
        yield put({
          type: "updateState",
          payload: {
            banner: response.body.map(goods => goods.imgUrl)
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
        const { body } = response;
        yield put({
          type: "updateState",
          payload: { goodsList: [...prevGoodsList, ...body] }
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
