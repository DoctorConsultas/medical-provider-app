export interface AuthResponse {
    token: string;
    refreshToken: string | null;
    username: string;
    role: string;
}