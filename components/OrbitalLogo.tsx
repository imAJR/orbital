"use client";

/**
 * Orbital animated logo mark.
 * Three rings orbiting a central star — ported from orbital-brand-identity.html.
 * Matches the exact SVG gradients, orbit speeds, and glow from the brand spec.
 */

interface OrbitalLogoProps {
  /** Size of the SVG in px */
  size?: number;
  /** Show the wordmark "Orbital." next to the mark */
  showWordmark?: boolean;
  /** Wordmark font size in px */
  wordmarkSize?: number;
  className?: string;
}

export function OrbitalLogo({
  size = 48,
  showWordmark = false,
  wordmarkSize = 24,
  className = "",
}: OrbitalLogoProps) {
  const id = `logo-${size}`;

  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      aria-label="Orbital"
    >
      {/* ── MARK ── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          {/* Core radial glow */}
          <radialGradient id={`${id}-core`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="60%"  stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#4a6cf7" stopOpacity="0" />
          </radialGradient>

          {/* Ring 1 — blue→violet */}
          <linearGradient id={`${id}-r1`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#4a6cf7" />
            <stop offset="100%" stopColor="#9b5cf6" />
          </linearGradient>

          {/* Ring 2 — teal→blue */}
          <linearGradient id={`${id}-r2`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#22d4bf" />
            <stop offset="100%" stopColor="#4a6cf7" />
          </linearGradient>

          {/* Ring 3 — pink→violet */}
          <linearGradient id={`${id}-r3`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#f75a9a" />
            <stop offset="100%" stopColor="#9b5cf6" />
          </linearGradient>

          {/* Satellite glow filter */}
          <filter id={`${id}-glow`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Core glow filter */}
          <filter id={`${id}-core-glow`}>
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Ring 3 (outer, dashed, pink→violet, 20s) ── */}
        <g className="orbit-ring-3">
          <ellipse
            cx="80" cy="80" rx="72" ry="30"
            stroke={`url(#${id}-r3)`}
            strokeWidth="1"
            strokeOpacity="0.45"
            fill="none"
            transform="rotate(-30 80 80)"
            strokeDasharray="6 4"
          />
          <circle
            cx="152" cy="80" r="4"
            fill="#f75a9a"
            filter={`url(#${id}-glow)`}
            transform="rotate(-30 80 80)"
          />
        </g>

        {/* ── Ring 2 (mid, solid, teal→blue, 8s reverse) ── */}
        <g className="orbit-ring-2">
          <ellipse
            cx="80" cy="80" rx="58" ry="22"
            stroke={`url(#${id}-r2)`}
            strokeWidth="1.2"
            strokeOpacity="0.65"
            fill="none"
            transform="rotate(50 80 80)"
          />
          <circle
            cx="138" cy="80" r="3.5"
            fill="#22d4bf"
            filter={`url(#${id}-glow)`}
            transform="rotate(50 80 80)"
          />
        </g>

        {/* ── Ring 1 (inner, solid, blue→violet, 12s) ── */}
        <g className="orbit-ring">
          <ellipse
            cx="80" cy="80" rx="44" ry="16"
            stroke={`url(#${id}-r1)`}
            strokeWidth="1.5"
            strokeOpacity="0.85"
            fill="none"
            transform="rotate(15 80 80)"
          />
          <circle
            cx="124" cy="80" r="5"
            fill="#4a6cf7"
            filter={`url(#${id}-glow)`}
            transform="rotate(15 80 80)"
          />
        </g>

        {/* ── Core star ── */}
        <circle
          cx="80" cy="80" r="12"
          fill={`url(#${id}-core)`}
          filter={`url(#${id}-core-glow)`}
          className="pulse-glow"
        />
        <circle
          cx="80" cy="80" r="6"
          fill="white"
          opacity="0.92"
        />
      </svg>

      {/* ── WORDMARK ── */}
      {showWordmark && (
        <span
          style={{
            fontFamily:    "var(--font-syne), system-ui, sans-serif",
            fontSize:      wordmarkSize,
            fontWeight:    800,
            letterSpacing: "-0.02em",
            color:         "var(--text)",
            lineHeight:    1,
          }}
        >
          Orbital
          <span style={{ color: "var(--orbit-violet)" }}>.</span>
        </span>
      )}
    </div>
  );
}