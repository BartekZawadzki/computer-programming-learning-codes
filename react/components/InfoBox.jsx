// Prosty komponent JSX z propami i domyślnym kolorem tła.
export default function InfoBox({ title, children, tone = "info" }) {
  const tones = {
    info: "#e0f2fe",
    success: "#dcfce7",
    warning: "#fef9c3",
    danger: "#fee2e2",
  };
  const bg = tones[tone] || tones.info;          // wybierz kolor wg tone

  return (
    <div
      style={{
        background: bg,
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 12,
        padding: 12,
        margin: "12px 0",
      }}
    >
      {title && <h3 style={{ margin: "0 0 8px 0" }}>{title}</h3>}
      <div>{children}</div>
    </div>
  );
}

// ---
// Dlaczego tak:
// - Prosty mapping tone -> kolor pozwala szybko zmieniać kontekst komunikatu.
// - Styl inline trzyma przykład samoopisowy bez dodatkowych plików CSS.
// - children umożliwia włożenie dowolnej treści (tekst, listy, przyciski) w jednym komponencie.
