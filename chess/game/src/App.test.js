/**
 * Chess Game Tests
 * 
 * Basic tests for the chess game logic and components
 */

import { render, screen } from '@testing-library/react';
import App from './App';
import ChessGame from './Game';

// Test the main App component
describe('Chess App', () => {
  test('renders game lobby initially', () => {
    render(<App />);
    expect(screen.getByText('Chess Game')).toBeInTheDocument();
    expect(screen.getByText('Start Local Game')).toBeInTheDocument();
  });

  test('displays features list', () => {
    render(<App />);
    expect(screen.getByText('✓ Complete chess rules implementation')).toBeInTheDocument();
    expect(screen.getByText('✓ Check, Checkmate, and Stalemate detection')).toBeInTheDocument();
  });
});

// Test the chess game logic
describe('Chess Game Logic', () => {
  test('game has correct name', () => {
    expect(ChessGame.name).toBe('chess');
  });

  test('game setup creates initial board state', () => {
    const initialState = ChessGame.setup();
    
    expect(initialState.board).toBeDefined();
    expect(initialState.board.length).toBe(8);
    expect(initialState.board[0].length).toBe(8);
    
    // Check initial piece positions
    expect(initialState.board[0][0]).toEqual({
      type: 'R',
      color: 'black',
      hasMoved: false
    });
    
    expect(initialState.board[7][4]).toEqual({
      type: 'K',
      color: 'white',
      hasMoved: false
    });
    
    // Check castling rights
    expect(initialState.castlingRights).toEqual({
      whiteKing: true,
      whiteQueen: true,
      blackKing: true,
      blackQueen: true
    });
    
    // Check initial state values
    expect(initialState.enPassantTarget).toBeNull();
    expect(initialState.halfmoveClock).toBe(0);
    expect(initialState.fullmoveNumber).toBe(1);
  });

  test('game has required moves', () => {
    expect(ChessGame.moves.selectSquare).toBeDefined();
    expect(ChessGame.moves.promotePawn).toBeDefined();
  });

  test('game has endIf condition', () => {
    expect(ChessGame.endIf).toBeDefined();
  });
});
