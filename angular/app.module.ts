// Główny moduł Angular: deklaracje komponentów, importy, providery, bootstrap.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';   // HTTP dla serwisów
import { RouterModule } from '@angular/router';            // routing

import { AppComponent } from './app.component';            // root component
import { AppRoutingModule } from './app-routing.module';   // moduł routingu

@NgModule({
  declarations: [
    AppComponent,                                         // deklaracja komponentu
  ],
  imports: [
    BrowserModule,                                        // potrzebny w przeglądarce
    HttpClientModule,                                     // HTTP klient
    AppRoutingModule,                                     // trasy
    RouterModule,                                         // router
  ],
  providers: [],                                          // serwisy globalne (DI)
  bootstrap: [AppComponent],                              // komponent startowy
})
export class AppModule {}                                 // eksport modułu

// ---
// Dlaczego tak:
// - BrowserModule/HttpClientModule/RouterModule to podstawowy zestaw dla app web.
// - Deklaracje/Imports/Bootstrap utrzymują modułową strukturę i DI zgodne z Angular.
// - Oddzielenie AppRoutingModule pozwala rozwijać trasy niezależnie od logiki modułu.
