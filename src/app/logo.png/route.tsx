import { ImageResponse } from "next/og";

/**
 * Logo matriciel 512×512 (PNG), généré au build. Utilisé par les données
 * structurées Organization et comme icône Apple (écran d'accueil iOS).
 */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF6EF",
        }}
      >
        <div style={{ display: "flex", position: "relative", width: 360, height: 360 }}>
          <div
            style={{ position: "absolute", top: 50, left: 50, width: 260, height: 260, background: "#B4441F", borderRadius: 24 }}
          />
          <div
            style={{
              position: "absolute",
              top: 50,
              left: 50,
              width: 260,
              height: 260,
              background: "#1F5C66",
              borderRadius: 24,
              transform: "rotate(45deg)",
              opacity: 0.9,
            }}
          />
          <div
            style={{ position: "absolute", top: 122, left: 122, width: 116, height: 116, background: "#F2C14E", borderRadius: 999 }}
          />
        </div>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
