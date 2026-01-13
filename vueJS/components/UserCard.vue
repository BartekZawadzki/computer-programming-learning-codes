<template>
  <!-- Prezentacja pojedynczego użytkownika -->
  <li class="user-card">
    <strong>{{ user.name }}</strong>
    <span> – {{ user.email }}</span>
  </li>
</template>

<script setup>
// Props z typowaniem (TypeScript lub JSDoc)
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.user-card {
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
}
</style>

<!-- ---
Dlaczego tak:
- Oddzielenie prezentacji użytkownika w osobny komponent czyni listę prostą i wielorazową.
- Props z require pilnuje, że komponent dostanie dane; brak logiki biznesowej trzyma go „czystym”.
- Prostota styli (padding + border) ułatwia podgląd i dalsze dopasowanie bez zależności zewnętrznych. -->
