import {
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createStackNavigator,
    createSwitchNavigator,
    StackViewTransitionConfigs
  } from 'react-navigation';
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class AppLoadingPage extends Component {
    render() {
        return (
            <View>
                <Text> AppLoadingPage </Text>
            </View>
        )
    }
}
