import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock boardgame.io Client to avoid complex setup in tests
jest.mock('boardgame.io/react', () => ({
  Client: ({ board: Board }) => {
    // Return a mock component that renders the board with test props
    return function MockClient() {
      const mockProps = {
        G: {
          board: Array(8).fill(null).map(() => Array(8).fill(null)),
          selectedSquare: null,
          castlingRights: {
            white: { kingside: true, queenside: true },
            black: { kingside: true, queenside: true }
          },
          enPassantTarget: null,
          halfMoveClock: 0,
          fullMoveNumber: 1,
          moveHistory: []
        },
        ctx: {
          currentPlayer: '0',
          turn: 1,
          numPlayers: 2,
          gameover: null
        },
        moves: {
          selectSquare: jest.fn(),
          promotePawn: jest.fn(),
          offerDraw: jest.fn(),
          resign: jest.fn()
        },
        events: {
          endTurn: jest.fn(),
          endGame: jest.fn()
        },
        playerID: '0'
      };
      
      return <Board {...mockProps} />;
    };
  }
}));

describe('Chess App', () => {
  test('renders chess game header', () => {
    render(<App />);
    expect(screen.getByText('Chess Game')).toBeInTheDocument();
    expect(screen.getByText('Implementation using boardgame.io framework')).toBeInTheDocument();
  });

  test('renders chess board', () => {
    render(<App />);
    expect(screen.getByText('Loading chess game...')).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<App />);
    expect(screen.getByText('Built with boardgame.io | Following FIDE Laws of Chess')).toBeInTheDocument();
  });
});
