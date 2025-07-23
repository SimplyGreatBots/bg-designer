# Chess Game - boardgame.io Implementation

A complete Chess implementation using the boardgame.io framework, following FIDE Laws of Chess.

## Features

### Complete Chess Rules Implementation
- ✅ All piece movements (Pawn, Rook, Bishop, Knight, Queen, King)
- ✅ Special moves: Castling, En passant, Pawn promotion
- ✅ Check and checkmate detection
- ✅ Stalemate and draw conditions
- ✅ Move validation and legal move generation
- ✅ King safety enforcement

### Interactive UI
- ✅ Click to select and move pieces
- ✅ Visual move highlighting
- ✅ Check indicator with animation
- ✅ Promotion piece selection
- ✅ Game status display
- ✅ Move history tracking
- ✅ Castling rights display

### Game Management
- ✅ Turn-based gameplay (White goes first)
- ✅ Game end detection (checkmate, stalemate, resignation)
- ✅ Draw offers and resignation
- ✅ Full move and half-move counters
- ✅ En passant target tracking

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Game Controls

### Basic Movement
1. Click on a piece to select it (highlighted in blue)
2. Click on a valid destination square to move
3. Valid moves are highlighted with green dots
4. Click the same piece again to deselect

### Special Moves

**Castling:**
- King and rook must not have moved
- No pieces between king and rook
- King cannot be in check, pass through check, or end in check
- Click king, then click two squares toward the rook

**En Passant:**
- Available immediately after opponent's pawn moves two squares
- Click your pawn, then click diagonally to the square the opponent's pawn passed through

**Pawn Promotion:**
- When pawn reaches the end rank, promotion options appear
- Click desired piece type (Queen, Rook, Bishop, Knight)

**Draw and Resignation:**
- Use "Offer Draw" button for mutual agreement
- Use "Resign" button to forfeit the game

## Game Rules Implementation

This implementation follows the FIDE Laws of Chess exactly:

### Piece Movement
- **Pawn:** Forward one square, or two from starting position; captures diagonally
- **Rook:** Any number of squares horizontally or vertically
- **Bishop:** Any number of squares diagonally
- **Knight:** L-shape: 2+1 or 1+2 squares
- **Queen:** Combination of rook and bishop movement
- **King:** One square in any direction

### Special Rules
- **Check:** King under attack must be resolved immediately
- **Checkmate:** King under attack with no legal moves
- **Stalemate:** No legal moves but king not in check
- **En Passant:** Special pawn capture rule
- **Castling:** King and rook special move
- **Promotion:** Pawn reaching end rank becomes any piece except king

### Draw Conditions
- Stalemate
- Insufficient material
- Mutual agreement
- Threefold repetition (implementation ready)
- 50-move rule (implementation ready)

## Technical Architecture

### boardgame.io Integration
- **Game State (G):** Board position, castling rights, en passant, move counters
- **Context (ctx):** Current player, turn number, game status
- **Moves:** selectSquare, promotePawn, offerDraw, resign
- **Events:** endTurn, endGame automatically handled
- **Turn Order:** Alternating between White (player '0') and Black (player '1')

### Code Structure
```
src/
├── Game.js      # boardgame.io game logic and rules
├── Board.js     # React UI component
├── App.js       # Main application setup
├── index.js     # Entry point
├── Board.css    # Styling for chess board
├── App.css      # General application styling
└── setupTests.js # Test configuration
```

### Key Functions
- `initializeBoard()` - Sets up standard chess starting position
- `isValidMove()` - Validates moves according to piece rules
- `isInCheck()` - Detects check conditions
- `getAllLegalMoves()` - Generates all legal moves for a player
- `getGameEndCondition()` - Checks for checkmate, stalemate, draws

## Development

### Running Tests
```bash
npm test
```

### Code Quality
- ESLint configuration for code style
- React best practices
- boardgame.io framework patterns
- Comprehensive move validation
- Immutable state management

### Debugging
- boardgame.io debug mode enabled in development
- Console logging for move validation
- Visual indicators for game state
- Move history tracking

## Customization

### Adding Features
- **Time Control:** Use boardgame.io's built-in turn timer
- **Multiplayer:** Add boardgame.io server for online play
- **AI Opponent:** Implement computer player using minimax
- **Chess Variants:** Extend rules for Chess960, King of the Hill, etc.
- **Move Notation:** Add algebraic notation for moves
- **Game Analysis:** Add position evaluation and move suggestions

### Styling
- Modify `Board.css` for different board themes
- Change piece symbols in `PIECE_SYMBOLS` constant
- Add animations and transitions
- Responsive design already included

## Resources

- [boardgame.io Documentation](https://boardgame.io/)
- [FIDE Laws of Chess](https://www.fide.com/fide/handbook.html?id=208&view=article)
- [Chess Programming Wiki](https://www.chessprogramming.org/)
- [React Documentation](https://reactjs.org/)

## License

MIT License - Feel free to use and modify as needed.

## Contributing

1. Follow FIDE Laws of Chess exactly
2. Maintain boardgame.io best practices
3. Add tests for new features
4. Update documentation
5. Ensure responsive design compatibility
