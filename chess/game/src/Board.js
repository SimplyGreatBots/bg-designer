import React from 'react';
import { PIECE_TYPES, COLORS } from './Game';
import './Board.css';

// Unicode chess piece symbols
const PIECE_SYMBOLS = {
  [COLORS.WHITE]: {
    [PIECE_TYPES.KING]: '♔',
    [PIECE_TYPES.QUEEN]: '♕',
    [PIECE_TYPES.ROOK]: '♖',
    [PIECE_TYPES.BISHOP]: '♗',
    [PIECE_TYPES.KNIGHT]: '♘',
    [PIECE_TYPES.PAWN]: '♙'
  },
  [COLORS.BLACK]: {
    [PIECE_TYPES.KING]: '♚',
    [PIECE_TYPES.QUEEN]: '♛',
    [PIECE_TYPES.ROOK]: '♜',
    [PIECE_TYPES.BISHOP]: '♝',
    [PIECE_TYPES.KNIGHT]: '♞',
    [PIECE_TYPES.PAWN]: '♟'
  }
};

const ChessBoard = ({ G, ctx, moves, playerID }) => {
  const currentPlayerColor = ctx.currentPlayer;
  const isCurrentPlayer = !playerID || playerID === currentPlayerColor;

  const onSquareClick = (row, col) => {
    if (!isCurrentPlayer) return;
    moves.selectSquare(row, col);
  };

  const renderSquare = (row, col) => {
    const piece = G.board[row][col];
    const isLight = (row + col) % 2 === 0;
    const isSelected = G.selectedSquare && G.selectedSquare.row === row && G.selectedSquare.col === col;
    const isPossibleMove = G.possibleMoves.some(move => move.row === row && move.col === col);
    const isLastMove = G.lastMove && 
      ((G.lastMove.from.row === row && G.lastMove.from.col === col) ||
       (G.lastMove.to.row === row && G.lastMove.to.col === col));

    let className = `square ${isLight ? 'light' : 'dark'}`;
    if (isSelected) className += ' selected';
    if (isPossibleMove) className += ' possible-move';
    if (isLastMove) className += ' last-move';

    return (
      <div
        key={`${row}-${col}`}
        className={className}
        onClick={() => onSquareClick(row, col)}
      >
        {piece && (
          <span className="piece">
            {PIECE_SYMBOLS[piece.color][piece.type]}
          </span>
        )}
        {isPossibleMove && !piece && <div className="move-indicator" />}
        <div className="coordinate">
          {String.fromCharCode(97 + col)}{8 - row}
        </div>
      </div>
    );
  };

  const renderGameStatus = () => {
    let statusText = '';
    let statusClass = '';

    switch (G.gameStatus) {
      case 'check':
        statusText = `${currentPlayerColor === COLORS.WHITE ? 'White' : 'Black'} is in check!`;
        statusClass = 'status-warning';
        break;
      case 'checkmate':
        statusText = `Checkmate! ${G.winner === COLORS.WHITE ? 'White' : 'Black'} wins!`;
        statusClass = 'status-victory';
        break;
      case 'stalemate':
        statusText = 'Stalemate! The game is a draw.';
        statusClass = 'status-draw';
        break;
      case 'draw':
        statusText = 'Draw agreed.';
        statusClass = 'status-draw';
        break;
      case 'resigned':
        statusText = `${G.winner === COLORS.WHITE ? 'White' : 'Black'} wins by resignation!`;
        statusClass = 'status-victory';
        break;
      default:
        statusText = `${currentPlayerColor === COLORS.WHITE ? 'White' : 'Black'} to move`;
        statusClass = 'status-normal';
    }

    return (
      <div className={`game-status ${statusClass}`}>
        {statusText}
      </div>
    );
  };

  const renderCapturedPieces = (color) => {
    const capturedPieces = G.capturedPieces[color];
    const colorName = color === COLORS.WHITE ? 'White' : 'Black';
    
    return (
      <div className={`captured-pieces captured-${color}`}>
        <h3>Captured {colorName} Pieces</h3>
        <div className="captured-list">
          {capturedPieces.map((piece, index) => (
            <span key={index} className="captured-piece">
              {PIECE_SYMBOLS[piece.color][piece.type]}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderControls = () => {
    if (!isCurrentPlayer || ctx.gameover) return null;

    return (
      <div className="game-controls">
        <button 
          onClick={() => moves.resign()}
          className="control-button resign-button"
        >
          Resign
        </button>
        <button 
          onClick={() => moves.offerDraw()}
          className="control-button draw-button"
        >
          Offer Draw
        </button>
      </div>
    );
  };

  return (
    <div className="chess-game">
      <div className="game-header">
        <h1>Chess</h1>
        {renderGameStatus()}
      </div>
      
      <div className="game-layout">
        <div className="board-section">
          <div className="chess-board">
            {Array(8).fill(null).map((_, row) => (
              <div key={row} className="board-row">
                {Array(8).fill(null).map((_, col) => renderSquare(row, col))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="sidebar">
          {renderCapturedPieces(COLORS.BLACK)}
          {renderCapturedPieces(COLORS.WHITE)}
          {renderControls()}
          
          <div className="game-info">
            <h3>Game Information</h3>
            <p>Turn: {ctx.turn}</p>
            <p>Phase: {ctx.phase}</p>
            {playerID && <p>You are: {playerID === COLORS.WHITE ? 'White' : 'Black'}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
