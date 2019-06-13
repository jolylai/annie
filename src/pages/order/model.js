import { query } from "./service";

export default {
  namespace: "order",
  state: {
    list: []
  },

  effects: {
    *query({ payload }, { call, put }) {
      const response = yield call(query, payload);
      if (response.status) {
        yield put({
          type: "updateState",
          payload: {
            list: response.body
          }
        });
      }
      return response;
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
