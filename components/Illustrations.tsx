import type { ReactElement, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** Sello circular de la marca: monograma "BA" con la leyenda. */
export function Sello({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" {...p}>
      <defs>
        <path id="sello-arc" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="56" {...base} />
      <circle cx="60" cy="60" r="33" {...base} strokeWidth={1} />
      <text fontFamily="var(--font-dmsans)" fontSize="8.4" letterSpacing="3.2" fill="currentColor">
        <textPath href="#sello-arc">LA BOTICA DE ALE · HUELIN · MÁLAGA ·</textPath>
      </text>
      <text x="60" y="68" textAnchor="middle" fontFamily="var(--font-cormorant)" fontSize="26" fontStyle="italic" fill="currentColor">
        B·A
      </text>
    </svg>
  );
}

/** Divisor ornamental con rama de olivo. */
export function Ornamento({ className, ...p }: P) {
  return (
    <svg viewBox="0 0 220 24" className={className} aria-hidden="true" {...p}>
      <path d="M2 12h78M140 12h78" {...base} strokeWidth={1} />
      <path d="M90 12c8-7 16-7 20 0 4-7 12-7 20 0-8 7-16 7-20 0-4 7-12 7-20 0z" {...base} />
      <circle cx="110" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

/** Composición principal: alacena de botica con tarros, botellas y cajones etiquetados. */
export function Alacena({ className, etiquetas = [], ...p }: P & { etiquetas?: string[] }) {
  const cajones = Array.from({ length: 9 }, (_, i) => etiquetas[i] ?? "");
  return (
    <svg viewBox="0 0 480 560" className={className} role="img" aria-label="Ilustración de una alacena de botica con tarros y cajones" {...p}>
      {/* marco */}
      <path d="M40 120 Q40 40 240 30 Q440 40 440 120 V540 H40 Z" {...base} strokeWidth={2} />
      <path d="M58 128 Q60 60 240 50 Q420 60 422 128 V522 H58 Z" {...base} strokeWidth={1} opacity={0.6} />
      {/* estante superior */}
      <path d="M58 250 H422 M58 262 H422" {...base} />
      {/* tarro izquierdo */}
      <g>
        <path d="M92 250 V176 q0-10 10-12 h44 q10 2 10 12 V250" {...base} />
        <rect x="98" y="152" width="52" height="12" rx="3" {...base} />
        <path d="M110 152 v-8 h28 v8" {...base} />
        <rect x="102" y="192" width="44" height="30" rx="2" {...base} strokeWidth={1} />
        <path d="M110 207 h28" {...base} strokeWidth={1} />
      </g>
      {/* botella de aceite */}
      <g>
        <path d="M196 250 V170 q0-18 14-26 V112 h20 v32 q14 8 14 26 V250 Z" {...base} />
        <path d="M206 112 h28 M212 104 h16 v8" {...base} />
        <path d="M204 196 h32 v28 h-32 z" {...base} strokeWidth={1} />
        <path d="M212 210 c5-6 11-6 16 0" {...base} strokeWidth={1} />
      </g>
      {/* copa */}
      <g>
        <path d="M282 150 h44 q2 40 -22 48 q-24 -8 -22 -48 z" {...base} />
        <path d="M304 198 V240 M288 248 q16 -8 32 0" {...base} />
        <path d="M286 170 q18 6 36 0" {...base} strokeWidth={1} opacity={0.7} />
      </g>
      {/* tarro derecho con rama de olivo */}
      <g>
        <path d="M352 250 v-48 q0-14 18-16 h12 q18 2 18 16 v48" {...base} />
        <path d="M364 186 v-8 h24 v8" {...base} />
        <path d="M376 178 C372 150 380 128 398 114" {...base} />
        <path d="M384 146 c10-8 20-8 24-2 -8 6-18 7-24 2z M378 162 c-10-6-20-4-22 2 8 5 17 4 22-2z M392 126 c4-10 12-14 18-12 -3 8-10 12-18 12z" {...base} strokeWidth={1.1} />
      </g>
      {/* cajones */}
      {cajones.map((t, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 74 + col * 114;
        const y = 280 + row * 78;
        return (
          <g key={i}>
            <rect x={x} y={y} width="104" height="66" rx="3" {...base} />
            <rect x={x + 16} y={y + 12} width="72" height="24" rx="2" {...base} strokeWidth={1} />
            <circle cx={x + 52} cy={y + 50} r="4" {...base} />
            {t ? (
              <text x={x + 52} y={y + 28} textAnchor="middle" fontFamily="var(--font-dmsans)" fontSize="9" letterSpacing="1.2" fill="currentColor">
                {t.toUpperCase()}
              </text>
            ) : null}
          </g>
        );
      })}
      {/* corona */}
      <path d="M210 30 q30-22 60 0" {...base} />
      <circle cx="240" cy="16" r="5" {...base} />
    </svg>
  );
}

/** Pequeños iconos de etiqueta para placeholders. */
export function Icono({ tipo, className }: { tipo: "plato" | "copa" | "botella" | "tarro" | "olivo" | "interior" | "mapa"; className?: string }) {
  const s = { ...base, strokeWidth: 1.2 };
  const paths: Record<string, ReactElement> = {
    plato: (<><ellipse cx="32" cy="38" rx="24" ry="9" {...s} /><ellipse cx="32" cy="36" rx="14" ry="5" {...s} /><path d="M22 30c2-8 18-8 20 0" {...s} /></>),
    copa: (<><path d="M22 10h20q2 18-10 22-12-4-10-22z" {...s} /><path d="M32 32v16M24 52q8-4 16 0" {...s} /><path d="M23 18q9 3 18 0" {...s} /></>),
    botella: (<><path d="M26 56V28q0-6 4-9V8h4v11q4 3 4 9v28z" {...s} /><rect x="27" y="34" width="10" height="12" {...s} /></>),
    tarro: (<><path d="M18 56V26q0-6 6-6h16q6 0 6 6v30z" {...s} /><rect x="22" y="12" width="20" height="8" rx="2" {...s} /><rect x="24" y="32" width="16" height="12" {...s} /></>),
    olivo: (<><path d="M12 52C24 40 36 30 52 14" {...s} /><path d="M24 40c-2-8 2-14 8-14-1 7-4 12-8 14zM34 30c8-2 13 1 14 6-6 1-11-1-14-6zM40 22c-1-7 2-11 7-11 0 6-3 10-7 11z" {...s} /></>),
    interior: (<><path d="M8 54h48M14 54V28h36v26M20 28V18h24v10" {...s} /><path d="M24 40h16v14M30 18v-6h4v6" {...s} /></>),
    mapa: (<><path d="M32 56s16-16 16-28a16 16 0 1 0-32 0c0 12 16 28 16 28z" {...s} /><circle cx="32" cy="28" r="6" {...s} /></>),
  };
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {paths[tipo]}
    </svg>
  );
}
