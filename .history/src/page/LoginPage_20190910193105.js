import React, {Component} from 'react';
import {Text, View, ImageBackground, Image} from 'react-native';
import { getSize } from '../utils/UiUtils';

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
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Image 
                  source={logo} 
                  resizeMode={'contain'}
                  style={{
                    height: getSize(74),
                    width: getSize(270)
                  }}
                   />
                </View>
            </View>
        </ImageBackground>
    );
  }
}
