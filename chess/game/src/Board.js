/**
 * Chess Board React Component
 * 
 * Renders the chess board with pieces and handles user interactions.
 * Integrates with boardgame.io to display game state and dispatch moves.
 */

import React from 'react';
import './Board.css';

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

/**
 * Converts board coordinates to algebraic notation for display
 */
function coordsToAlgebraic(row, col) {
  const file = String.fromCharCode('a'.charCodeAt(0) + col);
  const rank = 8 - row;
  return file + rank;
}

/**
 * Individual chess square component
 */
function ChessSquare({ 
  piece, 
  isLight, 
  isSelected, 
  isValidMove, 
  isInCheck, 
  onClick, 
  coordinate 
}) {
  const getSquareClass = () => {
    let className = 'chess-square';
    className += isLight ? ' light' : ' dark';
    if (isSelected) className += ' selected';
    if (isValidMove) className += ' valid-move';
    if (isInCheck) className += ' in-check';
    return className;
  };

  const renderPiece = () => {
    if (!piece) return null;
    
    const symbol = PIECE_SYMBOLS[piece.color][piece.type];
    return (
      <span className={`piece ${piece.color}`} title={`${piece.color} ${piece.type}`}>
        {symbol}
      </span>
    );
  };

  return (
    <div 
      className={getSquareClass()}
      onClick={onClick}
      data-coordinate={coordinate}
    >
      <div className="coordinate-label">{coordinate}</div>
      {renderPiece()}
      {isValidMove && !piece && <div className="move-indicator" />}
    </div>
  );
}

/**
 * Game status display component
 */
function GameStatus({ ctx, G }) {
  const currentPlayer = ctx.currentPlayer === '0' ? 'White' : 'Black';
  
  if (ctx.gameover) {
    if (ctx.gameover.winner !== undefined) {
      const winner = ctx.gameover.winner === '0' ? 'White' : 'Black';
      return <div className="game-status checkmate">Checkmate! {winner} wins!</div>;
    } else if (ctx.gameover.draw) {
      return <div className="game-status draw">Game drawn!</div>;
    }
  }
  
  // Check for check status
  const isInCheck = checkIfInCheck(G.board, currentPlayer.toLowerCase());
  
  return (
    <div className="game-status">
      {isInCheck && <span className="check-indicator">Check! </span>}
      Current player: <strong>{currentPlayer}</strong>
      <div className="move-counter">
        Move {G.fullmoveNumber} • Half-moves: {G.halfmoveClock}/100
      </div>
    </div>
  );
}

/**
 * Simple check detection for UI display
 */
function checkIfInCheck(board, colorName) {
  // This is a simplified version for UI display
  // The actual game logic handles check detection
  return false; // Placeholder - would need to implement check detection logic
}

/**
 * Move history display component
 */
function MoveHistory({ G }) {
  const moves = G.moveHistory || [];
  
  return (
    <div className="move-history">
      <h3>Move History</h3>
      <div className="moves-list">
        {moves.length === 0 ? (
          <div className="no-moves">No moves yet</div>
        ) : (
          moves.map((move, index) => (
            <div key={index} className="move-entry">
              {Math.floor(index / 2) + 1}
              {index % 2 === 0 ? '. ' : '... '}
              {move.from} → {move.to}
              {move.moveType === 'castle' && ' (Castle)'}
              {move.moveType === 'enpassant' && ' (e.p.)'}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/**
 * Captured pieces display component
 */
function CapturedPieces({ G }) {
  const whitePieces = [];
  const blackPieces = [];
  
  // Count pieces on board to determine what's been captured
  const piecesOnBoard = {
    [COLORS.WHITE]: { [PIECES.PAWN]: 0, [PIECES.ROOK]: 0, [PIECES.KNIGHT]: 0, [PIECES.BISHOP]: 0, [PIECES.QUEEN]: 0, [PIECES.KING]: 0 },
    [COLORS.BLACK]: { [PIECES.PAWN]: 0, [PIECES.ROOK]: 0, [PIECES.KNIGHT]: 0, [PIECES.BISHOP]: 0, [PIECES.QUEEN]: 0, [PIECES.KING]: 0 }
  };
  
  // Count current pieces
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = G.board[row][col];
      if (piece) {
        piecesOnBoard[piece.color][piece.type]++;
      }
    }
  }
  
  // Starting piece counts
  const startingCounts = {
    [PIECES.PAWN]: 8, [PIECES.ROOK]: 2, [PIECES.KNIGHT]: 2, 
    [PIECES.BISHOP]: 2, [PIECES.QUEEN]: 1, [PIECES.KING]: 1
  };
  
  // Calculate captured pieces
  const capturedWhite = [];
  const capturedBlack = [];
  
  Object.keys(startingCounts).forEach(pieceType => {
    const whiteCaptured = startingCounts[pieceType] - piecesOnBoard[COLORS.WHITE][pieceType];
    const blackCaptured = startingCounts[pieceType] - piecesOnBoard[COLORS.BLACK][pieceType];
    
    for (let i = 0; i < whiteCaptured; i++) {
      capturedWhite.push(PIECE_SYMBOLS[COLORS.WHITE][pieceType]);
    }
    for (let i = 0; i < blackCaptured; i++) {
      capturedBlack.push(PIECE_SYMBOLS[COLORS.BLACK][pieceType]);
    }
  });
  
  return (
    <div className="captured-pieces">
      <div className="captured-section">
        <h4>Captured White Pieces</h4>
        <div className="captured-list">
          {capturedWhite.length === 0 ? 'None' : capturedWhite.join(' ')}
        </div>
      </div>
      <div className="captured-section">
        <h4>Captured Black Pieces</h4>
        <div className="captured-list">
          {capturedBlack.length === 0 ? 'None' : capturedBlack.join(' ')}
        </div>
      </div>
    </div>
  );
}

/**
 * Promotion dialog component
 */
function PromotionDialog({ isVisible, color, onPromote, onCancel }) {
  if (!isVisible) return null;
  
  const pieces = [PIECES.QUEEN, PIECES.ROOK, PIECES.BISHOP, PIECES.KNIGHT];
  
  return (
    <div className="promotion-dialog-overlay">
      <div className="promotion-dialog">
        <h3>Promote Pawn</h3>
        <p>Choose a piece to promote to:</p>
        <div className="promotion-options">
          {pieces.map(piece => (
            <button
              key={piece}
              className="promotion-option"
              onClick={() => onPromote(piece)}
              title={piece}
            >
              <span className="piece-large">
                {PIECE_SYMBOLS[color][piece]}
              </span>
              <span className="piece-name">{piece}</span>
            </button>
          ))}
        </div>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

/**
 * Main Chess Board component
 */
export default function ChessBoard(props) {
  const { G, ctx, moves } = props;
  
  // Safety check: don't render if essential props are missing
  if (!G || !ctx || !moves) {
    console.log('Missing props:', { G: !!G, ctx: !!ctx, moves: !!moves, allProps: props });
    return <div>Loading...</div>;
  }
  
  const [promotionDialog, setPromotionDialog] = React.useState({
    visible: false,
    row: null,
    col: null,
    color: null
  });
  
  // Check if a pawn needs promotion
  React.useEffect(() => {
    if (G.selectedSquare) {
      const piece = G.board[G.selectedSquare.row][G.selectedSquare.col];
      if (piece && piece.type === PIECES.PAWN) {
        const promotionRow = piece.color === COLORS.WHITE ? 0 : 7;
        // Check if any of the valid moves would result in promotion
        const promotionMove = G.validMoves.find(move => move.row === promotionRow);
        if (promotionMove) {
          // Note: This is simplified - in a real implementation, you'd handle promotion
          // after the move is made, not before
        }
      }
    }
  }, [G.selectedSquare, G.validMoves]);
  
  const handleSquareClick = (row, col) => {
    // In pass-and-play mode, anyone can make moves for the current player
    if (moves && moves.selectSquare) {
      moves.selectSquare(row, col);
    } else {
      console.error('moves.selectSquare is not available. Props:', { G, ctx, moves, playerID });
    }
  };
  
  const handlePromotion = (pieceType) => {
    moves.promotePawn(promotionDialog.row, promotionDialog.col, pieceType);
    setPromotionDialog({ visible: false, row: null, col: null, color: null });
  };
  
  const cancelPromotion = () => {
    setPromotionDialog({ visible: false, row: null, col: null, color: null });
  };
  
  const renderBoard = () => {
    const squares = [];
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = G.board[row][col];
        const isLight = (row + col) % 2 === 1;
        const isSelected = G.selectedSquare && 
                          G.selectedSquare.row === row && 
                          G.selectedSquare.col === col;
        const isValidMove = G.validMoves.some(move => 
                           move.row === row && move.col === col);
        const coordinate = coordsToAlgebraic(row, col);
        
        squares.push(
          <ChessSquare
            key={`${row}-${col}`}
            piece={piece}
            isLight={isLight}
            isSelected={isSelected}
            isValidMove={isValidMove}
            isInCheck={false} // Simplified for now
            onClick={() => handleSquareClick(row, col)}
            coordinate={coordinate}
          />
        );
      }
    }
    
    return squares;
  };
  
  return (
    <div className="chess-game">
      <div className="game-header">
        <h1>Chess</h1>
        <GameStatus ctx={ctx} G={G} />
      </div>
      
      <div className="game-content">
        <div className="board-container">
          <div className="chess-board">
            {renderBoard()}
          </div>
          
          <div className="board-labels">
            <div className="rank-labels">
              {[8, 7, 6, 5, 4, 3, 2, 1].map(rank => (
                <div key={rank} className="rank-label">{rank}</div>
              ))}
            </div>
            <div className="file-labels">
              {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(file => (
                <div key={file} className="file-label">{file}</div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="game-sidebar">
          <MoveHistory G={G} />
          <CapturedPieces G={G} />
          
          <div className="game-info">
            <div className="castling-rights">
              <h4>Castling Rights</h4>
              <div>White: K{G.castlingRights?.whiteKing ? '✓' : '✗'} Q{G.castlingRights?.whiteQueen ? '✓' : '✗'}</div>
              <div>Black: K{G.castlingRights?.blackKing ? '✓' : '✗'} Q{G.castlingRights?.blackQueen ? '✓' : '✗'}</div>
            </div>
            
            {G.enPassantTarget && (
              <div className="en-passant">
                <h4>En Passant Target</h4>
                <div>{G.enPassantTarget}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <PromotionDialog
        isVisible={promotionDialog.visible}
        color={promotionDialog.color}
        onPromote={handlePromotion}
        onCancel={cancelPromotion}
      />
    </div>
  );
}
