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
                    flex: 0.25,
                    alignItems: 'center',
                    justifyContent: 'flex-end'
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
                <View
                style={{
                  flex: 0.25,
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
                >
                  <Image source={user} resizeMode={'contain'} style={{
                      
                  }} />
                </View>
                <View
                style={{
                  flex: 0.5,
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
                >

                </View>
            </View>
        </ImageBackground>
    );
  }
}
