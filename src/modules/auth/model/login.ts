export interface LoginResponse{
    userId: string,
    accessToken: string,
    refreshToken: string,
    imagePath?: string
}