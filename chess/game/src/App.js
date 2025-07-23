/**
 * Chess App - Main Application Component
 * 
 * Sets up the boardgame.io client and renders the chess game.
 * Handles multiplayer configuration and game state management.
 */

import React from 'react';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import ChessGame from './Game';
import ChessBoard from './Board';
import './App.css';

/**
 * Local multiplayer client for Chess
 * Allows two players to play on the same device
 */
const ChessClient = Client({
  game: ChessGame,
  board: ChessBoard,
  // multiplayer: Local(), // Temporarily remove this to test basic client
  debug: process.env.NODE_ENV === 'development'
});

/**
 * Game lobby component for player setup
 */
function GameLobby({ onStartGame }) {
  return (
    <div className="game-lobby">
      <div className="lobby-container">
        <h1>Chess Game</h1>
        <p>Welcome to Chess! This implementation follows the official FIDE Laws of Chess.</p>
        
        <div className="game-features">
          <h3>Features:</h3>
          <ul>
            <li>✓ Complete chess rules implementation</li>
            <li>✓ All piece movements and captures</li>
            <li>✓ Special moves: Castling, En Passant, Pawn Promotion</li>
            <li>✓ Check, Checkmate, and Stalemate detection</li>
            <li>✓ Draw conditions (50-move rule, insufficient material)</li>
            <li>✓ Move history and game status tracking</li>
            <li>✓ Interactive board with move validation</li>
          </ul>
        </div>
        
        <div className="lobby-actions">
          <button 
            className="start-game-button"
            onClick={onStartGame}
          >
            Start Local Game
          </button>
          <p className="game-note">
            Players will alternate turns on the same device.<br/>
            White moves first.
          </p>
        </div>
        
        <div className="how-to-play">
          <h3>How to Play:</h3>
          <ol>
            <li>Click on a piece to select it</li>
            <li>Valid moves will be highlighted in green</li>
            <li>Click on a highlighted square to move</li>
            <li>The goal is to checkmate your opponent's king</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

/**
 * Main App component
 */
function App() {
  const [gameStarted, setGameStarted] = React.useState(false);
  const [matchID] = React.useState('chess-game-local');
  
  const startGame = () => {
    setGameStarted(true);
  };
  
  const resetGame = () => {
    setGameStarted(false);
    // Force re-render by changing the key
    window.location.reload();
  };
  
  if (!gameStarted) {
    return <GameLobby onStartGame={startGame} />;
  }
  
  return (
    <div className="app">
      <div className="game-header-controls">
        <button 
          className="reset-button"
          onClick={resetGame}
          title="Start a new game"
        >
          New Game
        </button>
      </div>
      
      <div className="game-container">
        <div className="single-board-container">
          <h3>Chess Game - Pass and Play</h3>
          <p className="current-player-info">
            Current Turn: {/* We'll add this info in the Board component */}
          </p>
          <ChessClient />
        </div>
      </div>
      
      <div className="game-footer">
        <p>
          Built with boardgame.io • Following FIDE Laws of Chess
        </p>
      </div>
    </div>
  );
}

export default App;
