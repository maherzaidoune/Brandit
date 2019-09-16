import React, {Component} from 'react';
import {StatusBar, View, ImageBackground, Text, TouchableOpacity} from 'react-native';
import {getSize} from '../utils/UiUtils';
import Icon from 'react-native-vector-icons/AntDesign';


const background = require('../images/background_screen.png');

export default class Settings extends Component {
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
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: Platform.OS === 'ios' ? getSize(80) : getSize(100),
                paddingTop: getSize(5),
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                flex: 1,
              }}>
              <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
               style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name={'left'} size={getSize(26)} color="#fff" />
              </TouchableOpacity>
              <View
                style={{
                  flex: 0.6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: getSize(22),
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textAlignVertical: 'center'
                  }}>
                  SETTINGS
                </Text>
              </View>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            </View>
          <View
          style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start'
          }}
          >
            <TouchableOpacity
                style={{
                    height: getSize(55),
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    
                }}
            >

            </TouchableOpacity>
          </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
