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
                flex: 0.2,
              width: '100%',
              height: getSize(75),
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
            }}>
            <View style={{flex: 0.25}} />
            <View
              style={{
                flex: 0.5,
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
            <View style={{flex: 0.25}} >
                <Icon name={'md-settings'} size={getSize(24)} color="#d1d1d1" />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
