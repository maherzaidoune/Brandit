import React, { Component } from 'react'
import { StatusBar, View, ImageBackground, Text } from 'react-native'
import { getSize } from '../utils/UiUtils'

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
              <View style={{flex: 0.2}} />
              <View
                style={{
                  flex: 0.6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{
                    color: '#fff',
                    size: getSize(20)
                }}>
                    Settings
                </Text>
              </View>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
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
              <Image
                source={photo}
                resizeMode={'contain'}
                style={{
                  height: getSize(104),
                  width: getSize(159),
                }}
              />
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
        )
    }
}
