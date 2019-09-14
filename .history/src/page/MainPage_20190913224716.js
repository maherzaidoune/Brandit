import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'

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
              </ImageBackground>
              </View>
        )
    }
}
