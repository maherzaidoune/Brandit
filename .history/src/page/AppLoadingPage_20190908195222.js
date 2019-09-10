import React, {Component} from 'react';
import {Text, View, ImageBackground, StatusBar} from 'react-native';

const background = require('../images/background.png');
export default class AppLoadingPage extends Component {
    constructor(props){
        super(props);
        setBarStyle("light-content");
    }
  render() {
    return (
      <ImageBackground
        source={background}
        style={{width: '100%', height: '100%'}}>
        <Text>Inside</Text>
      </ImageBackground>
    );
  }
}
