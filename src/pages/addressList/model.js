import { queryAddressList } from "./service";

export default {
  namespace: "addressList",
  state: {
    addressList: []
  },

  effects: {
    *getAddressList(_, { call, put }) {
      const response = yield call(queryAddressList, {
        user: "5cef8d4cbe2bd83fd4644059"
      });
      if (response.status) {
        yield put({
          type: "updateState",
          payload: {
            addressList: response.body
          }
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
