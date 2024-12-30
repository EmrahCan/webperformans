import type { Brick } from '../types/breakout';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

export const INITIAL_BRICKS: Brick[] = Array.from({ length: 25 }, (_, index) => ({
  x: (index % 5) * 160 + 10,
  y: Math.floor(index / 5) * 30 + 10,
  width: 150,
  height: 20,
  color: COLORS[Math.floor(index / 5)],
}));