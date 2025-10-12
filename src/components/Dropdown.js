import PropTypes from 'prop-types';
import React, {Component} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {colors} from '../Helpers/UserHelper';

const propTypes = {
  data: PropTypes.array,
  placeholder: PropTypes.string,
  textInputStyle: PropTypes.object,
};

const defaultProps = {
  mapElement: n => {},
  onTextChange: () => {},
  onItemSelect: () => {},
  data: [],
  placeholder: '',
};

class Dropdown extends React.Component {
  state = {
    value: '',
  };

  componentDidMount() {
    this.setState({
      value: this.props.value,
    });
  }

  onItemSelect = value => {
    console.log('here');
    console.log(value);
    this.setState({value: JSON.stringify(value.id)});
    console.log('here');
    console.log(this.state.value);
  };

  render() {
    const {placeholder, data, textInputStyle, onTextChange, onItemSelect} =
      this.props;
    return (
      <SearchableDropdown
        onTextChange={onTextChange}
        //On text change listner on the searchable input
        onItemSelect={onItemSelect}
        //suggestion container style
        textInputStyle={textInputStyle}
        itemStyle={{
          //single dropdown item style
          padding: 8,
          backgroundColor: '#FAF9F8',
          borderColor: '#bbb',
          borderWidth: 1,
          color: 'red',
        }}
        itemTextStyle={{
          //single dropdown item's text style
          color: '#222',
        }}
        items={data}
        //mapping of item array
        /* defaultIndex={this.state.value} */
        //default selected item index
        placeholder={placeholder}
        placeholderTextColor={colors.PLACE_HOLDER_TEXT}
        //place holder for the search input
        resetValue={false}
        //reset textInput Value with true and false state
        underlineColorAndroid="transparent"
        //To remove the underline from the android input
      />
    );
  }
}

Dropdown.propTypes = propTypes;

Dropdown.defaultProps = defaultProps;

export default Dropdown;
