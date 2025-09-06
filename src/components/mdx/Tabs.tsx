'use client';

import React, { useId, useMemo, useState } from 'react';

export type TabProps = {
  value: string;
  label: string;
  children: React.ReactNode;
};

export function Tab(_props: TabProps) {
  // This is a logical wrapper; Tabs consumes Tab props via children
  return <>{_props.children}</>;
}

export type TabsProps = {
  id?: string;
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Tabs({ id, defaultValue, children, className }: TabsProps) {
  const autoId = useId();
  const baseId = id || `tabs-${autoId}`;

  const tabs = useMemo(() => {
    const arr = React.Children.toArray(children) as React.ReactElement<TabProps>[];
    return arr
      .filter((el) => React.isValidElement<TabProps>(el))
      .map((el) => ({ value: el.props.value, label: el.props.label, content: el.props.children }));
  }, [children]);

  const initial = defaultValue && tabs.find((t) => t.value === defaultValue) ? defaultValue : tabs[0]?.value;
  const [active, setActive] = useState<string | undefined>(initial);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = tabs.findIndex((t) => t.value === active);
    if (idx < 0) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = tabs[(idx + 1) % tabs.length];
      setActive(next.value);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
      setActive(prev.value);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(tabs[0].value);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(tabs[tabs.length - 1].value);
    }
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Code comparison"
        className="not-prose inline-flex flex-wrap items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1"
        onKeyDown={onKeyDown}
      >
        {tabs.map((t, i) => {
          const selected = t.value === active;
          const tabId = `${baseId}-tab-${t.value}`;
          const panelId = `${baseId}-panel-${t.value}`;
          return (
            <button
              key={t.value}
              id={tabId}
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className={
                'px-3 py-1.5 rounded-md text-sm transition-colors ' +
                (selected ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10')
              }
              onClick={() => setActive(t.value)}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tabs.map((t) => {
        const selected = t.value === active;
        const tabId = `${baseId}-tab-${t.value}`;
        const panelId = `${baseId}-panel-${t.value}`;
        return (
          <div
            key={t.value}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={!selected}
            className="mt-3"
          >
            {selected ? t.content : null}
          </div>
        );
      })}
    </div>
  );
}
