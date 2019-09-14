import React, {Component} from 'react';
import {Text, View, StatusBar, ImageBackground, Image} from 'react-native';
import {getSize} from '../utils/UiUtils';
import Icon from 'react-native-vector-icons/Ionicons';

const background = require('../images/background_screen.png');
const logo = require('../images/logo.png');

export default class MainPage extends Component {
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
              position: 'absolute',
              top: 0,
              width: '100%',
              height: getSize(80),
              paddingBottom: getSize(5),
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexDirection: 'row',
              flex: 1,
            }}>
            <View style={{flex: 0.2}} />
            <View
              style={{
                flex: 0.6,
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
            <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name={'md-settings'} size={getSize(24)} color="#d1d1d1" />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
