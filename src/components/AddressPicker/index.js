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

  static defaultProps = {
    children: "省、市、区",
    onChange() {}
  };

  componentDidMount() {
    const { value } = this.props;
    this.updateState(value);
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (JSON.stringify(value) !== JSON.stringify(prevProps.value)) {
      this.updateState(value);
    }
  }

  updateState(value) {
    const [provinceId = "110000", cityId = "110100"] = value;
    const cities = address.cities[provinceId];
    const areas = address.areas[cityId];
    this.setState({ cities, areas });
  }

  getAddress = value => {
    const [provinceId, cityId, areaId] = value;
    const addIndex = (item, index) => ({ ...item, index });
    const provinceData = provinceId
      ? address.provinces
          .map(addIndex)
          .find(province => province.id === provinceId)
      : { name: "省", index: 0 };

    const cityData = provinceId
      ? address.cities[provinceId]
          .map(addIndex)
          .find(city => city.id === cityId)
      : { name: "市", index: 0 };

    const areaData = cityData.id
      ? address.areas[cityData.id]
          .map(addIndex)
          .find(area => area.id === areaId)
      : { name: "区", index: 0 };

    return {
      ids: [provinceData.id, cityData.id, areaData.id],
      names: [provinceData.name, cityData.name, areaData.name],
      indexs: [provinceData.index, cityData.index, areaData.index]
    };
  };

  onColumnchange = e => {
    const { column, value } = e.detail;
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
    const { provinces, cities, areas } = this.state;

    const [provinceIndex, cityIndex, areaIndex] = value;
    const provinceData = provinces[provinceIndex];
    const cityData = cities[cityIndex];
    const areaData = areas[areaIndex];
    onChange({
      values: [provinceData.id, cityData.id, areaData.id],
      names: [provinceData.name, cityData.name, areaData.name]
    });
  };

  render() {
    const { children, value } = this.props;
    const { provinces, cities, areas } = this.state;
    const { names, indexs } = this.getAddress(value);
    return (
      <Picker
        className="picker"
        mode="multiSelector"
        rangeKey="name"
        range={[provinces, cities, areas]}
        onColumnChange={this.onColumnchange}
        onChange={this.onChange}
        value={indexs}
      >
        <View className="label">
          {names.join("、") || children}
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
