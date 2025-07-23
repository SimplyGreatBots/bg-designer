import React from 'react';
import { Client } from 'boardgame.io/react';
import { ChessGame } from './Game';
import { ChessBoard } from './Board';
import './App.css';

// Create the boardgame.io client
const ChessClient = Client({
  game: ChessGame,
  board: ChessBoard,
  numPlayers: 2,
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chess Game</h1>
        <p>Built with boardgame.io following FIDE Laws of Chess</p>
      </header>
      
      <main className="App-main">
        <ChessClient playerID="0" />
      </main>
      
      <footer className="App-footer">
        <p>
          This chess implementation follows the official FIDE Laws of Chess and implements
          all standard rules including castling, en passant, pawn promotion, check, checkmate, and stalemate.
        </p>
      </footer>
    </div>
  );
}

export default App;
