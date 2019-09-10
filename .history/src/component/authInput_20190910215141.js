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
          testID={this.props.testID}
          style={[
            styles.textInputStyle,
            {textAlignVertical: 'center'},
            {
              marginRight: 10,
              padding: 0,
              paddingLeft:  10,
              height: getSize(44),
            },
          ]}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          blurOnSubmit={false}
          enablesReturnKeyAutomatically
          placeholder={this.props.placeholder}
          keyboardType={this.props.keyboard}
          returnKeyType={this.props.return}
          autoCapitalize={
            this.props.autoCapitalize ? this.props.autoCapitalize : 'sentences'
          }
          multiline={this.props.multiline ? this.props.multiline : false}
          numberOfLines={
            this.props.numberOfLines ? this.props.numberOfLines : 1
          }
          autoFocus={this.props.autofocus ? this.props.autofocus : false}
          selectionColor={Color.bleu}
          underlineColorAndroid={'transparent'}
          secureTextEntry={this.props.secureTextEntry}
          onFocus={this.props.onFocus}
          onSubmitEditing={this.props.onSubmitEditing}
          ref="textinput"
          editable={this.props.editable}
        />
      </View>
    </View>
  );
};

export default authInput;
