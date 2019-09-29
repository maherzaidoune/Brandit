import React, {Component} from 'react';
import {Text, View, StatusBar, ImageBackground} from 'react-native';
import { getSize } from '../utils/UiUtils';

const background = require('../images/background_screen.png');

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
                  width: '100%',
                  height: getSize(75),
                  
              }}
              >

              </View>
          </ImageBackground>
      </View>
    );
  }
}