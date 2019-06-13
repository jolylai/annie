import Taro, { Component } from "@tarojs/taro";
import { View, Input, Image, Text, Picker } from "@tarojs/components";
import { connect } from "@tarojs/redux";

import AddressPicker from "../../components/AddressPicker";
import address from "../../utils/city";
import "./index.scss";

@connect(({ addressUpdate }) => ({
  ...addressUpdate
}))
class Addressupdate extends Component {
  config = {
    navigationBarTitleText: ""
  };

  componentDidMount = () => {};

  // picker选择数据动态渲染
  handleColumnchange = e => {
    const { column, value } = e.detail;
    const { dispatch, cities, provinces } = this.props;

    // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
    if (column === 0) {
      const { id } = provinces[value];
      dispatch({
        type: "addressUpdate/save",
        payload: {
          cities: address.cities[id],
          areas: address.areas[address.cities[id][0].id]
        }
      });
    } else if (column === 1) {
      // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
      const { id } = cities[value];
      dispatch({
        type: "addressUpdate/save",
        payload: {
          areas: address.areas[id]
        }
      });
    }
  };

  // picker赋值
  onChange = e => {
    const { value } = e.detail;

    this.props.dispatch({
      type: "addressUpdate/save",
      payload: {
        pickerValue: value
        // showValue: {
        //   region_code: detail.key,
        //   region_name: detail.fullname
        // }
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
    const { showValue, name, mobile, detail } = this.props;
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
    if (showValue.region_name === "") {
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
    this.props.dispatch({
      type: "addressUpdate/submit",
      payload: {
        showValue,
        name,
        mobile,
        detail
      }
    });
  };

  // 删除地址
  delete = () => {
    Taro.showModal({
      content: "是否删除该地址？"
    }).then(res => {
      if (res.confirm) {
        this.props.dispatch({
          type: "addressUpdate/removeAddress"
        });
      }
    });
  };

  render() {
    const {
      addressId,
      districts,
      pickerValue,
      showValue,
      name,
      mobile,
      detail,
      provinces,
      cities,
      areas
    } = this.props;

    return (
      <View className="addressUpdate-page">
        <View className="head">
          {addressId && addressId !== "" ? "编辑地址" : "添加地址"}
        </View>
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
            value={[110000, 110000, 110100]}
            // value={[0, 0, 0]}
          />
          <Picker
            className="picker"
            mode="multiSelector"
            rangeKey="name"
            range={[provinces, cities, areas]}
            onColumnChange={this.handleColumnchange}
            onChange={this.onChange}
            value={pickerValue}
          >
            {showValue.region_name == "" ? (
              <View className="label">
                省、市、区
                <View className="iconfont icon-more arrow" />
              </View>
            ) : (
              <View className="picker-item">
                {showValue.region_name}
                <View className="iconfont icon-more arrow" />
              </View>
            )}
          </Picker>
          <Input
            placeholder="详细地址"
            id="detail"
            value={detail}
            onInput={this.update}
          />
        </View>
        <View className="bottom-btn">
          {addressId && addressId !== "" && (
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
