import { useRef, useEffect } from 'react';
import type { GameState } from '../types/breakout';

export function usePaddleMovement(gameState: GameState) {
  const paddleRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(8);

  useEffect(() => {
    if (!gameState.isPlaying) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!paddleRef.current) return;

      const container = paddleRef.current.parentElement;
      if (!container) return;

      const paddle = paddleRef.current.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      let newX = paddle.left - containerRect.left;

      if (e.key === 'ArrowLeft') {
        newX = Math.max(0, newX - speedRef.current);
      } else if (e.key === 'ArrowRight') {
        newX = Math.min(
          containerRect.width - paddle.width,
          newX + speedRef.current
        );
      }

      paddleRef.current.style.left = `${newX}px`;
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.isPlaying]);

  return paddleRef;
}