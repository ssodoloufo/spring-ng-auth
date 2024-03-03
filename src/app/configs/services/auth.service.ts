import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  // private router = inject(Router);
  // private http = inject(HttpClient);

  constructor(private router: Router, private http: HttpClient) {}

  login(user: { username: string; password: string }): Observable<any> {
    return this.http
      // .post('http://localhost:8080/api/auth/login', user)
      .post(`${environment.apiUrl}/api/auth/login`, user)
      .pipe(tap((response: any) => this.doLoginUser(user.username, JSON.stringify(response.token.value))));
  }

  private doLoginUser(username: string, token: any) {
    this.loggedUser = username;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  getCurrentAuthUser() {
    // return this.http.get('http://localhost:8080/api/auth/profile');
    return this.http.get(`${environment.apiUrl}/api/auth/profile`);
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }
}
