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
    color: colors.WHITE,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '99%',
    padding: 10,
    fontSize: 17,
    flexDirection: 'row',
  },
  placeHolderTextStyle: {
    color: colors.WHITE,
    fontWeight: 'bold',
    padding: 10,
    fontSize: 17,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
  },
  dropDownImageStyle: {
    width: 15,
    height: 15,
    alignSelf: 'center',
  },
  listTextViewStyle: {
    color: '#000',
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  pickerStyle: {
    marginLeft: 12,
    height: 45,
    // elevation: 3,
    paddingRight: 25,
    marginBottom: 5,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1,
    },

    borderRadius: 30,
    flexDirection: 'row',
  },
});

class CalPicker extends React.Component {
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

CalPicker.propTypes = propTypes;

CalPicker.defaultProps = defaultProps;

export default CalPicker;
