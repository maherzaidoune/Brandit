export const GlobalNavigation = createSwitchNavigator({
    Auth: {
      screen: LoginPage,
      navigationOptions: {
        header: null
      }
    },
    Tab: {
      screen: App
    },
  });