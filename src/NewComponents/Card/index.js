//import liraries
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// create a component
const Card = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          padding: 20,
          borderBottomWidth: 0.5,
          flexDirection: 'row',
        }}>
        <View style={{width: '20%'}}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../Theme/img.png')}
          />
        </View>
        <View
          style={{
            width: '40%',
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <Text>Sophia Akter</Text>
          <Text>Eight Grade</Text>
        </View>
      </View>
      <View
        style={{
          margin: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>Rating</Text>
        <Text>Five Star</Text>
      </View>
      <View
        style={{
          margin: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>Tutor perference</Text>
        <Text>Virtual</Text>
      </View>
      <View
        style={{
          margin: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>Areas need tutoring</Text>
        <Text>Science</Text>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <TouchableOpacity
          style={{
            height: 46,
            width: 161,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#D0D0D0',
          }}>
          <Text>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 46,
            width: 161,
            borderRadius: 5,
            marginLeft: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#010101',
          }}>
          <Text style={{color: '#fff'}}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: deviceWidth - 25,
    alignSelf: 'center',
    height: 299,
    backgroundColor: '#E8E8E8',
  },
});

//make this component available to the app
export default Card;
