const initialState = {
    projects: []
  }

const getProjects = (state = initialState, action: { type: any; payload: any; }) => {
    switch(action.type){
        case "FETCH_PROJECTS":
            return {
                ...state,
                projects: action.payload.projects
            }
        default:
            return state
    }
}

export default getProjects;