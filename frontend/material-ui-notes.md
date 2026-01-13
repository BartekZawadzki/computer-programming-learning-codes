# Material UI (MUI v5) – skrót konfiguracji i użycia

- Zależności: `@mui/material @mui/icons-material @emotion/react @emotion/styled`
- Motyw: `createTheme` + `ThemeProvider`, `CssBaseline` do resetu.
- Kolory: `palette.primary/secondary`, tryb `mode: light|dark`.
- Kształty: `shape.borderRadius`, cienie: `shadows` lub `elevation` w komponentach.
- Layout: `Container`, `Grid` (system 12 kolumn), `Box` do flex/stack.
- Formularze: `TextField`, `Select`, `Checkbox`, `Radio`, `FormControl`, `FormHelperText`.
- Nawigacja: `AppBar` + `Toolbar`, `Drawer`, `Tabs`.
- Dane: `Table`, `DataGrid` (X), `List`.
- Ikony: `@mui/icons-material` (import pojedynczych ikon, np. `Add`, `Delete`).
- Stylowanie: `sx` prop (zalecane), `styled()` (Emotion), klasy utility (`display`, `gap`, `p`, `m`).
- Theming rozbudowany: `components` (overrides, defaultProps), `typography`, `breakpoints`, `spacing`.
- Dostępność: atrybuty ARIA, `aria-label`, `aria-describedby`; focus states w `TextField`.

Render w SPA (React 18):
```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme, CssBaseline, Button } from "@mui/material";

const theme = createTheme({ palette: { mode: "light", primary: { main: "#2563eb" } } });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button variant="contained">Hello</Button>
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(<App />);
```

---
Dlaczego tak:
- Zbiór punktowy przyspiesza start z MUI: zależności, theming, podstawowe komponenty i stylowanie.
- Przykład renderu pokazuje minimalną konfigurację ThemeProvider/CssBaseline w React 18.
- Wzmianki o A11y/ARIA i sx/styled przypominają o produkcyjnych dobrych praktykach i elastycznym stylowaniu.
