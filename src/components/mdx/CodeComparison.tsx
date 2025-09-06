import type { ReactNode } from 'react';
import Tabs, { Tab } from './Tabs';

export default function CodeComparison({ defaultValue, children }: { defaultValue?: string; children: ReactNode }) {
  return (
    <div className="not-prose border border-white/10 rounded-xl bg-white/5 p-3">
      <Tabs defaultValue={defaultValue}>
        {children}
      </Tabs>
    </div>
  );
}

// Re-export Tab for convenience so MDX can use <CodeComparison><Tab ... /></CodeComparison>
export { Tab };
