# Cross-Referenced Chess Rules

This document presents the FIDE Laws of Chess as atomic, cross-referenced rules, each mapped to the relevant game mechanics as described in [mechanics.md](../mechanics/mechanics.md). Each section below corresponds to a specific rule or article, with direct links to the mechanics it implements. Unmapped rules and mechanics are noted at the end.

---

### Alternating Moves (Article 1.1)
- **Rule:** Players move their pieces alternately; the player with the white pieces moves first.
- **Context:** Establishes turn order and who begins the game.
- **Related Mechanic(s):** [Turn-Based Play](../mechanics/mechanics.md#turn-based-play)

### Objective: Checkmate (Article 1.2)
- **Rule:** The objective is to place the opponent’s king under attack so that the opponent has no legal move (checkmate). The player who achieves this wins the game.
- **Context:** Defines the win condition in chess.
- **Related Mechanic(s):** [Check/Checkmate/Stalemate](../mechanics/mechanics.md#unique-checkcheckmatestalemate)

### Drawn Game: Dead Position (Article 1.3)
- **Rule:** If neither player can possibly checkmate, the game is drawn.
- **Context:** Defines a draw by dead position.
- **Related Mechanic(s):** [Check/Checkmate/Stalemate](../mechanics/mechanics.md#unique-checkcheckmatestalemate)

### Chessboard Structure (Article 2.1, 2.4)
- **Rule:** The chessboard is an 8x8 grid of 64 squares, with alternating colors. Columns are called files, rows are ranks, and diagonals are straight lines of the same color.
- **Context:** Establishes the spatial structure for movement and play.
- **Related Mechanic(s):** [Grid Movement](../mechanics/mechanics.md#grid-movement)

### Initial Setup (Article 2.2, 2.3)
- **Rule:** Each player starts with 16 pieces in a specific arrangement.
- **Context:** Defines the standard starting position.
- **Related Mechanic(s):** [Variable Setup (Chess960)](../mechanics/mechanics.md#variable-setup-chess960) (for Chess960 only)

### Piece Movement Patterns (Articles 3.2–3.4, 3.6, 3.7, 3.8)
- **Rule:** Each piece type (bishop, rook, queen, knight, pawn, king) has a unique movement pattern.
- **Context:** Details how each piece moves.
- **Related Mechanic(s):** [Pattern Movement](../mechanics/mechanics.md#pattern-movement), [Grid Movement](../mechanics/mechanics.md#grid-movement)

### Capturing Pieces (Article 3.1, 3.7c)
- **Rule:** A piece captures by moving to a square occupied by an opponent’s piece, which is then removed from the board.
- **Context:** Describes the standard capture method.
- **Related Mechanic(s):** [Static Capture](../mechanics/mechanics.md#static-capture)

### Special Moves: En Passant, Promotion, Castling (Articles 3.7d, 3.7e, 3.8)
- **Rule:**
  - En passant: A pawn may capture an opponent’s pawn that has just advanced two squares, as if it had moved only one square. This must be done immediately.
  - Promotion: When a pawn reaches the farthest rank, it must be exchanged for a queen, rook, bishop, or knight.
  - Castling: The king and rook may move simultaneously under specific conditions, counting as a single move.
- **Context:** Defines special, conditional moves in chess.
- **Related Mechanic(s):** [Once-Per-Game Abilities](../mechanics/mechanics.md#once-per-game-abilities-castling-en-passant-promotion)

### King in Check (Article 3.9)
- **Rule:** The king is in check if attacked by an opponent’s piece. No move may leave or place the king in check.
- **Context:** Central to win/loss conditions and legal move determination.
- **Related Mechanic(s):** [Check/Checkmate/Stalemate](../mechanics/mechanics.md#unique-checkcheckmatestalemate)

### Touch-Move Rule (Articles 4.3, 4.4)
- **Rule:** If a player deliberately touches a piece, they must move it if legal. If a player touches an opponent’s piece, they must capture it if legal. Special rules apply for castling and promotion.
- **Context:** Enforces action commitment and careful planning.
- **Related Mechanic(s):** [Hand Management (Touch-Move Rule)](../mechanics/mechanics.md#hand-management-touch-move-rule)

### Move Completion (Article 4.6)
- **Rule:** A move is considered made when the piece is released on a square, or in the case of a capture, when the captured piece is removed and the moving piece is released.
- **Context:** Defines when a move is finalized.
- **Related Mechanic(s):** [Turn-Based Play](../mechanics/mechanics.md#turn-based-play)

### Win by Checkmate or Resignation (Articles 5.1a, 5.1b)
- **Rule:** The game ends immediately when a player is checkmated or resigns.
- **Context:** Defines sudden end conditions.
- **Related Mechanic(s):** [Sudden Death Ending](../mechanics/mechanics.md#sudden-death-ending), [Player Elimination (Resignation)](../mechanics/mechanics.md#player-elimination-resignation), [Check/Checkmate/Stalemate](../mechanics/mechanics.md#unique-checkcheckmatestalemate)

### Draw Conditions (Articles 5.2a–5.2e, 9.1–9.3)
- **Rule:** The game is drawn by stalemate, dead position, agreement, threefold repetition, or the fifty-move rule.
- **Context:** Outlines all draw scenarios.
- **Related Mechanic(s):** [Check/Checkmate/Stalemate](../mechanics/mechanics.md#unique-checkcheckmatestalemate), [Simultaneous Action Selection (Draw by Agreement)](../mechanics/mechanics.md#simultaneous-action-selection-draw-by-agreement)

### Chess Clock and Timing (Articles 6.1–6.14)
- **Rule:** A chess clock is used to limit each player’s time. Various timing systems are allowed, and time management is enforced.
- **Context:** Regulates the pace of play and introduces time-based loss conditions.
- **Related Mechanic(s):** [Time Track (Chess Clock)](../mechanics/mechanics.md#time-track-chess-clock)

### Irregularities and Illegal Moves (Articles 7.1–7.4)
- **Rule:** If an illegal move is made or the initial position is incorrect, the position is corrected or the game restarted as appropriate.
- **Context:** Ensures the integrity of play.
- **Related Mechanic(s):** [Turn-Based Play](../mechanics/mechanics.md#turn-based-play), [Pattern Movement](../mechanics/mechanics.md#pattern-movement)

---

## Unmapped Rules

- Rules regarding notation, conduct, and the role of the arbiter (Articles 8, 11, 12, 13, 14) do not directly map to a game mechanic but are essential for tournament and administrative purposes.

---

## Mechanics Not Referenced by Any Rule

- All mechanics in [mechanics.md](../mechanics/mechanics.md) are referenced by at least one rule in this document.

---

*This document enables unambiguous reasoning about chess rules and their underlying mechanics for players, arbiters, and researchers.*
