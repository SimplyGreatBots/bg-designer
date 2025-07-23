import React from 'react';
import './Board.css';
import { PIECES, COLORS, algebraicToIndices, indicesToAlgebraic, isInCheck } from './Game';

console.log('Board.js loaded');

/**
 * Chess Board React Component
 * Renders interactive 8x8 chessboard with pieces and move selection
 */

// Unicode chess piece symbols
const PIECE_SYMBOLS = {
  [COLORS.WHITE]: {
    [PIECES.KING]: '♔',
    [PIECES.QUEEN]: '♕',
    [PIECES.ROOK]: '♖',
    [PIECES.BISHOP]: '♗',
    [PIECES.KNIGHT]: '♘',
    [PIECES.PAWN]: '♙'
  },
  [COLORS.BLACK]: {
    [PIECES.KING]: '♚',
    [PIECES.QUEEN]: '♛',
    [PIECES.ROOK]: '♜',
    [PIECES.BISHOP]: '♝',
    [PIECES.KNIGHT]: '♞',
    [PIECES.PAWN]: '♟'
  }
};

function ChessBoard({ G, ctx, moves, events, playerID }) {
  // Debug logging
  console.log('ChessBoard props:', { 
    G: G ? 'defined' : 'undefined', 
    ctx: ctx ? 'defined' : 'undefined', 
    moves: moves ? 'defined' : 'undefined',
    events: events ? 'defined' : 'undefined',
    playerID 
  });
  
  if (G) {
    console.log('Game state G:', {
      board: G.board ? 'has board' : 'no board',
      selectedSquare: G.selectedSquare,
      castlingRights: G.castlingRights
    });
  }
  
  if (ctx) {
    console.log('Game context ctx:', {
      currentPlayer: ctx.currentPlayer,
      turn: ctx.turn,
      numPlayers: ctx.numPlayers,
      gameover: ctx.gameover
    });
  }

  // Safety check for props that might be undefined
  if (!G || !ctx || !moves) {
    console.log('Board props debug:', { G, ctx, moves, events, playerID });
    return (
      <div className="loading">
        <h3>Loading chess game...</h3>
        <p>Waiting for game state to initialize...</p>
        <div style={{ fontSize: '12px', marginTop: '10px' }}>
          Debug: G={!!G}, ctx={!!ctx}, moves={!!moves}
        </div>
      </div>
    );
  }

  const { board, selectedSquare, castlingRights, enPassantTarget } = G;
  const currentPlayerColor = ctx.currentPlayer === '0' ? COLORS.WHITE : COLORS.BLACK;
  const isMyTurn = ctx.currentPlayer === playerID;
  
  // Check if current player's king is in check
  const inCheck = isInCheck(board, currentPlayerColor);

  // Handle square click
  const handleSquareClick = (row, col) => {
    if (!isMyTurn) return;
    const algebraic = indicesToAlgebraic(row, col);
    moves.selectSquare(algebraic);
  };

  // Handle pawn promotion
  const handlePromotion = (algebraic, pieceType) => {
    moves.promotePawn(algebraic, pieceType);
  };

  // Render individual square
  const renderSquare = (row, col) => {
    const piece = board[row][col];
    const algebraic = indicesToAlgebraic(row, col);
    const isLight = (row + col) % 2 === 0;
    const isSelected = selectedSquare === algebraic;
    
    // Check if this square is a valid move target
    const isValidTarget = selectedSquare && canMoveToSquare(row, col);
    
    // Check if this square contains the king in check
    const isKingInCheck = piece && piece.type === PIECES.KING && 
                         piece.color === currentPlayerColor && inCheck;

    let squareClass = `square ${isLight ? 'light' : 'dark'}`;
    if (isSelected) squareClass += ' selected';
    if (isValidTarget) squareClass += ' valid-target';
    if (isKingInCheck) squareClass += ' in-check';
    if (!isMyTurn) squareClass += ' disabled';

    return (
      <div
        key={`${row}-${col}`}
        className={squareClass}
        onClick={() => handleSquareClick(row, col)}
      >
        <div className="square-coordinates">
          {row === 7 && String.fromCharCode(97 + col)}
          {col === 0 && (8 - row)}
        </div>
        {piece && (
          <div className={`piece ${piece.color}`}>
            {PIECE_SYMBOLS[piece.color][piece.type]}
          </div>
        )}
        {/* Show promotion options for pawns reaching the end */}
        {showPromotionOptions(row, col) && (
          <PromotionSelector 
            algebraic={algebraic}
            color={piece.color}
            onSelect={handlePromotion}
          />
        )}
      </div>
    );
  };

  // Check if we can move to a square (for highlighting)
  const canMoveToSquare = (row, col) => {
    if (!selectedSquare) return false;
    
    const [fromRow, fromCol] = algebraicToIndices(selectedSquare);
    const fromPiece = board[fromRow][fromCol];
    
    if (!fromPiece || fromPiece.color !== currentPlayerColor) return false;
    
    // This is a simplified check - the full validation is in Game.js
    return isValidMovePreview(fromRow, fromCol, row, col, fromPiece);
  };

  // Simplified move validation for UI preview
  const isValidMovePreview = (fromRow, fromCol, toRow, toCol, piece) => {
    if (fromRow === toRow && fromCol === toCol) return false;
    
    const targetPiece = board[toRow][toCol];
    if (targetPiece && targetPiece.color === piece.color) return false;
    
    const rowDiff = toRow - fromRow;
    const colDiff = toCol - fromCol;
    
    switch (piece.type) {
      case PIECES.PAWN:
        const direction = piece.color === COLORS.WHITE ? -1 : 1;
        const startRow = piece.color === COLORS.WHITE ? 6 : 1;
        
        // Forward movement
        if (colDiff === 0) {
          if (rowDiff === direction && !targetPiece) return true;
          if (fromRow === startRow && rowDiff === 2 * direction && !targetPiece) return true;
        }
        
        // Diagonal capture
        if (Math.abs(colDiff) === 1 && rowDiff === direction) {
          if (targetPiece || enPassantTarget === indicesToAlgebraic(toRow, toCol)) return true;
        }
        return false;
        
      case PIECES.ROOK:
        return rowDiff === 0 || colDiff === 0;
        
      case PIECES.BISHOP:
        return Math.abs(rowDiff) === Math.abs(colDiff);
        
      case PIECES.QUEEN:
        return rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff);
        
      case PIECES.KNIGHT:
        return (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) || 
               (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2);
        
      case PIECES.KING:
        return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;
        
      default:
        return false;
    }
  };

  // Check if pawn promotion options should be shown
  const showPromotionOptions = (row, col) => {
    const piece = board[row][col];
    return piece && piece.type === PIECES.PAWN && 
           piece.color === currentPlayerColor &&
           (row === 0 || row === 7) &&
           selectedSquare === indicesToAlgebraic(row, col);
  };

  // Get game status text
  const getGameStatus = () => {
    if (ctx.gameover) {
      if (ctx.gameover.winner) {
        const winnerColor = ctx.gameover.winner;
        return `Game Over - ${winnerColor.charAt(0).toUpperCase() + winnerColor.slice(1)} wins by ${ctx.gameover.reason}!`;
      } else if (ctx.gameover.draw) {
        return `Game Over - Draw by ${ctx.gameover.reason}`;
      }
    }
    
    if (inCheck) {
      return `${currentPlayerColor.charAt(0).toUpperCase() + currentPlayerColor.slice(1)} is in check!`;
    }
    
    return `${currentPlayerColor.charAt(0).toUpperCase() + currentPlayerColor.slice(1)} to move`;
  };

  return (
    <div className="chess-game">
      <div className="game-info">
        <h2>Chess Game</h2>
        <div className="status">{getGameStatus()}</div>
        <div className="turn-info">
          Turn: {G.fullMoveNumber} | Half-moves: {G.halfMoveClock}
        </div>
        
        {/* Game controls */}
        <div className="game-controls">
          {isMyTurn && !ctx.gameover && (
            <>
              <button onClick={() => moves.offerDraw()}>Offer Draw</button>
              <button onClick={() => moves.resign()}>Resign</button>
            </>
          )}
        </div>
        
        {/* Castling rights display */}
        <div className="castling-rights">
          <h4>Castling Rights:</h4>
          <div>White: {castlingRights.white.kingside ? 'K' : ''}
                     {castlingRights.white.queenside ? 'Q' : ''}</div>
          <div>Black: {castlingRights.black.kingside ? 'k' : ''}
                     {castlingRights.black.queenside ? 'q' : ''}</div>
        </div>
        
        {/* En passant target */}
        {enPassantTarget && (
          <div className="en-passant">
            En passant target: {enPassantTarget}
          </div>
        )}
      </div>
      
      <div className="board-container">
        <div className="chessboard">
          {board.map((row, rowIndex) => 
            row.map((_, colIndex) => renderSquare(rowIndex, colIndex))
          )}
        </div>
      </div>
      
      {/* Move history */}
      <div className="move-history">
        <h4>Move History:</h4>
        <div className="moves">
          {G.moveHistory.map((move, index) => (
            <div key={index} className="move">
              {Math.floor(index / 2) + 1}.{index % 2 === 0 ? '' : '..'}
              {move.piece}{move.from}-{move.to}{move.captured ? `x${move.captured}` : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Pawn promotion selector component
function PromotionSelector({ algebraic, color, onSelect }) {
  const promotionPieces = [PIECES.QUEEN, PIECES.ROOK, PIECES.BISHOP, PIECES.KNIGHT];
  
  return (
    <div className="promotion-selector">
      <h4>Promote to:</h4>
      {promotionPieces.map(pieceType => (
        <button
          key={pieceType}
          onClick={() => onSelect(algebraic, pieceType)}
          className="promotion-option"
        >
          {PIECE_SYMBOLS[color][pieceType]}
        </button>
      ))}
    </div>
  );
}

export default ChessBoard;
