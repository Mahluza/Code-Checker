export interface RootState {
    currentUser: CurrentUser
    projects: Project[]
}

export interface CurrentUser {
    userToken: string;
    userRole: number;
}

export interface Project {
    name: string;
    id: number;
    createdOn: Date;
}