import React from 'react';
import './Board.css';

// Chess piece Unicode symbols
const PIECE_SYMBOLS = {
  white: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙'
  },
  black: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
  }
};

// Convert array indices to chess notation
function getSquareNotation(row, col) {
  const files = 'abcdefgh';
  const ranks = '87654321';
  return files[col] + ranks[row];
}

// Get valid moves for selected piece (helper for highlighting)
function getValidMovesForSquare(G, row, col) {
  if (!G.selectedSquare) return [];
  
  const { row: selectedRow, col: selectedCol } = G.selectedSquare;
  if (selectedRow !== row || selectedCol !== col) return [];
  
  // This would need the actual getValidMoves function from Game.js
  // For now, return empty array - moves will be validated server-side
  return [];
}

function ChessSquare({ piece, isLight, isSelected, isValidMove, onClick, notation }) {
  const squareClass = [
    'chess-square',
    isLight ? 'light' : 'dark',
    isSelected ? 'selected' : '',
    isValidMove ? 'valid-move' : ''
  ].filter(Boolean).join(' ');

  const pieceSymbol = piece ? PIECE_SYMBOLS[piece.color][piece.type] : '';

  return (
    <button className={squareClass} onClick={onClick} title={notation}>
      <span className="piece-symbol">{pieceSymbol}</span>
      <span className="square-notation">{notation}</span>
    </button>
  );
}

function GameStatus({ ctx, G }) {
  const currentPlayer = ctx.currentPlayer === '0' ? 'White' : 'Black';
  
  if (ctx.gameover) {
    if (ctx.gameover.winner) {
      const winner = ctx.gameover.winner === '0' ? 'White' : 'Black';
      return <div className="game-status checkmate">Checkmate! {winner} wins!</div>;
    } else if (ctx.gameover.draw) {
      return <div className="game-status draw">Game drawn!</div>;
    }
  }
  
  // Check if current player is in check
  const playerColor = ctx.currentPlayer === '0' ? 'white' : 'black';
  // We'd need to import the isInCheck function from Game.js for this
  // For now, just show current turn
  
  return (
    <div className="game-status">
      <div className="current-turn">{currentPlayer} to move</div>
      <div className="move-counter">Move {G.fullMoveNumber}</div>
    </div>
  );
}

function CapturedPieces({ G }) {
  // Calculate captured pieces
  const allPieces = {
    white: { king: 1, queen: 1, rook: 2, bishop: 2, knight: 2, pawn: 8 },
    black: { king: 1, queen: 1, rook: 2, bishop: 2, knight: 2, pawn: 8 }
  };
  
  const remainingPieces = { white: {}, black: {} };
  
  // Count remaining pieces on board
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = G.board[row][col];
      if (piece) {
        remainingPieces[piece.color][piece.type] = (remainingPieces[piece.color][piece.type] || 0) + 1;
      }
    }
  }
  
  // Calculate captured pieces
  const captured = { white: [], black: [] };
  
  for (const color of ['white', 'black']) {
    for (const [type, count] of Object.entries(allPieces[color])) {
      const remaining = remainingPieces[color][type] || 0;
      const capturedCount = count - remaining;
      
      for (let i = 0; i < capturedCount; i++) {
        captured[color].push(type);
      }
    }
  }
  
  return (
    <div className="captured-pieces">
      <div className="captured-section">
        <h4>Captured White Pieces</h4>
        <div className="captured-list">
          {captured.white.map((type, index) => (
            <span key={index} className="captured-piece">
              {PIECE_SYMBOLS.white[type]}
            </span>
          ))}
        </div>
      </div>
      <div className="captured-section">
        <h4>Captured Black Pieces</h4>
        <div className="captured-list">
          {captured.black.map((type, index) => (
            <span key={index} className="captured-piece">
              {PIECE_SYMBOLS.black[type]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MoveHistory({ G }) {
  const { moveHistory } = G;
  
  // Group moves by pairs (white and black)
  const movePairs = [];
  for (let i = 0; i < moveHistory.length; i += 2) {
    const whiteMove = moveHistory[i];
    const blackMove = moveHistory[i + 1];
    movePairs.push({ white: whiteMove, black: blackMove });
  }
  
  return (
    <div className="move-history">
      <h4>Move History</h4>
      <div className="move-list">
        {movePairs.map((pair, index) => (
          <div key={index} className="move-pair">
            <span className="move-number">{index + 1}.</span>
            <span className="white-move">
              {pair.white ? formatMove(pair.white) : ''}
            </span>
            <span className="black-move">
              {pair.black ? formatMove(pair.black) : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatMove(move) {
  const files = 'abcdefgh';
  const ranks = '87654321';
  
  const fromSquare = files[move.from.col] + ranks[move.from.row];
  const toSquare = files[move.to.col] + ranks[move.to.row];
  
  // Basic algebraic notation (simplified)
  const pieceSymbol = move.piece === 'pawn' ? '' : move.piece.charAt(0).toUpperCase();
  return `${pieceSymbol}${fromSquare}-${toSquare}`;
}

export function ChessBoard({ G, ctx, moves, playerID, isActive }) {
  if (!G || !G.board) {
    return <div>Loading...</div>;
  }

  const handleSquareClick = (row, col) => {
    if (!isActive) return;
    
    // Use the selectSquare move which handles both selection and moving
    moves.selectSquare(row, col);
  };

  const selectedSquare = G.selectedSquare;
  
  return (
    <div className="chess-game">
      <div className="game-header">
        <h2>Chess</h2>
        <GameStatus ctx={ctx} G={G} />
      </div>
      
      <div className="game-layout">
        <div className="board-section">
          <div className="chess-board">
            {G.board.map((row, rowIndex) =>
              row.map((piece, colIndex) => {
                const isLight = (rowIndex + colIndex) % 2 === 0;
                const isSelected = selectedSquare && 
                  selectedSquare.row === rowIndex && 
                  selectedSquare.col === colIndex;
                const notation = getSquareNotation(rowIndex, colIndex);
                
                return (
                  <ChessSquare
                    key={`${rowIndex}-${colIndex}`}
                    piece={piece}
                    isLight={isLight}
                    isSelected={isSelected}
                    isValidMove={false} // Will be implemented with move validation
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    notation={notation}
                  />
                );
              })
            )}
          </div>
          
          <div className="board-coordinates">
            <div className="files">
              {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(file => (
                <span key={file} className="file-label">{file}</span>
              ))}
            </div>
            <div className="ranks">
              {['8', '7', '6', '5', '4', '3', '2', '1'].map(rank => (
                <span key={rank} className="rank-label">{rank}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="game-sidebar">
          <CapturedPieces G={G} />
          <MoveHistory G={G} />
          
          <div className="game-controls">
            <button className="resign-button" onClick={() => {
              if (window.confirm('Are you sure you want to resign?')) {
                // In a real implementation, this would call a resign move
                console.log('Player resigned');
              }
            }}>
              Resign
            </button>
            
            <button className="draw-button" onClick={() => {
              // In a real implementation, this would offer/accept a draw
              console.log('Draw offered');
            }}>
              Offer Draw
            </button>
          </div>
          
          <div className="game-info">
            <div className="player-info">
              <div className={`player ${ctx.currentPlayer === '0' ? 'active' : ''}`}>
                <span className="player-color">♔</span>
                <span className="player-name">White</span>
              </div>
              <div className={`player ${ctx.currentPlayer === '1' ? 'active' : ''}`}>
                <span className="player-color">♚</span>
                <span className="player-name">Black</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
