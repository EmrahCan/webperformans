import React from 'react';
import { useBallMovement } from '../../hooks/useBallMovement';
import type { BallProps } from '../../types/breakout';

export function Ball({ gameState, paddleRef }: BallProps) {
  const { position, ballRef } = useBallMovement(gameState, paddleRef);

  return (
    <div
      ref={ballRef}
      className="absolute w-4 h-4 bg-blue-500 rounded-full"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}