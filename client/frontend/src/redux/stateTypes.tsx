export interface RootState {
    currentUser: CurrentUser
    projects: Project[]
}

export interface CurrentUser {
    userToken: string;
    userRole: number;
    firstName: string;
    lastName: string;
}

export interface Project {
    name: string;
    id: number;
    createdOn: Date;
}