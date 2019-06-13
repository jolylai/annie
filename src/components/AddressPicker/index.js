import Taro, { Component } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import PropTypes from "prop-types";
import address from "../../utils/city.js";
import "./index.scss";

class AddressPicker extends Component {
  state = {
    provinces: address.provinces,
    cities: [],
    areas: []
  };

  static getDerivedStateFromProps(props) {
    console.log("get");
    const { value } = props;
    const [provinceId, cityId] = value;
    const cities = address.cities[provinceId];
    const areas = address.areas[cityId];
    return { cities, areas };
  }

  onColumnchange = e => {
    const { column, value } = e.detail;
    console.log("column: ", column);
    const { provinces, cities } = this.state;
    if (column === 0) {
      const curPrivinceId = provinces[value].id;
      const newCities = address.cities[curPrivinceId];
      const newAreas = address.areas[newCities[0].id];
      this.setState({ cities: newCities, areas: newAreas });
    }
    if (column === 1) {
      const curCityId = cities[value].id;
      const newAreas = address.areas[curCityId];
      this.setState({ areas: newAreas });
    }
  };

  onChange = e => {
    const { value } = e.detail;
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { provinces, cities, areas, value } = this.state;

    return (
      <Picker
        className="picker"
        mode="multiSelector"
        rangeKey="name"
        range={[provinces, cities, areas]}
        onColumnChange={this.onColumnchange}
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
