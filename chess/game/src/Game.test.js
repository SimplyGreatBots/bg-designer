import { ChessGame } from './Game';

describe('Chess Game', () => {
  let G, ctx;

  beforeEach(() => {
    G = ChessGame.setup();
    ctx = {
      currentPlayer: '0',
      turn: 1,
      numPlayers: 2
    };
  });

  describe('Initial Setup', () => {
    test('should set up the board correctly', () => {
      expect(G.board).toHaveLength(8);
      expect(G.board[0]).toHaveLength(8);
      
      // Check initial piece positions
      expect(G.board[0][0]).toEqual({ type: 'rook', color: 'black' });
      expect(G.board[0][4]).toEqual({ type: 'king', color: 'black' });
      expect(G.board[7][0]).toEqual({ type: 'rook', color: 'white' });
      expect(G.board[7][4]).toEqual({ type: 'king', color: 'white' });
      
      // Check pawns
      expect(G.board[1][0]).toEqual({ type: 'pawn', color: 'black' });
      expect(G.board[6][0]).toEqual({ type: 'pawn', color: 'white' });
      
      // Check empty squares
      expect(G.board[3][3]).toBeNull();
      expect(G.board[4][4]).toBeNull();
    });

    test('should initialize game state correctly', () => {
      expect(G.selectedSquare).toBeNull();
      expect(G.enPassantTarget).toBeNull();
      expect(G.hasMoved.white.king).toBe(false);
      expect(G.hasMoved.black.king).toBe(false);
      expect(G.moveHistory).toEqual([]);
      expect(G.halfMoveClock).toBe(0);
      expect(G.fullMoveNumber).toBe(1);
    });
  });

  describe('Move Validation', () => {
    test('should allow valid pawn moves', () => {
      const moves = ChessGame.moves;
      
      // Test white pawn initial two-square move
      moves.selectSquare({ G, ctx, playerID: '0' }, 6, 4); // Select pawn
      expect(G.selectedSquare).toEqual({ row: 6, col: 4 });
      
      moves.selectSquare({ G, ctx, playerID: '0' }, 4, 4); // Move two squares
      expect(G.board[4][4]).toEqual({ type: 'pawn', color: 'white' });
      expect(G.board[6][4]).toBeNull();
      expect(G.enPassantTarget).toEqual({ row: 5, col: 4 });
    });

    test('should not allow moving opponent pieces', () => {
      const moves = ChessGame.moves;
      
      // Try to select black piece as white player
      moves.selectSquare({ G, ctx, playerID: '0' }, 1, 4);
      expect(G.selectedSquare).toBeNull();
    });

    test('should not allow invalid moves', () => {
      const moves = ChessGame.moves;
      
      // Try to move pawn backward
      moves.selectSquare({ G, ctx, playerID: '0' }, 6, 4);
      moves.selectSquare({ G, ctx, playerID: '0' }, 7, 4);
      
      // Pawn should still be in original position
      expect(G.board[6][4]).toEqual({ type: 'pawn', color: 'white' });
      expect(G.board[7][4]).toEqual({ type: 'king', color: 'white' });
    });
  });

  describe('Special Moves', () => {
    test('should handle pawn promotion', () => {
      // Set up a pawn ready for promotion (clear the target square first)
      G.board[0][0] = null; // Clear target square
      G.board[1][0] = { type: 'pawn', color: 'white' };
      G.board[6][0] = null;
      
      const moves = ChessGame.moves;
      moves.selectSquare({ G, ctx, playerID: '0' }, 1, 0);
      moves.selectSquare({ G, ctx, playerID: '0' }, 0, 0);
      
      // Should auto-promote to queen
      expect(G.board[0][0]).toEqual({ type: 'queen', color: 'white' });
    });

    test('should handle en passant capture', () => {
      // Set up en passant scenario
      G.board[3][4] = { type: 'pawn', color: 'white' };
      G.board[6][4] = null;
      G.board[3][5] = { type: 'pawn', color: 'black' };
      G.board[1][5] = null;
      G.enPassantTarget = { row: 2, col: 5 };
      
      const moves = ChessGame.moves;
      moves.selectSquare({ G, ctx, playerID: '0' }, 3, 4);
      moves.selectSquare({ G, ctx, playerID: '0' }, 2, 5);
      
      // White pawn should capture en passant
      expect(G.board[2][5]).toEqual({ type: 'pawn', color: 'white' });
      expect(G.board[3][5]).toBeNull(); // Black pawn should be captured
    });
  });

  describe('Game End Conditions', () => {
    test('should have endIf function that can detect game endings', () => {
      // Test that endIf function exists and handles normal game state
      const endCondition = ChessGame.endIf(G, ctx);
      // In normal starting position, game should not be over
      expect(endCondition).toBeNull();
    });

    test('should detect 50-move rule', () => {
      G.halfMoveClock = 100; // 50 moves per player
      
      const endCondition = ChessGame.endIf(G, ctx);
      expect(endCondition).toEqual({ draw: true });
    });
  });

  describe('Castling', () => {
    test('should allow kingside castling when conditions are met', () => {
      // Clear squares between king and rook
      G.board[7][5] = null; // Bishop
      G.board[7][6] = null; // Knight
      
      const moves = ChessGame.moves;
      moves.selectSquare({ G, ctx, playerID: '0' }, 7, 4); // Select king
      moves.selectSquare({ G, ctx, playerID: '0' }, 7, 6); // Castle kingside
      
      expect(G.board[7][6]).toEqual({ type: 'king', color: 'white' });
      expect(G.board[7][5]).toEqual({ type: 'rook', color: 'white' });
      expect(G.board[7][4]).toBeNull();
      expect(G.board[7][7]).toBeNull();
    });

    test('should not allow castling when king has moved', () => {
      G.hasMoved.white.king = true;
      G.board[7][5] = null; // Clear bishop
      G.board[7][6] = null; // Clear knight
      
      const moves = ChessGame.moves;
      moves.selectSquare({ G, ctx, playerID: '0' }, 7, 4);
      moves.selectSquare({ G, ctx, playerID: '0' }, 7, 6);
      
      // King should not have moved
      expect(G.board[7][4]).toEqual({ type: 'king', color: 'white' });
      expect(G.board[7][6]).toBeNull();
    });
  });

  describe('Turn Management', () => {
    test('should have correct turn configuration', () => {
      expect(ChessGame.turn.minMoves).toBe(1);
      expect(ChessGame.turn.maxMoves).toBe(1);
    });
  });

  describe('Game Name and Setup', () => {
    test('should have correct game name', () => {
      expect(ChessGame.name).toBe('chess');
    });

    test('should have setup function', () => {
      expect(typeof ChessGame.setup).toBe('function');
    });

    test('should have endIf function', () => {
      expect(typeof ChessGame.endIf).toBe('function');
    });
  });
});
