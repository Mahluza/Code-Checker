export interface RootState {
    currentUser: CurrentUser
    projects: Project[]
}

export interface CurrentUser {
    userToken: string;
}

export interface Project {
    name: string;
    id: number;
    createdOn: Date;
}