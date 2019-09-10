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
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center'
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
                  <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 0.76 * width
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    this.CheckBox.onClick();
                  }}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    borderColor: '#a7aaaf',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginTop: 8,
                      marginBottom: 8
                    }}
                  >
                    <CheckBox
                      ref={CheckBox => {
                        this.CheckBox = CheckBox;
                      }}
                      onClick={() => {
                        console.log('click')
                      }}
                      isChecked={this.state.isChecked}
                      checkedCheckBoxColor={Color.gris}
                      uncheckedCheckBoxColor={Color.gris}
                      checkBoxColor={Color.bleu}
                      //leftText={"CheckBox"}
                    />
                    <Text
                      style={{
                        fontFamily: 'Helvetica',
                        fontSize: getSize(13),
                        color: Color.gris
                      }}
                    >
                      {' '}
                      {Strings.stayConnected}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('PassRecoverPage');
                  }}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                >
                  <Text
                    style={{
                      color: Color.bleu,
                      fontSize: getSize(12),
                      fontWeight: 'bold',
                      fontFamily: 'Helvetica'
                    }}
                  >
                    {Strings.motdePasseOublie}
                  </Text>
                </TouchableOpacity>
              </View>
                </View>
            </View>
        </ImageBackground>
    );
  }
}
