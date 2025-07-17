import React from 'react';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { ChessemonGame } from './Game';
import { ChessemonBoard } from './Board';
import './App.css';

// Create the boardgame.io client
const ChessemonClient = Client({
  game: ChessemonGame,
  board: ChessemonBoard,
  multiplayer: Local(),
  debug: process.env.NODE_ENV === 'development'
});

// Main App component
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🏁 Chessemon 🔮</h1>
        <p>A strategic board game combining chess-like movement with card-based evolution</p>
      </header>
      
      <main className="app-main">
        <div className="game-container">
          <div className="player-container">
            <h2>Player 1</h2>
            <ChessemonClient playerID="0" />
          </div>
          
          <div className="vs-divider">
            <div className="vs-text">VS</div>
          </div>
          
          <div className="player-container">
            <h2>Player 2</h2>
            <ChessemonClient playerID="1" />
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="game-rules-summary">
          <h3>Quick Rules:</h3>
          <div className="rules-grid">
            <div className="rule-item">
              <strong>Goal:</strong> Capture opponent's Kingmon ♔
            </div>
            <div className="rule-item">
              <strong>Pieces:</strong> Each has unique movement and abilities
            </div>
            <div className="rule-item">
              <strong>Cards:</strong> Move, Evolution, and Item cards
            </div>
            <div className="rule-item">
              <strong>Evolution:</strong> Upgrade Pawnmon with Evolution cards
            </div>
            <div className="rule-item">
              <strong>Combat:</strong> Attack adjacent enemies to deal damage
            </div>
            <div className="rule-item">
              <strong>Zones:</strong> Home zones (colored) and Battle zone (gray)
            </div>
          </div>
        </div>
        
        <div className="piece-reference">
          <h3>Piece Reference:</h3>
          <div className="pieces-grid">
            <div className="piece-ref">
              <span className="piece-icon">♔</span>
              <div>
                <strong>Kingmon</strong><br />
                HP: 3, ATK: 1<br />
                Moves like chess King
              </div>
            </div>
            <div className="piece-ref">
              <span className="piece-icon">♟</span>
              <div>
                <strong>Pawnmon</strong><br />
                HP: 1, ATK: 1<br />
                Moves forward, can evolve
              </div>
            </div>
            <div className="piece-ref">
              <span className="piece-icon">♘</span>
              <div>
                <strong>Knightmon</strong><br />
                HP: 2, ATK: 2<br />
                L-shaped movement
              </div>
            </div>
            <div className="piece-ref">
              <span className="piece-icon">♗</span>
              <div>
                <strong>Bishopmon</strong><br />
                HP: 2, ATK: 2<br />
                Diagonal movement
              </div>
            </div>
            <div className="piece-ref">
              <span className="piece-icon">♖</span>
              <div>
                <strong>Rookmon</strong><br />
                HP: 2, ATK: 2<br />
                Straight movement
              </div>
            </div>
            <div className="piece-ref">
              <span className="piece-icon">♕</span>
              <div>
                <strong>Queenmon</strong><br />
                HP: 3, ATK: 3<br />
                Any direction
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
