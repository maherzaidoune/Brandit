import React, {Component} from 'react';
import {Text, View, ImageBackground} from 'react-native';

const background = require('../images/background_screen.png');
const line = require('../images/line.png');
const background = require('../images/logo.png');
const background = require('../images/user.png');

export default class LoginPage extends Component {
  render() {
    return (
      <ImageBackground
        source={background}
        style={{width: '100%', height: '100%'}}>
            <View style={{
              flex: 1
            }}>
                <View>
                  <Image source={}
                </View>
            </View>
        </ImageBackground>
    );
  }
}
