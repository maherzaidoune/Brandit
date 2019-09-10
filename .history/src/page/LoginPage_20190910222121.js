import React, {Component} from 'react';
import {Text, View, ImageBackground, Image} from 'react-native';
import { getSize } from '../utils/UiUtils';
import AuthInput from '../component/AuthInput';

const background = require('../images/background_screen.png');
const line = require('../images/line.png');
const logo = require('../images/logo.png');
const user = require('../images/user.png');

export default class LoginPage extends Component {
  render() {
    return (
      <ImageBackground
        source={background}
        style={{width: '100%', height: '100%'}}>
            <View style={{
              flex: 1
            }}>
                <View
                  style={{
                    flex: 0.25,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Image 
                  source={logo} 
                  resizeMode={'contain'}
                  style={{
                    height: getSize(37),
                    width: getSize(188)
                  }}
                   />
                </View>
                <View
                style={{
                  flex: 0.25,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                >
                  <Image source={user} resizeMode={'contain'} 
                  style={{
                      height: getSize(121),
                      width: getSize(305)
                  }} />
                </View>
                <View
                style={{
                  flex: 0.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: getSize(20),
                  marginRight: getSize(20)
                }}
                >
                  <AuthInput 
                    onChangeText={console.log("test")}
                    value={"test"} 
                    placeholder={"username"}
                    keyboard={'default'}
                    return={'next'}
                    secureTextEntry={false}
                    icon='user'
                  />
                  <AuthInput 
                    onChangeText={console.log("test")}
                    value={"test"} 
                    placeholder={"password"}
                    keyboard={'default'}
                    return={'next'}
                    secureTextEntry={true}
                    icon='lock1'
                  />

                  <View
                    style={{
                      borderRadius: 5,
                      backgroundColor: '#ee5384',
                      marginTop: getSize(20),
                      height: getSize(43),
                      width: '100%'
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: getSize(20),
                        fontWeight: '400'
                      }}
                    >
                      LOGIN
                    </Text>
                  </View>
                </View>
            </View>
        </ImageBackground>
    );
  }
}