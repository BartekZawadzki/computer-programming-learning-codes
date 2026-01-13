// Główny komponent React Native z komentarzami.
// Używa podstawowych komponentów: View, Text, FlatList, Button.
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
} from "react-native";
import useFetch from "./useFetch";            // hook do pobierania danych z API

type User = { id: number; name: string; email: string }; // typ użytkownika

export default function App() {
  const [count, setCount] = useState(0);                      // prosty stan licznika
  const { data, loading, error, refetch } = useFetch<User[]>("/users"); // fetch użytkowników

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>React Native – przykład</Text>
        <Text style={styles.subtitle}>Stan, lista, fetch, refetch.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Licznik</Text>
          <View style={styles.row}>
            <Button title="-" onPress={() => setCount((c) => c - 1)} />
            <Text style={styles.count}>{count}</Text>
            <Button title="+" onPress={() => setCount((c) => c + 1)} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Użytkownicy (fetch)</Text>
          {loading && <Text>Ładowanie...</Text>}
          {error ? <Text style={styles.error}>Błąd: {error}</Text> : null}
          {!loading && !error && (
            <FlatList
              data={data || []}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.userEmail}>{item.email}</Text>
                </View>
              )}
            />
          )}
          <Button title="Odśwież" onPress={refetch} disabled={loading} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },                // tło
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#475569", marginBottom: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderColor: "#e2e8f0",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  count: { fontSize: 18, fontWeight: "700" },
  listItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#e2e8f0" },
  userName: { fontWeight: "600" },
  userEmail: { color: "#475569" },
  error: { color: "#b91c1c", marginVertical: 4 },
});

// ---
// Dlaczego tak:
// - SafeAreaView i StatusBar dbają o poprawne wyświetlanie na urządzeniach (notch, system bar).
// - useFetch kapsułkuje pobieranie, dzięki czemu komponent skupia się na UI (lista, stany).
// - FlatList jest wydajniejsza od mapowania tablicy w RN, obsługuje wirtualizację.
// - Prostą kartę/licznik pokazuje lokalny stan, a sekcja użytkowników – stan z API, co ilustruje dwa typy źródeł danych.
