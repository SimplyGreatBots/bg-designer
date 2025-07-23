// Chess Game Logic using boardgame.io
// Implementation based on FIDE Laws of Chess

console.log('Game.js loaded');

/**
 * CHESS PIECE CONSTANTS
 */
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
 * BOARD SETUP UTILITIES
 */

// Convert algebraic notation (e4) to array indices [row, col]
function algebraicToIndices(algebraic) {
  const file = algebraic.charCodeAt(0) - 97; // a=0, b=1, etc.
  const rank = parseInt(algebraic[1]) - 1;   // 1=0, 2=1, etc.
  return [7 - rank, file]; // Flip rank for array representation
}

// Convert array indices [row, col] to algebraic notation (e4)
function indicesToAlgebraic(row, col) {
  const file = String.fromCharCode(97 + col); // 0=a, 1=b, etc.
  const rank = 8 - row; // Flip rank for display
  return file + rank;
}

// Initialize standard chess starting position
function initializeBoard() {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Place pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: PIECES.PAWN, color: COLORS.BLACK };
    board[6][col] = { type: PIECES.PAWN, color: COLORS.WHITE };
  }
  
  // Place other pieces
  const backRowPieces = [PIECES.ROOK, PIECES.KNIGHT, PIECES.BISHOP, PIECES.QUEEN, 
                        PIECES.KING, PIECES.BISHOP, PIECES.KNIGHT, PIECES.ROOK];
  
  for (let col = 0; col < 8; col++) {
    board[0][col] = { type: backRowPieces[col], color: COLORS.BLACK };
    board[7][col] = { type: backRowPieces[col], color: COLORS.WHITE };
  }
  
  return board;
}

/**
 * MOVEMENT VALIDATION UTILITIES
 */

// Check if position is within board bounds
function isValidPosition(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

// Get piece at position
function getPieceAt(board, row, col) {
  if (!isValidPosition(row, col)) return null;
  return board[row][col];
}

// Check if path between two positions is clear (for sliding pieces)
function isPathClear(board, fromRow, fromCol, toRow, toCol) {
  const rowDiff = Math.sign(toRow - fromRow);
  const colDiff = Math.sign(toCol - fromCol);
  
  let currentRow = fromRow + rowDiff;
  let currentCol = fromCol + colDiff;
  
  while (currentRow !== toRow || currentCol !== toCol) {
    if (getPieceAt(board, currentRow, currentCol) !== null) {
      return false;
    }
    currentRow += rowDiff;
    currentCol += colDiff;
  }
  
  return true;
}

// Find king position for given color
function findKing(board, color) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = getPieceAt(board, row, col);
      if (piece && piece.type === PIECES.KING && piece.color === color) {
        return [row, col];
      }
    }
  }
  return null;
}

// Check if a position is under attack by opponent
function isSquareUnderAttack(board, targetRow, targetCol, attackerColor) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = getPieceAt(board, row, col);
      if (piece && piece.color === attackerColor) {
        if (canPieceAttack(board, row, col, targetRow, targetCol)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Check if piece can attack target square (used for check detection)
function canPieceAttack(board, fromRow, fromCol, toRow, toCol) {
  const piece = getPieceAt(board, fromRow, fromCol);
  if (!piece) return false;
  
  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  
  switch (piece.type) {
    case PIECES.PAWN:
      const direction = piece.color === COLORS.WHITE ? -1 : 1;
      return rowDiff === direction && Math.abs(colDiff) === 1;
      
    case PIECES.ROOK:
      return (rowDiff === 0 || colDiff === 0) && isPathClear(board, fromRow, fromCol, toRow, toCol);
      
    case PIECES.BISHOP:
      return Math.abs(rowDiff) === Math.abs(colDiff) && isPathClear(board, fromRow, fromCol, toRow, toCol);
      
    case PIECES.QUEEN:
      return (rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff)) && 
             isPathClear(board, fromRow, fromCol, toRow, toCol);
      
    case PIECES.KNIGHT:
      return (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) || 
             (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2);
      
    case PIECES.KING:
      return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;
      
    default:
      return false;
  }
}

// Check if king is in check
function isInCheck(board, kingColor) {
  const kingPos = findKing(board, kingColor);
  if (!kingPos) return false;
  
  const opponentColor = kingColor === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
  return isSquareUnderAttack(board, kingPos[0], kingPos[1], opponentColor);
}

// Validate move according to piece movement rules
function isValidMove(board, fromRow, fromCol, toRow, toCol, gameState) {
  // Basic bounds checking
  if (!isValidPosition(fromRow, fromCol) || !isValidPosition(toRow, toCol)) {
    return false;
  }
  
  // Can't move to same position
  if (fromRow === toRow && fromCol === toCol) {
    return false;
  }
  
  const piece = getPieceAt(board, fromRow, fromCol);
  const targetPiece = getPieceAt(board, toRow, toCol);
  
  // Must have piece to move
  if (!piece) return false;
  
  // Can't capture own piece
  if (targetPiece && targetPiece.color === piece.color) {
    return false;
  }
  
  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  
  // Piece-specific movement validation
  switch (piece.type) {
    case PIECES.PAWN:
      return validatePawnMove(board, fromRow, fromCol, toRow, toCol, piece.color, gameState);
      
    case PIECES.ROOK:
      return (rowDiff === 0 || colDiff === 0) && isPathClear(board, fromRow, fromCol, toRow, toCol);
      
    case PIECES.BISHOP:
      return Math.abs(rowDiff) === Math.abs(colDiff) && isPathClear(board, fromRow, fromCol, toRow, toCol);
      
    case PIECES.QUEEN:
      return (rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff)) && 
             isPathClear(board, fromRow, fromCol, toRow, toCol);
      
    case PIECES.KNIGHT:
      return (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) || 
             (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2);
      
    case PIECES.KING:
      return validateKingMove(board, fromRow, fromCol, toRow, toCol, piece.color, gameState);
      
    default:
      return false;
  }
}

// Validate pawn movement (includes en passant)
function validatePawnMove(board, fromRow, fromCol, toRow, toCol, color, gameState) {
  const direction = color === COLORS.WHITE ? -1 : 1;
  const startRow = color === COLORS.WHITE ? 6 : 1;
  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  
  // Forward movement
  if (colDiff === 0) {
    // One square forward
    if (rowDiff === direction && !getPieceAt(board, toRow, toCol)) {
      return true;
    }
    // Two squares from starting position
    if (fromRow === startRow && rowDiff === 2 * direction && 
        !getPieceAt(board, toRow, toCol) && !getPieceAt(board, fromRow + direction, fromCol)) {
      return true;
    }
  }
  
  // Diagonal capture
  if (Math.abs(colDiff) === 1 && rowDiff === direction) {
    const targetPiece = getPieceAt(board, toRow, toCol);
    if (targetPiece && targetPiece.color !== color) {
      return true;
    }
    
    // En passant
    if (gameState.enPassantTarget) {
      const [enPassantRow, enPassantCol] = algebraicToIndices(gameState.enPassantTarget);
      if (toRow === enPassantRow && toCol === enPassantCol) {
        return true;
      }
    }
  }
  
  return false;
}

// Validate king movement (includes castling)
function validateKingMove(board, fromRow, fromCol, toRow, toCol, color, gameState) {
  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  
  // Normal king move (one square)
  if (Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1) {
    return true;
  }
  
  // Castling
  if (rowDiff === 0 && Math.abs(colDiff) === 2) {
    return validateCastling(board, fromRow, fromCol, toRow, toCol, color, gameState);
  }
  
  return false;
}

// Validate castling move
function validateCastling(board, fromRow, fromCol, toRow, toCol, color, gameState) {
  const isKingside = toCol > fromCol;
  const rookCol = isKingside ? 7 : 0;
  const rook = getPieceAt(board, fromRow, rookCol);
  
  // Check castling rights
  const side = isKingside ? 'kingside' : 'queenside';
  if (!gameState.castlingRights[color][side]) {
    return false;
  }
  
  // Verify rook is present
  if (!rook || rook.type !== PIECES.ROOK || rook.color !== color) {
    return false;
  }
  
  // Check path is clear
  const start = Math.min(fromCol, rookCol) + 1;
  const end = Math.max(fromCol, rookCol);
  for (let col = start; col < end; col++) {
    if (getPieceAt(board, fromRow, col)) {
      return false;
    }
  }
  
  // King cannot be in check, pass through check, or end in check
  const opponentColor = color === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
  if (isSquareUnderAttack(board, fromRow, fromCol, opponentColor)) {
    return false;
  }
  
  const direction = isKingside ? 1 : -1;
  if (isSquareUnderAttack(board, fromRow, fromCol + direction, opponentColor)) {
    return false;
  }
  
  if (isSquareUnderAttack(board, toRow, toCol, opponentColor)) {
    return false;
  }
  
  return true;
}

// Check if move would leave own king in check
function wouldLeaveKingInCheck(board, fromRow, fromCol, toRow, toCol, playerColor) {
  // Create temporary board with move applied
  const tempBoard = board.map(row => [...row]);
  const piece = tempBoard[fromRow][fromCol];
  tempBoard[toRow][toCol] = piece;
  tempBoard[fromRow][fromCol] = null;
  
  return isInCheck(tempBoard, playerColor);
}

// Get all legal moves for current player
function getAllLegalMoves(board, color, gameState) {
  const legalMoves = [];
  
  for (let fromRow = 0; fromRow < 8; fromRow++) {
    for (let fromCol = 0; fromCol < 8; fromCol++) {
      const piece = getPieceAt(board, fromRow, fromCol);
      if (piece && piece.color === color) {
        for (let toRow = 0; toRow < 8; toRow++) {
          for (let toCol = 0; toCol < 8; toCol++) {
            if (isValidMove(board, fromRow, fromCol, toRow, toCol, gameState) &&
                !wouldLeaveKingInCheck(board, fromRow, fromCol, toRow, toCol, color)) {
              legalMoves.push({from: [fromRow, fromCol], to: [toRow, toCol]});
            }
          }
        }
      }
    }
  }
  
  return legalMoves;
}

// Check for checkmate or stalemate
function getGameEndCondition(board, currentPlayerColor, gameState) {
  const legalMoves = getAllLegalMoves(board, currentPlayerColor, gameState);
  
  if (legalMoves.length === 0) {
    if (isInCheck(board, currentPlayerColor)) {
      // Checkmate
      const winner = currentPlayerColor === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
      return { winner, reason: 'checkmate' };
    } else {
      // Stalemate
      return { draw: true, reason: 'stalemate' };
    }
  }
  
  // Check for insufficient material
  if (isInsufficientMaterial(board)) {
    return { draw: true, reason: 'insufficient material' };
  }
  
  return null;
}

// Check for insufficient material draw
function isInsufficientMaterial(board) {
  const pieces = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = getPieceAt(board, row, col);
      if (piece) {
        pieces.push(piece);
      }
    }
  }
  
  // King vs King
  if (pieces.length === 2) return true;
  
  // King + Bishop/Knight vs King
  if (pieces.length === 3) {
    const nonKings = pieces.filter(p => p.type !== PIECES.KING);
    if (nonKings.length === 1 && 
        (nonKings[0].type === PIECES.BISHOP || nonKings[0].type === PIECES.KNIGHT)) {
      return true;
    }
  }
  
  return false;
}

/**
 * BOARDGAME.IO GAME DEFINITION
 */

const ChessGame = {
  name: 'chess',
  
  setup: () => {
    console.log('Chess game setup called - initializing game state');
    const initialState = {
      board: initializeBoard(),
      castlingRights: {
        [COLORS.WHITE]: { kingside: true, queenside: true },
        [COLORS.BLACK]: { kingside: true, queenside: true }
      },
      enPassantTarget: null,
      halfMoveClock: 0,
      fullMoveNumber: 1,
      moveHistory: [],
      selectedSquare: null
    };
    console.log('Initial game state created:', initialState);
    return initialState;
  },
  
  turn: {
    onEnd: ({ G, ctx, events }) => {
      // Update move counters
      if (ctx.currentPlayer === '1') { // After black's move
        G.fullMoveNumber++;
      }
      
      // Clear en passant target (only valid for one turn)
      G.enPassantTarget = null;
      
      // Check for game end conditions
      const currentPlayerColor = ctx.currentPlayer === '0' ? COLORS.WHITE : COLORS.BLACK;
      const endCondition = getGameEndCondition(G.board, currentPlayerColor, G);
      
      if (endCondition) {
        if (endCondition.winner) {
          events.endGame({ winner: endCondition.winner, reason: endCondition.reason });
        } else if (endCondition.draw) {
          events.endGame({ draw: true, reason: endCondition.reason });
        }
      }
    }
  },
  
  moves: {
    // Select or move a piece
    selectSquare: ({ G, ctx, playerID, events }, algebraic) => {
      const [row, col] = algebraicToIndices(algebraic);
      const piece = getPieceAt(G.board, row, col);
      const playerColor = playerID === '0' ? COLORS.WHITE : COLORS.BLACK;
      
      // If no square is selected, select this square (if it has player's piece)
      if (!G.selectedSquare) {
        if (piece && piece.color === playerColor) {
          G.selectedSquare = algebraic;
        }
        return;
      }
      
      // If same square selected, deselect
      if (G.selectedSquare === algebraic) {
        G.selectedSquare = null;
        return;
      }
      
      // If different piece of same color selected, change selection
      if (piece && piece.color === playerColor) {
        G.selectedSquare = algebraic;
        return;
      }
      
      // Otherwise, try to move from selected square to this square
      const [fromRow, fromCol] = algebraicToIndices(G.selectedSquare);
      
      if (isValidMove(G.board, fromRow, fromCol, row, col, G) &&
          !wouldLeaveKingInCheck(G.board, fromRow, fromCol, row, col, playerColor)) {
        
        // Execute the move
        const movingPiece = G.board[fromRow][fromCol];
        const capturedPiece = G.board[row][col];
        
        // Handle special moves
        handleSpecialMoves(G, fromRow, fromCol, row, col, movingPiece, algebraic);
        
        // Make the move
        G.board[row][col] = movingPiece;
        G.board[fromRow][fromCol] = null;
        
        // Update game state
        updateGameState(G, fromRow, fromCol, row, col, movingPiece, capturedPiece);
        
        // Clear selection
        G.selectedSquare = null;
        
        // End turn
        events.endTurn();
      }
    },
    
    // Promote pawn (when pawn reaches end of board)
    promotePawn: ({ G, ctx, playerID }, algebraic, pieceType) => {
      const [row, col] = algebraicToIndices(algebraic);
      const piece = getPieceAt(G.board, row, col);
      const playerColor = playerID === '0' ? COLORS.WHITE : COLORS.BLACK;
      
      if (piece && piece.type === PIECES.PAWN && piece.color === playerColor &&
          (row === 0 || row === 7)) {
        G.board[row][col] = { type: pieceType, color: playerColor };
      }
    },
    
    // Offer draw
    offerDraw: ({ G, ctx, events }) => {
      // For simplicity, automatically accept draw offers
      events.endGame({ draw: true, reason: 'agreement' });
    },
    
    // Resign
    resign: ({ ctx, events, playerID }) => {
      const winner = playerID === '0' ? COLORS.BLACK : COLORS.WHITE;
      events.endGame({ winner, reason: 'resignation' });
    }
  },
  
  endIf: ({ G, ctx }) => {
    const currentPlayerColor = ctx.currentPlayer === '0' ? COLORS.WHITE : COLORS.BLACK;
    return getGameEndCondition(G.board, currentPlayerColor, G);
  },
  
  minPlayers: 2,
  maxPlayers: 2
};

// Handle special moves (castling, en passant, pawn promotion)
function handleSpecialMoves(G, fromRow, fromCol, toRow, toCol, piece, toAlgebraic) {
  // Castling
  if (piece.type === PIECES.KING && Math.abs(toCol - fromCol) === 2) {
    const isKingside = toCol > fromCol;
    const rookFromCol = isKingside ? 7 : 0;
    const rookToCol = isKingside ? 5 : 3;
    const rook = G.board[fromRow][rookFromCol];
    
    // Move the rook
    G.board[fromRow][rookToCol] = rook;
    G.board[fromRow][rookFromCol] = null;
    
    // Update castling rights
    G.castlingRights[piece.color] = { kingside: false, queenside: false };
  }
  
  // En passant capture
  if (piece.type === PIECES.PAWN && G.enPassantTarget === toAlgebraic) {
    const captureRow = piece.color === COLORS.WHITE ? toRow + 1 : toRow - 1;
    G.board[captureRow][toCol] = null;
  }
  
  // Pawn two-square move (sets en passant target)
  if (piece.type === PIECES.PAWN && Math.abs(toRow - fromRow) === 2) {
    const enPassantRow = piece.color === COLORS.WHITE ? fromRow - 1 : fromRow + 1;
    G.enPassantTarget = indicesToAlgebraic(enPassantRow, fromCol);
  }
}

// Update game state after move
function updateGameState(G, fromRow, fromCol, toRow, toCol, piece, capturedPiece) {
  // Update castling rights
  if (piece.type === PIECES.KING) {
    G.castlingRights[piece.color] = { kingside: false, queenside: false };
  }
  
  if (piece.type === PIECES.ROOK) {
    if (fromRow === 0 || fromRow === 7) {
      const color = piece.color;
      if (fromCol === 0) G.castlingRights[color].queenside = false;
      if (fromCol === 7) G.castlingRights[color].kingside = false;
    }
  }
  
  // Update half-move clock
  if (piece.type === PIECES.PAWN || capturedPiece) {
    G.halfMoveClock = 0;
  } else {
    G.halfMoveClock++;
  }
  
  // Add to move history
  G.moveHistory.push({
    from: indicesToAlgebraic(fromRow, fromCol),
    to: indicesToAlgebraic(toRow, toCol),
    piece: piece.type,
    captured: capturedPiece ? capturedPiece.type : null
  });
}

export default ChessGame;
export { PIECES, COLORS, algebraicToIndices, indicesToAlgebraic, isInCheck };
