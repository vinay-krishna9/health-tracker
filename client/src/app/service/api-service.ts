import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  users(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${this.apiUrl}/api/users`);
  }
}
