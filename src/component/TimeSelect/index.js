import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Picker,
  View,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import listHour from './listTime'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
  },
});

const MAX_HOURS = 23;
const MAX_MINUTES = 45;

export default class TimeSelect extends Component {
  static propTypes = {
    selectedHours: PropTypes.number,
    selectedMinutes: PropTypes.number,
    onChange: PropTypes.func,
    hoursUnit: PropTypes.string,
    minutesUnit: PropTypes.string,
  }

  static defaultProps = {
    selectedHours: 0,
    selectedMinutes: 0,
    onChange: null,
    hoursUnit: '',
    minutesUnit: '',
  }

  constructor(props) {
    super(props);
    const { selectedHours, selectedMinutes } = props;
    this.state = {
      selectedHours,
      selectedMinutes,
      listHour: 1,
      listMinute: [
        { 'id': 1, 'minute': 0 },
        { 'id': 2, 'minute': 15 },
        { 'id': 3, 'minute': 30 },
        { 'id': 4, 'minute': 45 },
      ],
    };
  }

  getHoursItems = () => {
    const items = [];
    const { hoursUnit } = this.props;
    for (let i = 0; i <= MAX_HOURS; i++) {
      items.push(
        <Picker.Item key={i} value={i} label={`${i.toString()}${hoursUnit}`} />,
      );
    }
    return items;
  }

  getMinutesImtes = () => {
    const items = [];
    const { minutesUnit } = this.props;
    for (let i = 0; i <= MAX_MINUTES; i = i + 15) {
      if (i == 0) {
        items.push(
          <Picker.Item key={i} value={i} label={`${i.toString()}${minutesUnit}0`} />,
        );
      } else {
        items.push(
          <Picker.Item key={i} value={i} label={`${i.toString()}${minutesUnit}`} />,
        );
      }

    }
    return items;
  }

  handleChangeHours = (itemValue) => {
    const { onChange } = this.props;
    this.setState({
      selectedHours: itemValue,
    }, () => {
      const { selectedHours, selectedMinutes } = this.state;
      onChange(selectedHours, selectedMinutes);
    });
  }

  handleChangeMinutes = (itemValue) => {
    const { onChange } = this.props;
    this.setState({
      selectedMinutes: itemValue,
    }, () => {
      const { selectedHours, selectedMinutes } = this.state;
      onChange(selectedHours, selectedMinutes);
    });
  }

  render() {
    const { selectedHours, selectedMinutes } = this.state;
    return (
      <View style={styles.container}>
        {/* <FlatList
          style={{ flex: 1, backgroundColor: '#ffffff' }}
          data={this.state.listHour}
          renderItem={({ itemHour }) =>
            <View> */}
        <FlatList
          style={{ flex: 1, backgroundColor: '#ffffff' }}
          data={this.state.listMinute}
          renderItem={({ item }) =>
            <TouchableOpacity
              style={{ flexDirection: 'row', borderBottomColor: '#00363d', borderWidth: 0.5 }}
              onPress={() => {
                this.setState({
                  // selectedHours: itemHour.hour,
                  selectedMinutes: item.minute,
                })
              }}
            >
              <Text style={{ fontSize: 18, flex: 1, padding: 8, color: item.chair == this.props.chair ? '#77a300' : '#000000' }}>{itemHour.hour} : {item.minute}</Text>
            </TouchableOpacity>}
          keyExtractor={item => item.minute}
        />
        {/* </View>
        }
        /> */}
      </View>

    );
  }
}
