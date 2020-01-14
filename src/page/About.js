import React, {Component} from 'react';
import {
  StatusBar,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getSize} from '../utils/UiUtils';
import Icon from 'react-native-vector-icons/AntDesign';

const background = require('../images/background_screen.png');
const line = require('../images/line.png');
const logo = require('../images/logo.png');

export default class About extends Component {
  render() {
    return (
      <View>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        <ImageBackground
          source={background}
          style={{width: '100%', height: '100%'}}>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: Platform.OS === 'ios' ? getSize(80) : getSize(100),
                paddingTop: getSize(5),
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                flex: 1,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={'left'} size={getSize(26)} color="#fff" />
              </TouchableOpacity>
              <View
                style={{
                  flex: 0.6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: getSize(22),
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  About
                </Text>
              </View>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: Platform.OS === 'ios' ? getSize(80) : getSize(100),
              }}>
              <Image
                source={logo}
                resizeMode={'center'}
                style={{
                  marginTop: Platform.OS === 'ios' ? getSize(80) : getSize(100),
                  height: getSize(100),
                  width: getSize(100),
                }}
              />
              <View
                style={{
                  marginTop: getSize(30),
                  marginLeft: getSize(30),
                  marginRight: getSize(30),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    flex: 1,
                    fontSize: getSize(16),
                    fontWeight: '400',
                    textAlign: 'center',
                  }}>
                  Great Solution for Branding Issues! Qamous Editor is creative
                  Android and IOS application allows entrepreneurs the update of
                  their social media content in an attractive and easy way. Take
                  videos or photos and Add your logo, desired template using
                  your smartphones Qamous Editor mobile application maximize
                  your Facebook reach, Instagram followers Reduce your marketing
                  expenses and advertise your products anytime and anywhere Why
                  you need a graphic designer while you can simply add you logo,
                  message or graphic template made by Qamous’s creative team
                  Boost your business. Use Qamous Editor.
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
