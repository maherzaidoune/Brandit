
const AppNavigator = createStackNavigator(
    {
      RegisterRppsPage: {
        screen: RegisterRppsPage
      }
    },
    { navigationOptions: { header: null } },
    {
      transitionConfig: () => ({
        isModal: true
      })
    }
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