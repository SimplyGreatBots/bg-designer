# Chess Game Entities

This document provides a comprehensive, structured analysis of all chess game entities extracted from the FIDE Laws of Chess, with detailed boardgame.io implementation guidance for each entity.

---

## Step-by-Step Reasoning and Analysis

### 1. boardgame.io Framework Analysis
I reviewed the boardgame.io documentation to understand key concepts:
- **Game State (G)**: Manages game-specific state (board, pieces, game history)
- **Context (ctx)**: Framework-managed metadata (turn, currentPlayer, game phase)
- **Moves**: Functions that modify G based on player actions
- **Events**: Framework functions that modify ctx (endTurn, endGame)
- **Phases/Stages**: Game state transitions and turn subdivisions
- **endIf conditions**: For automatic game state transitions

### 2. Rules Document Analysis
I systematically analyzed the FIDE Laws of Chess, identifying entities across multiple categories:

**Physical Game Objects:**
- Board structure (8x8 grid, files, ranks, diagonals, squares)
- Six piece types with distinct movement patterns and strategic roles
- Player colors (White/Black) with associated piece sets

**Game Actions:**
- Basic moves (piece movement, capture, special moves)
- Special actions (castling, en passant, pawn promotion)
- Meta-actions (draw offers, resignations, time management)

**Game States:**
- Positional states (check, checkmate, stalemate)
- Temporal states (move completion, game phases)
- Conditional states (castling rights, en passant eligibility)

**Rules and Constraints:**
- Movement validation rules per piece type
- King safety requirements
- Special move conditions and restrictions
- Game termination conditions

**Game Management:**
- Turn structure and player alternation
- Time control systems
- Move recording and notation
- Competition and tournament rules

### 3. Entity Extraction Process
For each identified entity, I analyzed:
- **Function and Role**: What purpose does this entity serve?
- **Relationships**: How does it connect to other entities?
- **boardgame.io Mapping**: Which framework features best represent this entity?
- **Implementation Needs**: What data structures and functions are required?

### 4. Organization Strategy
I organized entities into logical categories to maximize clarity and cross-referencing:
- **Game Objects**: Physical pieces, board, players
- **Actions**: Moves, special actions, meta-actions
- **States**: Game conditions, positional states, temporal states
- **Rules**: Movement constraints, game flow rules
- **Management**: Time control, notation, competition rules

---

## Game Objects

### [Chessboard](#chessboard)
- **Type:** Game Object
- **Description:** An 8x8 grid of 64 alternating light and dark squares that serves as the playing surface for chess. Provides coordinate system using files (a-h) and ranks (1-8).
- **Attributes:**
  - Dimensions: 8x8 grid (64 squares)
  - Square colors: Alternating light (white) and dark (black)
  - Coordinate system: Files (a-h), Ranks (1-8)
  - Orientation: White square in bottom-right corner from each player's perspective
- **Relationships:**
  - Contains: [Square](#square) entities (64 total)
  - Hosts: [Piece](#piece) entities during gameplay
  - Referenced by: [Move](#move), [Position](#position), [Algebraic Notation](#algebraic-notation)
- **References:** FIDE Laws Article 2.1, Article 2.4
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game state (G), board representation, coordinate systems
  - **Data Structure:** 
    ```js
    G.board = {
      // Option 1: Object with algebraic keys
      squares: {
        'a1': {piece: 'R', color: 'white'}, 
        'b1': {piece: 'N', color: 'white'},
        // ... all 64 squares
        'h8': {piece: 'R', color: 'black'}
      },
      // Option 2: 2D array with coordinate conversion
      grid: [[piece objects], [piece objects], ...] // 8x8 array
    }
    ```
  - **Integration Notes:** Implement coordinate conversion utilities between algebraic notation (e4) and array indices [4,3]. Store piece positions in G.board. Create helper functions for file/rank/diagonal calculations. Use consistent square identification throughout move validation and game logic.

### [Square](#square)
- **Type:** Game Object
- **Description:** Individual location on the chessboard identified by file-rank coordinates (e.g., 'e4'). Can be empty or occupied by exactly one piece.
- **Attributes:**
  - Coordinate: File (a-h) + Rank (1-8) combination
  - Color: Light (white) or dark (black)
  - Occupancy: Empty or contains one [Piece](#piece)
  - Position: Array indices [file_index, rank_index]
- **Relationships:**
  - Part of: [Chessboard](#chessboard)
  - May contain: [Piece](#piece) (maximum one)
  - Target of: [Move](#move) actions
  - Referenced in: [Attack](#attack) calculations, [Algebraic Notation](#algebraic-notation)
- **References:** FIDE Laws Article 2.1, Article 2.4
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game state (G), position validation, move targets
  - **Data Structure:**
    ```js
    // Square representation within G.board
    square: {
      coordinate: 'e4',
      piece: {type: 'P', color: 'white', hasMoved: false} || null,
      color: 'light' || 'dark'
    }
    ```
  - **Integration Notes:** Squares are typically represented implicitly within the board structure. Implement functions to check square occupancy, get piece at square, and validate square coordinates. Use algebraic notation consistently for square identification in move functions and UI.

### [Piece](#piece)
- **Type:** Game Object
- **Description:** Individual chess piece with specific movement patterns and strategic value. Each piece belongs to one player and has a defined type determining its movement capabilities.
- **Attributes:**
  - Type: King, Queen, Rook, Bishop, Knight, or Pawn
  - Color: White or Black (determines player ownership)
  - Position: Current [Square](#square) location
  - Movement History: Tracks if piece has moved (important for castling, en passant)
  - Value: Strategic point value (varies by type)
- **Relationships:**
  - Owned by: [Player](#player)
  - Located on: [Square](#square)
  - Moved by: [Move](#move) actions
  - Can attack: Other [Piece](#piece) entities
  - Governed by: [Movement Rules](#movement-rules) specific to piece type
- **References:** FIDE Laws Article 2.2, Articles 3.2-3.8
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game state (G), move validation, capture mechanics
  - **Data Structure:**
    ```js
    piece: {
      type: 'K'|'Q'|'R'|'B'|'N'|'P',
      color: 'white'|'black',
      position: 'e1', // algebraic notation
      hasMoved: false, // for castling/en passant rules
      // Optional: add move history for complex scenarios
      moveHistory: []
    }
    ```
  - **Integration Notes:** Store pieces in G.board structure with position keys. Track movement history for castling rights and en passant eligibility. Implement piece-specific movement validation functions. Use consistent type representation ('K', 'Q', 'R', 'B', 'N', 'P') throughout the codebase.

### [King](#king)
- **Type:** Game Object (Piece Subtype)
- **Description:** The most important piece in chess. Each player has exactly one King. The game's objective is to checkmate the opponent's King. Has unique movement and special rules including castling.
- **Attributes:**
  - Movement: One square in any direction (if safe)
  - Special Ability: [Castling](#castling) (once per game)
  - Status: Can be in [Check](#check) state
  - Safety Constraint: Cannot move into [Attack](#attack) from opponent pieces
- **Relationships:**
  - Subtype of: [Piece](#piece)
  - Target of: [Check](#check), [Checkmate](#checkmate) conditions
  - Participant in: [Castling](#castling) move
  - Protected by: King safety rules and move validation
- **References:** FIDE Laws Article 1.2, Article 3.8, Article 3.9
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game state (G), move validation, game end conditions, attack detection
  - **Data Structure:**
    ```js
    king: {
      type: 'K',
      color: 'white'|'black',
      position: 'e1'|'e8', // starting positions
      hasMoved: false, // affects castling rights
      inCheck: false // current check status
    }
    ```
  - **Integration Notes:** Implement special movement validation that checks for attacks on destination squares. Track king position for check detection. Implement castling logic with king movement. Create endIf condition to detect checkmate/stalemate. Ensure all moves validate that they don't leave own king in check.

### [Queen](#queen)
- **Type:** Game Object (Piece Subtype)
- **Description:** The most powerful piece, combining movement patterns of Rook and Bishop. Can move any number of squares along ranks, files, or diagonals until blocked by another piece.
- **Attributes:**
  - Movement: Combination of [Rook](#rook) and [Bishop](#bishop) patterns
  - Range: Unlimited distance along clear paths
  - Value: Highest strategic value (typically 9 points)
- **Relationships:**
  - Subtype of: [Piece](#piece)
  - Movement combines: [Rook](#rook) + [Bishop](#bishop) patterns
  - Target of: [Pawn Promotion](#pawn-promotion) (most common choice)
  - Blocked by: Other pieces in path
- **References:** FIDE Laws Article 3.4, Article 3.5
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, pattern validation, path checking
  - **Data Structure:**
    ```js
    queen: {
      type: 'Q',
      color: 'white'|'black',
      position: 'd1'|'d8', // starting positions
      hasMoved: false
    }
    ```
  - **Integration Notes:** Implement movement validation combining rook and bishop logic. Use path-clearing validation for sliding movement. High priority for attack/defense calculations due to power. Common choice for pawn promotion - ensure promotion logic handles queen creation.

### [Rook](#rook)
- **Type:** Game Object (Piece Subtype)
- **Description:** Piece that moves along ranks (horizontally) and files (vertically) any number of squares. Participates in castling move with the King.
- **Attributes:**
  - Movement: Horizontal and vertical lines (ranks and files)
  - Range: Unlimited distance along clear paths
  - Special Ability: [Castling](#castling) participant
  - Value: Moderate-high strategic value (typically 5 points)
- **Relationships:**
  - Subtype of: [Piece](#piece)
  - Participant in: [Castling](#castling) move
  - Movement affects: [Castling Rights](#castling-rights)
  - Blocked by: Other pieces in path
- **References:** FIDE Laws Article 3.3, Article 3.5, Article 3.8
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, pattern validation, castling mechanics
  - **Data Structure:**
    ```js
    rook: {
      type: 'R',
      color: 'white'|'black',
      position: 'a1'|'h1'|'a8'|'h8', // starting positions
      hasMoved: false, // affects castling rights
      side: 'kingside'|'queenside' // for castling identification
    }
    ```
  - **Integration Notes:** Implement rank/file movement validation with path checking. Track movement history to manage castling rights. Implement castling logic for rook movement. Create helper functions for horizontal/vertical path validation.

### [Bishop](#bishop)
- **Type:** Game Object (Piece Subtype)
- **Description:** Piece that moves diagonally any number of squares. Each player starts with two bishops, one on light squares and one on dark squares.
- **Attributes:**
  - Movement: Diagonal lines only
  - Range: Unlimited distance along clear diagonals
  - Square Color Binding: Each bishop limited to squares of one color
  - Value: Moderate strategic value (typically 3 points)
- **Relationships:**
  - Subtype of: [Piece](#piece)
  - Movement constrained by: Diagonal paths and piece blocking
  - Color-bound to: Light or dark squares (permanent restriction)
- **References:** FIDE Laws Article 3.2, Article 3.5
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, diagonal calculation, path validation
  - **Data Structure:**
    ```js
    bishop: {
      type: 'B',
      color: 'white'|'black',
      position: 'c1'|'f1'|'c8'|'f8', // starting positions
      hasMoved: false,
      squareColor: 'light'|'dark' // permanent constraint
    }
    ```
  - **Integration Notes:** Implement diagonal movement validation with path checking. Create diagonal direction calculation utilities. Ensure bishops remain on same color squares throughout the game. Use diagonal attack patterns for check detection.

### [Knight](#knight)
- **Type:** Game Object (Piece Subtype)
- **Description:** Piece with unique L-shaped movement pattern (2 squares in one direction, 1 square perpendicular). Only piece that can "jump" over other pieces.
- **Attributes:**
  - Movement: L-shaped pattern (2+1 squares)
  - Jump Ability: Can move over intervening pieces
  - Fixed Range: Exactly 8 possible destination squares
  - Value: Moderate strategic value (typically 3 points)
- **Relationships:**
  - Subtype of: [Piece](#piece)
  - Unique among pieces: Only jumping piece
  - Movement independent of: Piece blocking (can jump)
- **References:** FIDE Laws Article 3.6
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, pattern validation, jumping movement
  - **Data Structure:**
    ```js
    knight: {
      type: 'N',
      color: 'white'|'black',
      position: 'b1'|'g1'|'b8'|'g8', // starting positions
      hasMoved: false
    }
    ```
  - **Integration Notes:** Implement L-shaped movement validation with 8 possible destinations. No path-checking needed since knight jumps. Create utility function for calculating knight move offsets. Movement validation only needs to check destination square occupancy.

### [Pawn](#pawn)
- **Type:** Game Object (Piece Subtype)
- **Description:** Most numerous piece with complex rules. Moves forward but captures diagonally. Has special abilities including two-square initial move, en passant capture, and promotion.
- **Attributes:**
  - Movement: Forward one square (two on first move)
  - Capture: Diagonal forward only
  - Special Abilities: [En Passant](#en-passant), [Pawn Promotion](#pawn-promotion)
  - Direction: White pawns move "up" ranks, Black pawns move "down"
  - Starting Rank: 2nd rank (White), 7th rank (Black)
- **Relationships:**
  - Subtype of: [Piece](#piece)
  - Can perform: [En Passant Capture](#en-passant-capture)
  - Must undergo: [Pawn Promotion](#pawn-promotion) at final rank
  - Movement affects: [50-Move Rule](#fifty-move-rule) counter
- **References:** FIDE Laws Article 3.7
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, directional movement, special moves, promotion
  - **Data Structure:**
    ```js
    pawn: {
      type: 'P',
      color: 'white'|'black',
      position: 'a2-h2'|'a7-h7', // starting ranks
      hasMoved: false, // for two-square first move
      enPassantVulnerable: false, // after two-square move
      direction: 1|-1 // +1 for white (up), -1 for black (down)
    }
    ```
  - **Integration Notes:** Implement directional movement validation based on pawn color. Track two-square moves for en passant eligibility. Implement promotion logic when reaching final rank. Handle diagonal capture vs forward movement separately. Track pawn moves for 50-move rule.

### [Player](#player)
- **Type:** Game Actor
- **Description:** Individual participant in the chess game. Each player controls one set of pieces (White or Black) and alternates turns with their opponent.
- **Attributes:**
  - Color: White or Black (determines piece set and turn order)
  - Turn Status: Active (has the move) or Waiting
  - Time Remaining: Clock time available (if using time controls)
  - Move Rights: Can make legal moves when active
  - Special Rights: Castling availability, draw offers
- **Relationships:**
  - Controls: Set of 16 [Piece](#piece) entities of matching color
  - Alternates with: Opponent [Player](#player)
  - Can perform: [Move](#move), [Draw Offer](#draw-offer), [Resignation](#resignation)
  - Bound by: [Turn Structure](#turn-structure) and timing rules
- **References:** FIDE Laws Article 1.1, Article 6 (time controls)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** ctx.currentPlayer, turn order, player data, events.endTurn
  - **Data Structure:**
    ```js
    // Players represented by ctx.currentPlayer ('0' for White, '1' for Black)
    G.players = {
      '0': { // White player
        color: 'white',
        timeRemaining: 600000, // milliseconds
        castlingRights: {kingside: true, queenside: true}
      },
      '1': { // Black player
        color: 'black', 
        timeRemaining: 600000,
        castlingRights: {kingside: true, queenside: true}
      }
    }
    ```
  - **Integration Notes:** Use ctx.currentPlayer to enforce turn-based play. Store player-specific state in G.players. Implement time tracking if using time controls. Manage castling rights per player. Use events.endTurn() to switch active player.

---

## Actions

### [Move](#move)
- **Type:** Action
- **Description:** Primary game action where a player changes the position of one of their pieces according to chess rules. Includes regular moves, captures, and special moves.
- **Attributes:**
  - Source Square: Starting position of the piece
  - Target Square: Destination position
  - Moving Piece: [Piece](#piece) being relocated
  - Move Type: Regular, Capture, Castling, En Passant, Promotion
  - Legality: Must comply with piece movement rules and king safety
- **Relationships:**
  - Performed by: [Player](#player) during their turn
  - Affects: [Piece](#piece) positions and game state
  - Can trigger: [Check](#check), [Checkmate](#checkmate), [Stalemate](#stalemate)
  - Governed by: [Movement Rules](#movement-rules) and game constraints
  - Recorded in: [Algebraic Notation](#algebraic-notation)
- **References:** FIDE Laws Article 3, Article 4
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves object, move validation, state mutation, events.endTurn
  - **Data Structure:**
    ```js
    moves: {
      makeMove: ({G, ctx}, from, to, promotionPiece = null) => {
        // Validate move legality
        // Update piece position in G.board
        // Handle captures
        // Update game state (move history, castling rights, etc.)
        // Check for game end conditions
      }
    }
    ```
  - **Integration Notes:** Implement comprehensive move validation before state changes. Update multiple game state elements (board, move history, castling rights). Handle special move types with additional parameters. Always call events.endTurn() after successful move. Integrate with check/checkmate detection.

### [Capture](#capture)
- **Type:** Action (Move Subtype)
- **Description:** Special type of move where a piece moves to a square occupied by an opponent's piece, removing the opponent's piece from the game.
- **Attributes:**
  - Capturing Piece: [Piece](#piece) performing the capture
  - Captured Piece: Opponent [Piece](#piece) being removed
  - Capture Square: Location where capture occurs
  - Capture Type: Regular capture, En Passant capture
- **Relationships:**
  - Subtype of: [Move](#move)
  - Removes: Opponent [Piece](#piece) from game
  - Can reset: [50-Move Rule](#fifty-move-rule) counter
  - Affects: Material balance and strategic position
- **References:** FIDE Laws Article 3.1, Article 3.7c, Article 3.7d
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, state mutation, piece removal
  - **Data Structure:**
    ```js
    // Within move function
    if (G.board[to].piece && G.board[to].piece.color !== currentPlayerColor) {
      // Handle capture
      const capturedPiece = G.board[to].piece;
      G.capturedPieces[currentPlayerColor].push(capturedPiece);
      G.board[to] = null; // Remove captured piece
      G.fiftyMoveCounter = 0; // Reset fifty-move rule
    }
    ```
  - **Integration Notes:** Always check destination square for opponent pieces. Store captured pieces for potential UI display. Reset fifty-move rule counter on any capture. Handle en passant captures specially (captured piece on different square).

### [Castling](#castling)
- **Type:** Action (Special Move)
- **Description:** Special move involving both King and Rook, allowing the King to move two squares toward a Rook while the Rook moves to the square the King crossed. Each player can castle at most once per game.
- **Attributes:**
  - Participants: [King](#king) and [Rook](#rook) of same color
  - Types: Kingside (short) or Queenside (long) castling
  - Requirements: King and Rook unmoved, path clear, King not in check
  - Effect: King moves 2 squares, Rook moves to adjacent square
- **Relationships:**
  - Special type of: [Move](#move)
  - Requires: Unmoved [King](#king) and [Rook](#rook)
  - Prevented by: [Check](#check), piece blocking, prior movement
  - Affects: [Castling Rights](#castling-rights) (permanently lost)
- **References:** FIDE Laws Article 3.8
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, complex move logic, state validation
  - **Data Structure:**
    ```js
    moves: {
      castle: ({G, ctx}, side) => { // side: 'kingside' or 'queenside'
        const player = ctx.currentPlayer;
        const color = G.players[player].color;
        
        // Validate castling legality
        if (!canCastle(G, color, side)) return INVALID_MOVE;
        
        // Move king and rook simultaneously
        moveKingAndRookForCastling(G, color, side);
        
        // Update castling rights
        G.players[player].castlingRights[side] = false;
        G.players[player].castlingRights = {kingside: false, queenside: false};
      }
    }
    ```
  - **Integration Notes:** Implement comprehensive castling validation (piece positions, movement history, check status). Move both pieces in single action. Permanently disable castling rights after castling. Create helper functions for path-clear and check validation.

### [En Passant Capture](#en-passant-capture)
- **Type:** Action (Special Move)
- **Description:** Special pawn capture where a pawn captures an opponent's pawn that moved two squares forward on the previous turn, as if it had only moved one square.
- **Attributes:**
  - Timing: Only available immediately after opponent's two-square pawn move
  - Capture Method: Diagonal capture but captured pawn is on different square
  - Eligibility: Requires specific positioning and timing conditions
  - Effect: Removes opponent pawn from square it passed through
- **Relationships:**
  - Special type of: [Capture](#capture) and [Move](#move)
  - Requires: Previous two-square [Pawn](#pawn) move by opponent
  - Affects: [50-Move Rule](#fifty-move-rule) counter (resets to zero)
  - Limited by: Strict timing (must occur immediately after qualifying move)
- **References:** FIDE Laws Article 3.7d
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, temporal conditions, game state tracking
  - **Data Structure:**
    ```js
    // Track en passant eligibility in game state
    G.enPassantTarget = null; // or 'e3' etc. - the square the capturing pawn would move to
    
    moves: {
      enPassant: ({G, ctx}, from, to) => {
        // Validate en passant conditions
        if (to !== G.enPassantTarget) return INVALID_MOVE;
        
        // Perform capture (remove pawn from different square)
        const capturedPawnSquare = /* calculate based on en passant rules */;
        G.capturedPieces[ctx.currentPlayer].push(G.board[capturedPawnSquare]);
        G.board[capturedPawnSquare] = null;
        
        // Move capturing pawn
        G.board[to] = G.board[from];
        G.board[from] = null;
        
        // Reset en passant target and fifty-move counter
        G.enPassantTarget = null;
        G.fiftyMoveCounter = 0;
      }
    }
    ```
  - **Integration Notes:** Track en passant eligibility in G.enPassantTarget. Update this field after every two-square pawn move. Clear en passant target after each turn where it's not used. Remove captured pawn from different square than destination.

### [Pawn Promotion](#pawn-promotion)
- **Type:** Action (Special Move)
- **Description:** Mandatory transformation that occurs when a pawn reaches the rank furthest from its starting position. The pawn must be replaced with a Queen, Rook, Bishop, or Knight of the same color.
- **Attributes:**
  - Trigger: [Pawn](#pawn) reaching final rank (8th for White, 1st for Black)
  - Piece Choices: Queen, Rook, Bishop, or Knight
  - Player Choice: Not restricted to previously captured pieces
  - Immediacy: Transformation effect is immediate
- **Relationships:**
  - Special type of: [Move](#move)
  - Transforms: [Pawn](#pawn) into chosen piece type
  - Can affect: Material balance and strategic position significantly
  - Most common choice: [Queen](#queen) (promotion to queen)
- **References:** FIDE Laws Article 3.7e
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, state transformation, player choice
  - **Data Structure:**
    ```js
    moves: {
      promote: ({G, ctx}, from, to, pieceType) => {
        // Validate pawn reached final rank
        const pawn = G.board[from];
        if (pawn.type !== 'P') return INVALID_MOVE;
        
        const finalRank = (pawn.color === 'white') ? 8 : 1;
        if (to[1] !== finalRank.toString()) return INVALID_MOVE;
        
        // Handle capture if destination occupied
        if (G.board[to]) {
          handleCapture(G, to, ctx.currentPlayer);
        }
        
        // Replace pawn with chosen piece
        G.board[to] = {
          type: pieceType, // 'Q', 'R', 'B', or 'N'
          color: pawn.color,
          hasMoved: true
        };
        G.board[from] = null;
        
        G.fiftyMoveCounter = 0; // Pawn move resets counter
      }
    }
    ```
  - **Integration Notes:** Require piece type parameter in promotion moves. Validate pawn reaches correct final rank. Replace pawn with new piece type in single action. Reset fifty-move counter since pawn moved. Implement UI for piece selection.

### [Draw Offer](#draw-offer)
- **Type:** Action (Meta-Action)
- **Description:** Proposal by a player to end the game in a draw (tie). The offer remains valid until accepted, rejected, or the game ends by other means.
- **Attributes:**
  - Timing: Offered after making a move but before ending turn
  - Validity: Remains open until opponent responds
  - Response Options: Accept (game ends in draw) or Reject (game continues)
  - Recording: Must be noted on scoresheet with special symbol
- **Relationships:**
  - Can be performed by: [Player](#player) during their turn
  - Can trigger: [Draw](#draw) game ending if accepted
  - Recorded in: [Algebraic Notation](#algebraic-notation) with (=) symbol
  - Governed by: Tournament rules (may restrict early draw offers)
- **References:** FIDE Laws Article 9.1
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, player communication, game end conditions
  - **Data Structure:**
    ```js
    G.drawOffer = {
      offered: false,
      offeredBy: null, // player ID
      onMove: null // move number when offered
    };
    
    moves: {
      offerDraw: ({G, ctx}) => {
        G.drawOffer = {
          offered: true,
          offeredBy: ctx.currentPlayer,
          onMove: G.moveNumber
        };
      },
      
      acceptDraw: ({G, ctx, events}) => {
        if (G.drawOffer.offered && G.drawOffer.offeredBy !== ctx.currentPlayer) {
          events.endGame({draw: true, reason: 'mutual agreement'});
        }
      },
      
      rejectDraw: ({G, ctx}) => {
        G.drawOffer = {offered: false, offeredBy: null, onMove: null};
      }
    }
    ```
  - **Integration Notes:** Track draw offer state in G. Allow opponent to accept/reject on their turn. Clear draw offer after rejection or if game continues. Use events.endGame() with draw status when accepted.

### [Resignation](#resignation)
- **Type:** Action (Meta-Action)
- **Description:** Voluntary surrender by a player, immediately ending the game with a loss for the resigning player and a win for their opponent.
- **Attributes:**
  - Effect: Immediate game termination
  - Result: Loss for resigning player, win for opponent
  - Irreversibility: Cannot be withdrawn once declared
  - Timing: Can occur at any point during the player's turn
- **Relationships:**
  - Performed by: [Player](#player)
  - Results in: [Game End](#game-end) with specific winner
  - Alternative to: Continuing play until [Checkmate](#checkmate)
- **References:** FIDE Laws Article 5.1b
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** events.endGame, immediate game termination
  - **Data Structure:**
    ```js
    moves: {
      resign: ({G, ctx, events}) => {
        const winner = (ctx.currentPlayer === '0') ? '1' : '0';
        events.endGame({
          winner: winner,
          reason: 'resignation',
          resignedPlayer: ctx.currentPlayer
        });
      }
    }
    ```
  - **Integration Notes:** Use events.endGame() immediately upon resignation. Set winner as opponent of resigning player. Track resignation reason in game result. No additional validation needed - resignation is always legal.

---

## States

### [Check](#check)
- **Type:** Game State
- **Description:** Condition where a King is under attack by one or more opponent pieces. The player whose King is in check must make a move that removes the check threat.
- **Attributes:**
  - Target: [King](#king) under attack
  - Attacking Pieces: One or more opponent pieces threatening the King
  - Response Required: Player must eliminate check threat on next move
  - Check Status: Boolean state that affects legal move validation
- **Relationships:**
  - Affects: [King](#king) safety
  - Requires: Immediate response from threatened player
  - Can lead to: [Checkmate](#checkmate) if no legal moves remove threat
  - Prevents: [Castling](#castling) while King is in check
  - Detection involves: [Attack](#attack) calculation
- **References:** FIDE Laws Article 3.9
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game state validation, move constraints, attack detection
  - **Data Structure:**
    ```js
    G.check = {
      inCheck: false,
      checkedPlayer: null, // '0' or '1'
      attackingPieces: [], // pieces giving check
      checkSquares: [] // squares king is attacked from
    };
    
    // Helper function
    function isInCheck(G, playerColor) {
      const kingPosition = findKing(G, playerColor);
      return isSquareAttacked(G, kingPosition, opponentColor(playerColor));
    }
    ```
  - **Integration Notes:** Check for check status after every move. Validate that moves resolve check when player is in check. Prevent illegal moves that leave own king in check. Integrate with checkmate detection. Display check status clearly in UI.

### [Checkmate](#checkmate)
- **Type:** Game State (Terminal)
- **Description:** Terminal game condition where a King is in check and the player has no legal moves to escape check. Results in immediate victory for the attacking player.
- **Attributes:**
  - Conditions: King in [Check](#check) AND no legal moves available
  - Result: Immediate game end with winner determination
  - Finality: Cannot be undone or continued
  - Victory: Win for player delivering checkmate
- **Relationships:**
  - Extension of: [Check](#check) state
  - Requires: No legal [Move](#move) options for checked player
  - Results in: [Game End](#game-end) with specific winner
  - Primary goal of: Chess gameplay
- **References:** FIDE Laws Article 1.2, Article 5.1a
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** endIf conditions, game termination, victory conditions
  - **Data Structure:**
    ```js
    // In game definition
    endIf: ({G, ctx}) => {
      const currentPlayer = ctx.currentPlayer;
      const currentColor = G.players[currentPlayer].color;
      
      if (isInCheck(G, currentColor)) {
        const legalMoves = getAllLegalMoves(G, currentColor);
        if (legalMoves.length === 0) {
          // Checkmate
          const winner = (currentPlayer === '0') ? '1' : '0';
          return {winner: winner, reason: 'checkmate'};
        }
      }
      
      return false; // Game continues
    }
    ```
  - **Integration Notes:** Implement in endIf function to check after each move. Require both check condition and no legal moves. Use events.endGame() with winner when detected. Generate all possible moves to verify no escape options exist.

### [Stalemate](#stalemate)
- **Type:** Game State (Terminal)
- **Description:** Terminal game condition where a player has no legal moves but their King is not in check. Results in a draw (tie game).
- **Attributes:**
  - Conditions: No legal moves available AND King not in [Check](#check)
  - Result: Game ends in draw (no winner)
  - Distinction: Different from [Checkmate](#checkmate) due to lack of check
  - Timing: Determined at start of player's turn
- **Relationships:**
  - Opposite of: [Checkmate](#checkmate) (no check vs in check)
  - Results in: [Draw](#draw) ending
  - Requires: No legal [Move](#move) options for current player
- **References:** FIDE Laws Article 5.2a
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** endIf conditions, draw conditions, move generation
  - **Data Structure:**
    ```js
    // In endIf function (continued from checkmate example)
    endIf: ({G, ctx}) => {
      const currentPlayer = ctx.currentPlayer;
      const currentColor = G.players[currentPlayer].color;
      
      if (isInCheck(G, currentColor)) {
        // Check for checkmate (as above)
      } else {
        // Check for stalemate
        const legalMoves = getAllLegalMoves(G, currentColor);
        if (legalMoves.length === 0) {
          return {draw: true, reason: 'stalemate'};
        }
      }
      
      return false; // Game continues
    }
    ```
  - **Integration Notes:** Check for stalemate when player is not in check but has no legal moves. Implement comprehensive legal move generation. Use events.endGame() with draw status. Ensure stalemate detection runs at turn start, not turn end.

### [Draw](#draw)
- **Type:** Game State (Terminal)
- **Description:** Terminal game condition where the game ends without a winner. Can occur through various mechanisms including stalemate, mutual agreement, or automatic conditions.
- **Attributes:**
  - Result: No winner (tie game)
  - Types: Stalemate, mutual agreement, fifty-move rule, repetition, insufficient material
  - Finality: Game ends immediately when draw condition is met
  - Scoring: Each player receives half a point in tournament play
- **Relationships:**
  - Can result from: [Stalemate](#stalemate), [Draw Offer](#draw-offer) acceptance, [Fifty-Move Rule](#fifty-move-rule)
  - Alternative to: Win/loss outcomes
  - Triggers: [Game End](#game-end) without winner designation
- **References:** FIDE Laws Article 5.2, Article 9
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** endIf conditions, multiple termination paths, events.endGame
  - **Data Structure:**
    ```js
    // Various draw detection in endIf
    endIf: ({G, ctx}) => {
      // Check stalemate
      if (isStalemate(G, ctx)) {
        return {draw: true, reason: 'stalemate'};
      }
      
      // Check fifty-move rule
      if (G.fiftyMoveCounter >= 100) { // 50 moves per player = 100 half-moves
        return {draw: true, reason: 'fifty-move rule'};
      }
      
      // Check threefold repetition
      if (hasThreefoldRepetition(G)) {
        return {draw: true, reason: 'threefold repetition'};
      }
      
      // Check insufficient material
      if (hasInsufficientMaterial(G)) {
        return {draw: true, reason: 'insufficient material'};
      }
      
      return false;
    }
    ```
  - **Integration Notes:** Implement multiple draw detection mechanisms. Use events.endGame() with draw: true for all draw types. Track necessary counters (fifty-move, position repetition). Allow manual draw offers through moves.

### [Game End](#game-end)
- **Type:** Game State (Terminal)
- **Description:** Final state of a chess game, reached through checkmate, stalemate, draw conditions, or resignation. Determines the final result and terminates all further play.
- **Attributes:**
  - Result Types: Win (with winner), Draw, or special conditions
  - Finality: No further moves or game state changes allowed
  - Cause: Checkmate, Stalemate, Resignation, Draw agreement, or automatic draw
  - Score Assignment: 1-0, 0-1, or 0.5-0.5 for tournament purposes
- **Relationships:**
  - Triggered by: [Checkmate](#checkmate), [Stalemate](#stalemate), [Draw](#draw), [Resignation](#resignation)
  - Finalizes: All game state and prevents further actions
  - Records: Final position, result, and cause of termination
- **References:** FIDE Laws Article 5
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** endIf, events.endGame, ctx.gameover
  - **Data Structure:**
    ```js
    // Game end results are handled by boardgame.io automatically
    // Access final result through ctx.gameover
    
    onEnd: ({G, ctx}) => {
      // Optional: cleanup or final state processing
      return {
        ...G,
        finalResult: ctx.gameover,
        finalPosition: G.board,
        totalMoves: G.moveNumber
      };
    }
    ```
  - **Integration Notes:** Use endIf function to detect terminal conditions. Call events.endGame() with appropriate result object. Access final game state through ctx.gameover. Implement onEnd hook for cleanup if needed.

---

## Rules

### [Movement Rules](#movement-rules)
- **Type:** Rule Category
- **Description:** Fundamental rules governing how each piece type can move on the chessboard. Each piece has distinct movement patterns and constraints.
- **Attributes:**
  - Piece-Specific: Different rules for each of the six piece types
  - Path Constraints: Some pieces can jump, others must have clear paths
  - Directional Limits: Pieces have specific directional movement capabilities
  - Distance Limits: Some pieces move one square, others can move multiple squares
- **Relationships:**
  - Governs: All [Piece](#piece) movement
  - Enforced through: [Move](#move) validation
  - Affects: Legal move generation and [Check](#check)/[Checkmate](#checkmate) detection
  - Combined with: King safety rules and special move conditions
- **References:** FIDE Laws Article 3.2-3.8
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves validation, pattern matching, game rules enforcement
  - **Data Structure:**
    ```js
    // Movement validation functions for each piece type
    const movementRules = {
      'K': validateKingMove,
      'Q': validateQueenMove,
      'R': validateRookMove,
      'B': validateBishopMove,
      'N': validateKnightMove,
      'P': validatePawnMove
    };
    
    function isValidMove(G, from, to, piece) {
      const validator = movementRules[piece.type];
      return validator(G, from, to, piece);
    }
    ```
  - **Integration Notes:** Implement separate validation functions for each piece type. Combine with path-clear checking for sliding pieces. Integrate with king safety validation. Use in both move validation and attack detection.

### [King Safety Rules](#king-safety-rules)
- **Type:** Rule Category
- **Description:** Core constraint that no move can leave a player's own King in check or under attack. Overrides normal piece movement rules when necessary.
- **Attributes:**
  - Precedence: Overrides normal movement rules
  - Scope: Applies to all moves by all pieces
  - Detection: Requires attack calculation after hypothetical moves
  - Enforcement: Prevents illegal moves that expose King
- **Relationships:**
  - Constrains: All [Move](#move) actions
  - Protects: [King](#king) from [Attack](#attack)
  - Interacts with: [Check](#check) resolution requirements
  - Required for: Legal move validation
- **References:** FIDE Laws Article 1.2, Article 3.9
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** move validation, hypothetical state checking, attack detection
  - **Data Structure:**
    ```js
    function isLegalMove(G, from, to, piece) {
      // First check basic movement rules
      if (!isValidMove(G, from, to, piece)) {
        return false;
      }
      
      // Check if move leaves own king in check
      const hypotheticalG = makeHypotheticalMove(G, from, to);
      const ownKingPosition = findKing(hypotheticalG, piece.color);
      const opponentColor = (piece.color === 'white') ? 'black' : 'white';
      
      return !isSquareAttacked(hypotheticalG, ownKingPosition, opponentColor);
    }
    ```
  - **Integration Notes:** Apply to all move validation. Create hypothetical game state to test moves. Use attack detection on hypothetical positions. Reject moves that would leave own king in check.

### [Attack Detection](#attack-detection)
- **Type:** Rule Mechanism
- **Description:** System for determining which squares are under attack by which pieces. Essential for check detection, legal move validation, and castling restrictions.
- **Attributes:**
  - Scope: Calculates attacks for all pieces on the board
  - Independence: Attack calculation ignores king safety for attacking piece
  - Efficiency: Must be fast enough for real-time move validation
  - Accuracy: Must correctly identify all attacked squares
- **Relationships:**
  - Used by: [Check](#check) detection, [King Safety Rules](#king-safety-rules), [Castling](#castling) validation
  - Based on: [Movement Rules](#movement-rules) but ignores king safety
  - Enables: Legal move generation and position evaluation
- **References:** FIDE Laws Article 3.1, Article 3.9
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game state analysis, efficient algorithms, move validation
  - **Data Structure:**
    ```js
    function isSquareAttacked(G, square, byColor) {
      for (const [pos, piece] of Object.entries(G.board)) {
        if (piece && piece.color === byColor) {
          if (canPieceAttackSquare(G, pos, square, piece)) {
            return true;
          }
        }
      }
      return false;
    }
    
    function getAllAttackedSquares(G, byColor) {
      const attackedSquares = new Set();
      for (const [pos, piece] of Object.entries(G.board)) {
        if (piece && piece.color === byColor) {
          const attacks = getPieceAttacks(G, pos, piece);
          attacks.forEach(square => attackedSquares.add(square));
        }
      }
      return attackedSquares;
    }
    ```
  - **Integration Notes:** Optimize for performance since called frequently. Separate attack calculation from legal move calculation. Use for check detection, castling validation, and king movement. Cache results when possible.

### [Castling Rights](#castling-rights)
- **Type:** Rule State
- **Description:** Per-player state tracking eligibility to perform castling. Lost permanently when King or Rook moves, and affects castling availability.
- **Attributes:**
  - Scope: Tracked per player (White and Black separately)
  - Sides: Kingside and Queenside castling tracked independently
  - Permanence: Once lost, cannot be regained during the game
  - Dependencies: Based on King and Rook movement history
- **Relationships:**
  - Affects: [Castling](#castling) move availability
  - Modified by: King and Rook movements
  - Checked by: Castling validation logic
  - Stored in: Player-specific game state
- **References:** FIDE Laws Article 3.8b
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game state tracking, player data, permanent state changes
  - **Data Structure:**
    ```js
    G.players = {
      '0': { // White
        castlingRights: {
          kingside: true,
          queenside: true
        }
      },
      '1': { // Black
        castlingRights: {
          kingside: true,
          queenside: true
        }
      }
    };
    
    // Update rights when pieces move
    function updateCastlingRights(G, piece, from) {
      const player = (piece.color === 'white') ? '0' : '1';
      
      if (piece.type === 'K') {
        // King moved - lose all castling rights
        G.players[player].castlingRights = {kingside: false, queenside: false};
      } else if (piece.type === 'R') {
        // Rook moved - lose rights for that side
        if (from === 'a1' || from === 'a8') {
          G.players[player].castlingRights.queenside = false;
        } else if (from === 'h1' || from === 'h8') {
          G.players[player].castlingRights.kingside = false;
        }
      }
    }
    ```
  - **Integration Notes:** Update castling rights immediately when King or Rook moves. Check rights before allowing castling moves. Store permanently in player state. Never restore rights once lost.

### [Fifty-Move Rule](#fifty-move-rule)
- **Type:** Rule (Draw Condition)
- **Description:** Automatic draw condition when 50 consecutive moves have been made by each player without any pawn movement or capture. Used to prevent indefinite games.
- **Attributes:**
  - Counter: Tracks moves without pawn movement or capture
  - Reset Triggers: Any pawn move or any capture
  - Limit: 100 half-moves (50 full moves)
  - Effect: Automatic draw when limit reached
- **Relationships:**
  - Reset by: [Pawn](#pawn) moves and [Capture](#capture) actions
  - Can trigger: [Draw](#draw) game ending
  - Tracked across: All game moves
  - Prevents: Infinite games without progress
- **References:** FIDE Laws Article 9.3
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game state tracking, automatic conditions, draw detection
  - **Data Structure:**
    ```js
    G.fiftyMoveCounter = 0; // Half-moves since last pawn move or capture
    
    // In move functions
    function updateFiftyMoveCounter(G, move) {
      if (move.piece.type === 'P' || move.isCapture) {
        G.fiftyMoveCounter = 0;
      } else {
        G.fiftyMoveCounter++;
      }
    }
    
    // In endIf function
    endIf: ({G, ctx}) => {
      if (G.fiftyMoveCounter >= 100) {
        return {draw: true, reason: 'fifty-move rule'};
      }
      // ... other conditions
    }
    ```
  - **Integration Notes:** Increment counter on every move. Reset to zero on pawn moves or captures. Check in endIf for automatic draw. Track half-moves (individual player moves) not full moves.

### [Threefold Repetition](#threefold-repetition)
- **Type:** Rule (Draw Condition) 
- **Description:** Draw condition when the same position occurs three times in a game, with the same player to move and same available moves (including castling rights and en passant).
- **Attributes:**
  - Position Identity: Same piece placement, player to move, castling rights, en passant
  - Occurrences: Must appear three times (not necessarily consecutive)
  - Claim: Player can claim draw when third repetition is about to occur
  - Automatic: Can be automatic or require player claim
- **Relationships:**
  - Tracks: Complete game position including all state elements
  - Can trigger: [Draw](#draw) game ending
  - Affects: Position evaluation and game continuation
  - Requires: Comprehensive position hashing or comparison
- **References:** FIDE Laws Article 9.2
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Position tracking, state comparison, draw detection
  - **Data Structure:**
    ```js
    G.positionHistory = []; // Array of position hashes
    
    function getPositionHash(G, ctx) {
      // Create unique hash including:
      // - piece positions
      // - current player
      // - castling rights
      // - en passant target
      return {
        board: JSON.stringify(G.board),
        currentPlayer: ctx.currentPlayer,
        castlingRights: JSON.stringify(G.players),
        enPassantTarget: G.enPassantTarget
      };
    }
    
    function hasThreefoldRepetition(G) {
      const currentHash = JSON.stringify(getPositionHash(G, ctx));
      const occurrences = G.positionHistory.filter(pos => 
        JSON.stringify(pos) === currentHash
      ).length;
      return occurrences >= 2; // Will be 3 including current position
    }
    ```
  - **Integration Notes:** Track complete position after each move. Include all state that affects legal moves. Implement efficient position comparison. Check in endIf or allow player claims.

---

## Management

### [Turn Structure](#turn-structure)
- **Type:** Game Flow Rule
- **Description:** Fundamental game structure where players alternate making moves, with White always moving first. Defines the basic rhythm and order of chess gameplay.
- **Attributes:**
  - Alternation: Players take turns making exactly one move each
  - Order: White always moves first, then strict alternation
  - Completion: Turn ends when player completes move and stops clock
  - Enforcement: System prevents out-of-turn moves
- **Relationships:**
  - Governs: All [Move](#move) actions and player interaction
  - Enforced by: Game system and time controls
  - Affects: Game timing and strategic planning
  - Required for: Legal game progression
- **References:** FIDE Laws Article 1.1, Article 6.7
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** ctx.currentPlayer, turn order, events.endTurn
  - **Data Structure:**
    ```js
    // boardgame.io handles turn structure automatically
    {
      numPlayers: 2,
      turn: {
        order: TurnOrder.DEFAULT, // Alternates between players
        onBegin: ({G, ctx}) => {
          // Optional: actions at turn start
          G.enPassantTarget = null; // Clear en passant each turn
        },
        onEnd: ({G, ctx}) => {
          // Optional: actions at turn end
          G.moveNumber++;
        }
      }
    }
    ```
  - **Integration Notes:** Use default turn order for two players. Player '0' represents White, player '1' represents Black. Ensure all moves call events.endTurn(). Use ctx.currentPlayer to enforce turn-based play.

### [Algebraic Notation](#algebraic-notation)
- **Type:** Recording System
- **Description:** Standard chess notation system for recording and communicating moves. Uses piece letters, square coordinates, and special symbols to represent all chess moves unambiguously.
- **Attributes:**
  - Piece Symbols: K, Q, R, B, N (pawns use no symbol)
  - Square Names: File letters (a-h) + Rank numbers (1-8)
  - Special Symbols: x (capture), + (check), # (checkmate), O-O (castling)
  - Disambiguation: Additional notation when multiple pieces can reach same square
- **Relationships:**
  - Records: All [Move](#move) actions in standardized format
  - Supports: Game replay, analysis, and communication
  - Required for: Tournament play and official games
  - Enables: Move history tracking and position reconstruction
- **References:** FIDE Laws Appendix C
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Move logging, game history, notation conversion
  - **Data Structure:**
    ```js
    G.moveHistory = []; // Array of move objects with algebraic notation
    
    function moveToAlgebraic(G, move) {
      const piece = move.piece;
      const from = move.from;
      const to = move.to;
      
      let notation = '';
      
      // Piece symbol (except pawns)
      if (piece.type !== 'P') {
        notation += piece.type;
        
        // Add disambiguation if needed
        notation += getDisambiguation(G, move);
      }
      
      // Capture symbol
      if (move.isCapture) {
        if (piece.type === 'P') {
          notation += from[0]; // Pawn capture shows file
        }
        notation += 'x';
      }
      
      // Destination square
      notation += to;
      
      // Special symbols
      if (move.isCheck) notation += '+';
      if (move.isCheckmate) notation += '#';
      
      return notation;
    }
    ```
  - **Integration Notes:** Generate algebraic notation for each move. Store in move history for replay. Implement disambiguation for ambiguous moves. Support special notations (castling, en passant, promotion).

### [Time Control](#time-control)
- **Type:** Game Management System
- **Description:** System for limiting the time each player has to make their moves. Includes various formats like classical, rapid, and blitz time controls.
- **Attributes:**
  - Time Limits: Fixed time per player or per move
  - Increment: Additional time added per move (optional)
  - Enforcement: Automatic loss when time expires (flag fall)
  - Types: Classical (long), Rapid (medium), Blitz (short)
- **Relationships:**
  - Constrains: [Player](#player) move timing
  - Can cause: Game termination when time expires
  - Affects: Game strategy and move quality
  - Managed by: Chess clock or digital timer
- **References:** FIDE Laws Article 6
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** ctx timing, player data, game end conditions
  - **Data Structure:**
    ```js
    G.timeControl = {
      type: 'classical', // 'rapid', 'blitz'
      initialTime: 600000, // milliseconds
      increment: 0, // increment per move
      enabled: true
    };
    
    G.players = {
      '0': {timeRemaining: 600000},
      '1': {timeRemaining: 600000}
    };
    
    // Track time usage
    turn: {
      onEnd: ({G, ctx}) => {
        if (G.timeControl.enabled) {
          const timeUsed = ctx.timer; // boardgame.io provides timing
          G.players[ctx.currentPlayer].timeRemaining -= timeUsed;
          G.players[ctx.currentPlayer].timeRemaining += G.timeControl.increment;
        }
      }
    }
    ```
  - **Integration Notes:** Track time remaining per player. Implement time forfeit in endIf. Add increment after each move. Support different time control formats. Use boardgame.io timer features when available.

### [Move History](#move-history)
- **Type:** Game Tracking System
- **Description:** Complete record of all moves made during the game, stored in both internal format and algebraic notation for analysis and replay purposes.
- **Attributes:**
  - Completeness: Records every move from game start
  - Format: Both internal move data and algebraic notation
  - Persistence: Maintained throughout entire game
  - Utility: Enables replay, analysis, and position reconstruction
- **Relationships:**
  - Records: All [Move](#move) actions
  - Enables: [Threefold Repetition](#threefold-repetition) detection
  - Supports: Game analysis and review
  - Required for: Tournament record-keeping
- **References:** FIDE Laws Article 8
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game state tracking, move logging, replay functionality
  - **Data Structure:**
    ```js
    G.moveHistory = []; // Complete move record
    
    // Move object structure
    const moveRecord = {
      moveNumber: 1,
      player: 'white',
      from: 'e2',
      to: 'e4',
      piece: {type: 'P', color: 'white'},
      algebraic: 'e4',
      isCapture: false,
      isCheck: false,
      isCheckmate: false,
      timestamp: Date.now(),
      timeUsed: 5000, // milliseconds
      position: {...G.board} // Board state after move
    };
    
    // Add to history after each move
    function recordMove(G, moveData) {
      G.moveHistory.push(moveRecord);
      G.moveNumber = Math.floor(G.moveHistory.length / 2) + 1;
    }
    ```
  - **Integration Notes:** Record every move with complete data. Store both internal format and algebraic notation. Include timing data if using time controls. Enable game replay functionality. Use for threefold repetition detection.

### [Position Evaluation](#position-evaluation)
- **Type:** Analysis System
- **Description:** System for analyzing the current game position to determine material balance, piece activity, king safety, and other strategic factors.
- **Attributes:**
  - Material Count: Point values of pieces on board
  - Positional Factors: Piece placement, control, mobility
  - Safety Assessment: King safety and tactical threats
  - Dynamic Elements: Tempo, initiative, threats
- **Relationships:**
  - Analyzes: Current [Piece](#piece) positions and relationships
  - Considers: [Attack](#attack) patterns and defensive structures
  - Supports: Game analysis and educational features
  - Used for: Computer evaluation and position assessment
- **References:** Not explicitly in FIDE Laws (analytical concept)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game state analysis, helper functions, position assessment
  - **Data Structure:**
    ```js
    function evaluatePosition(G) {
      return {
        material: {
          white: calculateMaterial(G, 'white'),
          black: calculateMaterial(G, 'black'),
          difference: 0 // calculated
        },
        safety: {
          whiteKingSafety: assessKingSafety(G, 'white'),
          blackKingSafety: assessKingSafety(G, 'black')
        },
        activity: {
          whitePieceActivity: assessPieceActivity(G, 'white'),
          blackPieceActivity: assessPieceActivity(G, 'black')
        },
        overall: 0 // Combined evaluation score
      };
    }
    
    const pieceValues = {K: 0, Q: 9, R: 5, B: 3, N: 3, P: 1};
    ```
  - **Integration Notes:** Implement for analysis features, not core gameplay. Calculate material balance for insufficient material detection. Use for educational features or computer players. Keep separate from core game logic.

---

This comprehensive entity analysis provides a complete foundation for implementing chess in boardgame.io, with each entity clearly defined, cross-referenced, and mapped to appropriate framework concepts and implementation strategies.
