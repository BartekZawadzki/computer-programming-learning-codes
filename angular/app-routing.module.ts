// Moduł routingu Angular – definicje tras z komentarzami.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'; // przykładowo ta sama strona

const routes: Routes = [
  {
    path: '',
    component: AppComponent, // root ścieżka
  },
  // { path: 'about', loadComponent: () => import('./about.component').then(m => m.AboutComponent) },
  { path: '**', redirectTo: '' }, // catch-all
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // rejestracja tras
  exports: [RouterModule],                 // eksport do użycia w AppModule
})
export class AppRoutingModule {}           // moduł routingu

// ---
// Dlaczego tak:
// - Oddzielny moduł routingu utrzymuje definicje tras poza logiką komponentów.
// - Catch-all redirect ułatwia obsługę nieznanych ścieżek w prostym szkicu.
// - paths można łatwo rozszerzyć (lazy load, guards) bez modyfikacji AppModule.
