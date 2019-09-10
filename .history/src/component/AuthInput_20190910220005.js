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
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: getSize(44),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name={'user-o'} size={getSize(32)} color="#fff" />
        <TextInput
          style={
            {
              marginRight: 10,
              padding: 0,
              textAlignVertical: 'center',
              paddingLeft:  10,
              height: getSize(44),
              fontSize: getSize(17),
              padding: 0,
              fontFamily: 'Helvetica',
              paddingRight: 5
            }
          }
          onChangeText={props.onChangeText}
          value={props.value}
          blurOnSubmit={false}
          enablesReturnKeyAutomatically
          placeholder={props.placeholder}
          keyboardType={props.keyboard}
          returnKeyType={props.return}
          autoCapitalize={
            props.autoCapitalize ? props.autoCapitalize : 'sentences'
          }
          multiline={props.multiline ? props.multiline : false}
          numberOfLines={
            props.numberOfLines ? props.numberOfLines : 1
          }
          autoFocus={props.autofocus ? props.autofocus : false}
          underlineColorAndroid={'transparent'}
          secureTextEntry={props.secureTextEntry}
          onFocus={props.onFocus}
          onSubmitEditing={props.onSubmitEditing}
          editable={props.editable}
        />
      </View>
    </View>
  );
};

export default AuthInput;
