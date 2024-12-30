import { useEffect } from 'react';
import type { GameState } from '../types/breakout';

export function useGameLoop(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  useEffect(() => {
    if (!gameState.isPlaying) return;

    const checkCollisions = () => {
      // Check brick collisions and update score
      setGameState(prev => ({
        ...prev,
        bricks: prev.bricks.filter(brick => !brick.hit),
        score: prev.score + 10
      }));
    };

    const gameLoop = setInterval(checkCollisions, 16);
    return () => clearInterval(gameLoop);
  }, [gameState.isPlaying]);
}