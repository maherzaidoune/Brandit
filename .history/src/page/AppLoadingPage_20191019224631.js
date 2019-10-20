import React, {Component} from 'react';
import {Text, View, ImageBackground, StatusBar} from 'react-native';

const background = require('../images/background.png');
export default class AppLoadingPage extends Component {
    constructor(props){
        super(props);
        StatusBar.setBarStyle("light-content");
        StatusBar.setTranslucent(true);
    }

    componentWillMount(){
      StatusBar.setBarStyle("light-content");
        StatusBar.setTranslucent(true);
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.navigate('Login');
        }, 2000);
    }
  render() {
    return (
      <View>
        <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />   
        <ImageBackground
          source={background}
          style={{width: '100%', height: '100%'}}>
        </ImageBackground>
      </View>
    );
  }
}
