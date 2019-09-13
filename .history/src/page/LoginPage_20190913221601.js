import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {getSize} from '../utils/UiUtils';
import AuthInput from '../component/AuthInput';
import CheckBox from '../utils/react-native-check-box/index.js';

const background = require('../images/background_screen.png');
const line = require('../images/line.png');
const logo = require('../images/logo.png');
const user = require('../images/user.png');

export default class LoginPage extends Component {

  constructor(props){
    super(props);
    this.state={
      username: '',
      password: '',
      rememberMe: false
    }
  }
  render() {
    return (
      <ImageBackground
        source={background}
        style={{width: '100%', height: '100%'}}>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 0.25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={logo}
              resizeMode={'contain'}
              style={{
                height: getSize(37),
                width: getSize(188),
              }}
            />
          </View>
          <View
            style={{
              flex: 0.25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={user}
              resizeMode={'contain'}
              style={{
                height: getSize(121),
                width: getSize(305),
              }}
            />
          </View>
          <View
            style={{
              flex: 0.5,
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginLeft: getSize(20),
              marginRight: getSize(20),
            }}>
            <AuthInput
              onChangeText={text => this.setState({
                username: text
              })}
              value={this.state.username}
              placeholder={'username'}
              keyboard={'default'}
              return={'next'}
              secureTextEntry={false}
              icon="user"
            />
            <AuthInput
              onChangeText={text => this.setState({
                password: text
              })}
              value={this.state.password}
              placeholder={'password'}
              keyboard={'default'}
              return={'next'}
              secureTextEntry={true}
              icon="lock1"
            />

            <View
              style={{
                borderRadius: 5,
                backgroundColor: '#ee5384',
                marginTop: getSize(20),
                height: getSize(43),
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: getSize(20),
                  fontWeight: '400',
                }}>
                LOGIN
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: getSize(20),
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this.setState({
                    rememberMe: !this.state.rememberMe
                  })
                }}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderColor: '#a7aaaf',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: 8,
                    marginBottom: 8,
                  }}>
                  <CheckBox
                    ref={CheckBox => {
                      this.CheckBox = CheckBox;
                    }}
                    onClick={() => {
                      this.setState({
                        rememberMe: !this.state.rememberMe
                      })
                    }}
                    isChecked={this.stat.rememberMe}
                    checkedCheckBoxColor={'#ee5384'}
                    uncheckedCheckBoxColor={'#80848A'}
                    checkBoxColor={'#fff'}
                  />
                  <Text
                    style={{
                      paddingLeft: getSize(2),
                      paddingRight: getSize(2),
                      fontSize: getSize(13),
                      color: '#fff',
                    }}>
                    Remember me
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
              activeOpacity={}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: getSize(12),
                    color: '#a5a6b0',
                    fontStyle: 'italic'
                  }}>
                  Forgot your password?
                </Text>
              </TouchableOpacity>
            </View>
            <Image 
                source={line} 
                style={{
                  height: getSize(1.5),
                  width: '100%',
                  marginTop: getSize(20),
                }}
              />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
