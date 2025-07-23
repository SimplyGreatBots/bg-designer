// Chess Game Logic using boardgame.io
// Based on FIDE Laws of Chess and canonical chess rules

// Chess piece types
const PIECE_TYPES = {
  KING: 'king',
  QUEEN: 'queen',
  ROOK: 'rook',
  BISHOP: 'bishop',
  KNIGHT: 'knight',
  PAWN: 'pawn'
};

// Chess board setup
const INITIAL_BOARD = [
  ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
  ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
  ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
];

// Helper functions for chess logic
function createPiece(type, color) {
  return { type, color };
}

function isValidSquare(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function isPieceAt(board, row, col, color = null) {
  if (!isValidSquare(row, col)) return false;
  const piece = board[row][col];
  if (!piece) return false;
  return color ? piece.color === color : true;
}

function isOpponentPiece(board, row, col, color) {
  return isPieceAt(board, row, col) && board[row][col].color !== color;
}

function isSameColorPiece(board, row, col, color) {
  return isPieceAt(board, row, col) && board[row][col].color === color;
}

// Get valid moves for a piece based on chess rules (Article 3)
function getValidMoves(board, fromRow, fromCol, gameState) {
  const piece = board[fromRow][fromCol];
  if (!piece) return [];

  const moves = [];
  const { type, color } = piece;

  switch (type) {
    case PIECE_TYPES.PAWN:
      moves.push(...getPawnMoves(board, fromRow, fromCol, color, gameState));
      break;
    case PIECE_TYPES.ROOK:
      moves.push(...getRookMoves(board, fromRow, fromCol, color));
      break;
    case PIECE_TYPES.KNIGHT:
      moves.push(...getKnightMoves(board, fromRow, fromCol, color));
      break;
    case PIECE_TYPES.BISHOP:
      moves.push(...getBishopMoves(board, fromRow, fromCol, color));
      break;
    case PIECE_TYPES.QUEEN:
      moves.push(...getQueenMoves(board, fromRow, fromCol, color));
      break;
    case PIECE_TYPES.KING:
      moves.push(...getKingMoves(board, fromRow, fromCol, color, gameState));
      break;
  }

  // Filter out moves that would put own king in check (Article 3.9)
  return moves.filter(move => !wouldBeInCheck(board, fromRow, fromCol, move.row, move.col, color, gameState));
}

// Pawn moves (Article 3.7)
function getPawnMoves(board, row, col, color, gameState) {
  const moves = [];
  const direction = color === 'white' ? -1 : 1;
  const startRow = color === 'white' ? 6 : 1;

  // Forward move
  const newRow = row + direction;
  if (isValidSquare(newRow, col) && !board[newRow][col]) {
    moves.push({ row: newRow, col });

    // Two-square initial move
    if (row === startRow && !board[newRow + direction][col]) {
      moves.push({ row: newRow + direction, col });
    }
  }

  // Diagonal captures
  for (const deltaCol of [-1, 1]) {
    const newCol = col + deltaCol;
    if (isValidSquare(newRow, newCol) && isOpponentPiece(board, newRow, newCol, color)) {
      moves.push({ row: newRow, col: newCol });
    }
  }

  // En passant (Article 3.7d)
  if (gameState.enPassantTarget) {
    const { row: epRow, col: epCol } = gameState.enPassantTarget;
    if (row + direction === epRow && Math.abs(col - epCol) === 1) {
      moves.push({ row: epRow, col: epCol, enPassant: true });
    }
  }

  return moves;
}

// Rook moves (Article 3.3)
function getRookMoves(board, row, col, color) {
  const moves = [];
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  for (const [dRow, dCol] of directions) {
    for (let i = 1; i < 8; i++) {
      const newRow = row + dRow * i;
      const newCol = col + dCol * i;

      if (!isValidSquare(newRow, newCol)) break;
      if (isSameColorPiece(board, newRow, newCol, color)) break;

      moves.push({ row: newRow, col: newCol });

      if (isOpponentPiece(board, newRow, newCol, color)) break;
    }
  }

  return moves;
}

// Knight moves (Article 3.6)
function getKnightMoves(board, row, col, color) {
  const moves = [];
  const knightMoves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];

  for (const [dRow, dCol] of knightMoves) {
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (isValidSquare(newRow, newCol) && !isSameColorPiece(board, newRow, newCol, color)) {
      moves.push({ row: newRow, col: newCol });
    }
  }

  return moves;
}

// Bishop moves (Article 3.2)
function getBishopMoves(board, row, col, color) {
  const moves = [];
  const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

  for (const [dRow, dCol] of directions) {
    for (let i = 1; i < 8; i++) {
      const newRow = row + dRow * i;
      const newCol = col + dCol * i;

      if (!isValidSquare(newRow, newCol)) break;
      if (isSameColorPiece(board, newRow, newCol, color)) break;

      moves.push({ row: newRow, col: newCol });

      if (isOpponentPiece(board, newRow, newCol, color)) break;
    }
  }

  return moves;
}

// Queen moves (Article 3.4)
function getQueenMoves(board, row, col, color) {
  return [...getRookMoves(board, row, col, color), ...getBishopMoves(board, row, col, color)];
}

// King moves (Article 3.8)
function getKingMoves(board, row, col, color, gameState) {
  const moves = [];
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

  // Regular king moves
  for (const [dRow, dCol] of directions) {
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (isValidSquare(newRow, newCol) && !isSameColorPiece(board, newRow, newCol, color)) {
      moves.push({ row: newRow, col: newCol });
    }
  }

  // Castling (Article 3.8)
  if (canCastle(board, color, 'kingside', gameState)) {
    moves.push({ row, col: col + 2, castle: 'kingside' });
  }
  if (canCastle(board, color, 'queenside', gameState)) {
    moves.push({ row, col: col - 2, castle: 'queenside' });
  }

  return moves;
}

// Check if castling is legal (Article 3.8b)
function canCastle(board, color, side, gameState) {
  const row = color === 'white' ? 7 : 0;
  const kingCol = 4;
  const rookCol = side === 'kingside' ? 7 : 0;

  // Check if king or rook has moved
  if (gameState.hasMoved[color].king || gameState.hasMoved[color][side === 'kingside' ? 'rookKingside' : 'rookQueenside']) {
    return false;
  }

  // Check if squares between king and rook are empty
  const start = Math.min(kingCol, rookCol) + 1;
  const end = Math.max(kingCol, rookCol);
  for (let col = start; col < end; col++) {
    if (board[row][col]) return false;
  }

  // Check if king is in check or would pass through check
  if (isInCheck(board, color, gameState)) return false;

  const step = side === 'kingside' ? 1 : -1;
  for (let i = 1; i <= 2; i++) {
    if (wouldBeInCheck(board, row, kingCol, row, kingCol + step * i, color, gameState)) {
      return false;
    }
  }

  return true;
}

// Check if a king is in check (Article 3.9)
function isInCheck(board, color, gameState) {
  const kingPosition = findKing(board, color);
  if (!kingPosition) return false;

  return isSquareAttacked(board, kingPosition.row, kingPosition.col, color === 'white' ? 'black' : 'white');
}

// Find king position on board
function findKing(board, color) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === PIECE_TYPES.KING && piece.color === color) {
        return { row, col };
      }
    }
  }
  return null;
}

// Check if a square is attacked by the opponent
function isSquareAttacked(board, row, col, attackerColor) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece.color === attackerColor) {
        const moves = getBasicMoves(board, r, c, piece);
        if (moves.some(move => move.row === row && move.col === col)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Get basic moves without considering check (to avoid recursion)
function getBasicMoves(board, row, col, piece) {
  const { type, color } = piece;
  switch (type) {
    case PIECE_TYPES.PAWN:
      return getPawnAttacks(board, row, col, color);
    case PIECE_TYPES.ROOK:
      return getRookMoves(board, row, col, color);
    case PIECE_TYPES.KNIGHT:
      return getKnightMoves(board, row, col, color);
    case PIECE_TYPES.BISHOP:
      return getBishopMoves(board, row, col, color);
    case PIECE_TYPES.QUEEN:
      return getQueenMoves(board, row, col, color);
    case PIECE_TYPES.KING:
      return getBasicKingMoves(board, row, col, color);
    default:
      return [];
  }
}

// Get pawn attacks (different from pawn moves)
function getPawnAttacks(board, row, col, color) {
  const attacks = [];
  const direction = color === 'white' ? -1 : 1;
  const newRow = row + direction;

  for (const deltaCol of [-1, 1]) {
    const newCol = col + deltaCol;
    if (isValidSquare(newRow, newCol)) {
      attacks.push({ row: newRow, col: newCol });
    }
  }

  return attacks;
}

// Get basic king moves without castling
function getBasicKingMoves(board, row, col, color) {
  const moves = [];
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

  for (const [dRow, dCol] of directions) {
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (isValidSquare(newRow, newCol) && !isSameColorPiece(board, newRow, newCol, color)) {
      moves.push({ row: newRow, col: newCol });
    }
  }

  return moves;
}

// Check if a move would put the king in check
function wouldBeInCheck(board, fromRow, fromCol, toRow, toCol, color, gameState) {
  // Make temporary move
  const tempBoard = board.map(row => [...row]);
  const piece = tempBoard[fromRow][fromCol];
  tempBoard[toRow][toCol] = piece;
  tempBoard[fromRow][fromCol] = null;

  return isInCheck(tempBoard, color, gameState);
}

// Check for checkmate (Article 5.1a)
function isCheckmate(board, color, gameState) {
  if (!isInCheck(board, color, gameState)) return false;

  // Check if any move can get out of check
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const moves = getValidMoves(board, row, col, gameState);
        if (moves.length > 0) return false;
      }
    }
  }

  return true;
}

// Check for stalemate (Article 5.2a)
function isStalemate(board, color, gameState) {
  if (isInCheck(board, color, gameState)) return false;

  // Check if any legal move exists
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const moves = getValidMoves(board, row, col, gameState);
        if (moves.length > 0) return false;
      }
    }
  }

  return true;
}

// Setup initial game state
function setup({ ctx }) {
  const board = [];
  
  // Initialize 8x8 board with pieces
  for (let row = 0; row < 8; row++) {
    board[row] = [];
    for (let col = 0; col < 8; col++) {
      const pieceType = INITIAL_BOARD[row][col];
      if (pieceType) {
        const color = row < 2 ? 'black' : 'white';
        board[row][col] = createPiece(pieceType, color);
      } else {
        board[row][col] = null;
      }
    }
  }

  return {
    board,
    selectedSquare: null,
    enPassantTarget: null,
    hasMoved: {
      white: { king: false, rookKingside: false, rookQueenside: false },
      black: { king: false, rookKingside: false, rookQueenside: false }
    },
    moveHistory: [],
    halfMoveClock: 0, // For 50-move rule
    fullMoveNumber: 1
  };
}

// Move a piece (main move function)
function movePiece({ G, ctx, playerID }, fromRow, fromCol, toRow, toCol) {
  const currentPlayer = ctx.currentPlayer;
  const playerColor = currentPlayer === '0' ? 'white' : 'black';
  
  // Validate it's the player's turn
  if (playerID !== currentPlayer) return;

  const piece = G.board[fromRow][fromCol];
  if (!piece || piece.color !== playerColor) return;

  // Get valid moves for this piece
  const validMoves = getValidMoves(G.board, fromRow, fromCol, G);
  const targetMove = validMoves.find(move => move.row === toRow && move.col === toCol);
  
  if (!targetMove) return;

  // Reset en passant target
  G.enPassantTarget = null;

  // Handle special moves
  if (targetMove.enPassant) {
    // Remove captured pawn in en passant
    const capturedRow = playerColor === 'white' ? toRow + 1 : toRow - 1;
    G.board[capturedRow][toCol] = null;
  } else if (targetMove.castle) {
    // Handle castling
    const row = toRow;
    const rookFromCol = targetMove.castle === 'kingside' ? 7 : 0;
    const rookToCol = targetMove.castle === 'kingside' ? 5 : 3;
    
    // Move the rook
    G.board[row][rookToCol] = G.board[row][rookFromCol];
    G.board[row][rookFromCol] = null;
    
    // Mark pieces as moved
    G.hasMoved[playerColor].king = true;
    G.hasMoved[playerColor][targetMove.castle === 'kingside' ? 'rookKingside' : 'rookQueenside'] = true;
  }

  // Handle pawn two-square move (sets en passant target)
  if (piece.type === PIECE_TYPES.PAWN && Math.abs(toRow - fromRow) === 2) {
    G.enPassantTarget = { row: fromRow + (toRow - fromRow) / 2, col: toCol };
  }

  // Track piece movement for castling rights
  if (piece.type === PIECE_TYPES.KING) {
    G.hasMoved[playerColor].king = true;
  } else if (piece.type === PIECE_TYPES.ROOK) {
    if (fromCol === 0) G.hasMoved[playerColor].rookQueenside = true;
    if (fromCol === 7) G.hasMoved[playerColor].rookKingside = true;
  }

  // Make the move
  G.board[toRow][toCol] = piece;
  G.board[fromRow][fromCol] = null;

  // Handle pawn promotion (Article 3.7e)
  if (piece.type === PIECE_TYPES.PAWN && (toRow === 0 || toRow === 7)) {
    // For simplicity, auto-promote to queen (in real game, player would choose)
    G.board[toRow][toCol] = createPiece(PIECE_TYPES.QUEEN, playerColor);
  }

  // Update move counters
  if (piece.type === PIECE_TYPES.PAWN || G.board[toRow][toCol]) {
    G.halfMoveClock = 0; // Reset for pawn move or capture
  } else {
    G.halfMoveClock++;
  }

  if (playerColor === 'black') {
    G.fullMoveNumber++;
  }

  // Add move to history
  G.moveHistory.push({
    from: { row: fromRow, col: fromCol },
    to: { row: toRow, col: toCol },
    piece: piece.type,
    color: playerColor
  });
}

// Select a square (for UI interaction)
function selectSquare({ G, ctx, playerID }, row, col) {
  const currentPlayer = ctx.currentPlayer;
  const playerColor = currentPlayer === '0' ? 'white' : 'black';
  
  if (playerID !== currentPlayer) return;

  const piece = G.board[row][col];
  
  // If selecting own piece, select it
  if (piece && piece.color === playerColor) {
    G.selectedSquare = { row, col };
  } 
  // If a piece is selected and clicking valid move target, make the move
  else if (G.selectedSquare) {
    const { row: fromRow, col: fromCol } = G.selectedSquare;
    const selectedPiece = G.board[fromRow][fromCol];
    
    if (selectedPiece && selectedPiece.color === playerColor) {
      const validMoves = getValidMoves(G.board, fromRow, fromCol, G);
      const isValidMove = validMoves.some(move => move.row === row && move.col === col);
      
      if (isValidMove) {
        // Make the move using movePiece function
        movePiece({ G, ctx, playerID }, fromRow, fromCol, row, col);
        G.selectedSquare = null;
      } else {
        // Clear selection if invalid move
        G.selectedSquare = null;
      }
    }
  }
}

// Game end conditions
function checkGameEnd({ G, ctx }) {
  const currentPlayerColor = ctx.currentPlayer === '0' ? 'white' : 'black';
  
  // Check for checkmate (Article 5.1a)
  if (isCheckmate(G.board, currentPlayerColor, G)) {
    return { winner: ctx.currentPlayer === '0' ? '1' : '0' };
  }
  
  // Check for stalemate (Article 5.2a)
  if (isStalemate(G.board, currentPlayerColor, G)) {
    return { draw: true };
  }
  
  // Check for 50-move rule (Article 5.2e)
  if (G.halfMoveClock >= 100) { // 50 moves per player = 100 half-moves
    return { draw: true };
  }
  
  // Check for insufficient material (Article 5.2b)
  if (isInsufficientMaterial(G.board)) {
    return { draw: true };
  }

  return null;
}

// Check for insufficient material to checkmate
function isInsufficientMaterial(board) {
  const pieces = [];
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col]) {
        pieces.push(board[row][col]);
      }
    }
  }
  
  // Only kings
  if (pieces.length === 2) return true;
  
  // King vs King + Bishop or Knight
  if (pieces.length === 3) {
    const nonKings = pieces.filter(p => p.type !== PIECE_TYPES.KING);
    return nonKings.length === 1 && (nonKings[0].type === PIECE_TYPES.BISHOP || nonKings[0].type === PIECE_TYPES.KNIGHT);
  }
  
  return false;
}

// Main Chess Game object for boardgame.io
export const ChessGame = {
  name: 'chess',
  
  setup,
  
  moves: {
    selectSquare,
    movePiece
  },
  
  turn: {
    minMoves: 1,
    maxMoves: 1
  },
  
  endIf: checkGameEnd,
  
  // Hide opponent's perspective (not needed in chess since it's perfect information)
  playerView: ({ G, playerID }) => G
};
