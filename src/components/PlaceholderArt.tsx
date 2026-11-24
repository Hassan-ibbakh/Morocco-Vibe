/**
 * Illustration de remplacement affichée tant qu'aucune photo n'est fournie.
 * Paysage stylisé en SVG (quelques centaines d'octets, aucun réseau),
 * légèrement différent pour chaque contenu grâce à une graine.
 */

const DEFAULT_PALETTE: [string, string, string] = ["#F2C14E", "#C8553D", "#1F5C66"];

function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

export function PlaceholderArt({
  seed,
  palette = DEFAULT_PALETTE,
  showLabel = true,
}: {
  seed: string;
  palette?: [string, string, string];
  showLabel?: boolean;
}) {
  const h = hash(seed);
  const sunX = 90 + (h % 220);
  const sunY = 70 + ((h >> 3) % 50);
  const a = 150 + ((h >> 5) % 40);
  const b = 120 + ((h >> 7) % 50);
  const c = 175 + ((h >> 9) % 30);
  const id = `g${h.toString(36)}`;
  const [light, mid, deep] = palette;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        focusable="false"
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FAF6EF" />
            <stop offset="1" stopColor={light} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#${id})`} />
        <circle cx={sunX} cy={sunY} r="34" fill={light} />
        <path
          d={`M0 ${a} C 80 ${a - 40}, 140 ${a + 10}, 220 ${a - 25} S 360 ${a - 10}, 400 ${a - 30} V300 H0 Z`}
          fill={mid}
          opacity="0.85"
        />
        <path
          d={`M0 ${c} C 90 ${b + 30}, 170 ${c + 15}, 260 ${b + 45} S 360 ${c}, 400 ${b + 50} V300 H0 Z`}
          fill={deep}
        />
        <path
          d="M0 262 Q 50 250 100 262 T 200 262 T 300 262 T 400 262 V300 H0 Z"
          fill="#FAF6EF"
          opacity="0.18"
        />
      </svg>
      {showLabel && (
        <span className="absolute right-2 bottom-2 rounded-full bg-paper/90 px-2.5 py-1 text-[0.7rem] font-medium tracking-wide text-ink-soft uppercase">
          Photo à venir
        </span>
      )}
    </div>
  );
}
