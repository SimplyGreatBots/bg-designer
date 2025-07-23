/**
 * Chess Game Implementation using boardgame.io
 * 
 * This file implements the complete chess game logic including:
 * - Standard chess piece movement and capture rules
 * - Special moves: castling, en passant, pawn promotion
 * - Game end conditions: checkmate, stalemate, draws
 * - Based on FIDE Laws of Chess as documented in chess/rules/rules.md
 */

// Chess piece constants
const PIECES = {
  KING: 'K',
  QUEEN: 'Q',
  ROOK: 'R',
  BISHOP: 'B',
  KNIGHT: 'N',
  PAWN: 'P'
};

const COLORS = {
  WHITE: 'white',
  BLACK: 'black'
};

/**
 * Creates initial chess board state
 * Board is represented as 8x8 array where each cell contains piece object or null
 * Piece object: { type: PIECES.*, color: COLORS.*, hasMoved: boolean }
 */
function createInitialBoard() {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Place white pieces (bottom rows)
  const backRank = [
    PIECES.ROOK, PIECES.KNIGHT, PIECES.BISHOP, PIECES.QUEEN,
    PIECES.KING, PIECES.BISHOP, PIECES.KNIGHT, PIECES.ROOK
  ];
  
  // Back rank pieces
  for (let col = 0; col < 8; col++) {
    board[7][col] = { type: backRank[col], color: COLORS.WHITE, hasMoved: false };
    board[0][col] = { type: backRank[col], color: COLORS.BLACK, hasMoved: false };
  }
  
  // Pawns
  for (let col = 0; col < 8; col++) {
    board[6][col] = { type: PIECES.PAWN, color: COLORS.WHITE, hasMoved: false };
    board[1][col] = { type: PIECES.PAWN, color: COLORS.BLACK, hasMoved: false };
  }
  
  return board;
}

/**
 * Converts algebraic notation (e.g., "e4") to board coordinates
 * Returns [row, col] where [0,0] is top-left (a8)
 */
function algebraicToCoords(square) {
  const file = square.charCodeAt(0) - 'a'.charCodeAt(0); // 0-7
  const rank = 8 - parseInt(square[1]); // 0-7 (flipped for array indexing)
  return [rank, file];
}

/**
 * Converts board coordinates to algebraic notation
 */
function coordsToAlgebraic(row, col) {
  const file = String.fromCharCode('a'.charCodeAt(0) + col);
  const rank = 8 - row;
  return file + rank;
}

/**
 * Checks if coordinates are within board bounds
 */
function isValidCoord(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

/**
 * Gets all possible moves for a piece at given position
 * Returns array of {row, col, type} where type can be 'move', 'capture', 'castle', 'enpassant'
 */
function getPossibleMoves(board, fromRow, fromCol, enPassantTarget, castlingRights) {
  const piece = board[fromRow][fromCol];
  if (!piece) return [];
  
  const moves = [];
  const { type, color } = piece;
  
  switch (type) {
    case PIECES.PAWN:
      return getPawnMoves(board, fromRow, fromCol, color, enPassantTarget);
    case PIECES.ROOK:
      return getRookMoves(board, fromRow, fromCol, color);
    case PIECES.BISHOP:
      return getBishopMoves(board, fromRow, fromCol, color);
    case PIECES.QUEEN:
      return getQueenMoves(board, fromRow, fromCol, color);
    case PIECES.KING:
      return getKingMoves(board, fromRow, fromCol, color, castlingRights);
    case PIECES.KNIGHT:
      return getKnightMoves(board, fromRow, fromCol, color);
    default:
      return [];
  }
}

function getPawnMoves(board, fromRow, fromCol, color, enPassantTarget) {
  const moves = [];
  const direction = color === COLORS.WHITE ? -1 : 1; // White moves up (negative), black moves down
  const startingRow = color === COLORS.WHITE ? 6 : 1;
  
  // Forward move
  const newRow = fromRow + direction;
  if (isValidCoord(newRow, fromCol) && !board[newRow][fromCol]) {
    moves.push({ row: newRow, col: fromCol, type: 'move' });
    
    // Double move from starting position
    if (fromRow === startingRow && !board[newRow + direction][fromCol]) {
      moves.push({ row: newRow + direction, col: fromCol, type: 'move' });
    }
  }
  
  // Diagonal captures
  for (const deltaCol of [-1, 1]) {
    const captureCol = fromCol + deltaCol;
    if (isValidCoord(newRow, captureCol)) {
      const target = board[newRow][captureCol];
      if (target && target.color !== color) {
        moves.push({ row: newRow, col: captureCol, type: 'capture' });
      }
      
      // En passant
      if (enPassantTarget && 
          coordsToAlgebraic(newRow, captureCol) === enPassantTarget) {
        moves.push({ row: newRow, col: captureCol, type: 'enpassant' });
      }
    }
  }
  
  return moves;
}

function getRookMoves(board, fromRow, fromCol, color) {
  const moves = [];
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // right, left, down, up
  
  for (const [dRow, dCol] of directions) {
    for (let i = 1; i < 8; i++) {
      const newRow = fromRow + i * dRow;
      const newCol = fromCol + i * dCol;
      
      if (!isValidCoord(newRow, newCol)) break;
      
      const target = board[newRow][newCol];
      if (!target) {
        moves.push({ row: newRow, col: newCol, type: 'move' });
      } else {
        if (target.color !== color) {
          moves.push({ row: newRow, col: newCol, type: 'capture' });
        }
        break; // Can't continue past any piece
      }
    }
  }
  
  return moves;
}

function getBishopMoves(board, fromRow, fromCol, color) {
  const moves = [];
  const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]]; // diagonals
  
  for (const [dRow, dCol] of directions) {
    for (let i = 1; i < 8; i++) {
      const newRow = fromRow + i * dRow;
      const newCol = fromCol + i * dCol;
      
      if (!isValidCoord(newRow, newCol)) break;
      
      const target = board[newRow][newCol];
      if (!target) {
        moves.push({ row: newRow, col: newCol, type: 'move' });
      } else {
        if (target.color !== color) {
          moves.push({ row: newRow, col: newCol, type: 'capture' });
        }
        break;
      }
    }
  }
  
  return moves;
}

function getQueenMoves(board, fromRow, fromCol, color) {
  // Queen combines rook and bishop moves
  return [
    ...getRookMoves(board, fromRow, fromCol, color),
    ...getBishopMoves(board, fromRow, fromCol, color)
  ];
}

function getKnightMoves(board, fromRow, fromCol, color) {
  const moves = [];
  const knightMoves = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
  ];
  
  for (const [dRow, dCol] of knightMoves) {
    const newRow = fromRow + dRow;
    const newCol = fromCol + dCol;
    
    if (isValidCoord(newRow, newCol)) {
      const target = board[newRow][newCol];
      if (!target) {
        moves.push({ row: newRow, col: newCol, type: 'move' });
      } else if (target.color !== color) {
        moves.push({ row: newRow, col: newCol, type: 'capture' });
      }
    }
  }
  
  return moves;
}

function getKingMoves(board, fromRow, fromCol, color, castlingRights) {
  const moves = [];
  
  // Normal king moves (one square in any direction)
  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      if (dRow === 0 && dCol === 0) continue;
      
      const newRow = fromRow + dRow;
      const newCol = fromCol + dCol;
      
      if (isValidCoord(newRow, newCol)) {
        const target = board[newRow][newCol];
        if (!target) {
          moves.push({ row: newRow, col: newCol, type: 'move' });
        } else if (target.color !== color) {
          moves.push({ row: newRow, col: newCol, type: 'capture' });
        }
      }
    }
  }
  
  // Castling moves
  if (castlingRights) {
    const row = color === COLORS.WHITE ? 7 : 0;
    if (fromRow === row && fromCol === 4) { // King on starting square
      // Kingside castling
      if (castlingRights[`${color}King`] && 
          !board[row][5] && !board[row][6] && 
          board[row][7] && board[row][7].type === PIECES.ROOK) {
        moves.push({ row, col: 6, type: 'castle' });
      }
      
      // Queenside castling
      if (castlingRights[`${color}Queen`] && 
          !board[row][3] && !board[row][2] && !board[row][1] && 
          board[row][0] && board[row][0].type === PIECES.ROOK) {
        moves.push({ row, col: 2, type: 'castle' });
      }
    }
  }
  
  return moves;
}

/**
 * Checks if a king is in check
 */
function isInCheck(board, color) {
  // Find the king
  let kingRow, kingCol;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === PIECES.KING && piece.color === color) {
        kingRow = row;
        kingCol = col;
        break;
      }
    }
  }
  
  // Check if any opponent piece can capture the king
  const opponentColor = color === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === opponentColor) {
        const moves = getPossibleMoves(board, row, col, null, null);
        if (moves.some(move => move.row === kingRow && move.col === kingCol)) {
          return true;
        }
      }
    }
  }
  
  return false;
}

/**
 * Checks if a move would leave the player's own king in check
 */
function wouldLeaveInCheck(board, fromRow, fromCol, toRow, toCol, color) {
  // Make temporary move
  const tempBoard = board.map(row => [...row]);
  const piece = tempBoard[fromRow][fromCol];
  tempBoard[toRow][toCol] = piece;
  tempBoard[fromRow][fromCol] = null;
  
  return isInCheck(tempBoard, color);
}

/**
 * Gets all legal moves for a piece (filters out moves that would leave king in check)
 */
function getLegalMoves(board, fromRow, fromCol, enPassantTarget, castlingRights) {
  const piece = board[fromRow][fromCol];
  if (!piece) return [];
  
  const possibleMoves = getPossibleMoves(board, fromRow, fromCol, enPassantTarget, castlingRights);
  const legalMoves = [];
  
  for (const move of possibleMoves) {
    if (!wouldLeaveInCheck(board, fromRow, fromCol, move.row, move.col, piece.color)) {
      legalMoves.push(move);
    }
  }
  
  return legalMoves;
}

/**
 * Checks if the current player is in checkmate
 */
function isCheckmate(board, color, enPassantTarget, castlingRights) {
  if (!isInCheck(board, color)) return false;
  
  // Check if any piece has legal moves
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const legalMoves = getLegalMoves(board, row, col, enPassantTarget, castlingRights);
        if (legalMoves.length > 0) return false;
      }
    }
  }
  
  return true;
}

/**
 * Checks if the current player is in stalemate
 */
function isStalemate(board, color, enPassantTarget, castlingRights) {
  if (isInCheck(board, color)) return false;
  
  // Check if any piece has legal moves
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const legalMoves = getLegalMoves(board, row, col, enPassantTarget, castlingRights);
        if (legalMoves.length > 0) return false;
      }
    }
  }
  
  return true;
}

// Chess Game Definition for boardgame.io
const ChessGame = {
  name: 'chess',
  
  setup: () => ({
    board: createInitialBoard(),
    enPassantTarget: null,
    castlingRights: {
      whiteKing: true,
      whiteQueen: true,
      blackKing: true,
      blackQueen: true
    },
    moveHistory: [], // For 50-move rule and repetition
    halfmoveClock: 0, // For 50-move rule
    fullmoveNumber: 1,
    selectedSquare: null, // UI state for piece selection
    validMoves: [] // UI state for highlighting valid moves
  }),
  
  turn: {
    // Don't use minMoves/maxMoves, we'll handle turn ending manually
  },
  
  moves: {
    /**
     * Select a square on the board
     * If piece of current player: select and show valid moves
     * If valid move destination: execute the move
     */
    selectSquare: ({ G, ctx, events }, row, col) => {
      const currentColor = ctx.currentPlayer === '0' ? COLORS.WHITE : COLORS.BLACK;
      const piece = G.board[row][col];
      
      // If selecting a piece of the current player
      if (piece && piece.color === currentColor) {
        G.selectedSquare = { row, col };
        G.validMoves = getLegalMoves(G.board, row, col, G.enPassantTarget, G.castlingRights);
        // Don't end turn for piece selection
        return;
      }
      
      // If there's a selected square, try to move there
      if (G.selectedSquare) {
        const validMove = G.validMoves.find(move => move.row === row && move.col === col);
        if (validMove) {
          // Execute the move
          executeMove(G, G.selectedSquare.row, G.selectedSquare.col, row, col, validMove.type, currentColor);
          
          // Clear selection
          G.selectedSquare = null;
          G.validMoves = [];
          
          // End the turn after a successful move
          events.endTurn();
          return;
        }
      }
      
      // Clear selection if clicking on an empty square or invalid move
      G.selectedSquare = null;
      G.validMoves = [];
    },
    
    /**
     * Promote a pawn to the specified piece type
     */
    promotePawn: ({ G, ctx }, row, col, pieceType) => {
      const piece = G.board[row][col];
      if (piece && piece.type === PIECES.PAWN) {
        const promotionRow = piece.color === COLORS.WHITE ? 0 : 7;
        if (row === promotionRow) {
          piece.type = pieceType;
        }
      }
    }
  },
  
  endIf: ({ G, ctx }) => {
    const currentColor = ctx.currentPlayer === '0' ? COLORS.WHITE : COLORS.BLACK;
    
    if (isCheckmate(G.board, currentColor, G.enPassantTarget, G.castlingRights)) {
      return { winner: ctx.currentPlayer === '0' ? '1' : '0' };
    }
    
    if (isStalemate(G.board, currentColor, G.enPassantTarget, G.castlingRights)) {
      return { draw: true };
    }
    
    // 50-move rule
    if (G.halfmoveClock >= 100) {
      return { draw: true };
    }
    
    // Insufficient material (simplified check)
    const pieces = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (G.board[row][col]) {
          pieces.push(G.board[row][col].type);
        }
      }
    }
    
    // King vs King
    if (pieces.length === 2) {
      return { draw: true };
    }
    
    // King and Bishop/Knight vs King
    if (pieces.length === 3 && 
        (pieces.includes(PIECES.BISHOP) || pieces.includes(PIECES.KNIGHT))) {
      return { draw: true };
    }
  }
};

/**
 * Execute a chess move and update game state
 */
function executeMove(G, fromRow, fromCol, toRow, toCol, moveType, currentColor) {
  const piece = G.board[fromRow][fromCol];
  
  // Handle special moves
  switch (moveType) {
    case 'castle':
      executeCastling(G, fromRow, fromCol, toRow, toCol, currentColor);
      break;
    case 'enpassant':
      executeEnPassant(G, fromRow, fromCol, toRow, toCol, currentColor);
      break;
    default:
      // Normal move or capture
      G.board[toRow][toCol] = piece;
      G.board[fromRow][fromCol] = null;
      break;
  }
  
  // Mark piece as moved
  if (piece) {
    piece.hasMoved = true;
  }
  
  // Update castling rights
  updateCastlingRights(G, fromRow, fromCol, toRow, toCol, piece);
  
  // Update en passant target
  updateEnPassantTarget(G, fromRow, fromCol, toRow, toCol, piece);
  
  // Update move counters
  if (piece && piece.type === PIECES.PAWN || G.board[toRow][toCol]) {
    G.halfmoveClock = 0; // Reset on pawn move or capture
  } else {
    G.halfmoveClock++;
  }
  
  if (currentColor === COLORS.BLACK) {
    G.fullmoveNumber++;
  }
  
  // Add to move history
  G.moveHistory.push({
    from: coordsToAlgebraic(fromRow, fromCol),
    to: coordsToAlgebraic(toRow, toCol),
    piece: piece ? piece.type : null,
    moveType
  });
}

function executeCastling(G, fromRow, fromCol, toRow, toCol, currentColor) {
  const king = G.board[fromRow][fromCol];
  
  // Move king
  G.board[toRow][toCol] = king;
  G.board[fromRow][fromCol] = null;
  
  // Move rook
  if (toCol === 6) { // Kingside
    const rook = G.board[fromRow][7];
    G.board[fromRow][5] = rook;
    G.board[fromRow][7] = null;
    if (rook) rook.hasMoved = true;
  } else if (toCol === 2) { // Queenside
    const rook = G.board[fromRow][0];
    G.board[fromRow][3] = rook;
    G.board[fromRow][0] = null;
    if (rook) rook.hasMoved = true;
  }
}

function executeEnPassant(G, fromRow, fromCol, toRow, toCol, currentColor) {
  const pawn = G.board[fromRow][fromCol];
  
  // Move attacking pawn
  G.board[toRow][toCol] = pawn;
  G.board[fromRow][fromCol] = null;
  
  // Remove captured pawn
  G.board[fromRow][toCol] = null;
}

function updateCastlingRights(G, fromRow, fromCol, toRow, toCol, piece) {
  if (!piece) return;
  
  // King moves
  if (piece.type === PIECES.KING) {
    if (piece.color === COLORS.WHITE) {
      G.castlingRights.whiteKing = false;
      G.castlingRights.whiteQueen = false;
    } else {
      G.castlingRights.blackKing = false;
      G.castlingRights.blackQueen = false;
    }
  }
  
  // Rook moves
  if (piece.type === PIECES.ROOK) {
    if (piece.color === COLORS.WHITE) {
      if (fromRow === 7 && fromCol === 0) G.castlingRights.whiteQueen = false;
      if (fromRow === 7 && fromCol === 7) G.castlingRights.whiteKing = false;
    } else {
      if (fromRow === 0 && fromCol === 0) G.castlingRights.blackQueen = false;
      if (fromRow === 0 && fromCol === 7) G.castlingRights.blackKing = false;
    }
  }
  
  // Rook captured
  if (toRow === 0 && toCol === 0) G.castlingRights.blackQueen = false;
  if (toRow === 0 && toCol === 7) G.castlingRights.blackKing = false;
  if (toRow === 7 && toCol === 0) G.castlingRights.whiteQueen = false;
  if (toRow === 7 && toCol === 7) G.castlingRights.whiteKing = false;
}

function updateEnPassantTarget(G, fromRow, fromCol, toRow, toCol, piece) {
  G.enPassantTarget = null;
  
  if (piece && piece.type === PIECES.PAWN && Math.abs(toRow - fromRow) === 2) {
    // Pawn moved two squares, set en passant target
    const targetRow = (fromRow + toRow) / 2;
    G.enPassantTarget = coordsToAlgebraic(targetRow, toCol);
  }
}

export default ChessGame;
