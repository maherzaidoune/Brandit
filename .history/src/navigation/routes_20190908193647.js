
const Signup = createStackNavigator(
    {
      RegisterRppsPage: {
        screen: RegisterRppsPage
      },
      RegisterPageOne: {
        screen: RegisterPageOne
      },
      RegisterPageFour: {
        screen: RegisterPageFour
      },
      PassRecoverPage: {
        screen: PassRecoverPage
      },
      RegisterScanDoc: {
        screen: RegisterScanDoc
      }
    },
    {
      transitionConfig: getSlideFromRightTransition,
      headerMode: 'none'
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