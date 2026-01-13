// Material UI (MUI v5) przykłady z komentarzami: ThemeProvider, AppBar, Grid, Card, Button.
// Uruchom w projekcie React (CRA/Vite/Next) z @mui/material @mui/icons-material @emotion/react @emotion/styled.
import * as React from "react";
import ReactDOM from "react-dom/client";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Niestandardowy motyw (kolory, typografia)
const theme = createTheme({
  palette: {
    mode: "light",                     // light/dark
    primary: { main: "#2563eb" },      // kolor główny
    secondary: { main: "#f59e0b" },    // kolor dodatkowy
  },
  shape: { borderRadius: 12 },         // zaokrąglenie komponentów
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />                  {/* reset stylów MUI */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MojaApp (MUI)
          </Typography>
          <Button color="inherit" startIcon={<AddIcon />}>
            Dodaj
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        {/* Grid responsywny: 3 kolumny na md+, pełna szerokość na xs */}
        <Grid container spacing={2}>
          {[1, 2, 3].map((i) => (
            <Grid key={i} item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">Karta {i}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Przykładowy opis funkcji lub sekcji.
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button size="small" variant="contained">Akcja</Button>
                  <Button size="small" variant="outlined">Więcej</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Formularz z komponentami TextField i walidacją */}
        <Grid container spacing={2} sx={{ mt: 3 }} component="form">
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              helperText="Podaj poprawny email"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Hasło"
              type="password"
              fullWidth
              required
              inputProps={{ minLength: 6 }}
              helperText="Min. 6 znaków"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">Wyślij</Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

// Render w aplikacji React
const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
}

// ---
// Dlaczego tak:
// - ThemeProvider z createTheme centralizuje motyw (kolory, radius) i stosuje go do całej aplikacji.
// - AppBar/Toolbar/Button pokazują gotowe komponenty nawigacji z ikoną i typografią.
// - Grid + Card demonstruje responsywny layout i komponenty prezentacyjne w jednym przykładzie.
// - TextField/Buttons we wspólnym formularzu ilustrują walidację i spójny styling bez pisania CSS.
// - Render przez React 18 createRoot to zalecany punkt wejścia, a opcjonalność rootEl zabezpiecza przed błędem w SSR/testach.
