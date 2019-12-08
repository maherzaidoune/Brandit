import React, {Component} from 'react';
import {Image, View, ImageBackground, StatusBar} from 'react-native';
import {getSize} from '../utils/UiUtils';

const background = require('../images/background_screen.png');
const logo = require('../images/logo.png');

export default class AppLoadingPage extends Component {
  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content');
    StatusBar.setTranslucent(true);
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content');
    StatusBar.setTranslucent(true);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 2000);
  }
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
          style={{width: '100%', height: '100%', alignItems: 'center' , justifyContent: 'center'}}>
              <Image source={logo} 
              resizeMode="center"
              style={{
                height: getSize(150),
                width: getSize(150),
              }}
              />
          </ImageBackground>
      </View>
    );
  }
}
