import React, {Component} from 'react';
import {Text, View, StatusBar, ImageBackground, Image} from 'react-native';
import {getSize} from '../utils/UiUtils';
import Icon from 'react-native-vector-icons/Ionicons';

const background = require('../images/background_screen.png');
const logo = require('../images/logo.png');
const gallery = require('../images/gallery.png');
const photo = require('../images/photo.png');
const video = require('../images/video.png');

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
          
            <View>
                
            </View>
        </ImageBackground>
      </View>
    );
  }
}
