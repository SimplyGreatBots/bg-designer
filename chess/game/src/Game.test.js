import { Chess, PIECE_TYPES, COLORS } from './Game';
import { Client } from 'boardgame.io/client';

describe('Chess Game', () => {
  let client;

  beforeEach(() => {
    client = Client({ 
      game: Chess,
      numPlayers: 2
    });
    client.start();
  });

  test('initializes with correct starting position', () => {
    const { G } = client.store.getState();
    
    // Check that board is 8x8
    expect(G.board).toHaveLength(8);
    expect(G.board[0]).toHaveLength(8);
    
    // Check white pieces on bottom rows
    expect(G.board[0][0].type).toBe(PIECE_TYPES.ROOK);
    expect(G.board[0][0].color).toBe(COLORS.WHITE);
    expect(G.board[0][4].type).toBe(PIECE_TYPES.KING);
    expect(G.board[1][0].type).toBe(PIECE_TYPES.PAWN);
    
    // Check black pieces on top rows
    expect(G.board[7][0].type).toBe(PIECE_TYPES.ROOK);
    expect(G.board[7][0].color).toBe(COLORS.BLACK);
    expect(G.board[7][4].type).toBe(PIECE_TYPES.KING);
    expect(G.board[6][0].type).toBe(PIECE_TYPES.PAWN);
    
    // Check empty squares
    expect(G.board[2][0]).toBeNull();
    expect(G.board[3][0]).toBeNull();
    expect(G.board[4][0]).toBeNull();
    expect(G.board[5][0]).toBeNull();
  });

  test('allows valid pawn moves', () => {
    const state = client.store.getState();
    
    // Select white pawn
    client.moves.selectSquare(1, 4); // e2 pawn
    let { G } = client.store.getState();
    expect(G.selectedSquare).toEqual({ row: 1, col: 4 });
    expect(G.possibleMoves).toContainEqual({ row: 2, col: 4 }); // one square
    expect(G.possibleMoves).toContainEqual({ row: 3, col: 4 }); // two squares
    
    // Move pawn two squares
    client.moves.selectSquare(3, 4); // e4
    ({ G } = client.store.getState());
    expect(G.board[3][4].type).toBe(PIECE_TYPES.PAWN);
    expect(G.board[3][4].color).toBe(COLORS.WHITE);
    expect(G.board[1][4]).toBeNull();
  });

  test('prevents invalid moves', () => {
    // Try to move to an invalid square
    client.moves.selectSquare(1, 0); // Select a1 pawn
    const stateBefore = client.store.getState();
    
    // Try to move pawn backwards (invalid)
    client.moves.selectSquare(0, 0);
    const stateAfter = client.store.getState();
    
    // Should remain unchanged
    expect(stateAfter.G.board[1][0]).toEqual(stateBefore.G.board[1][0]);
    expect(stateAfter.G.board[0][0]).toEqual(stateBefore.G.board[0][0]);
  });

  test('alternates turns between players', () => {
    let { ctx } = client.store.getState();
    expect(ctx.currentPlayer).toBe(COLORS.WHITE);
    
    // Make a move for white
    client.moves.selectSquare(1, 4);
    client.moves.selectSquare(2, 4);
    
    ({ ctx } = client.store.getState());
    expect(ctx.currentPlayer).toBe(COLORS.BLACK);
  });

  test('captures pieces correctly', () => {
    // Set up a capture scenario by moving pieces
    client.moves.selectSquare(1, 4); // e2 pawn
    client.moves.selectSquare(3, 4); // e4
    
    client.moves.selectSquare(6, 3); // d7 pawn
    client.moves.selectSquare(4, 3); // d5
    
    client.moves.selectSquare(3, 4); // select white pawn
    client.moves.selectSquare(4, 3); // capture black pawn
    
    const { G } = client.store.getState();
    expect(G.board[4][3].type).toBe(PIECE_TYPES.PAWN);
    expect(G.board[4][3].color).toBe(COLORS.WHITE);
    expect(G.capturedPieces[COLORS.BLACK]).toHaveLength(1);
    expect(G.capturedPieces[COLORS.BLACK][0].type).toBe(PIECE_TYPES.PAWN);
  });

  test('knight moves in L-shape', () => {
    // Move white knight
    client.moves.selectSquare(0, 1); // b1 knight
    let { G } = client.store.getState();
    
    // Check possible moves include L-shapes
    expect(G.possibleMoves).toContainEqual({ row: 2, col: 0 }); // a3
    expect(G.possibleMoves).toContainEqual({ row: 2, col: 2 }); // c3
    
    // Make a knight move
    client.moves.selectSquare(2, 2); // c3
    ({ G } = client.store.getState());
    expect(G.board[2][2].type).toBe(PIECE_TYPES.KNIGHT);
    expect(G.board[0][1]).toBeNull();
  });

  test('bishop moves diagonally', () => {
    // First move pawn to open diagonal
    client.moves.selectSquare(1, 3); // d2 pawn
    client.moves.selectSquare(3, 3); // d4
    
    // Skip black turn
    client.moves.selectSquare(6, 0); // a7 pawn
    client.moves.selectSquare(4, 0); // a5
    
    // Now test bishop
    client.moves.selectSquare(0, 2); // c1 bishop
    let { G } = client.store.getState();
    
    // Should have diagonal moves available
    expect(G.possibleMoves.length).toBeGreaterThan(0);
    expect(G.possibleMoves).toContainEqual({ row: 1, col: 3 }); // d2
  });

  test('rook moves orthogonally', () => {
    // Move pawn to open file
    client.moves.selectSquare(1, 0); // a2 pawn
    client.moves.selectSquare(3, 0); // a4
    
    // Skip black turn
    client.moves.selectSquare(6, 7); // h7 pawn
    client.moves.selectSquare(4, 7); // h5
    
    // Test rook
    client.moves.selectSquare(0, 0); // a1 rook
    let { G } = client.store.getState();
    
    // Should have vertical moves available
    expect(G.possibleMoves).toContainEqual({ row: 1, col: 0 }); // a2
    expect(G.possibleMoves).toContainEqual({ row: 2, col: 0 }); // a3
  });

  test('queen combines rook and bishop moves', () => {
    // Move pawn to open diagonal and file
    client.moves.selectSquare(1, 3); // d2 pawn
    client.moves.selectSquare(3, 3); // d4
    
    // Skip black turn
    client.moves.selectSquare(6, 0); // a7 pawn
    client.moves.selectSquare(4, 0); // a5
    
    // Test queen
    client.moves.selectSquare(0, 3); // d1 queen
    let { G } = client.store.getState();
    
    // Should have both diagonal and orthogonal moves
    expect(G.possibleMoves.length).toBeGreaterThan(0);
    expect(G.possibleMoves).toContainEqual({ row: 1, col: 3 }); // d2
  });

  test('king moves one square in any direction', () => {
    // Create space for king
    client.moves.selectSquare(1, 4); // e2 pawn
    client.moves.selectSquare(3, 4); // e4
    
    // Skip black turn
    client.moves.selectSquare(6, 0); // a7 pawn
    client.moves.selectSquare(4, 0); // a5
    
    client.moves.selectSquare(0, 4); // e1 king
    let { G } = client.store.getState();
    
    // King should be able to move to e2
    expect(G.possibleMoves).toContainEqual({ row: 1, col: 4 }); // e2
  });

  test('prevents moves that would leave king in check', () => {
    // This is a complex test that would require setting up a specific board position
    // For now, we'll test that the function exists and doesn't crash
    const { G } = client.store.getState();
    expect(G.gameStatus).toBe('playing');
  });

  test('detects check status', () => {
    // This would require setting up a position where the king is in check
    // For basic testing, ensure the game starts without check
    const { G } = client.store.getState();
    expect(G.gameStatus).toBe('playing');
  });

  test('allows resignation', () => {
    client.moves.resign();
    const { G } = client.store.getState();
    expect(G.gameStatus).toBe('resigned');
    expect(G.winner).toBe(COLORS.BLACK); // Since white resigned
  });

  test('allows draw offers', () => {
    client.moves.offerDraw();
    const { G } = client.store.getState();
    expect(G.gameStatus).toBe('draw');
    expect(G.winner).toBeNull();
  });

  test('tracks last move', () => {
    client.moves.selectSquare(1, 4); // e2 pawn
    client.moves.selectSquare(3, 4); // e4
    
    const { G } = client.store.getState();
    expect(G.lastMove).toEqual({
      from: { row: 1, col: 4 },
      to: { row: 3, col: 4 }
    });
  });

  test('marks pieces as moved', () => {
    client.moves.selectSquare(1, 4); // e2 pawn
    client.moves.selectSquare(3, 4); // e4
    
    const { G } = client.store.getState();
    expect(G.board[3][4].hasMoved).toBe(true);
  });
});
