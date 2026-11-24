"use client";

/**
 * Dernier filet de sécurité : remplace le layout racine si celui-ci échoue.
 * Il doit donc définir lui-même <html> et <body>, avec des styles en ligne
 * (la feuille de style globale peut ne pas être chargée).
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#faf6ef", color: "#1b2a2f" }}>
        <main style={{ maxWidth: 560, margin: "0 auto", padding: "96px 24px", textAlign: "center" }}>
          <h1 style={{ fontSize: 32, margin: 0 }}>Le site rencontre un problème.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#4a5a5f" }}>
            Nous sommes désolés. Réessayez dans un instant.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 16,
              padding: "12px 28px",
              borderRadius: 999,
              border: 0,
              background: "#b4441f",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Réessayer
          </button>
        </main>
      </body>
    </html>
  );
}
