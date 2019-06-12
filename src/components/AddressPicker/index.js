import Taro, { Component } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import PropTypes from "prop-types";
import address from "../../utils/city.js";
import "./index.scss";

class AddressPicker extends Component {
  state = {
    value: [18, 1, 0],
    provinces: address.provinces,
    citys: address.citys[440000],
    areas: address.areas[441400],
    areaInfo: ""
  };

  onColumnchange = e => {
    const { column, value } = e.detail;
    console.log("column: ", column);
    const { citys, areas } = address;
    this.setState({
      citys: [
        { province: "河北省", name: "石家庄市", id: "130100" },
        { province: "河北省", name: "唐山市", id: "130200" },
        { province: "河北省", name: "秦皇岛市", id: "130300" }
      ]
    });
    if (column === 0) {
      this.setState({
        citys: JSON.parse(
          JSON.stringify(citys[value].map(item => ({ ...item, key: item.id })))
        )
      });
    }
    if (column === 1) {
      this.setState({
        areas: areas[value].map(item => ({ ...item, key: item.id }))
      });
    }
  };

  onChange = e => {
    console.log("chnage");
    // const pickerValue = e.detail.value;
    // const { provinces, citys, value } = this.state;
    // const provinceNum = pickerValue[0];
    // const cityNum = pickerValue[1];
    // const countyNum = pickerValue[2];
    // // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
    // if (value[0] != provinceNum) {
    //   const id = provinces[provinceNum].id;
    //   this.setState({
    //     value: [provinceNum, 0, 0],
    //     citys: address.citys[id],
    //     areas: address.areas[address.citys[id][0].id]
    //   });
    // } else if (value[1] != cityNum) {
    //   // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
    //   const id = citys[cityNum].id;
    //   console.log(id);
    //   this.setState({
    //     value: [provinceNum, cityNum, 0],
    //     areas: address.areas[citys[cityNum].id]
    //   });
    // } else {
    //   // 滑动选择了区
    //   this.setState({
    //     value: [provinceNum, cityNum, countyNum]
    //   });
    // }
  };

  render() {
    const { provinces, citys, areas, value } = this.state;

    return (
      <Picker
        className="picker"
        mode="multiSelector"
        rangeKey="name"
        range={this.props.range}
        onColumnchange={this.onColumnchange}
        onChange={this.onChange}
        value={value}
      >
        <View className="label">
          省、市、区
          <View className="iconfont icon-more arrow" />
        </View>
      </Picker>
    );
  }
}

AddressPicker.propTypes = {
  pickerShow: PropTypes.bool.isRequired,
  onHandleToggleShow: PropTypes.func.isRequired
};

export default AddressPicker;
