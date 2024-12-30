import { useRef, useEffect } from 'react';
import type { GameState } from '../types/breakout';

export function useBallMovement(
  gameState: GameState,
  paddleRef: React.RefObject<HTMLDivElement>
) {
  const ballRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef({ x: 4, y: -4 });
  const positionRef = useRef({ x: 400, y: 550 });

  useEffect(() => {
    if (!gameState.isPlaying) return;

    const updateBallPosition = () => {
      if (!ballRef.current || !paddleRef.current) return;

      const ball = ballRef.current.getBoundingClientRect();
      const paddle = paddleRef.current.getBoundingClientRect();
      const container = ballRef.current.parentElement?.getBoundingClientRect();

      if (!container) return;

      // Wall collisions
      if (positionRef.current.x <= 0 || positionRef.current.x >= container.width - ball.width) {
        velocityRef.current.x *= -1;
      }
      if (positionRef.current.y <= 0) {
        velocityRef.current.y *= -1;
      }

      // Paddle collision
      if (
        positionRef.current.y >= paddle.top - container.top - ball.height &&
        positionRef.current.x + ball.width >= paddle.left - container.left &&
        positionRef.current.x <= paddle.right - container.left
      ) {
        velocityRef.current.y *= -1;
      }

      positionRef.current.x += velocityRef.current.x;
      positionRef.current.y += velocityRef.current.y;

      ballRef.current.style.left = `${positionRef.current.x}px`;
      ballRef.current.style.top = `${positionRef.current.y}px`;
    };

    const gameLoop = setInterval(updateBallPosition, 16);
    return () => clearInterval(gameLoop);
  }, [gameState.isPlaying]);

  return { ballRef, position: positionRef.current };
}