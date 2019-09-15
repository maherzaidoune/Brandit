import React, {Component} from 'react';
import {Text, View, StatusBar, ImageBackground, Image, TouchableOpacity} from 'react-native';
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
              <View style={{flex: 0.2}} />
              <View
                style={{
                  flex: 0.6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={logo}
                  resizeMode={'contain'}
                  style={{
                    height: getSize(37),
                    width: getSize(188),
                  }}
                />
              </View>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={'md-settings'} size={getSize(28)} color="#d1d1d1" />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginTop: getSize(110)
              }}>
              <Image
                source={video}
                resizeMode={'contain'}
                style={{
                  height: getSize(104),
                  width: getSize(159),
                }}
              />
              <TouchableOpacity
              >
              <Image
                source={photo}
                resizeMode={'contain'}
                style={{
                  height: getSize(104),
                  width: getSize(159),
                }}
              />
              </TouchableOpacity>
              <Image
                source={gallery}
                resizeMode={'contain'}
                style={{
                  height: getSize(28),
                  width: getSize(146),
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
