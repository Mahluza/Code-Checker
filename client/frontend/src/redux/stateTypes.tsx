export interface RootState {
    currentUser: CurrentUser
}

export interface CurrentUser {
    userToken: string;
}