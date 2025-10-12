import React, {useState} from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import {Text, Platform, TouchableOpacity, View} from 'react-native';
import {dateFormat} from '../../Theme/utils';
import {colors} from '../../Helpers/UserHelper';
import {DatePickerSVG} from '../../Theme/SVG';

const TimePicker = ({...props}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {Platform.OS === 'ios' ? (
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <DatePickerSVG width={30} height={30} fill={colors.BLACK} />
          <DateTimePicker
            testID="dateTimePicker"
            value={props.value}
            mode={props.mode}
            is24Hour={true}
            display="compact"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: 130,
              marginLeft: 10,
            }}
            onChange={props.onChange}
          />
        </View>
      ) : (
        <>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={props.value}
              is24Hour={true}
              mode={props.mode}
              display="default"
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: 150,
              }}
              onChange={(e, d) => {
                if (e.type === 'dismissed') {
                  setShow(false);
                } else {
                  props.onChange(e, d);
                  setShow(false);
                }
              }}
            />
          )}

          <TouchableOpacity
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              justifyContent: 'center',
              padding: 10,
              borderRadius: 5,
              backgroundColor: '#ededed',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={() => setShow(true)}>
            <DatePickerSVG width={30} height={30} fill={colors.BLACK} />
            <Text style={{marginLeft: 10}}>
              {props.value ? dateFormat(props.value) : 'Select Date'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default TimePicker;

{
  /* <DateTimePicker
  mode={'date'}
  value={selectedDate}
  onChange={(e, d) => {
    setSelectedDate(d);
  }}
/>; */
}
