const INITIAL_STATE = {
    isLoggedIn: false,
    requesting
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        default:
                return state;
    }
}
