import Taro, { Component } from "@tarojs/taro";
import { View, Input, Image, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";

import AddressPicker from "../../components/AddressPicker";
import "./index.scss";

@connect(({ addressUpdate }) => ({
  ...addressUpdate
}))
class Addressupdate extends Component {
  config = {
    navigationBarTitleText: ""
  };

  handleAddressPickerChange = ({ values, names }) => {
    const { dispatch } = this.props;
    dispatch({
      type: "addressUpdate/save",
      payload: {
        addressPickerValue: values,
        addressPickerName: names
      }
    });
  };

  update = event => {
    const { value, id } = event.target;
    this.props.dispatch({
      type: "addressUpdate/save",
      payload: { [id]: value }
    });
  };

  // 保存提交
  submit = () => {
    const {
      addressPickerValue,
      addressPickerName,
      name,
      mobile,
      detail,
      dispatch
    } = this.props;
    if (name === "") {
      Taro.showToast({
        title: "请输入收货人",
        icon: "none"
      });
      return;
    }
    if (!/^1[234578]\d{9}$/.test(mobile)) {
      Taro.showToast({
        title: "手机号格式不正确",
        icon: "none"
      });
      return;
    }
    if (!addressPickerValue.length) {
      Taro.showToast({
        title: "请选择收货地址",
        icon: "none"
      });
      return;
    }
    if (detail === "") {
      Taro.showToast({
        title: "请输入详细地址",
        icon: "none"
      });
      return;
    }
    const [provinceId, cityId, areaId] = addressPickerValue;
    const [provinceName, cityName, areaName] = addressPickerName;
    dispatch({
      type: "addressUpdate/submit",
      payload: {
        name,
        mobile,
        provinceId,
        cityId,
        areaId,
        detail,
        provinceName,
        cityName,
        areaName,
        user: "5cef8d4cbe2bd83fd4644059"
      }
    }).then(res => {
      if (res.status) {
        Taro.showToast({
          title: "新增成功",
          icon: "none"
        });
        Taro.navigateBack();
      }
    });
  };

  // 删除地址
  delete = () => {
    const { dispatch, addressId } = this.props;
    Taro.showModal({
      content: "是否删除该地址？"
    }).then(res => {
      if (res.confirm) {
        dispatch({
          type: "addressUpdate/removeAddress",
          payload: {
            id: addressId
          }
        }).then(() => {
          dispatch({
            type: "addressUpdate/cleanState"
          });
          Taro.navigateBack();
        });
      }
    });
  };

  render() {
    const { addressId, name, mobile, detail, addressPickerValue } = this.props;

    return (
      <View className="addressUpdate-page">
        <View className="head">{addressId ? "编辑地址" : "添加地址"}</View>
        <View className="form">
          <Input
            placeholder="收件人"
            id="name"
            value={name}
            onInput={this.update}
          />
          <Input
            type="number"
            maxLength="11"
            placeholder="手机号码"
            id="mobile"
            value={mobile}
            onInput={this.update}
          />
          <AddressPicker
            value={addressPickerValue}
            onChange={this.handleAddressPickerChange}
          />
          <Input
            placeholder="详细地址"
            id="detail"
            value={detail}
            onInput={this.update}
          />
        </View>
        <View className="bottom-btn">
          {addressId && (
            <View className="confirm remove" onClick={this.delete}>
              <Image
                mode="widthFix"
                src={require("../../images/icon/times.png")}
              />
              <Text>删除</Text>
            </View>
          )}
          <View className="confirm" onClick={this.submit}>
            <Image
              mode="widthFix"
              src={require("../../images/icon/check.png")}
            />
            <Text>保存</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Addressupdate;
