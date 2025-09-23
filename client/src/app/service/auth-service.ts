import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, RegistrationRequest } from '../models/auth';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  registration(registrationDetails: RegistrationRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/register`, registrationDetails);
  }

  login(loginDetails: LoginRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, loginDetails);
  }
}
