import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, RegistrationRequest } from '../models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:5000/auth';

  private http = inject(HttpClient);

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  registration(registrationDetails: RegistrationRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.authUrl}/register`, registrationDetails);
  }

  login(loginDetails: LoginRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.authUrl}/login`, loginDetails);
  }
}
