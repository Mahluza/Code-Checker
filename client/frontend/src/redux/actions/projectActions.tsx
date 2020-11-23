const setProjects = (projectsObj: any) => {
    return {
        type: "FETCH_PROJECTS",
        payload: projectsObj
    }
}

export default {
    setProjects
}