import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {getSize} from '../utils/UiUtils';
import Icon from 'react-native-vector-icons/FontAwesome';

const authInput = props => {
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
            {textAlignVertical: this.props.multiline ? 'top' : 'center'},
            {
              marginRight: 10,
              padding: this.props.multiline ? 5 : 0,
              paddingLeft: this.props.icon ? 2 : 10,
              height: this.props.height
                ? this.props.height * 0.76 * (width / 7)
                : (0.76 * width) / 7,
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
