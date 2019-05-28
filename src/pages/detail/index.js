import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, Image, Button } from "@tarojs/components";
import * as detailApi from "./service";
import MySwiper from "../../components/MySwiper";
import "./index.scss";

@connect(({ cart, detail }) => ({
  ...cart,
  data: detail.data
}))
class Detail extends Component {
  config = {
    navigationBarTitleText: ""
  };

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "detail/query",
      payload: { id: this.$router.params.id || "5cc0651ad7101e2c40fbb68f" }
    });
  };

  openSize() {
    Taro.navigateTo({
      url: "/pages/size/index"
    });
  }

  //加入衣袋
  join = async () => {
    if (!Taro.getStorageSync("access_token")) {
      Taro.navigateTo({
        url: "/pages/login/index"
      });
      return;
    }
    if (
      this.state.detail.mode_id == 3 &&
      (this.state.detail.enabled != 1 || this.state.detail.sale_stock == 0)
    ) {
      Taro.showToast({
        title: "商品已售罄",
        icon: "none"
      });
      return;
    }
    if (this.state.currentChooseId === "") {
      Taro.showToast({
        title: "请选择尺码",
        icon: "none"
      });
      return;
    }
    if (this.state.detail.enabled == 1) {
      const { detail, currentChooseId, currentChooseName } = this.state;
      for (let item of this.props.items) {
        if (item.product_id == detail.product_master_id) {
          Taro.showToast({
            title: "衣袋已存在该美衣~~",
            icon: "none"
          });
          return;
        }
      }
      this.props.dispatch({
        type: "cart/save",
        payload: {
          items: [
            ...this.props.items,
            {
              brand: detail.brand,
              images: detail.image[0],
              name: detail.name,
              product_id: detail.product_master_id,
              product_price: detail.market_price,
              specification: currentChooseName,
              spu: currentChooseId,
              type: detail.type_id
            }
          ]
        }
      });
      Taro.showToast({
        title: "加入衣袋成功"
      });
    }
  };

  showClothesDetail = () => {
    const detail = this.state.detail;
    return (
      (detail.measurement && detail.measurement.length > 0) ||
      (detail.size_suggestion && detail.size_suggestion != null) ||
      (detail.fabric && detail.fabric != null)
    );
  };

  goToPage = e => {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      Taro.navigateTo({
        url: e.currentTarget.dataset.url
      });
    } else {
      Taro.switchTab({
        url: e.currentTarget.dataset.url
      });
    }
  };

  // 客服
  makePhoneCall() {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      window.location.href = "tel:123456";
    } else {
      Taro.makePhoneCall({
        phoneNumber: "123456"
      });
    }
  }

  render() {
    const { items, data } = this.props;
    const banner = [{ imgUrl: data.imgUrl }];
    return (
      <View className="detail-page">
        <View className="image-box-wrap">
          <View className="image-box clearfix">
            <MySwiper banner={banner} />
            <View className="share-btn">
              <Button open-type="share" />
            </View>
          </View>
          {data.status && (
            <View className="sold-out">
              <View className="sales-end">已售罄</View>
            </View>
          )}

          {!data.enabled && (
            <View className="unable">
              <View className="sales-end">下架</View>
            </View>
          )}
        </View>
        <View className="container">
          {/* -- 商品信息 -- */}
          <View className="info-business-card">
            <View className="name">{data.brand}</View>
            <View className="model">参考价 ¥{data.price}</View>
          </View>
          <View className="product_name">
            <View>VIP</View>
            {data.name}
          </View>
          <View className="code">{data.product_spu}</View>
          {/* 买手点评 */}
        </View>
        {/* 底部操作栏 */}
        <View className="detail-bottom-btns">
          <View
            className="nav"
            data-url="/pages/home/index"
            onClick={this.goToPage}
          >
            <Image
              className="nav-img"
              src={require("../../images/tab/home.png")}
              alt=""
            />
            首页
          </View>
          <View className="nav" onClick={this.makePhoneCall}>
            <Image
              className="nav-img"
              src={require("../../images/icon/customerservice.png")}
              alt=""
            />
            客服
          </View>
          <View
            className="nav"
            data-url="/pages/cart/index"
            onClick={this.goToPage}
          >
            <Image
              className="nav-img"
              src={require("../../images/tab/cart.png")}
              alt=""
            />
            衣袋
            {items.length > 0 && (
              <View className="zan-badge__count">{items.length}</View>
            )}
          </View>
          <View
            className={false ? "join join-disabled" : "join"}
            onClick={this.join}
          >
            加入衣袋
          </View>
        </View>
      </View>
    );
  }
}

export default Detail;
