import PropTypes from 'prop-types';
import React, {Component} from 'react';
import RNPicker from 'rn-modal-picker';
import {StyleSheet} from 'react-native';
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

const styles = StyleSheet.create({
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#d3d3d3',
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
  },
  selectLabelTextStyle: {
    color: '#000',
    textAlign: 'left',
    width: '99%',
    padding: 10,
    flexDirection: 'row',
    fontWeight: '500',
  },
  placeHolderTextStyle: {
    // color: colors.PLACE_HOLDER_TEXT,
    padding: 10,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: 'center',
  },
  listTextViewStyle: {
    color: '#000',
    marginVertical: 10,
    flex: 0.9,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  pickerStyle: {
    marginLeft: 12,
    elevation: 3,
    paddingRight: 25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.MAIN_COLOR,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
  },
});

class Picker extends React.Component {
  state = {
    value: '',
    selectedText: '',
  };
  componentDidMount() {
    this.setState({
      selectedText: this.props.selectedText,
    });
  }
  _selectedValue(index, item) {
    this.setState({selectedText: item.name});
  }
  render() {
    const {
      dataSource,
      title,
      selectedValue,
      placeHolderText,
      selectedText,
      defaultValue,
    } = this.props;
    return (
      <RNPicker
        dataSource={dataSource}
        dummyDataSource={dataSource}
        defaultValue={defaultValue}
        pickerTitle={title}
        showSearchBar={true}
        disablePicker={false}
        changeAnimation={'none'}
        searchBarPlaceHolder={'Search.....'}
        showPickerTitle={true}
        searchBarContainerStyle={this.props.searchBarContainerStyle}
        pickerStyle={styles.pickerStyle}
        pickerItemTextStyle={styles.listTextViewStyle}
        selectedLabel={selectedText}
        placeHolderLabel={placeHolderText}
        selectLabelTextStyle={styles.selectLabelTextStyle}
        placeHolderTextStyle={styles.placeHolderTextStyle}
        dropDownImageStyle={styles.dropDownImageStyle}
        selectedValue={selectedValue}
      />
    );
  }
}

Picker.propTypes = propTypes;

Picker.defaultProps = defaultProps;

export default Picker;
