import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };

/** Visuel de partage commun (Open Graph / réseaux sociaux), généré au build. */
export function renderOgImage({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF6EF",
          padding: "64px 72px",
          borderBottom: "24px solid #B4441F",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", position: "relative", width: 56, height: 56 }}>
            <div
              style={{ position: "absolute", top: 8, left: 8, width: 40, height: 40, background: "#B4441F", borderRadius: 4 }}
            />
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                width: 40,
                height: 40,
                background: "#1F5C66",
                borderRadius: 4,
                transform: "rotate(45deg)",
                opacity: 0.9,
              }}
            />
          </div>
          <div style={{ fontSize: 34, color: "#1B2A2F", fontWeight: 700 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {eyebrow && (
            <div style={{ fontSize: 28, color: "#B4441F", letterSpacing: 3, textTransform: "uppercase" }}>
              {eyebrow}
            </div>
          )}
          <div style={{ fontSize: title.length > 60 ? 60 : 72, color: "#1B2A2F", lineHeight: 1.1, fontWeight: 700 }}>
            {title}
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#4A5A5F" }}>{siteConfig.tagline}</div>
      </div>
    ),
    ogSize,
  );
}
