<template>
  <!-- Główny komponent Vue: licznik + fetch użytkowników -->
  <main class="container">
    <h1>Vue.js – przykładowa aplikacja</h1>
    <p>Composition API: stan, efekt, fetch, komponenty.</p>

    <section class="card">
      <h2>Licznik</h2>
      <div class="row">
        <button @click="count--">-</button>
        <span>{{ count }}</span>
        <button @click="count++">+</button>
      </div>
    </section>

    <section class="card">
      <h2>Użytkownicy (fetch)</h2>
      <p v-if="loading">Ładowanie...</p>
      <p v-if="error" class="error">Błąd: {{ error }}</p>
      <ul v-if="!loading && !error">
        <UserCard v-for="u in users" :key="u.id" :user="u" />
      </ul>
      <button @click="refetch" :disabled="loading">Odśwież</button>
    </section>
  </main>
</template>

<script setup>
// Composition API setup: reactive state, composable useFetch
import { ref, onMounted } from "vue";
import UserCard from "./components/UserCard.vue"; // komponent prezentacyjny
import useFetch from "./composables/useFetch";    // composable do pobierania danych

const count = ref(0);                             // stan licznika
const { data, loading, error, refetch } = useFetch("/users"); // fetch użytkowników

const users = data;                               // alias dla template
onMounted(() => console.log("App mounted"));      // efekt po zamontowaniu
</script>

<style scoped>
/* Style scoped dla App.vue */
.container {
  max-width: 800px;
  margin: 24px auto;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

.card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
}

button {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
}

button:hover {
  background: #e2e8f0;
}

.error {
  color: #b91c1c;
  font-weight: 600;
}
</style>

<!-- ---
Dlaczego tak:
- Composition API (ref, onMounted) utrzymuje logikę w jednej sekcji i ułatwia dzielenie kodu (composables).
- useFetch izoluje pobieranie, a UserCard dba o prezentację pojedynczego elementu, co upraszcza główny template.
- Scoped style chroni przed przeciekami CSS między komponentami, a prosta struktura kart/sekcji ułatwia rozbudowę. -->
