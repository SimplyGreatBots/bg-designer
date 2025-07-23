import React from 'react';
import { Client } from 'boardgame.io/react';
import ChessGame from './Game';
import ChessBoard from './Board';
import './App.css';

console.log('App.js loaded');

/**
 * Chess App Component
 * Sets up boardgame.io Client with Chess game and Board component
 */

console.log('App.js loaded - creating boardgame.io client');
console.log('ChessGame object:', ChessGame);
console.log('ChessBoard component:', ChessBoard);

// Create the boardgame.io client
const ChessClient = Client({
  game: ChessGame,
  board: ChessBoard,
  debug: true // Enable debugging tools during development
});

console.log('ChessClient created:', ChessClient);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chess Game</h1>
        <p>Implementation using boardgame.io framework</p>
      </header>
      
      <main className="App-main">
        <ChessClient />
      </main>
      
      <footer className="App-footer">
        <p>Built with boardgame.io | Following FIDE Laws of Chess</p>
      </footer>
    </div>
  );
}

export default App;
