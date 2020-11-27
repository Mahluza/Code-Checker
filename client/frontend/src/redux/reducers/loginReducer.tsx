const currentUser = (state = {}, action: { type: any; payload: any }) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {},
        loggedIn: false,
      };
    default:
      return state;
  }
};

const currentUser = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userToken: action.payload.userToken,
        loggedIn: true,
      };
    case 'LOG_OUT':
      return {
        ...state,
        userToken: null,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default currentUser;
