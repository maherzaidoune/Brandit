import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {getSize} from '../utils/UiUtils';
import AuthInput from '../component/AuthInput';
import CheckBox from '../utils/react-native-check-box/index.js';
import {connect} from 'react-redux';
import {change_password} from '../redux/actions';

const background = require('../images/background_screen.png');
const line = require('../images/line.png');
const logo = require('../images/logo.png');
const user = require('../images/user.png');

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpass: '',
      password: '',
      rememberMe: false,
    };
  }

  changePassword = () => {
    console.log("changePassword");
    AsyncStorage.getItem('id').then(id => {
    console.log("changePassword id = " + id);
      this.props.change_password(
        id,
        this.state.oldpass,
        this.state.password,
        Response => {
          if (Response.data == 'Changement de mot de passe réussit') {
            Snackbar.show({
              title: 'Password changed',
              duration: Snackbar.LENGTH_SHORT,
              action: {
                title: 'Success',
                color: 'green',
                onPress: () => {
                  /* Do something. */
                },
              },
            });
          } else {
            Snackbar.show({
              title: 'Erreur de changement de mot de passe',
              duration: Snackbar.LENGTH_LONG,
              action: {
                title: 'Try again',
                color: 'red',
                onPress: () => {
                  /* Do something. */
                },
              },
            });
          }
        },
        error => {
          Snackbar.show({
            title: 'Erreur de changement de mot de passe',
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
              title: 'ok',
              color: 'red',
              onPress: () => {
                /* Do something. */
              },
            },
          });
        },
      );
    }).catch(e => console.log("error = " + e));
  };

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
            }}>
            <View
              style={{
                flex: 0.3,
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingBottom: 5,
              }}>
              <Image
                source={logo}
                resizeMode={'center'}
                style={{
                  height: getSize(120),
                  width: getSize(120),
                }}
              />
            </View>
            <View
              style={{
                flex: 0.45,
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginLeft: getSize(20),
                marginRight: getSize(20),
              }}>
              <AuthInput
                onChangeText={text =>
                  this.setState({
                    oldpass: text,
                  })
                }
                autoCapitalize={'none'}
                value={this.state.oldpass}
                placeholder={'old password'}
                keyboard={'default'}
                return={'next'}
                secureTextEntry={true}
                icon="lock1"
              />
              <AuthInput
                onChangeText={text =>
                  this.setState({
                    password: text,
                  })
                }
                autoCapitalize={'none'}
                value={this.state.password}
                placeholder={'password'}
                keyboard={'default'}
                return={'next'}
                secureTextEntry={true}
                icon="lock1"
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.changePassword()}
                style={{
                  borderRadius: 5,
                  backgroundColor: '#ee5384',
                  marginTop: getSize(20),
                  height: getSize(43),
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.props.isRequesting || this.props.isRequestingdata ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: getSize(20),
                      fontWeight: '400',
                    }}>
                    CHANGE PASSWORD
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    isRequesting: state.Settings.isRequesting,
  };
};
export default connect(mapStateToProps, {
  change_password,
})(ChangePassword);
