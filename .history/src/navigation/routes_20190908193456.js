export const GlobalNavigation = createSwitchNavigator({
    Auth: {
      screen: AuthNavigation,
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