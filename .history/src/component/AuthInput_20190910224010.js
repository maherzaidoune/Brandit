import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {getSize} from '../utils/UiUtils';
import Icon from 'react-native-vector-icons/AntDesign';

const AuthInput = props => {
  return (
    <View
      style={{
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#d1d1d1',
        height: getSize(44),
        marginTop: getSize(20),
        width: '100%',
        flexDirection: 'row'
      }}>
      <View
        style={{
          width: getSize(50),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name={props.icon} size={getSize(24)} color="#d1d1d1" />
      </View>
      <View>

      </View>
      
    </View>
  );
};

export default AuthInput;
