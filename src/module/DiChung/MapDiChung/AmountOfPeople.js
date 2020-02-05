import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Picker,
    View,
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    picker: {
        flex: 1,
    },
});

const MAX_PEOPLE = 30;
export default class AmountOfPeople extends Component {
    static propTypes = {
        selectedPeoples: PropTypes.number,
        onChange: PropTypes.func,
        PeopleUnit: PropTypes.string,
    }

    static defaultProps = {
        selectedPeoples: 0,
        onChange: null,
        PeopleUnit: '',
    }

    constructor(props) {
        super(props);
        const { selectedPeoples } = props;
        this.state = {
            selectedPeoples,
        };
    }

    getPeopleItems = () => {
        const items = [];
        const { PeopleUnit } = this.props;
        for (let i = 1; i <= MAX_PEOPLE; i++) {
            items.push(
                <Picker.Item key={i} value={i} label={`${i.toString()}${PeopleUnit} người`} />,
            );
        }
        return items;
    }

    handleChangePeoples = (itemValue) => {
        const { onChange } = this.props;
        this.setState({
            selectedPeoples: itemValue,
        }, () => {
            const { selectedPeoples } = this.state;
            onChange(selectedPeoples);
        });
    }

    render() {
        const { selectedPeoples } = this.state;
        return (
            <View style={styles.container}>
                <Picker
                    style = {styles.picker}
                    selectedValue = {selectedPeoples}
                    onValueChange = {(itemValue) => this.handleChangePeoples(itemValue)}
                >
                    {this.getPeopleItems()}
                </Picker>
            </View>
        )
    }
}