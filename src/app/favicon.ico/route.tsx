import { ImageResponse } from "next/og";

/**
 * Les navigateurs demandent /favicon.ico automatiquement, même quand une icône
 * SVG est déclarée. Cette route sert une petite version PNG (générée au build)
 * pour éviter une erreur 404 à chaque visite.
 */
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#FAF6EF" }}>
        <div style={{ position: "absolute", top: 9, left: 9, width: 30, height: 30, background: "#B4441F", borderRadius: 3 }} />
        <div
          style={{
            position: "absolute",
            top: 9,
            left: 9,
            width: 30,
            height: 30,
            background: "#1F5C66",
            borderRadius: 3,
            transform: "rotate(45deg)",
            opacity: 0.9,
          }}
        />
        <div style={{ position: "absolute", top: 17, left: 17, width: 14, height: 14, background: "#F2C14E", borderRadius: 99 }} />
      </div>
    ),
    { width: 48, height: 48 },
  );
}
