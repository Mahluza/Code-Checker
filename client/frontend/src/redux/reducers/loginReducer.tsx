const initialState = {
  userToken: localStorage.getItem('userToken'),
  loggedIn: false,
  userRole: localStorage.getItem('userRole'),
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
        userRole: action.payload.userRole,
      };
    case 'LOG_OUT':
      return {
        ...state,
        userToken: null,
        loggedIn: false,
        useRole: null,
      };
    default:
      return state;
  }
};

export default currentUser;
