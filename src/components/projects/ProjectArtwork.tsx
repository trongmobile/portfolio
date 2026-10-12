import type { ProjectArtwork as ArtworkKind } from '@/types';
import { cn } from '@/lib/utils';

/**
 * PLACEHOLDER ARTWORK — abstract motifs that hint at each product domain.
 * They are intentionally not UI screens and must not be presented as
 * screenshots. Supply real screenshots via `screenshots` in projects.ts.
 */

const A = '#4d7cff';
const A2 = '#a9bdff';
const L = 'rgb(255 255 255 / 0.16)';
const F = 'rgb(255 255 255 / 0.05)';

function Metro() {
  const stations = [40, 104, 168, 232, 296, 360];
  return (
    <>
      <path d="M40 150 H360" stroke={L} strokeWidth="2" />
      <path d="M40 150 H232" stroke={A} strokeWidth="3" strokeLinecap="round" />
      {stations.map((x, i) => (
        <circle key={x} cx={x} cy={150} r={i === 3 ? 8 : 5.5} fill="#0e0e11" stroke={i <= 3 ? A2 : L} strokeWidth="2" />
      ))}
      <rect x="196" y="122" width="72" height="16" rx="8" fill={A} opacity="0.9" />
      {/* Ticket */}
      <g transform="translate(118 46)">
        <rect width="164" height="58" rx="10" fill={F} stroke={L} />
        <path d="M112 6 V52" stroke={L} strokeDasharray="3 4" />
        <rect x="14" y="14" width="56" height="6" rx="3" fill="rgb(255 255 255 / 0.3)" />
        <rect x="14" y="28" width="80" height="5" rx="2.5" fill={L} />
        <rect x="14" y="40" width="40" height="5" rx="2.5" fill={L} />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`${r}${c}`} x={124 + c * 10} y={16 + r * 10} width="7" height="7" rx="1.5" fill={(r + c) % 2 ? A2 : L} />
          )),
        )}
      </g>
      <rect x="40" y="190" width="120" height="6" rx="3" fill={L} />
      <rect x="40" y="204" width="76" height="6" rx="3" fill={F} />
    </>
  );
}

function Traffic() {
  const tiles = [
    [64, 44],
    [210, 44],
    [64, 138],
    [210, 138],
  ];
  return (
    <>
      {tiles.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <rect width="126" height="76" rx="10" fill={F} stroke={i === 1 ? A : L} strokeWidth={i === 1 ? 1.5 : 1} />
          <path d={`M10 60 L44 ${36 + i * 3} L70 48 L116 ${22 + i * 4}`} stroke={i === 1 ? A2 : L} strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="114" cy="12" r="3" fill={i === 1 ? A : 'rgb(255 255 255 / 0.3)'} />
        </g>
      ))}
      <g transform="translate(300 98)">
        <path d="M18 2 L34 30 H2 Z" fill="#0e0e11" stroke={A} strokeWidth="2" strokeLinejoin="round" />
        <path d="M18 12 V20" stroke={A2} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="18" cy="25" r="1.6" fill={A2} />
      </g>
    </>
  );
}

function Bus() {
  return (
    <>
      <path d="M36 196 C 100 196, 96 120, 160 120 S 240 60, 300 70 S 360 110, 368 60" stroke={L} strokeWidth="2" fill="none" strokeDasharray="4 6" />
      <path d="M36 196 C 100 196, 96 120, 160 120 S 240 60, 300 70" stroke={A} strokeWidth="3" fill="none" strokeLinecap="round" />
      {[
        [36, 196],
        [104, 160],
        [160, 120],
        [232, 82],
        [300, 70],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="5.5" fill="#0e0e11" stroke={A2} strokeWidth="2" />
      ))}
      <g transform="translate(284 26)">
        <path d="M16 0 C 7 0 0 7 0 16 C 0 28 16 40 16 40 S 32 28 32 16 C 32 7 25 0 16 0 Z" fill={A} />
        <rect x="9" y="8" width="14" height="14" rx="3" fill="#0e0e11" />
      </g>
      <g transform="translate(48 40)">
        <rect width="120" height="44" rx="10" fill={F} stroke={L} />
        <rect x="12" y="12" width="44" height="6" rx="3" fill="rgb(255 255 255 / 0.3)" />
        <rect x="12" y="26" width="70" height="5" rx="2.5" fill={L} />
        <text x="104" y="27" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="12" fill={A2}>
          3′
        </text>
      </g>
    </>
  );
}

function Learning() {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <>
      <g transform="translate(56 50)">
        <rect width="180" height="112" rx="12" fill={F} stroke={L} />
        <circle cx="90" cy="56" r="20" fill={A} opacity="0.95" />
        <path d="M84 46 L100 56 L84 66 Z" fill="#0e0e11" />
        <rect x="12" y="98" width="156" height="4" rx="2" fill={L} />
        <rect x="12" y="98" width="96" height="4" rx="2" fill={A2} />
      </g>
      <g transform="translate(300 106)">
        <circle r={r} fill="none" stroke={L} strokeWidth="6" />
        <circle r={r} fill="none" stroke={A} strokeWidth="6" strokeDasharray={`${c * 0.68} ${c}`} strokeLinecap="round" transform="rotate(-90)" />
        <rect x="-14" y="-4" width="28" height="8" rx="4" fill="rgb(255 255 255 / 0.3)" />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(56 ${184 + i * 0})`}>
          <rect x={i * 64} width="54" height="26" rx="8" fill={i === 1 ? 'rgb(77 124 255 / 0.18)' : F} stroke={i === 1 ? A : L} />
        </g>
      ))}
    </>
  );
}

function Hr() {
  return (
    <>
      <g transform="translate(70 40)">
        <rect width="190" height="160" rx="12" fill={F} stroke={L} />
        <rect x="14" y="14" width="60" height="7" rx="3.5" fill="rgb(255 255 255 / 0.3)" />
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 7 }).map((__, col) => {
            const on = (row === 1 && col === 2) || (row === 1 && col === 3) || (row === 2 && col === 5);
            return (
              <rect
                key={`${row}-${col}`}
                x={14 + col * 24}
                y={40 + row * 28}
                width="18"
                height="18"
                rx="4"
                fill={on ? A : 'rgb(255 255 255 / 0.06)'}
              />
            );
          }),
        )}
      </g>
      <g transform="translate(240 120)">
        <rect width="110" height="58" rx="12" fill="#0e0e11" stroke={L} />
        <circle cx="24" cy="29" r="12" fill="rgb(77 124 255 / 0.2)" stroke={A} />
        <path d="M18 29 L22.5 33.5 L30 25" stroke={A2} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="46" y="20" width="48" height="6" rx="3" fill="rgb(255 255 255 / 0.3)" />
        <rect x="46" y="33" width="32" height="5" rx="2.5" fill={L} />
      </g>
    </>
  );
}

function Gis() {
  return (
    <>
      <g stroke={L} fill="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${20 + i * 6} ${60 + i * 34} C 120 ${30 + i * 34}, 220 ${100 + i * 30}, 380 ${50 + i * 34}`} />
        ))}
      </g>
      <path d="M120 70 L196 56 L224 118 L150 140 Z" fill="rgb(77 124 255 / 0.16)" stroke={A} strokeWidth="1.5" />
      <path d="M224 118 L300 100 L318 168 L236 182 Z" fill={F} stroke={L} strokeWidth="1.5" />
      <path d="M150 140 L224 118 L236 182 L162 198 Z" fill="rgb(169 189 255 / 0.08)" stroke={L} strokeWidth="1.5" />
      <g transform="translate(178 70)">
        <path d="M14 0 C 6 0 0 6 0 14 C 0 25 14 36 14 36 S 28 25 28 14 C 28 6 22 0 14 0 Z" fill={A} />
        <circle cx="14" cy="14" r="5" fill="#0e0e11" />
      </g>
      <g transform="translate(300 30)">
        <rect width="64" height="64" rx="10" fill="#0e0e11" stroke={L} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x="12" y={14 + i * 14} width={i === 0 ? 40 : 28} height="6" rx="3" fill={i === 0 ? A2 : L} />
        ))}
      </g>
    </>
  );
}

function Survey() {
  return (
    <g transform="translate(110 34)">
      <rect width="180" height="176" rx="14" fill={F} stroke={L} />
      <rect x="18" y="18" width="90" height="8" rx="4" fill="rgb(255 255 255 / 0.3)" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(18 ${46 + i * 30})`}>
          <circle cx="8" cy="8" r="7" fill="none" stroke={i === 1 ? A : L} strokeWidth="1.5" />
          {i === 1 && <circle cx="8" cy="8" r="3.5" fill={A} />}
          <rect x="24" y="5" width={100 - i * 18} height="6" rx="3" fill={L} />
        </g>
      ))}
      <rect x="18" y="140" width="144" height="22" rx="11" fill={A} />
    </g>
  );
}

const artworks: Record<ArtworkKind, () => JSX.Element> = {
  metro: Metro,
  traffic: Traffic,
  bus: Bus,
  learning: Learning,
  hr: Hr,
  gis: Gis,
  survey: Survey,
};

interface ProjectArtworkProps {
  kind: ArtworkKind;
  className?: string;
}

export function ProjectArtwork({ kind, className }: ProjectArtworkProps) {
  const Art = artworks[kind];
  return (
    <div aria-hidden="true" data-placeholder="illustration" className={cn('relative overflow-hidden bg-ink-900', className)}>
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
      <div className="absolute -bottom-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-accent-600/10 blur-3xl" />
      <svg viewBox="0 0 400 240" className="relative h-full w-full" preserveAspectRatio="xMidYMid meet" fill="none">
        <Art />
      </svg>
    </div>
  );
}
