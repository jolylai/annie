import { query, addToCart } from "./service";

export default {
  namespace: "detail",
  state: {
    data: {}
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { status, body } = yield call(query, payload);
      if (status) {
        yield put({
          type: "updateState",
          payload: {
            data: body
          }
        });
      }
    },

    *addToCart({ payload }, { call }) {
      const response = yield call(addToCart, payload);
      return response;
    }
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
