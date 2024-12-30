import React from 'react';
import { usePaddleMovement } from '../../hooks/usePaddleMovement';
import type { PaddleProps } from '../../types/breakout';

export function Paddle({ gameState }: PaddleProps) {
  const paddleRef = usePaddleMovement(gameState);

  return (
    <div
      ref={paddleRef}
      className="absolute bottom-4 w-20 h-3 bg-gray-800 rounded"
    />
  );
}