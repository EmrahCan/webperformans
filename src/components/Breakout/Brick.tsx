import React from 'react';
import type { BrickProps } from '../../types/breakout';

export function Brick({ x, y, width, height, color }: BrickProps) {
  return (
    <div
      className="absolute rounded"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
      }}
    />
  );
}