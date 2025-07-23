# Chess Game Mechanics Reference

## Mechanics List

### Grid Movement
- **Description:** Players move pieces along grid lines on an 8x8 square board, with each piece having specific movement patterns along ranks, files, and diagonals.
- **BGG Mapping:** Grid Movement
- **BGG Mechanic ID(s):** 2676
- **BGG Mechanic Description(s):** Movement that is constrained to a grid (or lattice) of some kind.
- **Justification:** Perfect match - Chess pieces move strictly within the constraints of the 8x8 square grid.
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** Game state (G), moves, square grid representation, move validation
    - **Integration Notes:** Use G to represent the 8x8 board as a 2D array or flat array with position mapping. Create move functions that validate piece-specific movement patterns (e.g., rook moves along ranks/files, bishop moves diagonally). Implement grid coordinate system (a1-h8) for position tracking.

### Pattern Movement
- **Description:** Each piece type (King, Queen, Rook, Bishop, Knight, Pawn) has a unique, predefined movement pattern that defines how it can traverse the board.
- **BGG Mapping:** Pattern Movement
- **BGG Mechanic ID(s):** 2676
- **BGG Mechanic Description(s):** Pieces move in specific, predefined patterns rather than freely.
- **Justification:** Exact match - Chess pieces have highly specific movement patterns (L-shape for knights, diagonal for bishops, etc.).
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** moves, move validation, game logic
    - **Integration Notes:** Create dedicated movement validation functions for each piece type. Use helper functions to calculate valid moves based on piece type and current position. Implement pattern checking that considers board boundaries and piece blocking.

### Static Capture
- **Description:** Pieces capture opponent pieces by moving into their square, with the captured piece being immediately removed from the board.
- **BGG Mapping:** Static Capture
- **BGG Mechanic ID(s):** 2676
- **BGG Mechanic Description(s):** Pieces are captured by being displaced from their position.
- **Justification:** Perfect match - Chess uses displacement capture where moving to an occupied square captures the piece.
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** Game state (G), moves, state immutability
    - **Integration Notes:** In move functions, check if destination square contains opponent piece. If so, remove captured piece from board state and place capturing piece. Ensure proper state mutation follows boardgame.io immutability patterns.

### Square Grid
- **Description:** The game is played on an 8x8 grid of alternating light and dark squares, providing the spatial framework for all piece movement and positioning.
- **BGG Mapping:** Square Grid
- **BGG Mechanic ID(s):** 2016
- **BGG Mechanic Description(s):** Game is played on a square grid.
- **Justification:** Exact match - Chess is played on an 8x8 square grid.
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** Game state (G), board representation
    - **Integration Notes:** Represent board as 8x8 structure in G. Use algebraic notation (a1-h8) for square identification. Implement coordinate conversion between algebraic notation and array indices for move processing.

### Once-Per-Game Abilities
- **Description:** Special moves that can only be performed once per game under specific conditions: castling (king and rook), en passant capture (pawns), and pawn promotion.
- **BGG Mapping:** Once-Per-Game Abilities
- **BGG Mechanic ID(s):** 2689
- **BGG Mechanic Description(s):** Abilities or actions that can only be used once during the entire game.
- **Justification:** Strong match - Castling can only happen once per game per side, and each pawn can only be promoted once.
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** Game state (G), move tracking, conditional moves
    - **Integration Notes:** Track castling rights in G (e.g., G.castlingRights = {white: {kingside: true, queenside: true}, black: {...}}). Implement special move validation that checks prerequisites (king/rook unmoved, no check, clear path). Update state flags when special moves are used.

### Sudden Death Ending
- **Description:** The game ends immediately when checkmate or stalemate occurs, or when certain draw conditions are met (insufficient material, threefold repetition, 50-move rule).
- **BGG Mapping:** Sudden Death Ending
- **BGG Mechanic ID(s):** 2026
- **BGG Mechanic Description(s):** The game can end suddenly when certain conditions are met.
- **Justification:** Perfect match - Chess ends immediately upon checkmate, stalemate, or accepted draw.
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** Game end conditions, ctx, victory conditions, events.endGame
    - **Integration Notes:** Implement endIf function to check for checkmate/stalemate after each move. Use events.endGame() with winner/draw status. Track game state for draw conditions (move count, repetition, material).

### Alternating Turn Structure
- **Description:** Players take turns moving one piece at a time, with White always moving first, creating a strict alternating sequence throughout the game.
- **BGG Mapping:** Unique
- **BGG Mechanic ID(s):** N/A
- **BGG Mechanic Description(s):** N/A
- **Justification:** While turn-based play is common, Chess's specific "White moves first" convention and strict one-move-per-turn structure is a fundamental mechanic worth noting separately.
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** Turn order, ctx.currentPlayer, events.endTurn
    - **Integration Notes:** Use default round-robin turn order with 2 players. Ensure moves call events.endTurn() to pass turn. Initialize with player '0' (White) having first turn. Use ctx.currentPlayer to enforce turn-based movement.

### Check and King Safety
- **Description:** The king cannot move into check, pieces cannot move if they would expose their own king to check, and check must be resolved immediately.
- **BGG Mapping:** Unique
- **BGG Mechanic ID(s):** N/A
- **BGG Mechanic Description(s):** N/A
- **Justification:** The concept of check and mandatory king protection is unique to Chess and Chess-like games, representing a core constraint on all legal moves.
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** Move validation, game state analysis, conditional moves
    - **Integration Notes:** Implement check detection function that scans for pieces attacking the king. Validate all moves to ensure they don't leave own king in check. Create helper functions to determine if a move resolves check when king is in check.

### Piece Value Hierarchy
- **Description:** Pieces have implicit relative values based on their movement capabilities and strategic importance (Pawn=1, Knight/Bishop≈3, Rook≈5, Queen≈9, King=invaluable).
- **BGG Mapping:** Unique
- **BGG Mechanic ID(s):** N/A
- **BGG Mechanic Description(s):** N/A
- **Justification:** While not explicitly stated in rules, piece values are fundamental to Chess strategy and affect all decisions about captures and sacrifices.
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** Game state representation, AI evaluation (if implementing computer opponent)
    - **Integration Notes:** Store piece values as constants for evaluation functions. Use in material counting for draw conditions (insufficient material). Can inform AI move evaluation if implementing computer opponents.

### Pawn Promotion
- **Description:** When a pawn reaches the opposite end of the board, it must be promoted to any piece except another pawn or king (Queen, Rook, Bishop, or Knight).
- **BGG Mapping:** Unique (subset of Once-Per-Game Abilities)
- **BGG Mechanic ID(s):** N/A
- **BGG Mechanic Description(s):** N/A
- **Justification:** While promotion is a once-per-game ability per pawn, it's mechanically distinct enough to warrant separate analysis due to its transformation nature.
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** moves, state transformation, conditional actions
    - **Integration Notes:** Implement promotion move that requires piece selection parameter. Create UI interaction for piece selection when pawn reaches final rank. Update board state to replace pawn with chosen piece type.

### En Passant Capture
- **Description:** A special pawn capture that can only occur immediately after an opponent's pawn moves two squares from its starting position, allowing capture "in passing" of the pawn that jumped.
- **BGG Mapping:** Unique (subset of Once-Per-Game Abilities)
- **BGG Mechanic ID(s):** N/A
- **BGG Mechanic Description(s):** N/A
- **Justification:** En passant is a unique capturing mechanism that exists only under very specific temporal conditions.
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** Game state tracking, temporal conditions, move history
    - **Integration Notes:** Track last move in G to identify eligible en passant targets. Implement en passant move validation that checks for correct timing and positioning. Remove captured pawn from different square than destination.

### Castling
- **Description:** A special move involving the king and one rook moving simultaneously, with specific requirements about piece movement history, board state, and king safety.
- **BGG Mapping:** Unique (subset of Once-Per-Game Abilities)
- **BGG Mechanic ID(s):** N/A
- **BGG Mechanic Description(s):** N/A
- **Justification:** Castling is mechanically unique as the only move that involves two pieces simultaneously and has complex prerequisite validation.
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** Complex moves, move history tracking, multiple piece movement
    - **Integration Notes:** Implement castling as single move that moves both king and rook. Track castling rights in game state. Validate clear path, no check conditions, and piece movement history before allowing castling.

### Time Control
- **Description:** Players have limited time to make their moves, tracked by chess clocks, with various time control formats (classical, rapid, blitz).
- **BGG Mapping:** Unique
- **BGG Mechanic ID(s):** N/A
- **BGG Mechanic Description(s):** N/A
- **Justification:** While many games have time limits, Chess's sophisticated time control systems are a core competitive mechanic.
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** Turn timer, ctx.turn, game configuration
    - **Integration Notes:** Use boardgame.io's built-in turn timing features if implementing timed play. Configure appropriate time limits in game config. Handle timeout conditions with automatic game ending.

### Draw Mechanisms
- **Description:** Multiple ways the game can end in a draw: stalemate, insufficient material, threefold repetition, 50-move rule, and mutual agreement.
- **BGG Mapping:** Unique
- **BGG Mechanic ID(s):** N/A
- **BGG Mechanic Description(s):** N/A
- **Justification:** Chess has an unusually rich set of draw conditions, each with different triggering mechanisms.
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** Game end conditions, move tracking, position history, events.endGame
    - **Integration Notes:** Track move count for 50-move rule, position history for threefold repetition, and material count for insufficient material. Implement draw claiming mechanisms and automatic draw detection.

---

## Summary Table

| Mechanic Name | BGG Mapping | BGG Mechanic ID(s) | Unique/Standard | Category | boardgame.io Concepts |
|--------------|-------------|-------------------|----------------|----------|----------------------|
| Grid Movement | Grid Movement | 2676 | Standard | Movement | Game state, moves, grid representation |
| Pattern Movement | Pattern Movement | 2676 | Standard | Movement | moves, move validation, game logic |
| Static Capture | Static Capture | 2676 | Standard | Combat | Game state, moves, state immutability |
| Square Grid | Square Grid | 2016 | Standard | Board Structure | Game state, board representation |
| Once-Per-Game Abilities | Once-Per-Game Abilities | 2689 | Standard | Special Actions | Game state, move tracking, conditional moves |
| Sudden Death Ending | Sudden Death Ending | 2026 | Standard | End Conditions | Game end conditions, ctx, events.endGame |
| Alternating Turn Structure | Unique | N/A | Unique | Turn Management | Turn order, ctx.currentPlayer, events.endTurn |
| Check and King Safety | Unique | N/A | Unique | Movement Constraints | Move validation, game state analysis |
| Piece Value Hierarchy | Unique | N/A | Unique | Strategic Framework | Game state representation, evaluation |
| Pawn Promotion | Unique | N/A | Unique | Piece Transformation | moves, state transformation, conditional actions |
| En Passant Capture | Unique | N/A | Unique | Special Capture | Game state tracking, temporal conditions |
| Castling | Unique | N/A | Unique | Special Movement | Complex moves, move history tracking |
| Time Control | Unique | N/A | Unique | Game Pacing | Turn timer, ctx.turn, game configuration |
| Draw Mechanisms | Unique | N/A | Unique | End Conditions | Game end conditions, move tracking, position history |

---

This document provides a comprehensive analysis of all Chess mechanics, mapping them to BoardGameGeek standards where applicable and providing specific boardgame.io implementation guidance for each mechanic. The analysis covers both explicitly stated rules and implicit mechanical structures that define Chess gameplay.
