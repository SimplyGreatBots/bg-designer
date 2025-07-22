import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChessBoard from './Board';
import { PIECE_TYPES, COLORS } from './Game';

// Mock game state
const mockGameState = {
  board: Array(8).fill(null).map(() => Array(8).fill(null)),
  selectedSquare: null,
  possibleMoves: [],
  lastMove: null,
  capturedPieces: { [COLORS.WHITE]: [], [COLORS.BLACK]: [] },
  gameStatus: 'playing',
  winner: null
};

// Mock context
const mockContext = {
  currentPlayer: COLORS.WHITE,
  turn: 1,
  phase: 'play',
  gameover: false
};

// Mock moves
const mockMoves = {
  selectSquare: jest.fn(),
  resign: jest.fn(),
  offerDraw: jest.fn()
};

describe('ChessBoard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders 8x8 chess board', () => {
    render(
      <ChessBoard 
        G={mockGameState} 
        ctx={mockContext} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    // Should have 64 squares
    const squares = document.querySelectorAll('.square');
    expect(squares).toHaveLength(64);
  });

  test('displays pieces correctly', () => {
    const gameStateWithPieces = {
      ...mockGameState,
      board: Array(8).fill(null).map(() => Array(8).fill(null))
    };
    
    // Add a white king
    gameStateWithPieces.board[0][4] = {
      type: PIECE_TYPES.KING,
      color: COLORS.WHITE,
      hasMoved: false
    };
    
    render(
      <ChessBoard 
        G={gameStateWithPieces} 
        ctx={mockContext} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    // Should display the white king symbol
    expect(screen.getByText('♔')).toBeInTheDocument();
  });

  test('handles square clicks', () => {
    render(
      <ChessBoard 
        G={mockGameState} 
        ctx={mockContext} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    const firstSquare = document.querySelector('.square');
    fireEvent.click(firstSquare);
    
    expect(mockMoves.selectSquare).toHaveBeenCalledWith(0, 0);
  });

  test('highlights selected square', () => {
    const gameStateWithSelection = {
      ...mockGameState,
      selectedSquare: { row: 1, col: 4 }
    };
    
    render(
      <ChessBoard 
        G={gameStateWithSelection} 
        ctx={mockContext} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    // The selected square should have the 'selected' class
    const selectedSquare = document.querySelector('.square.selected');
    expect(selectedSquare).toBeInTheDocument();
  });

  test('shows possible moves', () => {
    const gameStateWithMoves = {
      ...mockGameState,
      possibleMoves: [{ row: 2, col: 4 }, { row: 3, col: 4 }]
    };
    
    render(
      <ChessBoard 
        G={gameStateWithMoves} 
        ctx={mockContext} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    const possibleMoveSquares = document.querySelectorAll('.square.possible-move');
    expect(possibleMoveSquares).toHaveLength(2);
  });

  test('highlights last move', () => {
    const gameStateWithLastMove = {
      ...mockGameState,
      lastMove: {
        from: { row: 1, col: 4 },
        to: { row: 3, col: 4 }
      }
    };
    
    render(
      <ChessBoard 
        G={gameStateWithLastMove} 
        ctx={mockContext} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    const lastMoveSquares = document.querySelectorAll('.square.last-move');
    expect(lastMoveSquares).toHaveLength(2);
  });

  test('displays game status correctly', () => {
    const gameStateInCheck = {
      ...mockGameState,
      gameStatus: 'check'
    };
    
    render(
      <ChessBoard 
        G={gameStateInCheck} 
        ctx={mockContext} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    expect(screen.getByText(/White is in check!/)).toBeInTheDocument();
  });

  test('displays checkmate status', () => {
    const gameStateCheckmate = {
      ...mockGameState,
      gameStatus: 'checkmate',
      winner: COLORS.WHITE
    };
    
    render(
      <ChessBoard 
        G={gameStateCheckmate} 
        ctx={mockContext} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    expect(screen.getByText(/Checkmate! White wins!/)).toBeInTheDocument();
  });

  test('displays stalemate status', () => {
    const gameStateStalemate = {
      ...mockGameState,
      gameStatus: 'stalemate'
    };
    
    render(
      <ChessBoard 
        G={gameStateStalemate} 
        ctx={mockContext} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    expect(screen.getByText(/Stalemate! The game is a draw./)).toBeInTheDocument();
  });

  test('shows captured pieces', () => {
    const gameStateWithCaptures = {
      ...mockGameState,
      capturedPieces: {
        [COLORS.WHITE]: [{ type: PIECE_TYPES.PAWN, color: COLORS.WHITE }],
        [COLORS.BLACK]: [{ type: PIECE_TYPES.KNIGHT, color: COLORS.BLACK }]
      }
    };
    
    render(
      <ChessBoard 
        G={gameStateWithCaptures} 
        ctx={mockContext} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    expect(screen.getByText('♙')).toBeInTheDocument(); // White pawn
    expect(screen.getByText('♞')).toBeInTheDocument(); // Black knight
  });

  test('shows control buttons for current player', () => {
    render(
      <ChessBoard 
        G={mockGameState} 
        ctx={mockContext} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    expect(screen.getByText('Resign')).toBeInTheDocument();
    expect(screen.getByText('Offer Draw')).toBeInTheDocument();
  });

  test('resign button works', () => {
    render(
      <ChessBoard 
        G={mockGameState} 
        ctx={mockContext} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    const resignButton = screen.getByText('Resign');
    fireEvent.click(resignButton);
    
    expect(mockMoves.resign).toHaveBeenCalled();
  });

  test('offer draw button works', () => {
    render(
      <ChessBoard 
        G={mockGameState} 
        ctx={mockContext} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    const drawButton = screen.getByText('Offer Draw');
    fireEvent.click(drawButton);
    
    expect(mockMoves.offerDraw).toHaveBeenCalled();
  });

  test('prevents moves when not current player', () => {
    const contextBlackTurn = {
      ...mockContext,
      currentPlayer: COLORS.BLACK
    };
    
    render(
      <ChessBoard 
        G={mockGameState} 
        ctx={contextBlackTurn} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    const firstSquare = document.querySelector('.square');
    fireEvent.click(firstSquare);
    
    // Should not call selectSquare when it's not the player's turn
    expect(mockMoves.selectSquare).not.toHaveBeenCalled();
  });

  test('displays game information', () => {
    render(
      <ChessBoard 
        G={mockGameState} 
        ctx={mockContext} 
        moves={mockMoves} 
        playerID={COLORS.WHITE}
      />
    );
    
    expect(screen.getByText(/Turn: 1/)).toBeInTheDocument();
    expect(screen.getByText(/You are: White/)).toBeInTheDocument();
  });
});
