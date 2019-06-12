import Taro from "@tarojs/taro";
import { createAddress, updateAddress, removeAddress } from "./service";
import address from "../../utils/city.js";

export default {
  namespace: "addressUpdate",
  state: {
    addressId: "",
    districts: [],
    pickerValue: [0, 0, 0],
    showValue: {
      region_code: "",
      region_name: ""
    },
    contact_name: "",
    contact_mobile: "",
    address_detail: "",
    provinces: address.provinces,
    cities: address.cities[110000],
    areas: address.areas[110100]
  },

  effects: {
    *submit({ payload }, { select, call }) {
      const response = yield call(createAddress, payload);
      return response;
    },

    *updateAddress({ payload }, { call }) {
      const response = yield call(updateAddress, payload);
      return response;
    },

    *removeAddress(_, { call, select }) {
      const response = yield call(removeAddress, payload);
      return response;
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
