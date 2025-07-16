---
# Game Mechanics Reference

## Mechanics List

### Turn-Based Play
- **Description:** Players alternate turns, with only one player acting at a time. The player with the white pieces always moves first.
- **BGG Mapping:** Turn Order: Alternating
- **BGG Mechanic ID(s):** 2043
- **BGG Mechanic Description(s):** Players take turns in a fixed, alternating order.
- **Justification:** Explicit in Article 1.1 and a core structure of chess.

### Grid Movement
- **Description:** Pieces move on an 8x8 square grid (the chessboard), with movement constrained by the grid's structure.
- **BGG Mapping:** Grid Movement, Square Grid
- **BGG Mechanic ID(s):** 2934, 2935
- **BGG Mechanic Description(s):** Grid Movement: Movement is restricted to a grid. Square Grid: The board is made up of square spaces.
- **Justification:** The chessboard and all piece movement are defined by the grid.

### Pattern Movement
- **Description:** Each piece type has a unique movement pattern (e.g., bishop moves diagonally, rook orthogonally, knight in L-shape, etc.).
- **BGG Mapping:** Pattern Movement
- **BGG Mechanic ID(s):** 2954
- **BGG Mechanic Description(s):** Pieces move according to specific patterns.
- **Justification:** Article 3 details unique movement for each piece.

### Static Capture
- **Description:** Capturing occurs by moving a piece onto a square occupied by an opponent's piece, removing it from the board.
- **BGG Mapping:** Static Capture
- **BGG Mechanic ID(s):** 2960
- **BGG Mechanic Description(s):** Pieces are captured by moving onto their space.
- **Justification:** Article 3.1 and piece-specific rules.

### Sudden Death Ending
- **Description:** The game ends immediately when a checkmate occurs, or in certain draw conditions (stalemate, dead position, etc.).
- **BGG Mapping:** Sudden Death Ending
- **BGG Mechanic ID(s):** 2961
- **BGG Mechanic Description(s):** The game ends instantly when a specific condition is met.
- **Justification:** Article 5.1, 5.2.

### Once-Per-Game Abilities (Castling, En Passant, Promotion)
- **Description:** Certain moves (castling, en passant, pawn promotion) are special and can only be performed under specific conditions, often once per game per piece.
- **BGG Mapping:** Once-Per-Game Abilities
- **BGG Mechanic ID(s):** 2959
- **BGG Mechanic Description(s):** Abilities or actions that can only be used once per game.
- **Justification:** Article 3.7d (en passant), 3.7e (promotion), 3.8 (castling).

### Hand Management (Touch-Move Rule)
- **Description:** Players must move the first piece they touch that can be legally moved, enforcing careful planning and execution.
- **BGG Mapping:** Hand Management (closest, but not a perfect fit)
- **BGG Mechanic ID(s):** 2040
- **BGG Mechanic Description(s):** Players must manage their available actions or resources (here, the act of touching a piece).
- **Justification:** Article 4.3, 4.4. Marked as "Closest"—unique to chess but related to action commitment.

### Player Elimination (Resignation)
- **Description:** A player may resign, immediately ending the game and conceding victory to the opponent.
- **BGG Mapping:** Player Elimination (closest, but not a perfect fit)
- **BGG Mechanic ID(s):** 2951
- **BGG Mechanic Description(s):** Players are removed from the game when certain conditions are met.
- **Justification:** Article 5.1b. Marked as "Closest"—resignation is a voluntary elimination.

### Variable Setup (Chess960, not standard chess)
- **Description:** In Chess960, the initial position of the pieces is randomized according to specific rules.
- **BGG Mapping:** Variable Setup
- **BGG Mechanic ID(s):** 2019
- **BGG Mechanic Description(s):** The initial setup of the game varies from play to play.
- **Justification:** Only applies to Chess960 (see appendices), not standard chess.

### Time Track (Chess Clock)
- **Description:** Use of a chess clock to limit the time each player has to make moves, with various timing systems (e.g., sudden death, increment, delay).
- **BGG Mapping:** Time Track
- **BGG Mechanic ID(s):** 2046
- **BGG Mechanic Description(s):** The passage of time is tracked and can affect gameplay.
- **Justification:** Article 6.

### Simultaneous Action Selection (Draw by Agreement)
- **Description:** Both players may agree to a draw at any time, ending the game.
- **BGG Mapping:** Simultaneous Action Selection (closest, but not a perfect fit)
- **BGG Mechanic ID(s):** 2023
- **BGG Mechanic Description(s):** Players select actions simultaneously (here, both agree to a draw).
- **Justification:** Article 5.2c. Marked as "Closest"—agreement is a simultaneous action.

### Unique: Check/Checkmate/Stalemate
- **Description:** The core win/loss/draw conditions are based on the unique concepts of check, checkmate, and stalemate, which have no direct BGG mechanic equivalent.
- **BGG Mapping:** Unique
- **BGG Mechanic ID(s):** N/A
- **BGG Mechanic Description(s):** N/A
- **Justification:** These are fundamental to chess and not present in other games.

---

## Summary Table

| Mechanic Name                | BGG Mapping                   | BGG Mechanic ID(s) | Unique/Standard | Category                |
|------------------------------|-------------------------------|--------------------|-----------------|-------------------------|
| Turn-Based Play              | Turn Order: Alternating       | 2043               | Standard        | Turn Structure          |
| Grid Movement                | Grid Movement, Square Grid    | 2934, 2935         | Standard        | Movement                |
| Pattern Movement             | Pattern Movement              | 2954               | Standard        | Movement                |
| Static Capture               | Static Capture                | 2960               | Standard        | Combat/Capture          |
| Sudden Death Ending          | Sudden Death Ending           | 2961               | Standard        | Endgame                 |
| Once-Per-Game Abilities      | Once-Per-Game Abilities       | 2959               | Standard        | Special Actions         |
| Hand Management (Touch-Move) | Hand Management (closest)     | 2040               | Standard        | Action Commitment       |
| Player Elimination           | Player Elimination (closest)  | 2951               | Standard        | Endgame                 |
| Variable Setup (Chess960)    | Variable Setup                | 2019               | Standard        | Setup                   |
| Time Track (Chess Clock)     | Time Track                    | 2046               | Standard        | Timing                  |
| Simultaneous Action Selection| Simultaneous Action Selection | 2023               | Standard        | Negotiation/Draw        |
| Check/Checkmate/Stalemate    | Unique                        | N/A                | Unique          | Win/Loss/Draw Condition |

---

**Notes:**
- All mechanics are extracted from the FIDE Laws of Chess and mapped to BGG where possible.
- Unique chess concepts (check, checkmate, stalemate) are fundamental and not present in BGG's mechanic taxonomy.
- Minor or implicit mechanics (e.g., touch-move, draw by agreement) are included for completeness.
- This reference enables unambiguous reasoning about chess mechanics for agents and researchers.
