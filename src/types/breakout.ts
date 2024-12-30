export interface GameState {
  isPlaying: boolean;
  score: number;
  bricks: Brick[];
}

export interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  hit?: boolean;
}

export interface BrickProps extends Brick {}

export interface BallProps {
  gameState: GameState;
  paddleRef: React.RefObject<HTMLDivElement>;
}

export interface PaddleProps {
  gameState: GameState;
}