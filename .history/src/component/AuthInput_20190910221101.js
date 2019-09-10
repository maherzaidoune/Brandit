import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {getSize} from '../utils/UiUtils';
import Icon from 'react-native-vector-icons/FontAwesome';

const AuthInput = props => {
  return (
    <View
      style={{
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#d1d1d1',
        height: getSize(44),
        width: '100%',
        flexDirection: 'row'
      }}>
      <View
        style={{
          width: getSize(50),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name={'user-o'} size={getSize(24)} color="#fff" />
      </View>
      <TextInput
          style={
            {
              marginRight: 10,
              padding: 0,
              textAlignVertical: 'center',
              backgroundColor: '#d1d1d1',
              paddingLeft:  10,
              flex: 1,
              fontSize: getSize(17),
              padding: 0,
              fontFamily: 'Helvetica',
              paddingRight: 5,
              color: '#7d7d77'
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
          <View style={{flex: 1, backgroundColor: '#d1d1d1}}/>
    </View>
  );
};

export default AuthInput;
