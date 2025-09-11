import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private authUrl = 'http://localhost:5000/api';

  private http = inject(HttpClient);

  users(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${this.authUrl}/users`);
  }
}
