import React, { useState, useRef } from 'react';
import { Ball } from './Ball';
import { Paddle } from './Paddle';
import { Brick } from './Brick';
import { useGameLoop } from '../../hooks/useGameLoop';
import { INITIAL_BRICKS } from '../../utils/breakoutUtils';
import type { GameState } from '../../types/breakout';

export function BreakoutGame() {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    score: 0,
    bricks: INITIAL_BRICKS,
  });
  
  const paddleRef = useRef<HTMLDivElement>(null);
  
  useGameLoop(gameState, setGameState);

  const startGame = () => {
    setGameState(prev => ({ ...prev, isPlaying: true }));
  };

  return (
    <div className="relative w-[800px] h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      {!gameState.isPlaying && (
        <button
          onClick={startGame}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg 
                     hover:bg-blue-700 transition-colors"
        >
          Start Game
        </button>
      )}
      
      <div className="absolute top-4 right-4 text-xl font-bold">
        Score: {gameState.score}
      </div>

      {gameState.bricks.map((brick, index) => (
        <Brick key={index} {...brick} />
      ))}
      
      <Ball gameState={gameState} paddleRef={paddleRef} />
      <Paddle gameState={gameState} />
    </div>
  );
}