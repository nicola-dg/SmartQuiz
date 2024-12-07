export interface AuthState {
    userId: string | null,
    user: string | null,
    token: string | null,
    isAuthenticated: boolean
  }

export interface AuthRequest{
    username: string,
    email: string,
    password: string
}
