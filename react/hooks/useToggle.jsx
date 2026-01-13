// Hook useToggle (JSX friendly) – prosty boolean toggle z komentarzami.
import { useCallback, useState } from "react";

export default function useToggle(initial = false) {
  const [value, setValue] = useState(initial);          // stan bool
  const toggle = useCallback(() => setValue((v) => !v), []); // funkcja przełączająca
  const setTrue = useCallback(() => setValue(true), []);     // ustaw true
  const setFalse = useCallback(() => setValue(false), []);   // ustaw false
  return { value, toggle, setTrue, setFalse };               // eksport narzędzi
}

// ---
// Dlaczego tak:
// - useToggle upraszcza obsługę booleanów (np. modal open/close) bez powtarzania setState.
// - Oddzielne setTrue/setFalse dają czytelność w miejscach, gdzie chcemy jawnie ustawić stan.
// - useCallback stabilizuje referencje funkcji (przydatne gdy przekazujemy je do propsów zależnych od referencji).
