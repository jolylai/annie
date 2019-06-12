import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, Image, Button } from "@tarojs/components";
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
      payload: { id: this.$router.params.id || "5cef9f433af32381fcd42236" }
    });
  };

  openSize() {
    Taro.navigateTo({
      url: "/pages/size/index"
    });
  }

  //加入衣袋
  join = async data => {
    // if (!Taro.getStorageSync("access_token")) {
    //   Taro.navigateTo({
    //     url: "/pages/login/index"
    //   });
    //   return;
    // }

    const { dispatch } = this.props;
    dispatch({
      type: "detail/addToCart",
      payload: {
        user: "5cef8d4cbe2bd83fd4644059",
        goods: data._id,
        number: 1
      }
    }).then(res => {
      if (res.status) {
        Taro.showToast({
          title: "加入衣袋成功"
        });
      }
    });
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
    const { items = [], data } = this.props;
    return (
      <View className="detail-page">
        <View className="image-box-wrap">
          <View className="image-box clearfix">
            <MySwiper banner={data.banner} />
            <View className="share-btn">
              <Button open-type="share" />
            </View>
          </View>
          {data.status && (
            <View className="sold-out">
              <View className="sales-end">已售罄</View>
            </View>
          )}

          {data.disabled && (
            <View className="unable">
              <View className="sales-end">下架</View>
            </View>
          )}
        </View>
        <View className="container">
          {/* -- 商品信息 -- */}
          <View className="info-business-card">
            <View className="name">{data.name}</View>
            <View className="model">参考价 ¥{data.price}</View>
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
            onClick={() => {
              this.join(data);
            }}
          >
            加入衣袋
          </View>
        </View>
      </View>
    );
  }
}

export default Detail;
