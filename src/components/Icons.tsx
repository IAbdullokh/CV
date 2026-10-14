// Stroke icons drawn on a 24px grid; colour comes from `currentColor`.
type IconProps = { className?: string };

const base = (className = "ic") => ({
  className,
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
  focusable: false as const,
});

export const ArrowRight = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

export const ArrowUpRight = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export const Pin = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" />
    <circle cx="12" cy="11" r="2" />
  </svg>
);

export const Check = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

export const Clock = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 8v4.5l3 2" />
  </svg>
);

export const Menu = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Sun = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const Moon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export const Route = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <circle cx="6" cy="6" r="2" />
    <circle cx="18" cy="12" r="2" />
    <circle cx="6" cy="18" r="2" />
    <path d="M8 6h3a5 5 0 0 1 5 5v1M8 18h3a5 5 0 0 0 5-5v-1" />
  </svg>
);

export const Chat = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z" />
  </svg>
);

export const BarChart = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M4 20h16M7 16V9M12 16V5M17 16v-6" />
  </svg>
);

export const Phone = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M11 18h2" />
  </svg>
);

export const Bell = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
    <path d="M10 20.5a2 2 0 0 0 4 0" />
  </svg>
);

export const GitHub = ({ className = "" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

export const Mail = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const LinkIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
    <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
  </svg>
);

/** The app-icon glyph used for each featured project. */
export function ProjectGlyph({ slug }: { slug: string }) {
  if (slug === "hilol") return <Chat />;
  if (slug === "clinic-analytics") return <BarChart />;
  return <Phone />;
}
