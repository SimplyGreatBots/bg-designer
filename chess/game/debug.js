// Simple debug test to understand the player/turn mechanics
const { Client } = require('boardgame.io/client');

// Since Game.js uses ES6 imports, we'll inline a simple version for testing
const { INVALID_MOVE } = require('boardgame.io/core');

const COLORS = {
  WHITE: '0',
  BLACK: '1'
};

// Simple game for testing
const TestGame = {
  name: 'test-chess',
  minPlayers: 1,
  maxPlayers: 2,
  setup: () => ({
    board: Array(8).fill(null).map(() => Array(8).fill(null))
  }),
  turn: {
    order: {
      first: () => 0,
      next: ({ ctx }) => (ctx.playOrderPos + 1) % ctx.numPlayers,
    },
  },
  moves: {
    testMove: ({ G, ctx }) => {
      console.log('In testMove - ctx.currentPlayer:', ctx.currentPlayer, 'type:', typeof ctx.currentPlayer);
      console.log('COLORS.WHITE:', COLORS.WHITE, 'type:', typeof COLORS.WHITE);
      console.log('Comparison result:', ctx.currentPlayer === COLORS.WHITE);
    }
  }
};

console.log('Testing chess game client...');

const client = Client({ game: TestGame });

const initialState = client.store.getState();
console.log('Initial state:');
console.log('- ctx.currentPlayer:', initialState.ctx.currentPlayer);
console.log('- ctx.currentPlayer type:', typeof initialState.ctx.currentPlayer);
console.log('- ctx.playOrder:', initialState.ctx.playOrder);
console.log('- ctx.turn:', initialState.ctx.turn);

console.log('\nTrying a move...');
try {
  client.moves.testMove();
} catch (error) {
  console.error('Error during moves:', error);
}
