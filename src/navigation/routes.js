import {
    createStackNavigator,
    createSwitchNavigator,
  } from 'react-navigation';
import MainPage from '../page/MainPage';
import AppLoadingPage from '../page/AppLoadingPage';
import LoginPage from '../page/LoginPage';
import Settings from '../page/Settings';
import About from '../page/About';
import ChangePassword from '../page/ChangePassword';

const AppNavigator = createStackNavigator(
    {
        MainPage: {
        screen: MainPage
      },
        Settings: {
          screen: Settings
        },
        About: {
          screen: About
        },
        ChangePass: {
          screen: ChangePassword
        }
    },
    { navigationOptions: { header: null } }
  );

const Authnavigator = createSwitchNavigator(
    {
      AppLoadingPage: {
        screen: AppLoadingPage
      },
      Login: {
        screen: LoginPage
      }
    },
    { navigationOptions: { header: null } }
  );
export const GlobalNavigation = createSwitchNavigator({
    Auth: {
      screen: Authnavigator,
      navigationOptions: {
        header: null
      }
    },
    Main: {
      screen: AppNavigator
    },
  });