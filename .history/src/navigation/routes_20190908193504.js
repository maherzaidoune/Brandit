export const GlobalNavigation = createSwitchNavigator({
    Auth: {
      screen: LoginPage,
      navigationOptions: {
        header: null
      }
    },
    Tab: {
      screen: TabbarNavigation
    },
    modalFilter: {
      screen: ModalFilterEvent,
      navigationOptions: {
        transitionConfig: () => ({
          isModal: true
        })
      }
    }
  });