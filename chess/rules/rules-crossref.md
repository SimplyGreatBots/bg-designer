# Chess Rules Cross-Reference

This document provides a comprehensive cross-referenced analysis of all chess rules, connecting each rule to its corresponding mechanics and providing boardgame.io implementation guidance.

---

## Rules Analysis

### Game Nature and Objectives (Article 1.1)
- **Rule:** The game of chess is played between two opponents who move their pieces alternately on a square board called a 'chessboard'. The player with the white pieces commences the game. A player is said to 'have the move', when his opponent's move has been 'made'.
- **Context:** Establishes the fundamental nature of chess as a two-player alternating turn game with white having the first move advantage.
- **Related Mechanic(s):** [Alternating Turn Structure](../mechanics/mechanics.md#alternating-turn-structure), [Square Grid](../mechanics/mechanics.md#square-grid)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Turn order, ctx.currentPlayer, events.endTurn, numPlayers
  - **Integration Notes:** Use default round-robin turn order with 2 players. Initialize with player '0' (White) having first turn. Ensure moves call events.endTurn() to pass turn. Use ctx.currentPlayer to enforce turn-based movement.

### Victory Condition - Checkmate (Article 1.2)
- **Rule:** The objective of each player is to place the opponent's king 'under attack' in such a way that the opponent has no legal move. The player who achieves this goal is said to have 'checkmated' the opponent's king and to have won the game.
- **Context:** Defines the primary victory condition and establishes checkmate as the ultimate goal.
- **Related Mechanic(s):** [Check and King Safety](../mechanics/mechanics.md#check-and-king-safety), [Sudden Death Ending](../mechanics/mechanics.md#sudden-death-ending)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game end conditions, ctx, victory conditions, events.endGame
  - **Integration Notes:** Implement endIf function to check for checkmate after each move. Use events.endGame() with winner status. Create checkmate detection function that verifies king is in check and no legal moves exist.

### Illegal King Moves (Article 1.2)
- **Rule:** Leaving one's own king under attack, exposing one's own king to attack and also 'capturing' the opponent's king are not allowed.
- **Context:** Establishes core movement constraints that override normal piece movement rules.
- **Related Mechanic(s):** [Check and King Safety](../mechanics/mechanics.md#check-and-king-safety)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Move validation, game state analysis, conditional moves
  - **Integration Notes:** Validate all moves to ensure they don't leave own king in check. Implement check detection function that scans for pieces attacking the king. Prevent moves that would expose own king to attack.

### Draw by Impossibility (Article 1.3)
- **Rule:** If the position is such that neither player can possibly checkmate, the game is drawn.
- **Context:** Establishes automatic draw condition for insufficient material scenarios.
- **Related Mechanic(s):** [Draw Mechanisms](../mechanics/mechanics.md#draw-mechanisms), [Sudden Death Ending](../mechanics/mechanics.md#sudden-death-ending)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game end conditions, material analysis, events.endGame
  - **Integration Notes:** Track material count for insufficient material detection. Implement automatic draw detection when neither side can achieve checkmate. Use events.endGame() with draw status.

### Board Structure (Article 2.1)
- **Rule:** The chessboard is composed of an 8 x 8 grid of 64 equal squares alternately light (the 'white' squares) and dark (the 'black' squares). The chessboard is placed between the players in such a way that the near corner square to the right of the player is white.
- **Context:** Defines the physical structure and orientation of the chess board.
- **Related Mechanic(s):** [Square Grid](../mechanics/mechanics.md#square-grid)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game state (G), board representation
  - **Integration Notes:** Represent board as 8x8 structure in G. Use algebraic notation (a1-h8) for square identification. Implement coordinate conversion between algebraic notation and array indices.

### Initial Piece Setup (Article 2.2)
- **Rule:** At the beginning of the game one player has 16 light-coloured pieces (the 'white' pieces); the other has 16 dark-coloured pieces (the 'black' pieces).
- **Context:** Establishes the piece distribution and color assignment for each player.
- **Related Mechanic(s):** [Piece Value Hierarchy](../mechanics/mechanics.md#piece-value-hierarchy)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game setup, initial state, G initialization
  - **Integration Notes:** Initialize G with proper piece placement in setup function. Use consistent piece representation (e.g., 'K', 'Q', 'R', 'B', 'N', 'P' for white; lowercase for black).

### File and Rank System (Article 2.4)
- **Rule:** The eight vertical columns of squares are called 'files'. The eight horizontal rows of squares are called 'ranks'. A straight line of squares of the same colour, running from one edge of the board to an adjacent edge, is called a 'diagonal'.
- **Context:** Establishes the coordinate system and terminology for board navigation.
- **Related Mechanic(s):** [Square Grid](../mechanics/mechanics.md#square-grid)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Coordinate system, move validation, algebraic notation
  - **Integration Notes:** Implement helper functions for file/rank/diagonal calculations. Use algebraic notation (a1-h8) consistently. Create coordinate conversion utilities for move processing.

### Capture Rules (Article 3.1)
- **Rule:** It is not permitted to move a piece to a square occupied by a piece of the same colour. If a piece moves to a square occupied by an opponent's piece the latter is captured and removed from the chessboard as part of the same move.
- **Context:** Defines basic capture mechanics and friendly fire prevention.
- **Related Mechanic(s):** [Static Capture](../mechanics/mechanics.md#static-capture)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game state (G), moves, state immutability
  - **Integration Notes:** In move functions, check if destination square contains opponent piece. If so, remove captured piece from board state and place capturing piece. Ensure proper state mutation follows boardgame.io immutability patterns.

### Attack Definition (Article 3.1)
- **Rule:** A piece is said to attack an opponent's piece if the piece could make a capture on that square according to the movement rules. A piece is considered to attack a square, even if such a piece is constrained from moving to that square because it would then leave or place the king of its own colour under attack.
- **Context:** Distinguishes between legal moves and squares under attack for check calculation.
- **Related Mechanic(s):** [Check and King Safety](../mechanics/mechanics.md#check-and-king-safety)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Move validation, attack calculation, check detection
  - **Integration Notes:** Create separate functions for calculating attacks vs legal moves. Attack calculation ignores king safety for the attacking piece. Use attack calculation for check detection.

### Bishop Movement (Article 3.2)
- **Rule:** The bishop may move to any square along a diagonal on which it stands.
- **Context:** Defines bishop's diagonal movement pattern.
- **Related Mechanic(s):** [Pattern Movement](../mechanics/mechanics.md#pattern-movement)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, move validation, diagonal calculation
  - **Integration Notes:** Implement diagonal movement validation for bishops. Check for piece blocking along diagonal path. Use helper functions for diagonal direction calculation.

### Rook Movement (Article 3.3)
- **Rule:** The rook may move to any square along the file or the rank on which it stands.
- **Context:** Defines rook's horizontal and vertical movement pattern.
- **Related Mechanic(s):** [Pattern Movement](../mechanics/mechanics.md#pattern-movement)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, move validation, rank/file calculation
  - **Integration Notes:** Implement rank and file movement validation for rooks. Check for piece blocking along straight paths. Track rook movement for castling rights.

### Queen Movement (Article 3.4)
- **Rule:** The queen may move to any square along the file, the rank or a diagonal on which it stands.
- **Context:** Defines queen's combined rook and bishop movement pattern.
- **Related Mechanic(s):** [Pattern Movement](../mechanics/mechanics.md#pattern-movement)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, move validation, combined movement patterns
  - **Integration Notes:** Combine rook and bishop movement validation for queen. Use existing diagonal and straight-line movement functions.

### Piece Blocking (Article 3.5)
- **Rule:** When making these moves the bishop, rook or queen may not move over any intervening pieces.
- **Context:** Establishes that sliding pieces cannot jump over other pieces.
- **Related Mechanic(s):** [Pattern Movement](../mechanics/mechanics.md#pattern-movement)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Path validation, move calculation
  - **Integration Notes:** Implement path-clear checking for sliding pieces. Validate each square between start and destination is empty.

### Knight Movement (Article 3.6)
- **Rule:** The knight may move to one of the squares nearest to that on which it stands but not on the same rank, file or diagonal.
- **Context:** Defines knight's unique L-shaped movement pattern and jumping ability.
- **Related Mechanic(s):** [Pattern Movement](../mechanics/mechanics.md#pattern-movement)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, special movement patterns, jumping moves
  - **Integration Notes:** Implement L-shaped movement validation for knights. Knight moves don't require path-clear checking since they can jump.

### Pawn Forward Movement (Article 3.7a-b)
- **Rule:** The pawn may move forward to the unoccupied square immediately in front of it on the same file, or on its first move the pawn may move as above or alternatively it may advance two squares along the same file provided both squares are unoccupied.
- **Context:** Defines pawn's basic forward movement and initial two-square option.
- **Related Mechanic(s):** [Pattern Movement](../mechanics/mechanics.md#pattern-movement)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, conditional movement, first move detection
  - **Integration Notes:** Track pawn starting positions to allow two-square first moves. Validate destination squares are empty for pawn advances.

### Pawn Capture (Article 3.7c)
- **Rule:** The pawn may move to a square occupied by an opponent's piece, which is diagonally in front of it on an adjacent file, capturing that piece.
- **Context:** Defines pawn's diagonal capture pattern, different from its movement pattern.
- **Related Mechanic(s):** [Pattern Movement](../mechanics/mechanics.md#pattern-movement), [Static Capture](../mechanics/mechanics.md#static-capture)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, directional capture, piece differentiation
  - **Integration Notes:** Implement separate validation for pawn capture vs movement. Check diagonal squares for enemy pieces.

### En Passant Capture (Article 3.7d)
- **Rule:** A pawn attacking a square crossed by an opponent's pawn which has advanced two squares in one move from its original square may capture this opponent's pawn as though the latter had been moved only one square. This capture is only legal on the move following this advance and is called an 'en passant' capture.
- **Context:** Defines the special en passant capture rule and its timing requirements.
- **Related Mechanic(s):** [En Passant Capture](../mechanics/mechanics.md#en-passant-capture), [Once-Per-Game Abilities](../mechanics/mechanics.md#once-per-game-abilities)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game state tracking, temporal conditions, move history
  - **Integration Notes:** Track last move in G to identify eligible en passant targets. Implement en passant move validation that checks for correct timing and positioning. Remove captured pawn from different square than destination.

### Pawn Promotion (Article 3.7e)
- **Rule:** When a pawn reaches the rank furthest from its starting position it must be exchanged as part of the same move on the same square for a new queen, rook, bishop or knight of the same colour. The player's choice is not restricted to pieces that have been captured previously. This exchange of a pawn for another piece is called 'promotion' and the effect of the new piece is immediate.
- **Context:** Defines mandatory pawn promotion and piece choice options.
- **Related Mechanic(s):** [Pawn Promotion](../mechanics/mechanics.md#pawn-promotion), [Once-Per-Game Abilities](../mechanics/mechanics.md#once-per-game-abilities)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, state transformation, conditional actions
  - **Integration Notes:** Implement promotion move that requires piece selection parameter. Create UI interaction for piece selection when pawn reaches final rank. Update board state to replace pawn with chosen piece type.

### King Normal Movement (Article 3.8a)
- **Rule:** The king can move to any adjoining square not attacked by one or more of the opponent's pieces.
- **Context:** Defines king's basic one-square movement with safety constraints.
- **Related Mechanic(s):** [Pattern Movement](../mechanics/mechanics.md#pattern-movement), [Check and King Safety](../mechanics/mechanics.md#check-and-king-safety)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** moves, attack detection, king safety validation
  - **Integration Notes:** Validate king moves don't place king in check. Use attack calculation to verify destination square safety.

### Castling Move (Article 3.8a)
- **Rule:** The king may move by 'castling'. This is a move of the king and either rook of the same colour along the player's first rank, counting as a single move of the king and executed as follows: the king is transferred from its original square two squares towards the rook on its original square, then that rook is transferred to the square the king has just crossed.
- **Context:** Defines the special castling move involving both king and rook.
- **Related Mechanic(s):** [Castling](../mechanics/mechanics.md#castling), [Once-Per-Game Abilities](../mechanics/mechanics.md#once-per-game-abilities)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Complex moves, move history tracking, multiple piece movement
  - **Integration Notes:** Implement castling as single move that moves both king and rook. Track castling rights in game state. Validate clear path, no check conditions, and piece movement history.

### Castling Rights Loss (Article 3.8b)
- **Rule:** The right to castle has been lost: if the king has already moved, or with a rook that has already moved.
- **Context:** Establishes permanent loss of castling rights based on piece movement.
- **Related Mechanic(s):** [Castling](../mechanics/mechanics.md#castling), [Once-Per-Game Abilities](../mechanics/mechanics.md#once-per-game-abilities)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game state tracking, move history, castling rights
  - **Integration Notes:** Track castling rights in G (e.g., G.castlingRights = {white: {kingside: true, queenside: true}, black: {...}}). Update castling rights when king or rook moves.

### Castling Prevention (Article 3.8b)
- **Rule:** Castling is prevented temporarily: if the square on which the king stands, or the square which it must cross, or the square which it is to occupy, is attacked by one or more of the opponent's pieces, or if there is any piece between the king and the rook with which castling is to be effected.
- **Context:** Establishes temporary conditions that prevent castling even when rights are retained.
- **Related Mechanic(s):** [Castling](../mechanics/mechanics.md#castling), [Check and King Safety](../mechanics/mechanics.md#check-and-king-safety)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Complex validation, attack detection, path checking
  - **Integration Notes:** Validate king's path is not under attack during castling. Check for clear path between king and rook. Verify king is not currently in check.

### Check Definition (Article 3.9)
- **Rule:** The king is said to be 'in check' if it is attacked by one or more of the opponent's pieces, even if such pieces are constrained from moving to that square because they would then leave or place their own king in check.
- **Context:** Defines check condition and clarifies that pinned pieces still give check.
- **Related Mechanic(s):** [Check and King Safety](../mechanics/mechanics.md#check-and-king-safety)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Check detection, attack calculation, game state analysis
  - **Integration Notes:** Implement check detection function that scans for pieces attacking the king. Use attack calculation that ignores king safety for attacking pieces.

### Check Resolution Requirement (Article 3.9)
- **Rule:** No piece can be moved that will either expose the king of the same colour to check or leave that king in check.
- **Context:** Establishes that resolving check takes priority over all other moves.
- **Related Mechanic(s):** [Check and King Safety](../mechanics/mechanics.md#check-and-king-safety)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Move validation, check resolution, legal move generation
  - **Integration Notes:** Validate all moves to ensure they resolve check when king is in check. Create helper functions to determine if a move resolves check.

### Touch Move Rule (Article 4.3)
- **Rule:** If the player having the move deliberately touches on the chessboard: one or more of his own pieces, he must move the first piece touched which can be moved; one or more of his opponent's pieces, he must capture the first piece touched which can be captured.
- **Context:** Establishes physical interaction rules for over-the-board play.
- **Related Mechanic(s):** Not directly applicable to digital implementation
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** UI interaction, move commitment
  - **Integration Notes:** Not applicable for digital implementation, but could inform UI design for move selection and confirmation.

### Castling Touch Rule (Article 4.4)
- **Rule:** If a player having the move deliberately touches his king and rook he must castle on that side if it is legal to do so.
- **Context:** Specific touch move rules for castling.
- **Related Mechanic(s):** [Castling](../mechanics/mechanics.md#castling)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** UI interaction, move commitment
  - **Integration Notes:** Not directly applicable for digital implementation, but could inform UI design for castling move selection.

### Move Completion (Article 4.6)
- **Rule:** When, as a legal move or part of a legal move, a piece has been released on a square, it cannot be moved to another square on this move. The move is then considered to have been made.
- **Context:** Defines when a move is considered final and cannot be changed.
- **Related Mechanic(s):** Not directly applicable to digital implementation
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Move finalization, UI interaction
  - **Integration Notes:** In digital implementation, moves are atomic. Consider implementing move confirmation UI for better user experience.

### Victory by Checkmate (Article 5.1a)
- **Rule:** The game is won by the player who has checkmated his opponent's king. This immediately ends the game, provided that the move producing the checkmate position was a legal move.
- **Context:** Confirms checkmate as the primary victory condition with immediate game termination.
- **Related Mechanic(s):** [Check and King Safety](../mechanics/mechanics.md#check-and-king-safety), [Sudden Death Ending](../mechanics/mechanics.md#sudden-death-ending)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game end conditions, victory detection, events.endGame
  - **Integration Notes:** Implement checkmate detection in endIf function. Use events.endGame() with appropriate winner. Verify move legality before declaring checkmate.

### Victory by Resignation (Article 5.1b)
- **Rule:** The game is won by the player whose opponent declares he resigns. This immediately ends the game.
- **Context:** Establishes resignation as a valid way to end the game.
- **Related Mechanic(s):** [Sudden Death Ending](../mechanics/mechanics.md#sudden-death-ending)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game end conditions, player actions, events.endGame
  - **Integration Notes:** Implement resignation move/action that calls events.endGame() with appropriate winner. Provide UI for resignation option.

### Draw by Stalemate (Article 5.2a)
- **Rule:** The game is drawn when the player to move has no legal move and his king is not in check. The game is said to end in 'stalemate'. This immediately ends the game, provided that the move producing the stalemate position was legal.
- **Context:** Defines stalemate as a specific draw condition.
- **Related Mechanic(s):** [Draw Mechanisms](../mechanics/mechanics.md#draw-mechanisms), [Sudden Death Ending](../mechanics/mechanics.md#sudden-death-ending)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game end conditions, legal move generation, events.endGame
  - **Integration Notes:** Implement stalemate detection by checking if current player has no legal moves while not in check. Use events.endGame() with draw status.

### Draw by Dead Position (Article 5.2b)
- **Rule:** The game is drawn when a position has arisen in which neither player can checkmate the opponent's king with any series of legal moves. The game is said to end in a 'dead position'.
- **Context:** Establishes automatic draw for positions where checkmate is impossible.
- **Related Mechanic(s):** [Draw Mechanisms](../mechanics/mechanics.md#draw-mechanisms)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Material analysis, automatic draw detection, events.endGame
  - **Integration Notes:** Implement insufficient material detection (e.g., K vs K, K+B vs K, K+N vs K). Check for dead position after each move.

### Draw by Agreement (Article 5.2c)
- **Rule:** The game is drawn upon agreement between the two players during the game. This immediately ends the game.
- **Context:** Allows players to mutually agree to a draw.
- **Related Mechanic(s):** [Draw Mechanisms](../mechanics/mechanics.md#draw-mechanisms)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Player actions, mutual agreement, events.endGame
  - **Integration Notes:** Implement draw offer and acceptance mechanisms. Provide UI for offering and responding to draw offers.

### Draw by Threefold Repetition (Article 5.2d)
- **Rule:** The game may be drawn if any identical position is about to appear or has appeared on the chessboard at least three times.
- **Context:** Establishes repetition draw rule with claim requirement.
- **Related Mechanic(s):** [Draw Mechanisms](../mechanics/mechanics.md#draw-mechanisms)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Position history tracking, draw claims, events.endGame
  - **Integration Notes:** Track position history for repetition detection. Implement draw claim mechanism for threefold repetition. Consider automatic draw on fivefold repetition.

### Draw by Fifty-Move Rule (Article 5.2e)
- **Rule:** The game may be drawn if each player has made at least the last 50 consecutive moves without the movement of any pawn and without any capture.
- **Context:** Establishes fifty-move rule with claim requirement.
- **Related Mechanic(s):** [Draw Mechanisms](../mechanics/mechanics.md#draw-mechanisms)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Move counting, draw claims, move history
  - **Integration Notes:** Track moves since last pawn move or capture. Reset counter on pawn moves or captures. Implement draw claim mechanism at 50 moves.

### Chess Clock Usage (Article 6.1-6.2)
- **Rule:** Each player must make a minimum number of moves or all moves in an allotted period of time.
- **Context:** Establishes time control as part of competitive chess.
- **Related Mechanic(s):** [Time Control](../mechanics/mechanics.md#time-control)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Turn timer, ctx.turn, game configuration
  - **Integration Notes:** Use boardgame.io's built-in turn timing features if implementing timed play. Configure appropriate time limits in game config. Handle timeout conditions with automatic game ending.

### Loss by Time (Article 6.9)
- **Rule:** If a player does not complete the prescribed number of moves in the allotted time, the game is lost by the player. However, the game is drawn, if the position is such that the opponent cannot checkmate the player's king by any possible series of legal moves.
- **Context:** Establishes time forfeit rules with insufficient material exception.
- **Related Mechanic(s):** [Time Control](../mechanics/mechanics.md#time-control), [Draw Mechanisms](../mechanics/mechanics.md#draw-mechanisms)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Timeout handling, material analysis, automatic game ending
  - **Integration Notes:** Handle timeout events with winner determination. Check for insufficient material before awarding win on time.

### Illegal Move Penalties (Article 7.4)
- **Rule:** If during a game it is found that an illegal move has been completed, the position immediately before the irregularity shall be reinstated. For the first two illegal moves by a player the arbiter shall give two minutes extra time to his opponent; for a third illegal move by the same player, the arbiter shall declare the game lost by this player.
- **Context:** Establishes penalties for illegal moves in competitive play.
- **Related Mechanic(s):** Not directly applicable to digital implementation
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Move validation, error prevention
  - **Integration Notes:** Digital implementation should prevent illegal moves rather than penalize them. Robust move validation eliminates the need for illegal move handling.

### Move Recording (Article 8.1)
- **Rule:** In the course of play each player is required to record his own moves and those of his opponent in the correct manner, move after move.
- **Context:** Establishes move recording requirements for tournament play.
- **Related Mechanic(s):** Not directly applicable to digital implementation
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Move logging, game history
  - **Integration Notes:** boardgame.io automatically tracks move history. Consider implementing algebraic notation display for move history.

### Draw Offer Rules (Article 9.1)
- **Rule:** A player wishing to offer a draw shall do so after having made a move on the chessboard and before stopping his clock and starting the opponent's clock.
- **Context:** Establishes proper timing and procedure for draw offers.
- **Related Mechanic(s):** [Draw Mechanisms](../mechanics/mechanics.md#draw-mechanisms)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Turn timing, draw offers, UI interaction
  - **Integration Notes:** Implement draw offer mechanism that integrates with turn structure. Provide UI for offering draws at appropriate times.

### Threefold Repetition Claim (Article 9.2)
- **Rule:** The game is drawn upon a correct claim by the player having the move, when the same position, for at least the third time is about to appear or has just appeared.
- **Context:** Detailed rules for claiming threefold repetition draw.
- **Related Mechanic(s):** [Draw Mechanisms](../mechanics/mechanics.md#draw-mechanisms)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Position comparison, draw claims, move validation
  - **Integration Notes:** Implement position comparison that considers piece positions, castling rights, and en passant availability. Track position occurrences for claim validation.

### Fifty-Move Rule Claim (Article 9.3)
- **Rule:** The game is drawn, upon a correct claim by the player having the move, if he writes his move and declares his intention to make the move which shall result in the last 50 moves having been made by each player without the movement of any pawn and without any capture.
- **Context:** Detailed procedure for claiming fifty-move rule draw.
- **Related Mechanic(s):** [Draw Mechanisms](../mechanics/mechanics.md#draw-mechanisms)
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Move counting, draw claims, move analysis
  - **Integration Notes:** Track halfmove clock (moves since last pawn move or capture). Reset on pawn moves or captures. Allow draw claims at appropriate thresholds.

### Point Scoring (Article 11.1)
- **Rule:** A player who wins his game scores one point (1), a player who loses his game scores no points (0) and a player who draws his game scores a half point (½).
- **Context:** Establishes standard chess scoring system for tournaments.
- **Related Mechanic(s):** Not directly applicable to single-game implementation
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Game results, scoring systems
  - **Integration Notes:** boardgame.io tracks game results. Tournament scoring would be handled at a higher level than individual game implementation.

---

## Unmapped Rules

The following rules from the FIDE Laws of Chess do not directly map to specific game mechanics but are important for complete rule coverage:

### Competition and Arbitration Rules
- Articles 12-14: Player conduct, arbiter role, and FIDE procedures
- These are administrative rules for tournament play rather than game mechanics

### Variant Rules
- Appendices A-F: Rapidplay, Blitz, notation, quickplay finishes, blind play, Chess960
- These modify standard rules for specific contexts

### Physical Play Rules
- Touch-move rules, clock handling, score recording
- These apply to over-the-board play but not digital implementation

---

## Implementation Priority

For boardgame.io implementation, rules should be implemented in this priority order:

1. **Core Game Mechanics** (High Priority)
   - Basic piece movement and capture
   - Check and checkmate detection
   - Turn management and game flow

2. **Special Moves** (Medium Priority)
   - Castling, en passant, pawn promotion
   - Move validation for special cases

3. **Draw Conditions** (Medium Priority)
   - Stalemate, insufficient material
   - Repetition and fifty-move rule tracking

4. **Advanced Features** (Low Priority)
   - Time controls, algebraic notation display
   - Draw offers and resignation UI

This cross-reference provides a comprehensive mapping between chess rules and their mechanical implementation, enabling systematic and complete chess game development using the boardgame.io framework.
