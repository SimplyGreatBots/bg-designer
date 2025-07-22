import { INVALID_MOVE } from 'boardgame.io/core';

// Chess piece types
export const PIECE_TYPES = {
  KING: 'king',
  QUEEN: 'queen',
  ROOK: 'rook',
  BISHOP: 'bishop',
  KNIGHT: 'knight',
  PAWN: 'pawn'
};

// Player colors
export const COLORS = {
  WHITE: '0',
  BLACK: '1'
};

// Helper function to create a piece
function createPiece(type, color, hasMoved = false) {
  return {
    type,
    color,
    hasMoved,
    id: `${color}_${type}_${Math.random().toString(36).substr(2, 9)}`
  };
}

// Initialize the chess board with pieces in starting positions
function setupBoard() {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Place white pieces (bottom of board, rows 0-1)
  const whiteBackRow = [
    PIECE_TYPES.ROOK, PIECE_TYPES.KNIGHT, PIECE_TYPES.BISHOP, PIECE_TYPES.QUEEN,
    PIECE_TYPES.KING, PIECE_TYPES.BISHOP, PIECE_TYPES.KNIGHT, PIECE_TYPES.ROOK
  ];
  
  for (let col = 0; col < 8; col++) {
    board[0][col] = createPiece(whiteBackRow[col], COLORS.WHITE);
    board[1][col] = createPiece(PIECE_TYPES.PAWN, COLORS.WHITE);
  }
  
  // Place black pieces (top of board, rows 6-7)
  const blackBackRow = [
    PIECE_TYPES.ROOK, PIECE_TYPES.KNIGHT, PIECE_TYPES.BISHOP, PIECE_TYPES.QUEEN,
    PIECE_TYPES.KING, PIECE_TYPES.BISHOP, PIECE_TYPES.KNIGHT, PIECE_TYPES.ROOK
  ];
  
  for (let col = 0; col < 8; col++) {
    board[7][col] = createPiece(blackBackRow[col], COLORS.BLACK);
    board[6][col] = createPiece(PIECE_TYPES.PAWN, COLORS.BLACK);
  }
  
  return board;
}

// Get all possible moves for a piece
function getPossibleMoves(board, fromRow, fromCol) {
  const piece = board[fromRow][fromCol];
  if (!piece) return [];
  
  const moves = [];
  
  switch (piece.type) {
    case PIECE_TYPES.PAWN:
      moves.push(...getPawnMoves(board, fromRow, fromCol, piece));
      break;
    case PIECE_TYPES.ROOK:
      moves.push(...getRookMoves(board, fromRow, fromCol, piece));
      break;
    case PIECE_TYPES.BISHOP:
      moves.push(...getBishopMoves(board, fromRow, fromCol, piece));
      break;
    case PIECE_TYPES.QUEEN:
      moves.push(...getQueenMoves(board, fromRow, fromCol, piece));
      break;
    case PIECE_TYPES.KING:
      moves.push(...getKingMoves(board, fromRow, fromCol, piece));
      break;
    case PIECE_TYPES.KNIGHT:
      moves.push(...getKnightMoves(board, fromRow, fromCol, piece));
      break;
  }
  
  return moves;
}

function getPawnMoves(board, row, col, piece) {
  const moves = [];
  const direction = piece.color === COLORS.WHITE ? 1 : -1; // White moves up, black moves down
  const startRow = piece.color === COLORS.WHITE ? 1 : 6;
  
  // Move forward one square
  const newRow = row + direction;
  if (newRow >= 0 && newRow < 8 && !board[newRow][col]) {
    moves.push({ row: newRow, col });
    
    // Move forward two squares from starting position
    if (row === startRow && !board[newRow + direction][col]) {
      moves.push({ row: newRow + direction, col });
    }
  }
  
  // Capture diagonally
  for (const colOffset of [-1, 1]) {
    const newCol = col + colOffset;
    if (newCol >= 0 && newCol < 8 && newRow >= 0 && newRow < 8) {
      const target = board[newRow][newCol];
      if (target && target.color !== piece.color) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  }
  
  return moves;
}

function getRookMoves(board, row, col, piece) {
  const moves = [];
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // right, left, down, up
  
  for (const [rowDir, colDir] of directions) {
    for (let i = 1; i < 8; i++) {
      const newRow = row + i * rowDir;
      const newCol = col + i * colDir;
      
      if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
      
      const target = board[newRow][newCol];
      if (!target) {
        moves.push({ row: newRow, col: newCol });
      } else {
        if (target.color !== piece.color) {
          moves.push({ row: newRow, col: newCol });
        }
        break; // Stop after hitting any piece
      }
    }
  }
  
  return moves;
}

function getBishopMoves(board, row, col, piece) {
  const moves = [];
  const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]]; // diagonals
  
  for (const [rowDir, colDir] of directions) {
    for (let i = 1; i < 8; i++) {
      const newRow = row + i * rowDir;
      const newCol = col + i * colDir;
      
      if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;
      
      const target = board[newRow][newCol];
      if (!target) {
        moves.push({ row: newRow, col: newCol });
      } else {
        if (target.color !== piece.color) {
          moves.push({ row: newRow, col: newCol });
        }
        break; // Stop after hitting any piece
      }
    }
  }
  
  return moves;
}

function getQueenMoves(board, row, col, piece) {
  return [
    ...getRookMoves(board, row, col, piece),
    ...getBishopMoves(board, row, col, piece)
  ];
}

function getKingMoves(board, row, col, piece) {
  const moves = [];
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];
  
  for (const [rowDir, colDir] of directions) {
    const newRow = row + rowDir;
    const newCol = col + colDir;
    
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const target = board[newRow][newCol];
      if (!target || target.color !== piece.color) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  }
  
  return moves;
}

function getKnightMoves(board, row, col, piece) {
  const moves = [];
  const knightMoves = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
  ];
  
  for (const [rowOffset, colOffset] of knightMoves) {
    const newRow = row + rowOffset;
    const newCol = col + colOffset;
    
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const target = board[newRow][newCol];
      if (!target || target.color !== piece.color) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  }
  
  return moves;
}

// Find the king's position for a given color
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

// Check if a king is in check
function isInCheck(board, color) {
  const kingPos = findKing(board, color);
  if (!kingPos) return false;
  
  // Check if any opponent piece can attack the king
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color !== color) {
        const moves = getPossibleMoves(board, row, col);
        if (moves.some(move => move.row === kingPos.row && move.col === kingPos.col)) {
          return true;
        }
      }
    }
  }
  
  return false;
}

// Check if a move would leave the king in check
function wouldLeaveKingInCheck(board, fromRow, fromCol, toRow, toCol, playerColor) {
  // Create a copy of the board with the move applied
  const newBoard = board.map(row => [...row]);
  const piece = newBoard[fromRow][fromCol];
  const capturedPiece = newBoard[toRow][toCol];
  
  newBoard[toRow][toCol] = piece;
  newBoard[fromRow][fromCol] = null;
  
  return isInCheck(newBoard, playerColor);
}

// Check for checkmate
function isCheckmate(board, color) {
  if (!isInCheck(board, color)) return false;
  
  // Try all possible moves to see if any can get out of check
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const moves = getPossibleMoves(board, row, col);
        for (const move of moves) {
          if (!wouldLeaveKingInCheck(board, row, col, move.row, move.col, color)) {
            return false; // Found a legal move
          }
        }
      }
    }
  }
  
  return true; // No legal moves found
}

// Check for stalemate
function isStalemate(board, color) {
  if (isInCheck(board, color)) return false; // Can't be stalemate if in check
  
  // Check if there are any legal moves
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const moves = getPossibleMoves(board, row, col);
        for (const move of moves) {
          if (!wouldLeaveKingInCheck(board, row, col, move.row, move.col, color)) {
            return false; // Found a legal move
          }
        }
      }
    }
  }
  
  return true; // No legal moves found
}

// Chess game definition
export const Chess = {
  setup: () => ({
    board: setupBoard(),
    selectedSquare: null,
    possibleMoves: [],
    lastMove: null,
    capturedPieces: { [COLORS.WHITE]: [], [COLORS.BLACK]: [] },
    gameStatus: 'playing', // 'playing', 'check', 'checkmate', 'stalemate', 'draw'
    winner: null
  }),

  turn: {
    order: {
      first: () => 0, // Returns index 0 (first player)
      next: ({ ctx }) => (ctx.playOrderPos + 1) % ctx.numPlayers, // Next index
    },
  },

  minPlayers: 2,
  maxPlayers: 2,

  moves: {
    selectSquare: ({ G, playerID, events, ctx }, row, col) => {
      console.log(`selectSquare called with row=${row}, col=${col}`);
      console.log(`playerID=${playerID} (type: ${typeof playerID})`);
      console.log(`ctx.currentPlayer=${ctx.currentPlayer} (type: ${typeof ctx.currentPlayer})`);
      
      // In single-player mode (no playerID), allow moves for the current turn player
      // In multiplayer mode, only allow moves if it's the player's turn
      const allowMove = !playerID || playerID === ctx.currentPlayer;
      console.log(`allowMove=${allowMove}`);
      
      if (!allowMove) {
        console.log('Returning INVALID_MOVE due to allowMove check');
        return INVALID_MOVE;
      }
      
      // Use the current player from context for piece ownership checks
      const currentPlayer = ctx.currentPlayer;
      console.log(`Using currentPlayer=${currentPlayer} for piece ownership`);
      
      // If game is over, don't allow moves
      if (G.gameStatus !== 'playing' && G.gameStatus !== 'check') {
        console.log(`Returning INVALID_MOVE due to game status: ${G.gameStatus}`);
        return INVALID_MOVE;
      }
      
      const piece = G.board[row][col];
      console.log(`piece at [${row}][${col}]:`, piece);
      
      // If clicking on an empty square with no selection, invalid
      if (!piece && !G.selectedSquare) {
        console.log('Returning INVALID_MOVE - clicking empty square with no selection');
        return INVALID_MOVE;
      }
      
      // If selecting a piece
      if (piece && piece.color === currentPlayer) {
        console.log(`Selecting piece of correct color (${piece.color})`);
        G.selectedSquare = { row, col };
        G.possibleMoves = getPossibleMoves(G.board, row, col).filter(move =>
          !wouldLeaveKingInCheck(G.board, row, col, move.row, move.col, currentPlayer)
        );
        console.log(`Set selectedSquare and ${G.possibleMoves.length} possible moves`);
        return;
      }
      
      // If trying to move to a square
      if (G.selectedSquare) {
        console.log(`Attempting to move from [${G.selectedSquare.row}][${G.selectedSquare.col}] to [${row}][${col}]`);
        const fromRow = G.selectedSquare.row;
        const fromCol = G.selectedSquare.col;
        const movingPiece = G.board[fromRow][fromCol];
        
        // Check if this move is in the possible moves
        const isValidMove = G.possibleMoves.some(move => move.row === row && move.col === col);
        console.log(`isValidMove=${isValidMove}, possibleMoves.length=${G.possibleMoves.length}`);
        
        if (!isValidMove) {
          console.log('Returning INVALID_MOVE - move not in possible moves, clearing selection');
          // Clear selection if invalid move
          G.selectedSquare = null;
          G.possibleMoves = [];
          return INVALID_MOVE;
        }
        
        // Check if this move would leave king in check
        if (wouldLeaveKingInCheck(G.board, fromRow, fromCol, row, col, currentPlayer)) {
          console.log('Returning INVALID_MOVE - would leave king in check');
          G.selectedSquare = null;
          G.possibleMoves = [];
          return INVALID_MOVE;
        }
        
        console.log('Executing move...');
        // Execute the move
        const capturedPiece = G.board[row][col];
        if (capturedPiece) {
          console.log(`Capturing piece: ${capturedPiece.type} (${capturedPiece.color})`);
          G.capturedPieces[capturedPiece.color].push(capturedPiece);
        }
        
        // Mark piece as moved (for castling and pawn double moves)
        movingPiece.hasMoved = true;
        
        // Move the piece
        G.board[row][col] = movingPiece;
        G.board[fromRow][fromCol] = null;
        
        // Store the last move
        G.lastMove = { from: { row: fromRow, col: fromCol }, to: { row, col } };
        
        // Clear selection
        G.selectedSquare = null;
        G.possibleMoves = [];
        
        console.log('Move completed successfully');
        
        // Check game state after move
        const opponentColor = currentPlayer === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
        
        if (isCheckmate(G.board, opponentColor)) {
          G.gameStatus = 'checkmate';
          G.winner = currentPlayer;
        } else if (isStalemate(G.board, opponentColor)) {
          G.gameStatus = 'stalemate';
          G.winner = null;
        } else if (isInCheck(G.board, opponentColor)) {
          G.gameStatus = 'check';
        } else {
          G.gameStatus = 'playing';
        }
        
        // End the turn after completing a move
        events.endTurn();
        return;
      }
      
      return INVALID_MOVE;
    },

    resign: ({ G, playerID }) => {
      G.gameStatus = 'resigned';
      G.winner = playerID === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
    },

    offerDraw: ({ G, playerID }) => {
      // In a real implementation, this would need player acceptance logic
      G.gameStatus = 'draw';
      G.winner = null;
    }
  },

  endIf: ({ G }) => {
    if (G.gameStatus === 'checkmate') {
      return { winner: G.winner };
    }
    if (G.gameStatus === 'stalemate' || G.gameStatus === 'draw') {
      return { draw: true };
    }
    if (G.gameStatus === 'resigned') {
      return { winner: G.winner };
    }
  },

  ai: {
    enumerate: ({ G, playerID }) => {
      const moves = [];
      const currentPlayer = playerID;
      
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const piece = G.board[row][col];
          if (piece && piece.color === currentPlayer) {
            const possibleMoves = getPossibleMoves(G.board, row, col).filter(move =>
              !wouldLeaveKingInCheck(G.board, row, col, move.row, move.col, currentPlayer)
            );
            
            for (const move of possibleMoves) {
              moves.push({ move: 'selectSquare', args: [row, col] });
              moves.push({ move: 'selectSquare', args: [move.row, move.col] });
            }
          }
        }
      }
      
      return moves;
    }
  }
};
