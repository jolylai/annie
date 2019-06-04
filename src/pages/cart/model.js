import { query, deleteOne, createOrder } from "./service";

export default {
  namespace: "cart",
  state: {
    cartGoods: []
  },

  effects: {
    *query({ payload }, { call, put }) {
      const response = yield call(query, payload);
      if (response.status) {
        yield put({
          type: "updateState",
          payload: { cartGoods: response.body }
        });
      }
      return response;
    },

    *deleteOneGoods({ payload }, { call }) {
      const response = yield call(deleteOne, payload);
      return response;
    },

    *createOrder({ payload}, {call}){
      const response = yield call(createOrder, payload)
      return response
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
