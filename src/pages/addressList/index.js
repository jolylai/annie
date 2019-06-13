import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import "./index.scss";

@connect(({ addressList }) => ({
  ...addressList
}))
class Addresslist extends Component {
  config = {
    navigationBarTitleText: "收货地址"
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: "addressList/getAddressList"
    });
  };

  componentDidShow = () => {
    this.props.dispatch({
      type: "addressList/getAddressList"
    });
  };

  addressUpdate = () => {
    this.props.dispatch({
      type: "addressUpdate/save",
      payload: {
        addressId: "",
        showValue: {
          region_code: "",
          region_name: ""
        },
        contact_name: "",
        contact_mobile: "",
        address_detail: ""
      }
    });
    Taro.navigateTo({
      url: "/pages/addressUpdate/index"
    });
  };

  addressEdit = e => {
    const { id, name, mobile, detail, value } = e.currentTarget.dataset;
    this.props.dispatch({
      type: "addressUpdate/save",
      payload: {
        name,
        mobile,
        detail,
        addressId: id,
        addressPickerValue: value.split(",")
      }
    });
    Taro.navigateTo({
      url: "/pages/addressUpdate/index"
    });
  };

  render() {
    const { addressList } = this.props;
    return (
      <View className="addressList-page">
        {addressList.length > 0 ? (
          addressList.map(item => (
            <View className="content" key={item._id}>
              <View className="info">
                <View className="contact">
                  <Text className="name">{item.name}</Text>
                  <Text className="mobile">{item.mobile}</Text>
                </View>
                <View className="region">
                  <View className="name">{`${item.provinceName} ${
                    item.cityName
                  } ${item.areaName}`}</View>
                  <View className="detail">{item.detail}</View>
                </View>
              </View>
              <View
                className="edit"
                data-id={item._id}
                data-name={item.name}
                data-mobile={item.mobile}
                data-value={[item.provinceId, item.cityId, item.areaId]}
                data-detail={item.detail}
                onClick={this.addressEdit}
              >
                <Image
                  mode="widthFix"
                  src="http://static-r.msparis.com/uploads/9/1/91d94589817e388f6c2d641f34d99b2f.png"
                />
              </View>
            </View>
          ))
        ) : (
          <View className="empty-address">
            <Image
              mode="widthFix"
              src="https://static-rs.msparis.com/m-site/images/empty/address.png"
            />
          </View>
        )}
        <View className="add" onClick={this.addressUpdate}>
          <Image mode="widthFix" src={require("../../images/icon/add.png")} />
          <Text>添加地址</Text>
        </View>
      </View>
    );
  }
}

export default Addresslist;
