import { createAddress, updateAddress, removeAddress } from "./service";

export default {
  namespace: "addressUpdate",
  state: {
    addressId: "",
    addressPickerValue: [],
    addressPickerName: [],
    name: "",
    mobile: "",
    detail: ""
  },

  effects: {
    *submit({ payload }, { call }) {
      const response = yield call(createAddress, payload);
      return response;
    },

    *updateAddress({ payload }, { call }) {
      const response = yield call(updateAddress, payload);
      return response;
    },

    *removeAddress({ payload }, { call }) {
      const response = yield call(removeAddress, payload);
      return response;
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    cleanState(state) {
      return {
        ...state,
        addressId: "",
        addressPickerValue: [],
        addressPickerName: [],
        name: "",
        mobile: "",
        detail: ""
      };
    }
  }
};
