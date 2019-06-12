import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import MySwiper from "../../components/MySwiper";
import GoodsList from "../../components/GoodsList";
import "./index.scss";

@connect(({ home, cart, loading }) => ({
  ...home,
  ...cart,
  ...loading
}))
class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  state = {
    pageNumber: 1
  };

  componentDidMount = () => {
    const { dispatch } = this.props;
    const { pageNumber } = this.state;
    dispatch({
      type: "home/qureyBanner"
    });
    dispatch({
      type: "home/queryGoodsList",
      payload: {
        pageNumber,
        prevGoodsList: []
      }
    });
    // 设置衣袋小红点
    // if (this.props.items.length > 0) {
    //   Taro.setTabBarBadge({
    //     index: 1,
    //     text: String(this.props.items.length)
    //   });
    // } else {
    //   Taro.removeTabBarBadge({
    //     index: 1
    //   });
    // }
  };

  //分享
  onShareAppMessage() {
    return {
      title: "基于Taro框架开发的时装衣橱",
      path: "/pages/home/index"
    };
  }

  // 小程序上拉加载
  onReachBottom() {
    const { dispatch, goodsList } = this.props;
    const { pageNumber } = this.state;

    const nextPageNumber = pageNumber + 1;
    this.setState({ pageNumber: nextPageNumber });
    dispatch({
      type: "home/queryGoodsList",
      payload: { pageNumber: nextPageNumber, prevGoodsList: goodsList }
    });
  }

  render() {
    const { banner, brands, effects, goodsList } = this.props;

    return (
      <View className="home-page">
        <MySwiper banner={banner} home />
        <View className="nav-list">
          {brands.map((item, index) => (
            <View className="nav-item" key={index}>
              <Image mode="widthFix" src={item} />
            </View>
          ))}
        </View>
        <Text className="recommend">为你推荐</Text>
        <GoodsList list={goodsList} loading={effects["home/queryGoodsList"]} />
      </View>
    );
  }
}

export default Index;
