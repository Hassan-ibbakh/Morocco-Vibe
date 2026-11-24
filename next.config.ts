import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy sans nonce (compatible avec les pages statiques).
 * Seules les ressources du site lui-même sont autorisées : aucun script,
 * style, police ou image tiers. À élargir si vous ajoutez un service externe
 * (mesure d'audience, régie publicitaire, vidéos…).
 */
function buildCsp({ admin = false } = {}): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    // Le tableau de bord charge sa police (Inter) depuis Google Fonts.
    admin ? "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com" : "style-src 'self' 'unsafe-inline'",
    // Le tableau de bord (/keystatic) dialogue avec l'API GitHub et affiche
    // les avatars GitHub ; le reste du site n'a besoin d'aucun domaine tiers.
    admin
      ? "img-src 'self' data: blob: https://avatars.githubusercontent.com https://raw.githubusercontent.com"
      : "img-src 'self' data: blob:",
    admin ? "font-src 'self' https://fonts.gstatic.com" : "font-src 'self'",
    admin ? "connect-src 'self' https://api.github.com" : "connect-src 'self'",
    ...(admin ? ["worker-src 'self' blob:"] : []),
    "object-src 'none'",
    "base-uri 'self'",
    admin ? "form-action 'self' https://github.com" : "form-action 'self'",
    "frame-ancestors 'none'",
    // HTTPS forcé uniquement sur Vercel (en local, `next start` tourne en HTTP).
    ...(process.env.VERCEL ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  // Le contenu (dossier content/) est lu au build ; on l'inclut aussi dans
  // les fonctions serveur au cas où une page serait rendue à la demande.
  outputFileTracingIncludes: { "/**": ["./content/**/*"] },
  images: {
    // Formats modernes et légers servis automatiquement par next/image.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: buildCsp() },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
      {
        // Pour une même clé, la dernière règle correspondante l'emporte.
        source: "/keystatic/:path*",
        headers: [{ key: "Content-Security-Policy", value: buildCsp({ admin: true }) }],
      },
      {
        source: "/keystatic",
        headers: [{ key: "Content-Security-Policy", value: buildCsp({ admin: true }) }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
