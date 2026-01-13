// Serwis Angular: przykładowy klient HTTP do pobierania użytkowników.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment'; // baza URL API

// Interfejs użytkownika (dane z API)
export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })       // serwis globalny (singleton)
export class AppService {
  private base = environment.apiUrl;      // baza URL z env

  constructor(private http: HttpClient) {} // DI HttpClient

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.base}/users`); // GET /users
  }
}

// ---
// Dlaczego tak:
// - Serwis wstrzykiwany w root upraszcza konsumpcję (singleton DI).
// - Typowanie User[] na Observable poprawia DX i bezpieczeństwo danych w komponentach.
// - apiUrl w env pozwala łatwo przełączać backend (dev/prod) bez zmiany kodu serwisu.
