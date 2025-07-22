import React from 'react';
import { Client } from 'boardgame.io/react';
import { Chess } from './Game';
import ChessBoard from './Board';

// Create the boardgame.io client
const ChessClient = Client({
  game: Chess,
  board: ChessBoard,
  debug: true // Set to false in production
});

const App = () => {
  return (
    <div className="app">
      <ChessClient />
    </div>
  );
};

export default App;
