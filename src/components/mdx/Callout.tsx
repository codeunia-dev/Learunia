import type { ReactNode } from 'react';

export type CalloutType = 'info' | 'warning' | 'success' | 'error';

const tone = {
  info: {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8h.01M11 12h2v6h-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    classes: 'border-blue-400/30 bg-blue-400/10 text-blue-200',
  },
  warning: {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M12 2l10 18H2L12 2z" stroke="currentColor" strokeWidth="2" />
        <path d="M12 9v5M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    classes: 'border-yellow-400/30 bg-yellow-400/10 text-yellow-200',
  },
  success: {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    classes: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  },
  error: {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    classes: 'border-red-400/30 bg-red-400/10 text-red-200',
  },
} as const;

export default function Callout({ type = 'info', title, children }: { type?: CalloutType; title?: string; children: ReactNode }) {
  const t = tone[type];
  const role = type === 'error' || type === 'warning' ? 'alert' : 'note';

  return (
    <div role={role} className={`not-prose my-4 rounded-xl border px-4 py-3 flex gap-3 items-start ${t.classes}`}>
      <span aria-hidden>{t.icon}</span>
      <div className="min-w-0">
        {title ? <div className="font-semibold mb-1">{title}</div> : null}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
