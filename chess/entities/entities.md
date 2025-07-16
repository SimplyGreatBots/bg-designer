# Chess Rules: Entity Extraction

## Step-by-Step Reasoning

1. **Entity Identification**:  
   I read `rules.md`, `rules-crossref.md`, and `mechanics.md` to identify all distinct entities.  
   - From `rules.md`, I see entities such as: Player, Piece (with subtypes), Board, Move, Capture, Check, Checkmate, Stalemate, Draw, Promotion, Castling, En Passant, Chess Clock, Arbiter, Notation, etc.
   - `rules-crossref.md` provides cross-references between rules and mechanics, confirming and clarifying the relationships.
   - `mechanics.md` defines mechanics as entities (e.g., Turn-Based Play, Grid Movement, etc.) and maps them to rules.

2. **Entity Analysis**:  
   For each entity, I considered:
   - Its function (e.g., Piece: object on board; Move: action by player).
   - Relationships (e.g., Move affects Piece and Board; Check relates to King and opponent’s pieces).
   - Importance (e.g., Checkmate ends the game; Promotion changes a Pawn’s type).

3. **Entity Format**:  
   - Game objects (Piece, Board) are best represented as tables or sections with attributes.
   - Actions (Move, Capture, Promotion) as action entities with initiator, target, and result.
   - States (Check, Checkmate, Stalemate, Draw) as state entities with triggers and effects.
   - Mechanics as a summary table and cross-referenced in each entity.

4. **Organization**:  
   - Entities are grouped by type: Game Objects, Actions, States, Roles, Mechanics.
   - Each entity includes: name, type, description, attributes, relationships, and references (with markdown links).

---

# Chess Rules: Entity Extraction

## Game Objects

---

### Entity: Player

**Type:** Role  
**Description:**  
A participant in the game, controlling either the white or black pieces. Players alternate turns and are responsible for making moves according to the rules.

**Attributes:**  
- Color: White or Black  
- Pieces Controlled: 16 (per player)  
- Time: Allotted via chess clock  
- Rights: May resign, offer/accept draw, claim irregularities

**Relationships:**  
- Controls: [Piece](#entity-piece)  
- Makes: [Move](#entity-move)  
- Subject to: [Chess Clock](#entity-chess-clock), [Arbiter](#entity-arbiter)

**References:**  
- [Article 1.1](#), [Article 6](#), [Article 5.1b](#)

---

### Entity: Piece

**Type:** Game Object  
**Description:**  
A physical object on the chessboard, controlled by a player. Subtypes: King, Queen, Rook, Bishop, Knight, Pawn.

**Attributes:**  
- Subtype: King, Queen, Rook, Bishop, Knight, Pawn  
- Color: White or Black  
- Position: Board square  
- Movement: Defined per subtype  
- Captured: Boolean (on/off board)

**Relationships:**  
- Controlled by: [Player](#entity-player)  
- Affected by: [Move](#entity-move), [Capture](#entity-capture), [Promotion](#entity-promotion)  
- Special: [King](#entity-king), [Pawn](#entity-pawn)

**References:**  
- [Article 2.2–2.4](#), [Article 3.1–3.8](#)

---

#### Sub-Entity: King

**Type:** Piece Subtype  
**Description:**  
The most important piece; the game is won or lost based on its status (checkmate, stalemate).

**Attributes:**  
- Movement: One square in any direction  
- Special Move: [Castling](#entity-castling)  
- Cannot move into check

**Relationships:**  
- Target of: [Check](#entity-check), [Checkmate](#entity-checkmate), [Stalemate](#entity-stalemate)

**References:**  
- [Article 3.8–3.9](#), [Article 5.1a](#)

---

#### Sub-Entity: Pawn

**Type:** Piece Subtype  
**Description:**  
A piece with unique movement, capture, and promotion rules.

**Attributes:**  
- Movement: Forward one square (two on first move)  
- Capture: Diagonally forward  
- Special Moves: [En Passant](#entity-en-passant), [Promotion](#entity-promotion)

**Relationships:**  
- Can be promoted to: Queen, Rook, Bishop, Knight  
- Subject to: [En Passant](#entity-en-passant)

**References:**  
- [Article 3.7](#)

---

### Entity: Board

**Type:** Game Object  
**Description:**  
An 8x8 grid of 64 squares, alternating colors, with files (columns), ranks (rows), and diagonals.

**Attributes:**  
- Size: 8x8  
- Squares: 64  
- Orientation: White square on right

**Relationships:**  
- Hosts: [Piece](#entity-piece)  
- Defines: [Grid Movement](#mechanic-grid-movement)

**References:**  
- [Article 2.1, 2.4](#)

---

## Actions

---

### Entity: Move

**Type:** Action  
**Description:**  
A legal action performed by a player, resulting in a change of board state.

**Attributes:**  
- Initiator: [Player](#entity-player)  
- Piece: [Piece](#entity-piece)  
- From/To: Board squares  
- Type: Normal, Capture, Special (Castling, Promotion, En Passant)

**Relationships:**  
- Can cause: [Check](#entity-check), [Checkmate](#entity-checkmate), [Draw](#entity-draw)  
- Governed by: [Turn-Based Play](#mechanic-turn-based-play), [Touch-Move Rule](#mechanic-hand-management-touch-move-rule)

**References:**  
- [Article 3.1–3.10](#), [Article 4](#)

---

### Entity: Capture

**Type:** Action  
**Description:**  
A move where a piece is moved to a square occupied by an opponent’s piece, removing it from the board.

**Attributes:**  
- Capturing Piece: [Piece](#entity-piece)  
- Captured Piece: [Piece](#entity-piece)  
- Square: Board square

**Relationships:**  
- Subtype of: [Move](#entity-move)  
- May trigger: [En Passant](#entity-en-passant), [Promotion](#entity-promotion)

**References:**  
- [Article 3.1, 3.7c, 3.7d](#)

---

### Entity: Promotion

**Type:** Action  
**Description:**  
When a pawn reaches the farthest rank, it is exchanged for a queen, rook, bishop, or knight.

**Attributes:**  
- Promoting Pawn: [Pawn](#entity-pawn)  
- New Piece: Queen, Rook, Bishop, Knight

**Relationships:**  
- Triggered by: [Move](#entity-move)  
- Affects: [Piece](#entity-piece)

**References:**  
- [Article 3.7e, 4.4d](#)

---

### Entity: Castling

**Type:** Special Action  
**Description:**  
A move involving the king and a rook, executed under specific conditions, counting as a single move.

**Attributes:**  
- King and Rook involved  
- Conditions: Neither has moved, no pieces between, not in/through/into check

**Relationships:**  
- Subtype of: [Move](#entity-move)  
- Affects: [King](#entity-king), [Rook](#entity-piece)

**References:**  
- [Article 3.8, 4.4a–c](#)

---

### Entity: En Passant

**Type:** Special Action  
**Description:**  
A pawn may capture an opponent’s pawn that has just advanced two squares, as if it had moved only one square. Must be done immediately.

**Attributes:**  
- Capturing Pawn: [Pawn](#entity-pawn)  
- Captured Pawn: [Pawn](#entity-pawn)  
- Timing: Only on the move immediately after the two-square advance

**Relationships:**  
- Subtype of: [Capture](#entity-capture)

**References:**  
- [Article 3.7d](#)

---

## States

---

### Entity: Check

**Type:** State  
**Description:**  
The king is in check if attacked by an opponent’s piece. No move may leave or place the king in check.

**Attributes:**  
- King under threat  
- Must be resolved on next move

**Relationships:**  
- Affects: [King](#entity-king), [Player](#entity-player)  
- Can lead to: [Checkmate](#entity-checkmate)

**References:**  
- [Article 3.9](#)

---

### Entity: Checkmate

**Type:** Terminal State  
**Description:**  
A state where the king is in check and the player has no legal move to escape. Results in immediate loss.

**Attributes:**  
- King in check  
- No legal moves to resolve

**Relationships:**  
- Ends game: [Game End](#entity-game-end)  
- Affects: [Player](#entity-player)

**References:**  
- [Article 1.2, 5.1a](#)

---

### Entity: Stalemate

**Type:** Terminal State  
**Description:**  
A state where the player to move has no legal move and is not in check. Results in a draw.

**Attributes:**  
- No legal moves  
- King not in check

**Relationships:**  
- Ends game: [Game End](#entity-game-end)

**References:**  
- [Article 5.2a](#)

---

### Entity: Draw

**Type:** Terminal State  
**Description:**  
The game ends in a draw under several conditions: stalemate, dead position, agreement, threefold repetition, fifty-move rule.

**Attributes:**  
- Condition: Stalemate, dead position, agreement, repetition, 50-move rule

**Relationships:**  
- Ends game: [Game End](#entity-game-end)  
- May be agreed by: [Player](#entity-player)

**References:**  
- [Article 5.2, 9.1–9.3](#)

---

### Entity: Game End

**Type:** State  
**Description:**  
The game ends immediately upon checkmate, stalemate, resignation, draw by agreement, or certain draw conditions.

**Attributes:**  
- Trigger: [Checkmate](#entity-checkmate), [Stalemate](#entity-stalemate), [Draw](#entity-draw), [Resignation](#entity-resignation)

**Relationships:**  
- Affects: [Player](#entity-player)

**References:**  
- [Article 5.1–5.2](#)

---

## Special Roles & Objects

---

### Entity: Chess Clock

**Type:** Object  
**Description:**  
A device with two time displays, used to limit each player’s time.

**Attributes:**  
- Two displays  
- Allotted time per player  
- Timing systems: sudden death, increment, delay

**Relationships:**  
- Used by: [Player](#entity-player)  
- Can cause: Loss on time

**References:**  
- [Article 6](#)

---

### Entity: Arbiter

**Type:** Role  
**Description:**  
An official responsible for enforcing the rules, resolving disputes, and managing the competition.

**Attributes:**  
- Authority: Rule enforcement, decision-making  
- Duties: Oversee play, handle irregularities

**Relationships:**  
- Oversees: [Player](#entity-player), [Game End](#entity-game-end)

**References:**  
- [Article 13](#)

---

## Mechanics

---

### Mechanic: Turn-Based Play

**Type:** Mechanic  
**Description:**  
Players alternate turns, with only one player acting at a time. White moves first.

**References:**  
- [Mechanics.md](../mechanics/mechanics.md#turn-based-play), [Article 1.1](#)

---

### Mechanic: Grid Movement

**Type:** Mechanic  
**Description:**  
Pieces move on an 8x8 grid, constrained by the board’s structure.

**References:**  
- [Mechanics.md](../mechanics/mechanics.md#grid-movement), [Article 2.1, 3.2–3.4](#)

---

### Mechanic: Pattern Movement

**Type:** Mechanic  
**Description:**  
Each piece type has a unique movement pattern.

**References:**  
- [Mechanics.md](../mechanics/mechanics.md#pattern-movement), [Article 3.2–3.8](#)

---

### Mechanic: Static Capture

**Type:** Mechanic  
**Description:**  
Capturing occurs by moving a piece onto a square occupied by an opponent’s piece.

**References:**  
- [Mechanics.md](../mechanics/mechanics.md#static-capture), [Article 3.1, 3.7c](#)

---

### Mechanic: Sudden Death Ending

**Type:** Mechanic  
**Description:**  
The game ends immediately when a checkmate or certain draw conditions occur.

**References:**  
- [Mechanics.md](../mechanics/mechanics.md#sudden-death-ending), [Article 5.1, 5.2](#)

---

### Mechanic: Once-Per-Game Abilities

**Type:** Mechanic  
**Description:**  
Special moves (castling, en passant, promotion) performed under specific conditions.

**References:**  
- [Mechanics.md](../mechanics/mechanics.md#once-per-game-abilities-castling-en-passant-promotion), [Article 3.7d, 3.7e, 3.8](#)

---

### Mechanic: Hand Management (Touch-Move Rule)

**Type:** Mechanic  
**Description:**  
Players must move the first piece they touch that can be legally moved.

**References:**  
- [Mechanics.md](../mechanics/mechanics.md#hand-management-touch-move-rule), [Article 4.3, 4.4](#)

---

### Mechanic: Player Elimination (Resignation)

**Type:** Mechanic  
**Description:**  
A player may resign, immediately ending the game.

**References:**  
- [Mechanics.md](../mechanics/mechanics.md#player-elimination-resignation), [Article 5.1b](#)

---

### Mechanic: Variable Setup (Chess960)

**Type:** Mechanic  
**Description:**  
In Chess960, the initial position of the pieces is randomized.

**References:**  
- [Mechanics.md](../mechanics/mechanics.md#variable-setup-chess960), [Article 2.2, 2.3](#)

---

### Mechanic: Time Track (Chess Clock)

**Type:** Mechanic  
**Description:**  
Use of a chess clock to limit the time each player has to make moves.

**References:**  
- [Mechanics.md](../mechanics/mechanics.md#time-track-chess-clock), [Article 6](#)

---

### Mechanic: Simultaneous Action Selection (Draw by Agreement)

**Type:** Mechanic  
**Description:**  
Both players may agree to a draw at any time.

**References:**  
- [Mechanics.md](../mechanics/mechanics.md#simultaneous-action-selection-draw-by-agreement), [Article 5.2c](#)

---

### Mechanic: Unique: Check/Checkmate/Stalemate

**Type:** Mechanic  
**Description:**  
Win/loss/draw conditions based on check, checkmate, and stalemate.

**References:**  
- [Mechanics.md](../mechanics/mechanics.md#unique-checkcheckmatestalemate), [Article 1.2, 1.3, 3.9, 5.1a, 5.2a](#)

---

## Additional Entities

---

### Entity: Notation

**Type:** Convention  
**Description:**  
The recording of moves using algebraic notation.

**Attributes:**  
- Format: Algebraic  
- Required for: Official games

**Relationships:**  
- Used by: [Player](#entity-player), [Arbiter](#entity-arbiter)

**References:**  
- [Article 8](#), [Appendix C](#)

---

### Entity: Irregularity

**Type:** State  
**Description:**  
A situation where an illegal move or incorrect position occurs.

**Attributes:**  
- Type: Illegal move, incorrect setup, etc.  
- Resolution: Correction or restart

**Relationships:**  
- Managed by: [Arbiter](#entity-arbiter)

**References:**  
- [Article 7](#)

---

*This entity extraction enables structured, cross-referenced navigation and reasoning about the FIDE Laws of Chess, supporting context-engineering and rule analysis.*
