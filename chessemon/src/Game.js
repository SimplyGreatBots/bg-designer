import { INVALID_MOVE } from 'boardgame.io/core';

// Chessemon piece types
const PIECE_TYPES = {
  KINGMON: 'kingmon',
  PAWNMON: 'pawnmon',
  KNIGHTMON: 'knightmon',
  BISHOPMON: 'bishopmon',
  ROOKMON: 'rookmon',
  QUEENMON: 'queenmon'
};

// Card types
const CARD_TYPES = {
  MOVE: 'move',
  EVOLUTION: 'evolution',
  ITEM: 'item'
};

// Board zones
const ZONES = {
  HOME_PLAYER_0: 'home_0',
  HOME_PLAYER_1: 'home_1',
  BATTLE: 'battle',
  BENCH: 'bench'
};

// Helper function to create a piece
function createPiece(type, player, hp = null, abilities = {}) {
  const pieceStats = {
    [PIECE_TYPES.KINGMON]: { maxHp: 3, atk: 1, mov: 'king' },
    [PIECE_TYPES.PAWNMON]: { maxHp: 1, atk: 1, mov: 'pawn' },
    [PIECE_TYPES.KNIGHTMON]: { maxHp: 2, atk: 2, mov: 'knight' },
    [PIECE_TYPES.BISHOPMON]: { maxHp: 2, atk: 2, mov: 'bishop' },
    [PIECE_TYPES.ROOKMON]: { maxHp: 2, atk: 2, mov: 'rook' },
    [PIECE_TYPES.QUEENMON]: { maxHp: 3, atk: 3, mov: 'queen' }
  };

  const stats = pieceStats[type];
  return {
    type,
    player,
    hp: hp !== null ? hp : stats.maxHp,
    maxHp: stats.maxHp,
    atk: stats.atk,
    mov: stats.mov,
    abilities: {
      ...abilities,
      hasUsedAbility: false,
      hasMoved: false,
      hasAttacked: false
    }
  };
}

// Helper function to create a card
function createCard(type, subtype, name, effect) {
  return { type, subtype, name, effect };
}

// Initialize the game board (10x4: 2x4 home zones + 4x4 battle zone + 2x4 home zone)
function createBoard() {
  const board = Array(4).fill(null).map(() => Array(10).fill(null));
  return board;
}

// Initialize starting deck
function createStartingDeck() {
  return [
    // Move cards
    createCard(CARD_TYPES.MOVE, 'dash', 'Dash', 'Move a Chessemon up to 2 extra squares'),
    createCard(CARD_TYPES.MOVE, 'strike', 'Strike', 'Attack an adjacent enemy for +1 ATK'),
    createCard(CARD_TYPES.MOVE, 'dash', 'Dash', 'Move a Chessemon up to 2 extra squares'),
    createCard(CARD_TYPES.MOVE, 'strike', 'Strike', 'Attack an adjacent enemy for +1 ATK'),
    createCard(CARD_TYPES.MOVE, 'dash', 'Dash', 'Move a Chessemon up to 2 extra squares'),
    createCard(CARD_TYPES.MOVE, 'strike', 'Strike', 'Attack an adjacent enemy for +1 ATK'),
    createCard(CARD_TYPES.MOVE, 'dash', 'Dash', 'Move a Chessemon up to 2 extra squares'),
    createCard(CARD_TYPES.MOVE, 'strike', 'Strike', 'Attack an adjacent enemy for +1 ATK'),
    createCard(CARD_TYPES.MOVE, 'dash', 'Dash', 'Move a Chessemon up to 2 extra squares'),
    createCard(CARD_TYPES.MOVE, 'strike', 'Strike', 'Attack an adjacent enemy for +1 ATK'),

    // Evolution cards
    createCard(CARD_TYPES.EVOLUTION, 'knightmon', 'Evolve to Knightmon', 'Evolve a Pawnmon into Knightmon'),
    createCard(CARD_TYPES.EVOLUTION, 'bishopmon', 'Evolve to Bishopmon', 'Evolve a Pawnmon into Bishopmon'),
    createCard(CARD_TYPES.EVOLUTION, 'rookmon', 'Evolve to Rookmon', 'Evolve a Pawnmon into Rookmon'),
    createCard(CARD_TYPES.EVOLUTION, 'queenmon', 'Evolve to Queenmon', 'Evolve a Pawnmon into Queenmon'),
    createCard(CARD_TYPES.EVOLUTION, 'knightmon', 'Evolve to Knightmon', 'Evolve a Pawnmon into Knightmon'),
    createCard(CARD_TYPES.EVOLUTION, 'bishopmon', 'Evolve to Bishopmon', 'Evolve a Pawnmon into Bishopmon'),
    createCard(CARD_TYPES.EVOLUTION, 'rookmon', 'Evolve to Rookmon', 'Evolve a Pawnmon into Rookmon'),
    createCard(CARD_TYPES.EVOLUTION, 'queenmon', 'Evolve to Queenmon', 'Evolve a Pawnmon into Queenmon'),
    createCard(CARD_TYPES.EVOLUTION, 'knightmon', 'Evolve to Knightmon', 'Evolve a Pawnmon into Knightmon'),
    createCard(CARD_TYPES.EVOLUTION, 'bishopmon', 'Evolve to Bishopmon', 'Evolve a Pawnmon into Bishopmon'),

    // Item cards
    createCard(CARD_TYPES.ITEM, 'potion', 'Potion', 'Restore 2 HP to any Chessemon'),
    createCard(CARD_TYPES.ITEM, 'shield', 'Shield', 'Prevent all damage to a Chessemon this turn'),
    createCard(CARD_TYPES.ITEM, 'potion', 'Potion', 'Restore 2 HP to any Chessemon'),
    createCard(CARD_TYPES.ITEM, 'shield', 'Shield', 'Prevent all damage to a Chessemon this turn'),
    createCard(CARD_TYPES.ITEM, 'potion', 'Potion', 'Restore 2 HP to any Chessemon'),
    createCard(CARD_TYPES.ITEM, 'shield', 'Shield', 'Prevent all damage to a Chessemon this turn'),
    createCard(CARD_TYPES.ITEM, 'potion', 'Potion', 'Restore 2 HP to any Chessemon'),
    createCard(CARD_TYPES.ITEM, 'shield', 'Shield', 'Prevent all damage to a Chessemon this turn'),
    createCard(CARD_TYPES.ITEM, 'potion', 'Potion', 'Restore 2 HP to any Chessemon'),
    createCard(CARD_TYPES.ITEM, 'shield', 'Shield', 'Prevent all damage to a Chessemon this turn')
  ];
}

// Setup initial game state
function setup({ random }) {
  const board = createBoard();
  
  // Place initial pieces for both players
  // Player 0 (bottom): Home zone columns 0-1
  // Player 1 (top): Home zone columns 8-9
  
  // Player 0 setup
  board[1][1] = createPiece(PIECE_TYPES.KINGMON, '0'); // Kingmon in center of home zone
  board[0][0] = createPiece(PIECE_TYPES.PAWNMON, '0');
  board[0][1] = createPiece(PIECE_TYPES.PAWNMON, '0');
  board[1][0] = createPiece(PIECE_TYPES.PAWNMON, '0');
  board[2][0] = createPiece(PIECE_TYPES.PAWNMON, '0');
  board[2][1] = createPiece(PIECE_TYPES.PAWNMON, '0');
  board[3][0] = createPiece(PIECE_TYPES.PAWNMON, '0');
  board[3][1] = createPiece(PIECE_TYPES.PAWNMON, '0');
  
  // Player 1 setup
  board[1][8] = createPiece(PIECE_TYPES.KINGMON, '1'); // Kingmon in center of home zone
  board[0][8] = createPiece(PIECE_TYPES.PAWNMON, '1');
  board[0][9] = createPiece(PIECE_TYPES.PAWNMON, '1');
  board[1][9] = createPiece(PIECE_TYPES.PAWNMON, '1');
  board[2][8] = createPiece(PIECE_TYPES.PAWNMON, '1');
  board[2][9] = createPiece(PIECE_TYPES.PAWNMON, '1');
  board[3][8] = createPiece(PIECE_TYPES.PAWNMON, '1');
  board[3][9] = createPiece(PIECE_TYPES.PAWNMON, '1');

  // Initialize decks and hands
  const deck0 = random.Shuffle(createStartingDeck());
  const deck1 = random.Shuffle(createStartingDeck());
  
  return {
    board,
    players: {
      '0': {
        deck: deck0.slice(5), // Remove starting hand from deck
        hand: deck0.slice(0, 5), // Starting hand of 5 cards
        bench: [],
        hasUsedRoyalCommand: false
      },
      '1': {
        deck: deck1.slice(5),
        hand: deck1.slice(0, 5),
        bench: [],
        hasUsedRoyalCommand: false
      }
    },
    turnEffects: [], // Active temporary effects
    gamePhase: 'main'
  };
}

// Helper function to get piece at position
function getPieceAt(G, row, col) {
  if (row < 0 || row >= 4 || col < 0 || col >= 10) return null;
  return G.board[row][col];
}

// Helper function to check if position is valid
function isValidPosition(row, col) {
  return row >= 0 && row < 4 && col >= 0 && col < 10;
}

// Helper function to check if a piece can move to a position
function canMoveTo(G, fromRow, fromCol, toRow, toCol, piece) {
  if (!isValidPosition(toRow, toCol)) return false;
  
  const targetPiece = getPieceAt(G, toRow, toCol);
  if (targetPiece && targetPiece.player === piece.player) return false;
  
  const dx = toCol - fromCol;
  const dy = toRow - fromRow;
  
  switch (piece.mov) {
    case 'king':
      return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
    case 'pawn':
      // Pawn moves forward (toward opponent)
      const direction = piece.player === '0' ? 1 : -1;
      if (dx === 0 && dy === direction) return !targetPiece; // Forward move
      if (Math.abs(dx) === 1 && dy === direction && targetPiece) return true; // Capture
      // First move can be 2 squares
      if (dx === 0 && dy === 2 * direction && !piece.abilities.hasMoved && !targetPiece) {
        return !getPieceAt(G, fromRow + direction, fromCol);
      }
      return false;
    case 'knight':
      return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2);
    case 'bishop':
      if (Math.abs(dx) !== Math.abs(dy)) return false;
      return isPathClear(G, fromRow, fromCol, toRow, toCol);
    case 'rook':
      if (dx !== 0 && dy !== 0) return false;
      return isPathClear(G, fromRow, fromCol, toRow, toCol);
    case 'queen':
      if (dx !== 0 && dy !== 0 && Math.abs(dx) !== Math.abs(dy)) return false;
      return isPathClear(G, fromRow, fromCol, toRow, toCol);
    default:
      return false;
  }
}

// Helper function to check if path is clear (for sliding pieces)
function isPathClear(G, fromRow, fromCol, toRow, toCol) {
  const dx = Math.sign(toCol - fromCol);
  const dy = Math.sign(toRow - fromRow);
  
  let currentRow = fromRow + dy;
  let currentCol = fromCol + dx;
  
  while (currentRow !== toRow || currentCol !== toCol) {
    if (getPieceAt(G, currentRow, currentCol)) return false;
    currentRow += dy;
    currentCol += dx;
  }
  
  return true;
}

// Move function
const movePiece = ({ G, ctx, playerID }, fromRow, fromCol, toRow, toCol) => {
  const piece = getPieceAt(G, fromRow, fromCol);
  
  if (!piece || piece.player !== playerID) return INVALID_MOVE;
  if (piece.abilities.hasMoved) return INVALID_MOVE;
  if (!canMoveTo(G, fromRow, fromCol, toRow, toCol, piece)) return INVALID_MOVE;
  
  const targetPiece = getPieceAt(G, toRow, toCol);
  
  // Capture enemy piece
  if (targetPiece && targetPiece.player !== playerID) {
    G.players[targetPiece.player].bench.push(targetPiece);
  }
  
  // Move piece
  G.board[toRow][toCol] = { ...piece, abilities: { ...piece.abilities, hasMoved: true } };
  G.board[fromRow][fromCol] = null;
};

// Attack function
const attackWithPiece = ({ G, ctx, playerID }, fromRow, fromCol, targetRow, targetCol) => {
  const attacker = getPieceAt(G, fromRow, fromCol);
  const target = getPieceAt(G, targetRow, targetCol);
  
  if (!attacker || attacker.player !== playerID) return INVALID_MOVE;
  if (!target || target.player === playerID) return INVALID_MOVE;
  if (attacker.abilities.hasAttacked) return INVALID_MOVE;
  
  // Check if target is adjacent (unless special ability)
  const dx = Math.abs(targetCol - fromCol);
  const dy = Math.abs(targetRow - fromRow);
  if (dx > 1 || dy > 1) return INVALID_MOVE;
  
  // Apply damage
  const damage = attacker.atk;
  const newHp = target.hp - damage;
  
  if (newHp <= 0) {
    // Piece is captured
    G.players[target.player].bench.push(target);
    G.board[targetRow][targetCol] = null;
  } else {
    // Piece takes damage
    G.board[targetRow][targetCol] = { ...target, hp: newHp };
  }
  
  // Mark attacker as having attacked
  G.board[fromRow][fromCol] = { 
    ...attacker, 
    abilities: { ...attacker.abilities, hasAttacked: true } 
  };
};

// Play card function
const playCard = ({ G, ctx, playerID }, cardIndex, targetRow, targetCol, ...args) => {
  const player = G.players[playerID];
  if (cardIndex < 0 || cardIndex >= player.hand.length) return INVALID_MOVE;
  
  const card = player.hand[cardIndex];
  
  // Remove card from hand
  player.hand.splice(cardIndex, 1);
  
  // Apply card effect
  switch (card.type) {
    case CARD_TYPES.MOVE:
      if (card.subtype === 'dash') {
        // Grant extra movement to target piece
        const piece = getPieceAt(G, targetRow, targetCol);
        if (piece && piece.player === playerID) {
          piece.abilities.extraMovement = (piece.abilities.extraMovement || 0) + 2;
        }
      } else if (card.subtype === 'strike') {
        // Grant attack bonus
        const piece = getPieceAt(G, targetRow, targetCol);
        if (piece && piece.player === playerID) {
          piece.abilities.attackBonus = (piece.abilities.attackBonus || 0) + 1;
        }
      }
      break;
      
    case CARD_TYPES.EVOLUTION:
      const pawn = getPieceAt(G, targetRow, targetCol);
      if (pawn && pawn.type === PIECE_TYPES.PAWNMON && pawn.player === playerID) {
        if (!pawn.abilities.hasEvolved) {
          const newType = PIECE_TYPES[card.subtype.toUpperCase()];
          const evolvedPiece = createPiece(newType, playerID, pawn.hp);
          evolvedPiece.abilities.hasEvolved = true;
          G.board[targetRow][targetCol] = evolvedPiece;
        }
      }
      break;
      
    case CARD_TYPES.ITEM:
      if (card.subtype === 'potion') {
        const piece = getPieceAt(G, targetRow, targetCol);
        if (piece && piece.player === playerID) {
          piece.hp = Math.min(piece.maxHp, piece.hp + 2);
        }
      } else if (card.subtype === 'shield') {
        const piece = getPieceAt(G, targetRow, targetCol);
        if (piece && piece.player === playerID) {
          piece.abilities.shielded = true;
        }
      }
      break;
  }
};

// Draw card at start of turn
const drawCard = ({ G, ctx }) => {
  const player = G.players[ctx.currentPlayer];
  if (player.deck.length > 0) {
    const card = player.deck.pop();
    player.hand.push(card);
    
    // Discard down to 7 if hand is too large
    while (player.hand.length > 7) {
      player.hand.shift(); // Remove first card
    }
  }
};

// Reset piece abilities for new turn
const resetTurnAbilities = ({ G, ctx }) => {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 10; col++) {
      const piece = G.board[row][col];
      if (piece && piece.player === ctx.currentPlayer) {
        piece.abilities.hasMoved = false;
        piece.abilities.hasAttacked = false;
        piece.abilities.hasEvolved = false;
        piece.abilities.shielded = false;
        piece.abilities.extraMovement = 0;
        piece.abilities.attackBonus = 0;
      }
    }
  }
};

// Check for win condition
const checkWinCondition = ({ G, ctx }) => {
  // Check if any player's Kingmon is captured
  let player0HasKing = false;
  let player1HasKing = false;
  
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 10; col++) {
      const piece = G.board[row][col];
      if (piece && piece.type === PIECE_TYPES.KINGMON) {
        if (piece.player === '0') player0HasKing = true;
        if (piece.player === '1') player1HasKing = true;
      }
    }
  }
  
  if (!player0HasKing) return { winner: '1' };
  if (!player1HasKing) return { winner: '0' };
  
  // Check if player cannot draw (deck empty)
  const currentPlayer = G.players[ctx.currentPlayer];
  if (currentPlayer.deck.length === 0 && currentPlayer.hand.length === 0) {
    return { winner: ctx.currentPlayer === '0' ? '1' : '0' };
  }
  
  return false;
};

// Chessemon Game Definition
export const ChessemonGame = {
  name: 'chessemon',
  
  setup,
  
  moves: {
    movePiece,
    attackWithPiece,
    playCard
  },
  
  turn: {
    onBegin: ({ G, ctx, events }) => {
      drawCard({ G, ctx });
      resetTurnAbilities({ G, ctx });
    },
    
    endIf: ({ G, ctx }) => checkWinCondition({ G, ctx }),
    
    onEnd: ({ G, ctx }) => {
      // Clean up end-of-turn effects
      const player = G.players[ctx.currentPlayer];
      while (player.hand.length > 7) {
        player.hand.shift();
      }
    }
  },
  
  endIf: ({ G, ctx }) => checkWinCondition({ G, ctx }),
  
  minPlayers: 2,
  maxPlayers: 2
};
