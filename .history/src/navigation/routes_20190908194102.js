import MainPage from '../page/MainPage';
import AppLoadingPage from '../page/AppLoadingPage';
import LoginPage from '../page/AppLoadingPage';

const AppNavigator = createStackNavigator(
    {
        MainPage: {
        screen: MainPage
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
    Tab: {
      screen: AppNavigator
    },
  });