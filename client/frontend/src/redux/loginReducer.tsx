const initialState = {
    userToken: localStorage.getItem('userToken'),
    loggedIn: false
  }

const currentUser = (state = initialState, action: { type: any; payload: any; }) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                userToken: action.payload.userToken,
                loggedIn: true
            }
        case "LOG_OUT":
            return {
                ...state,
                userToken: {},
                loggedIn: false
            }
        default:
            return state
    }
}

export default currentUser;