import React, {Component} from 'react';
import {Text, View, ImageBackground, StatusBar} from 'react-native';

const background = require('../images/background.png');
export default class AppLoadingPage extends Component {
    constructor(props){
        super(props);
        StatusBar.setBarStyle("light-content");
    }

    componentDidMount(){
        setTimeout(())
    }
  render() {
    return (
      <ImageBackground
        source={background}
        style={{width: '100%', height: '100%'}}>
      </ImageBackground>
    );
  }
}
