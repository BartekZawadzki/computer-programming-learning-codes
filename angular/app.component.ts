// Root component Angular – prosty widok + pobieranie danych z serwisu.
import { Component, OnInit } from '@angular/core';
import { AppService, User } from './app.service'; // serwis do HTTP

@Component({
  selector: 'app-root',                 // znacznik użycia w HTML
  templateUrl: './app.component.html',  // szablon
  styleUrls: ['./app.component.css'],   // style komponentu
})
export class AppComponent implements OnInit {
  title = 'Przykład Angular';           // tytuł do wyświetlenia
  users: User[] = [];                   // lista użytkowników z API
  loading = false;                      // stan ładowania
  error = '';                           // komunikat błędu

  constructor(private appService: AppService) {} // DI serwisu

  ngOnInit(): void {
    this.fetchUsers();                  // pobierz dane przy starcie
  }

  fetchUsers(): void {
    this.loading = true;                // ustaw ładowanie
    this.error = '';
    this.appService.getUsers().subscribe({
      next: (users) => {                // sukces
        this.users = users;
        this.loading = false;
      },
      error: (err) => {                 // błąd
        this.error = 'Błąd pobierania';
        console.error(err);
        this.loading = false;
      },
    });
  }
}

// ---
// Dlaczego tak:
// - Komponent root pokazuje przepływ: DI serwisu → fetch danych → stany (loading/error/data).
// - fetchUsers wydzielony w metodę umożliwia ponowne wywołanie i czyszczenie stanu błędu/loading.
// - Typ User i trzymanie danych w polach klasy ułatwia szablonowi wiązania i waliduje dane w TypeScript.
