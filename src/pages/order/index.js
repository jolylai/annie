import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import "./index.scss";

@connect(({ order }) => ({
  ...order
}))
class Order extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      orderType: [
        {
          type: 0,
          name: "待支付"
        },
        {
          type: 1,
          name: "待发货"
        },
        {
          type: 2,
          name: "已发货"
        },
        {
          type: 3,
          name: "待归还"
        },
        {
          type: 4,
          name: "全部订单"
        }
      ],
      activeTypeIndex: 0
    };
  }

  config = {
    navigationBarTitleText: "订单"
  };

  componentWillMount = () => {
    this.setState({
      activeTypeIndex: this.$router.params.type
    });
  };

  componentDidShow = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "order/query",
      payload: {
        user: "5cef8d4cbe2bd83fd4644059",
        status: this.$router.params.type
      }
    });
  };

  toggleActiveType = e => {
    this.setState({
      activeTypeIndex: e.currentTarget.dataset.type
    });
  };

  renderOrder(data) {
    return data.map(item => (
      <View className="order-item" key={item._id}>
        <View className="order-title">{`时间: ${item.createdAt}`}</View>
        <View className="order-content">content</View>
      </View>
    ));
  }

  render() {
    const { list } = this.props;
    const { orderType, activeTypeIndex } = this.state;
    return (
      <View className="order-page">
        <View className="toggleType">
          {orderType.map((item, index) => (
            <View
              key={index}
              className={activeTypeIndex == index ? "active item" : "item"}
              data-type={item.type}
              onClick={this.toggleActiveType}
            >
              {item.name}
            </View>
          ))}
        </View>
        {list.length ? this.renderOrder(list) : <View className="empty" />}
      </View>
    );
  }
}

export default Order;
