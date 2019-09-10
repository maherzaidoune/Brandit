import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {getSize} from '../utils/UiUtils';
import Icon from 'react-native-vector-icons/FontAwesome';

const AuthInput = props => {
  return (
    <View
      style={{
        borderRadius: 5,
        borderWidth: 0.8,
        borderColor: '#fff',
        height: getSize(44),
        width: '100%',
      }}>
      <View
        style={{
          width: getSize(44),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name={'user-o'} size={getSize(32)} color="#fff" />
        
      </View>
    </View>
  );
};

export default AuthInput;
