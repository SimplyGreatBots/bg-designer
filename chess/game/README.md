# Chess - boardgame.io Implementation

A fully functional Chess game implementation using the boardgame.io framework with React.

## Features

- **Complete Chess Rules**: Implements all standard chess piece movements, capturing, check, checkmate, and stalemate detection
- **Interactive UI**: Click-to-select and move pieces with visual feedback
- **Move Validation**: Prevents invalid moves and moves that would leave the king in check
- **Game Status**: Real-time display of game state (playing, check, checkmate, stalemate)
- **Captured Pieces**: Visual display of captured pieces for both players
- **Move History**: Tracks and highlights the last move made
- **Player Controls**: Resign and offer draw functionality
- **Responsive Design**: Works on desktop and mobile devices

## Game Rules Implemented

Based on the official FIDE Laws of Chess documented in `../rules/rules.md`:

### Piece Movement
- **Pawn**: Move forward one square, two squares from starting position, capture diagonally
- **Rook**: Move any number of squares horizontally or vertically
- **Bishop**: Move any number of squares diagonally
- **Queen**: Combines rook and bishop movement
- **King**: Move one square in any direction
- **Knight**: Move in L-shape (2+1 squares)

### Game Rules
- **Turn-based play**: White moves first, players alternate
- **Check detection**: Warns when king is under attack
- **Checkmate**: Game ends when king cannot escape check
- **Stalemate**: Game ends in draw when no legal moves available
- **Piece capture**: Remove opponent pieces by moving to their square
- **Move validation**: Prevents illegal moves and self-check situations

## Project Structure

```
chess/game/
├── index.html          # Main HTML file
├── package.json        # Dependencies and scripts
└── src/
    ├── Game.js         # Chess game logic (boardgame.io)
    ├── Board.js        # React UI component
    ├── Board.css       # Styling for the chess board
    ├── App.js          # Main app component
    ├── index.js        # Entry point
    ├── setupTests.js   # Jest test configuration
    ├── Game.test.js    # Game logic tests
    ├── Board.test.js   # UI component tests
    └── App.test.js     # App integration tests
```

## Installation and Setup

1. Navigate to the game directory:
   ```powershell
   cd chess/game
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Start the development server:
   ```powershell
   npm start
   ```

4. Open your browser to view the game (usually http://localhost:1234)

## Running Tests

Run the comprehensive test suite:
```powershell
npm test
```

For watch mode during development:
```powershell
npm run test:watch
```

## How to Play

1. **Starting**: White pieces start at the bottom, black at the top
2. **Moving**: Click a piece to select it, then click a highlighted square to move
3. **Capturing**: Move to a square occupied by an opponent's piece
4. **Check**: The game will warn you when your king is in check
5. **Winning**: Checkmate your opponent's king to win
6. **Drawing**: The game ends in a draw if stalemate occurs or players agree

## Game Controls

- **Resign**: End the game and concede victory to your opponent
- **Offer Draw**: Propose ending the game in a draw
- **Debug Panel**: Toggle with the debug option in App.js for development

## Technical Implementation

### Game Logic (Game.js)
- Implements the boardgame.io `Game` object
- Handles all chess rules and move validation
- Manages game state including board, captures, and status
- Provides AI enumeration for potential computer opponents

### UI Component (Board.js)
- React component that renders the chess board
- Handles user interactions and piece selection
- Displays game status, captured pieces, and controls
- Responsive design with CSS Grid and Flexbox

### Testing
- Comprehensive Jest tests for game logic
- React Testing Library tests for UI components
- Covers all major game scenarios and edge cases

## Development Notes

- Built following boardgame.io best practices
- Modular architecture separating game logic from presentation
- Comprehensive error handling and move validation
- Mobile-responsive design
- Accessibility considerations with semantic HTML

## Future Enhancements

Potential features that could be added:
- **Castling**: King and rook special move
- **En Passant**: Pawn capture special rule  
- **Promotion**: Pawn advancement to other pieces
- **Chess Notation**: Display moves in algebraic notation
- **Move History**: Full game record with navigation
- **Time Controls**: Chess clocks and time limits
- **Multiplayer**: Online play with boardgame.io server
- **AI Opponent**: Computer player integration

## Documentation Reference

This implementation is based on the chess documentation in:
- `../rules/rules.md` - Official FIDE Laws of Chess
- `../entities/entities.md` - Chess entity definitions  
- `../mechanics/mechanics.md` - Game mechanics analysis

## License

This implementation follows the project's documentation structure and is intended for educational and development purposes.
