import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChessBoard } from './Board';

// Mock the CSS import
jest.mock('./Board.css', () => ({}));

describe('ChessBoard Component', () => {
  const mockMoves = {
    selectSquare: jest.fn()
  };

  const mockG = {
    board: [
      [
        { type: 'rook', color: 'black' },
        { type: 'knight', color: 'black' },
        { type: 'bishop', color: 'black' },
        { type: 'queen', color: 'black' },
        { type: 'king', color: 'black' },
        { type: 'bishop', color: 'black' },
        { type: 'knight', color: 'black' },
        { type: 'rook', color: 'black' }
      ],
      [
        { type: 'pawn', color: 'black' },
        { type: 'pawn', color: 'black' },
        { type: 'pawn', color: 'black' },
        { type: 'pawn', color: 'black' },
        { type: 'pawn', color: 'black' },
        { type: 'pawn', color: 'black' },
        { type: 'pawn', color: 'black' },
        { type: 'pawn', color: 'black' }
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        { type: 'pawn', color: 'white' },
        { type: 'pawn', color: 'white' },
        { type: 'pawn', color: 'white' },
        { type: 'pawn', color: 'white' },
        { type: 'pawn', color: 'white' },
        { type: 'pawn', color: 'white' },
        { type: 'pawn', color: 'white' },
        { type: 'pawn', color: 'white' }
      ],
      [
        { type: 'rook', color: 'white' },
        { type: 'knight', color: 'white' },
        { type: 'bishop', color: 'white' },
        { type: 'queen', color: 'white' },
        { type: 'king', color: 'white' },
        { type: 'bishop', color: 'white' },
        { type: 'knight', color: 'white' },
        { type: 'rook', color: 'white' }
      ]
    ],
    selectedSquare: null,
    moveHistory: [],
    fullMoveNumber: 1
  };

  const mockCtx = {
    currentPlayer: '0',
    turn: 1,
    numPlayers: 2,
    gameover: null
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders chess board with 64 squares', () => {
    render(
      <ChessBoard
        G={mockG}
        ctx={mockCtx}
        moves={mockMoves}
        playerID="0"
        isActive={true}
      />
    );

    const squares = screen.getAllByRole('button');
    expect(squares).toHaveLength(66); // 64 board squares + 2 control buttons
    
    // Check that board squares exist (filter out control buttons)
    const boardSquares = squares.filter(square => 
      square.className.includes('chess-square')
    );
    expect(boardSquares).toHaveLength(64);
  });

  test('displays chess pieces correctly', () => {
    render(
      <ChessBoard
        G={mockG}
        ctx={mockCtx}
        moves={mockMoves}
        playerID="0"
        isActive={true}
      />
    );

    // Check for piece symbols (Unicode characters) - use getAllByText for multiple matches
    expect(screen.getAllByText('♜')).toHaveLength(2); // Black rooks
    // The black king appears both on board and in UI - use getAllByText
    expect(screen.getAllByText('♚')).toHaveLength(2); // Black king (board + UI)
    expect(screen.getAllByText('♖')).toHaveLength(2); // White rooks
    // The white king appears both on board and in UI - use getAllByText  
    expect(screen.getAllByText('♔')).toHaveLength(2); // White king (board + UI)
  });

  test('shows current player turn', () => {
    render(
      <ChessBoard
        G={mockG}
        ctx={mockCtx}
        moves={mockMoves}
        playerID="0"
        isActive={true}
      />
    );

    expect(screen.getByText('White to move')).toBeInTheDocument();
  });

  test('handles square clicks when active', () => {
    render(
      <ChessBoard
        G={mockG}
        ctx={mockCtx}
        moves={mockMoves}
        playerID="0"
        isActive={true}
      />
    );

    const squares = screen.getAllByRole('button');
    const firstSquare = squares.find(square => 
      square.className.includes('chess-square')
    );
    
    fireEvent.click(firstSquare);
    expect(mockMoves.selectSquare).toHaveBeenCalledWith(0, 0);
  });

  test('does not handle square clicks when inactive', () => {
    render(
      <ChessBoard
        G={mockG}
        ctx={mockCtx}
        moves={mockMoves}
        playerID="0"
        isActive={false}
      />
    );

    const squares = screen.getAllByRole('button');
    const firstSquare = squares.find(square => 
      square.className.includes('chess-square')
    );
    
    fireEvent.click(firstSquare);
    expect(mockMoves.selectSquare).not.toHaveBeenCalled();
  });

  test('shows selected square highlight', () => {
    const gWithSelection = {
      ...mockG,
      selectedSquare: { row: 6, col: 4 }
    };

    render(
      <ChessBoard
        G={gWithSelection}
        ctx={mockCtx}
        moves={mockMoves}
        playerID="0"
        isActive={true}
      />
    );

    const squares = screen.getAllByRole('button');
    const selectedSquare = squares.find(square => 
      square.className.includes('selected')
    );
    
    expect(selectedSquare).toBeInTheDocument();
  });

  test('displays game over state for checkmate', () => {
    const ctxWithCheckmate = {
      ...mockCtx,
      gameover: { winner: '0' }
    };

    render(
      <ChessBoard
        G={mockG}
        ctx={ctxWithCheckmate}
        moves={mockMoves}
        playerID="0"
        isActive={false}
      />
    );

    expect(screen.getByText('Checkmate! White wins!')).toBeInTheDocument();
  });

  test('displays game over state for draw', () => {
    const ctxWithDraw = {
      ...mockCtx,
      gameover: { draw: true }
    };

    render(
      <ChessBoard
        G={mockG}
        ctx={ctxWithDraw}
        moves={mockMoves}
        playerID="0"
        isActive={false}
      />
    );

    expect(screen.getByText('Game drawn!')).toBeInTheDocument();
  });

  test('shows move counter', () => {
    render(
      <ChessBoard
        G={mockG}
        ctx={mockCtx}
        moves={mockMoves}
        playerID="0"
        isActive={true}
      />
    );

    expect(screen.getByText('Move 1')).toBeInTheDocument();
  });

  test('displays file and rank labels', () => {
    render(
      <ChessBoard
        G={mockG}
        ctx={mockCtx}
        moves={mockMoves}
        playerID="0"
        isActive={true}
      />
    );

    // Check for file labels (a-h)
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('h')).toBeInTheDocument();
    
    // Check for rank labels (1-8)
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  test('shows player information', () => {
    render(
      <ChessBoard
        G={mockG}
        ctx={mockCtx}
        moves={mockMoves}
        playerID="0"
        isActive={true}
      />
    );

    expect(screen.getByText('White')).toBeInTheDocument();
    expect(screen.getByText('Black')).toBeInTheDocument();
  });

  test('handles loading state gracefully', () => {
    render(
      <ChessBoard
        G={null}
        ctx={mockCtx}
        moves={mockMoves}
        playerID="0"
        isActive={true}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows resign and draw buttons', () => {
    render(
      <ChessBoard
        G={mockG}
        ctx={mockCtx}
        moves={mockMoves}
        playerID="0"
        isActive={true}
      />
    );

    expect(screen.getByText('Resign')).toBeInTheDocument();
    expect(screen.getByText('Offer Draw')).toBeInTheDocument();
  });

  test('displays move history section', () => {
    const gWithMoves = {
      ...mockG,
      moveHistory: [
        { from: { row: 6, col: 4 }, to: { row: 4, col: 4 }, piece: 'pawn', color: 'white' },
        { from: { row: 1, col: 4 }, to: { row: 3, col: 4 }, piece: 'pawn', color: 'black' }
      ]
    };

    render(
      <ChessBoard
        G={gWithMoves}
        ctx={mockCtx}
        moves={mockMoves}
        playerID="0"
        isActive={true}
      />
    );

    expect(screen.getByText('Move History')).toBeInTheDocument();
  });

  test('displays captured pieces section', () => {
    render(
      <ChessBoard
        G={mockG}
        ctx={mockCtx}
        moves={mockMoves}
        playerID="0"
        isActive={true}
      />
    );

    expect(screen.getByText('Captured White Pieces')).toBeInTheDocument();
    expect(screen.getByText('Captured Black Pieces')).toBeInTheDocument();
  });
});
