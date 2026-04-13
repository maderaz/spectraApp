export type SortDir = "asc" | "desc";

export function TokenCircle({ color, char, size = 28 }: { color: string; char: string; size?: number }) {
  return (
    <div
      className="rounded-full shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, backgroundColor: color }}
    >
      <span className="font-['Inter'] text-white" style={{ fontSize: size * 0.38, fontWeight: 700, lineHeight: 1 }}>
        {char}
      </span>
    </div>
  );
}

export function SmallTokenCircle({ color, char, size = 18 }: { color: string; char: string; size?: number }) {
  return (
    <div
      className="rounded-full shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, backgroundColor: color }}
    >
      <span className="font-['Inter'] text-white" style={{ fontSize: size * 0.38, fontWeight: 600, lineHeight: 1 }}>
        {char}
      </span>
    </div>
  );
}

export function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline-block ml-1">
      <path d="M4 4.5L6 2.5L8 4.5" stroke={active && dir === "asc" ? "white" : "rgba(255,255,255,0.2)"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 7.5L6 9.5L8 7.5" stroke={active && dir === "desc" ? "white" : "rgba(255,255,255,0.2)"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      <path d="M9.5 9.5L12.5 12.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function HelpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.1" />
      <path d="M6.5 6.2c0-1 .8-1.7 1.5-1.7s1.5.5 1.5 1.3c0 .9-.8 1.1-1.5 1.7V8.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="8" cy="10.5" r="0.6" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}
