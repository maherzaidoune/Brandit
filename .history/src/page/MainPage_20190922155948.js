import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {getSize} from '../utils/UiUtils';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

const background = require('../images/background_screen.png');
const logo = require('../images/logo.png');
const gallery = require('../images/gallery.png');
const photo = require('../images/photo.png');
const video = require('../images/video.png');

export default class MainPage extends Component {
  _takePhoto = () => {
    const options = {
      title: 'Select image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      cameraType: 'back',
      mediaType: 'photo',
      quality: 1,
      allowsEditing: true,
    };
    ImagePicker.launchCamera(options, response => {
      console.log(response);
    });
  };

  _takeVideo = () => {
    const options = {
      title: 'Select image',
      videoQuality: 'high',
      cameraType: 'back',
      mediaType: 'photo',
      quality: 1,
      allowsEditing: true,
    };
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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Settings')}
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={'md-settings'} size={getSize(28)} color="#d1d1d1" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginTop: getSize(110),
              }}>
              <TouchableOpacity
              onPress={this._takeVideo}
              >
                <Image
                  source={video}
                  resizeMode={'contain'}
                  style={{
                    height: getSize(104),
                    width: getSize(159),
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={this._takePhoto}>
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
