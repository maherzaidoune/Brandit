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
import {Login, GetMasq, GetLogo} from '../redux/actions';

const background = require('../images/background_screen.png');
const line = require('../images/line.png');
const logo = require('../images/logo.png');
const user = require('../images/user.png');

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rememberMe: false,
    };
  }

  componentDidMount() {
    //dev
    //   if (__DEV__) {
    //     console.log('I am in debug');
    //     this.setState({
    //       username: 'coffee',
    //       password: 'coffee'
    //     }, () => this.login())
    // }
    try {
      AsyncStorage.getItem('username').then(username => {
        AsyncStorage.getItem('password').then(password => {
          console.log('password == ' + password);
          console.log('username == ' + username);
          if (password != null && username != null) {
            this.setState({password, username}, () => this.login());
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  login = () => {
    if (this.state.rememberMe) {
      try {
        AsyncStorage.setItem('username', this.state.username);
        AsyncStorage.setItem('password', this.state.password);
      } catch (e) {
        console.log(e);
      }
    }
    if (this.state.username.length < 1) {
      Snackbar.show({
        title: 'INVALID USERNAME',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          title: 'Try again',
          color: 'red',
          onPress: () => {
            /* Do something. */
          },
        },
      });
      return;
    } else if (this.state.password.length < 1) {
      Snackbar.show({
        title: 'INVALID PASSWORD',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          title: 'Try again',
          color: 'red',
          onPress: () => {
            /* Do something. */
          },
        },
      });
      return;
    }

    this.props.Login(
      this.state.username,
      this.state.password,
      Response => {
        if (Response.data != 'ko') {
          AsyncStorage.setItem('id', Response.data + "").then((id) => {
            console.log("id = "+id);
            Promise.all([
              new Promise((resolve, reject) => {
                this.props.GetMasq(
                  Response.data,
                  response => {
                    resolve();
                  },
                  error => {
                    console.log(error);
                  },
                );
              }),
              new Promise((resolve, reject) => {
                this.props.GetLogo(
                  Response.data,
                  response => {
                    resolve();
                  },
                  error => {
                    console.log(error);
                  },
                );
              }),
            ])
              .then(() => {
                this.props.navigation.navigate('Main');
                Snackbar.show({
                  title:
                    this.state.username + ' LOGGED IN. DOWNLOADING ASSETS ...',
                  duration: Snackbar.LENGTH_SHORT,
                  action: {
                    title: 'Welcome',
                    color: 'green',
                    onPress: () => {
                      /* Do something. */
                    },
                  },
                });
              })
              .catch(Error => console.log(Error));
          });
        } else {
          Snackbar.show({
            title: 'INVALID CREDENTIALS',
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
          title: 'Error ' + error,
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
                flex: 0.25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={user}
                resizeMode={'contain'}
                style={{
                  height: getSize(111),
                  width: getSize(305),
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
                    username: text,
                  })
                }
                autoCapitalize={'none'}
                value={this.state.username}
                placeholder={'username'}
                keyboard={'default'}
                return={'next'}
                secureTextEntry={false}
                icon="user"
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
                onPress={() => this.login()}
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
                    LOGIN
                  </Text>
                )}
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: getSize(20),
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.setState({
                      rememberMe: !this.state.rememberMe,
                    });
                  }}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    borderColor: '#a7aaaf',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginTop: 8,
                      marginBottom: 8,
                    }}>
                    <CheckBox
                      ref={CheckBox => {
                        this.CheckBox = CheckBox;
                      }}
                      onClick={() => {
                        this.setState({
                          rememberMe: !this.state.rememberMe,
                        });
                      }}
                      isChecked={this.state.rememberMe}
                      checkedCheckBoxColor={'#ee5384'}
                      uncheckedCheckBoxColor={'#80848A'}
                      checkBoxColor={'#fff'}
                    />
                    <Text
                      style={{
                        paddingLeft: getSize(2),
                        paddingRight: getSize(2),
                        fontSize: getSize(13),
                        color: '#fff',
                      }}>
                      Remember me
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: getSize(12),
                      color: '#a5a6b0',
                      fontStyle: 'italic',
                    }}>
                    Forgot your password?
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                source={line}
                style={{
                  height: getSize(1.5),
                  width: '100%',
                  marginTop: getSize(20),
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    isRequesting: state.Login.isRequesting,
    isRequestingdata: state.Data.isRequesting,
  };
};
export default connect(mapStateToProps, {
  Login,
  GetMasq,
  GetLogo,
})(LoginPage);
