import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {getSize} from '../utils/UiUtils';
import AuthInput from '../component/AuthInput';
import CheckBox from '../utils/react-native-check-box/index.js';
import {connect} from 'react-redux';
import {Login, GetMasq} from '../redux/actions';
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

  componentDidMount(){
    //dev
  //   if (__DEV__) {
  //     console.log('I am in debug');
  //     this.props.navigation.navigate('Main');
  // }
    
  }

  login = () => {
    if(this.state.username.length < 1){
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
    }else if(this.state.password.length < 1){
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
          this.props.GetMasq(Response.data, (response => {
            this.props.navigation.navigate('Main');
            console.log(response);
          }, error => {
            console.log(error);
          }))
          
          Snackbar.show({
            title: this.state.username + ' LOGGED IN. DOWNLOADING ASSETS ...',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              title: 'Welcome',
              color: 'green',
              onPress: () => {
                /* Do something. */
              },
            },
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
          title: 'Error',
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
                flex: 0.25,
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
                flex: 0.25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={user}
                resizeMode={'contain'}
                style={{
                  height: getSize(121),
                  width: getSize(305),
                }}
              />
            </View>
            <View
              style={{
                flex: 0.5,
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
                value={this.state.username}
                placeholder={'Username'}
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
                value={this.state.password}
                placeholder={'Password'}
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
                {this.props.isRequesting ? (
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
  };
};
export default connect(
  mapStateToProps,
  {
    Login,
    GetMasq
  },
)(LoginPage);
