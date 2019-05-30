import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import PropTypes from "prop-types";
import "./index.scss";

class ClothingsItem extends Component {
  static propTypes = {
    clothing: PropTypes.array,
    deleteClothing: PropTypes.func
  };

  static defaultProps = {
    clothing: [],
    deleteClothing: function() {}
  };

  render() {
    const { data, onDelete } = this.props;
    return (
      <View className="ClothingsItem-page">
        <View className="WhiteSpace" />
        <View className="hr" />
        {data.map(item => (
          <View key={item._id}>
            <View className="WhiteSpace" />
            <View className="clothing">
              <View className="shop-img">
                <Image mode="widthFix" src={item.goods.imgUrl} />
              </View>
              <View className="content">
                <View className="title p">商品名称：{item.goods.name}</View>
                <View className="info p">商品数量：{item.number}</View>
              </View>
              <View className="edit">
                <View
                  className="iconfont icon-delete"
                  data-id={item.goods._id}
                  onClick={onDelete}
                />
              </View>
            </View>
            <View className="WhiteSpace" />
            <View className="hr" />
          </View>
        ))}
      </View>
    );
  }
}

export default ClothingsItem;
