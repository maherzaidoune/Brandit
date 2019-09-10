import React, { Component } from 'react'
import { Text, View, ImageBackground } from 'react-native'

const background = require('../images/background.png');

export default class LoginPage extends Component {
    render() {
        return (
            <ImageBackground
        source={background}
        style={{width: '100%', height: '100%'}}>
      </ImageBackground>
        )
    }
}
