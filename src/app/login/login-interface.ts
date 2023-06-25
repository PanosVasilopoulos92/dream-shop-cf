export interface AuthenticateUser {
    username: string;
    role: string;
    token: string;
    expiresIn: number;
}

export interface UserAPILoginUser {
    status: boolean;
    data: AuthenticateUser;
}

export interface LoginResponse {
    token: string;
    expiresIn: number;
    username: string;
    role: string;
}