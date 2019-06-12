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
    console.log("cat mount");
    this.queryCartGoods({ userId: "5cef8d4cbe2bd83fd4644059" });
  }

  componentDidShow() {
    // 设置衣袋小红点
    // if (this.props.cartGoods.length > 0) {
    //   Taro.setTabBarBadge({
    //     index: 1,
    //     text: String(this.props.cartGoods.length)
    //   });
    // } else {
    //   Taro.removeTabBarBadge({
    //     index: 1
    //   });
    // }
  }

  calGoodsAmount(goodsArr) {
    const amount = goodsArr.reduce((result, item) => {
      const { goods = {}, number = 0 } = item;
      const { price = 0 } = goods;
      return result + price * number;
    }, 0);
    return amount.toFixed(2);
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

  buy = () => {
    const { dispatch, cartGoods } = this.props;
    const cart = cartGoods.map(item => item._id);
    dispatch({
      type: "cart/createOrder",
      payload: {
        cart,
        user: "5cef8d4cbe2bd83fd4644059"
      }
    }).then(res => {
      if (res.status) {
        this.queryCartGoods({ userId: "5cef8d4cbe2bd83fd4644059" });
        Taro.showToast({
          title: "下单成功",
          icon: "none"
        });
      }
    });
  };

  render() {
    const { cartGoods: data } = this.props;

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
                  <Text className={!data.length ? "disabled price" : "price"}>
                    {this.calGoodsAmount(data)}
                  </Text>
                </View>
                <Button
                  className="cart-btn"
                  onClick={this.buy}
                  disabled={!data.length}
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
