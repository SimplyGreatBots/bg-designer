import React, { useState } from 'react';
import './Board.css';

// Piece icon mapping
const PIECE_ICONS = {
  kingmon: '♔',
  pawnmon: '♟',
  knightmon: '♘',
  bishopmon: '♗',
  rookmon: '♖',
  queenmon: '♕'
};

// Board component for Chessemon
export function ChessemonBoard({ G, ctx, moves, playerID, isActive }) {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardDetails, setShowCardDetails] = useState(false);

  // Handle square click
  const handleSquareClick = (row, col) => {
    const piece = G.board[row][col];
    
    if (selectedCard) {
      // Playing a card on a target
      moves.playCard(selectedCard, row, col);
      setSelectedCard(null);
      return;
    }
    
    if (selectedPiece) {
      const [fromRow, fromCol] = selectedPiece;
      const fromPiece = G.board[fromRow][fromCol];
      
      if (piece && piece.player !== playerID) {
        // Attack enemy piece
        moves.attackWithPiece(fromRow, fromCol, row, col);
      } else {
        // Move piece
        moves.movePiece(fromRow, fromCol, row, col);
      }
      setSelectedPiece(null);
    } else if (piece && piece.player === playerID && isActive) {
      // Select piece to move
      setSelectedPiece([row, col]);
    }
  };

  // Handle card click
  const handleCardClick = (cardIndex) => {
    if (selectedCard === cardIndex) {
      setSelectedCard(null);
    } else {
      setSelectedCard(cardIndex);
      setSelectedPiece(null);
    }
  };

  // Render a board square
  const renderSquare = (row, col) => {
    const piece = G.board[row][col];
    const isSelected = selectedPiece && selectedPiece[0] === row && selectedPiece[1] === col;
    const isEnemyTarget = selectedPiece && piece && piece.player !== playerID;
    const isCardTarget = selectedCard !== null;
    
    // Determine zone
    let zoneClass = 'battle-zone';
    if (col <= 1) zoneClass = 'home-zone-0';
    if (col >= 8) zoneClass = 'home-zone-1';
    
    return (
      <div
        key={`${row}-${col}`}
        className={`square ${zoneClass} ${isSelected ? 'selected' : ''} ${isEnemyTarget ? 'enemy-target' : ''} ${isCardTarget ? 'card-target' : ''}`}
        onClick={() => handleSquareClick(row, col)}
      >
        {piece && (
          <div className={`piece player-${piece.player} ${piece.abilities?.hasMoved ? 'moved' : ''} ${piece.abilities?.hasAttacked ? 'attacked' : ''}`}>
            <div className="piece-icon">
              {PIECE_ICONS[piece.type]}
            </div>
            <div className="piece-hp">
              {piece.hp}/{piece.maxHp}
            </div>
            {piece.abilities?.shielded && <div className="shield-indicator">🛡</div>}
            {piece.abilities?.attackBonus > 0 && <div className="attack-bonus">+{piece.abilities.attackBonus}</div>}
          </div>
        )}
        <div className="square-coords">{row},{col}</div>
      </div>
    );
  };

  // Render a card
  const renderCard = (card, index) => {
    const isSelected = selectedCard === index;
    return (
      <div
        key={index}
        className={`card ${card.type} ${isSelected ? 'selected' : ''}`}
        onClick={() => handleCardClick(index)}
        onMouseEnter={() => setShowCardDetails(card)}
        onMouseLeave={() => setShowCardDetails(false)}
      >
        <div className="card-name">{card.name}</div>
        <div className="card-type">{card.type}</div>
      </div>
    );
  };

  // Get current player data
  const currentPlayerData = G.players[playerID] || { hand: [], bench: [], deck: [] };
  const opponentID = playerID === '0' ? '1' : '0';
  const opponentData = G.players[opponentID] || { hand: [], bench: [], deck: [] };

  return (
    <div className="chessemon-board">
      {/* Game info header */}
      <div className="game-info">
        <div className="turn-info">
          <h3>Turn: Player {parseInt(ctx.currentPlayer) + 1}</h3>
          <p>Phase: {ctx.phase || 'Main'}</p>
          {isActive && <p className="active-indicator">Your Turn!</p>}
        </div>
        
        {/* Opponent info */}
        <div className="opponent-info">
          <h4>Opponent (Player {parseInt(opponentID) + 1})</h4>
          <p>Cards in hand: {opponentData.hand.length}</p>
          <p>Cards in deck: {opponentData.deck.length}</p>
          <p>Pieces on bench: {opponentData.bench.length}</p>
        </div>
      </div>

      {/* Main board */}
      <div className="board-container">
        <div className="board">
          {G.board.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
            </div>
          ))}
        </div>
      </div>

      {/* Player's hand */}
      <div className="player-area">
        <div className="player-info">
          <h4>Your Area (Player {parseInt(playerID) + 1})</h4>
          <p>Cards in hand: {currentPlayerData.hand.length}/7</p>
          <p>Cards in deck: {currentPlayerData.deck.length}</p>
          <p>Pieces on bench: {currentPlayerData.bench.length}</p>
        </div>
        
        <div className="hand">
          <h4>Your Hand:</h4>
          <div className="cards">
            {currentPlayerData.hand.map((card, index) => renderCard(card, index))}
          </div>
        </div>

        {/* Bench */}
        {currentPlayerData.bench.length > 0 && (
          <div className="bench">
            <h4>Your Bench:</h4>
            <div className="bench-pieces">
              {currentPlayerData.bench.map((piece, index) => (
                <div key={index} className={`benched-piece player-${piece.player}`}>
                  <span className="piece-icon">{PIECE_ICONS[piece.type]}</span>
                  <span className="piece-hp">{piece.hp}/{piece.maxHp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card details popup */}
      {showCardDetails && (
        <div className="card-details-popup">
          <h4>{showCardDetails.name}</h4>
          <p><strong>Type:</strong> {showCardDetails.type}</p>
          <p><strong>Effect:</strong> {showCardDetails.effect}</p>
        </div>
      )}

      {/* Instructions */}
      <div className="instructions">
        <h4>How to Play:</h4>
        <ul>
          <li>Click a piece to select it, then click a square to move/attack</li>
          <li>Click a card to select it, then click a target to play the card</li>
          <li>Goal: Capture the opponent's Kingmon (♔)</li>
          <li>Each piece can move/attack once per turn</li>
          <li>Pawnmon can evolve using Evolution cards</li>
        </ul>
      </div>

      {/* Game state debugging (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <details>
            <summary>Debug Info</summary>
            <pre>{JSON.stringify({ selectedPiece, selectedCard, isActive, currentPlayer: ctx.currentPlayer }, null, 2)}</pre>
          </details>
        </div>
      )}
    </div>
  );
}
