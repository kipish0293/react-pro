export interface AuthUser {
    email: string
    id: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    about?: string
    avatarPath?: string
    email: string
    name: string
    password: string
    phone?: string
    roles: string[]
}

export interface LoginResponse {
    accessToken: string
    user: AuthUser
}

export interface UserResponse {
    about: string | null
    avararPath: string | null
    email: string
    id: string
    name: string
    phone: string | null
    roles: string[]
}
