import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the boardgame.io Client to avoid complex setup in tests
jest.mock('boardgame.io/react', () => ({
  Client: jest.fn(({ board: Board }) => {
    // Return a mock component that renders the board with test data
    return function MockClient() {
      const mockG = {
        board: Array(8).fill(null).map(() => Array(8).fill(null)),
        selectedSquare: null,
        possibleMoves: [],
        lastMove: null,
        capturedPieces: { '0': [], '1': [] },
        gameStatus: 'playing',
        winner: null
      };
      
      const mockCtx = {
        currentPlayer: '0',
        turn: 1,
        phase: 'play',
        gameover: false
      };
      
      const mockMoves = {
        selectSquare: jest.fn(),
        resign: jest.fn(),
        offerDraw: jest.fn()
      };
      
      return (
        <div data-testid="chess-client">
          <Board G={mockG} ctx={mockCtx} moves={mockMoves} playerID="0" />
        </div>
      );
    };
  })
}));

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('chess-client')).toBeInTheDocument();
  });
  
  test('renders chess game title', () => {
    render(<App />);
    expect(screen.getByText('Chess')).toBeInTheDocument();
  });
  
  test('renders game board', () => {
    render(<App />);
    // Should render the chess board squares
    const squares = document.querySelectorAll('.square');
    expect(squares.length).toBeGreaterThan(0);
  });
});
