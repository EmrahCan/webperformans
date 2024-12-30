import React from 'react';
import { ScoreCircle } from './ScoreCircle';

export function ScoreGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <ScoreCircle score={98} label="Performance" />
      <ScoreCircle score={95} label="Accessibility" />
      <ScoreCircle score={92} label="Best Practices" />
      <ScoreCircle score={89} label="SEO" />
    </div>
  );
}