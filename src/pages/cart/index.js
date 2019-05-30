import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, Image, Button, Text } from "@tarojs/components";
import GoodsItem from "../../components/GoodsItem";
import "./index.scss";

@connect(({ cart }) => ({
  ...cart
}))
class Cart extends Component {
  config = {
    navigationBarTitleText: "购物车"
  };

  queryCartGoods(params) {
    const { dispatch } = this.props;
    return dispatch({
      type: "cart/query",
      payload: params
    });
  }

  componentDidMount() {
    this.queryCartGoods({ userId: "5cef8d4cbe2bd83fd4644059" });
  }

  componentDidShow() {
    // 设置衣袋小红点
    if (this.props.items.length > 0) {
      Taro.setTabBarBadge({
        index: 1,
        text: String(this.props.items.length)
      });
    } else {
      Taro.removeTabBarBadge({
        index: 1
      });
    }
  }

  goHome() {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      Taro.navigateTo({
        url: "/pages/home/index"
      });
    } else {
      Taro.switchTab({
        url: "/pages/home/index"
      });
    }
  }

  onDeleteGoods = e => {
    const id = e.currentTarget.dataset.id;
    const { dispatch } = this.props;
    Taro.showModal({
      content: "是否删除该商品？"
    }).then(res => {
      if (res.confirm) {
        Taro.showLoading({
          title: "Loading"
        })
          .then(() =>
            dispatch({
              type: "cart/deleteOneGoods",
              payload: {
                goodsId: id
              }
            })
          )
          .then(({ status }) => {
            if (!status) {
              return Promise.reject("删除失败");
            }
            return this.queryCartGoods({ userId: "5cef8d4cbe2bd83fd4644059" });
          })
          .then(() => {
            Taro.hideLoading();
          })
          .catch(() => {
            Taro.hideLoading();
          });
      }
    });
  };

  buy() {
    Taro.showToast({
      title: "衣袋尚未激活，下单失败～～",
      icon: "none"
    });
  }

  render() {
    const { items, cartGoods: data } = this.props;

    const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB;
    return (
      <View className="cart-page">
        {data.length == 0 ? (
          <View className="empty">
            <Image
              mode="widthFix"
              src="http://static-r.msparis.com/uploads/b/c/bcffdaebb616ab8264f9cfc7ca3e6a4e.png"
            />
            <Button type="primary" className="am-button" onClick={this.goHome}>
              立即去挑选商品
            </Button>
          </View>
        ) : (
          <View className="isLogin">
            <GoodsItem data={data} onDelete={this.onDeleteGoods} />
            <View className="bottom-count" style={!isH5 && "bottom:0;"}>
              <View className="fj">
                <View>
                  合计：
                  <Text className={!items.length ? "disabled price" : "price"}>
                    0.00
                  </Text>
                </View>
                <Button
                  className="cart-btn"
                  onClick={this.buy}
                  disabled={!items.length}
                >
                  下单
                </Button>
                {/* <View className="info">
                  如有失效美衣，建议删除，以免占用衣袋件数
                </View> */}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Cart;
