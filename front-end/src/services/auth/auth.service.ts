import {
  Injectable,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthState } from './auth-state.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState: WritableSignal<AuthState> = signal<AuthState>({
    userId: this.getUserId(),
    user: this.getUser(),
    token: this.getToken(), //get token from localStorage, if there
    isAuthenticated: this.verifyToken(this.getToken()), //verify it's not expired
  });

  userId = computed(() => this.authState().userId);
  user = computed(() => this.authState().user);
  token = computed(() => this.authState().token);
  isAuthenticated = computed(() => this.authState().isAuthenticated);

  constructor() {
    effect(() => {
      const token = this.authState().token;
      const user = this.authState().user;
      const userId = this.authState().userId;
      if (token !== null) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
      if (userId !== null) {
        localStorage.setItem('userId', userId);
      } else {
        localStorage.removeItem('userId');
      }
      if (user !== null) {
        localStorage.setItem('user', user);
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  updateToken(token: string): void {
    const decodedToken: any = jwtDecode(token);
    const username = decodedToken.username || null;
    const userId = decodedToken.userId;
    this.authState.set({
      userId: userId,
      user: username,
      token: token,
      isAuthenticated: this.verifyToken(token),
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return localStorage.getItem('user');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  verifyToken(token: string | null): boolean {
    if (token !== null) {
      try {
        const decodedToken = jwtDecode(token);
        const expiration = decodedToken.exp;
        if (expiration === undefined || Date.now() >= expiration * 1000) {
          return false; //expiration not available or in the past
        } else {
          return true; //token not expired
        }
      } catch (error) {
        //invalid token
        return false;
      }
    }
    return false;
  }

  isUserAuthenticated(): boolean {
    return this.verifyToken(this.getToken());
  }

  logout() {
    this.authState.set({
      userId: null,
      user: null,
      token: null,
      isAuthenticated: false,
    });
  }
}
