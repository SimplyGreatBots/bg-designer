---
mode: agent
description: Extracts and defines all relevant entities from a rules markdown file with boardgame.io implementation guidance.
tools: ['codebase', 'editFiles', 'new', 'search', 'searchResults']
---

Extract and synthesize all game entities from a provided rules document, creating a comprehensive, structured file of the game's entities. If you do not have a rules document, you must request one from the user. The entities should be categorized, described, and include detailed boardgame.io implementation guidance for each entity.

You are tasked with extracting and defining all relevant entities from a rules markdown file for a game. The goal is to enable context-engineering and boardgame.io implementation by providing a structured, cross-referenced set of entities that can be used to understand, navigate, and implement the rules.

# References
- Boardgame.io [Documentation](../../boardgame.io/docs/documentation/README.md)

You must:
- Critically analyze the rules document step by step, identifying, categorizing, and describing each distinct entity.
- Reference the boardgame.io documentation to inform your implementation guidance for each entity.
- For each entity, provide clear name, type, description, attributes, relationships, and references to rule sections.
- For each entity, reference relevant boardgame.io documentation sections, concepts, and API features that would be important for implementing the entity. This should include guidance for an LLM on which boardgame.io features (e.g., game state structure, moves, events, phases, player data) are most applicable for representing and manipulating each entity.
- Organize entities in a way that maximizes clarity and utility for cross-referencing and implementation.
- Ensure your reasoning is explicit: first, analyze and extract entities step by step, then synthesize and organize them into the final output.

Carefully analyze the rules file step by step. For each entity you identify, reason about its role, relationships, and importance before extracting it. Organize entities in a way that maximizes clarity and utility for cross-referencing and boardgame.io implementation.

- Each entity should be defined in markdown with boardgame.io implementation guidance.
- The format for each entity should be tailored to the entity type (e.g., piece, action, rule, player, state, etc.).
- Include all relevant information for each entity: name, type, description, attributes, relationships, references to rule sections, and boardgame.io implementation guidance.
- Use clear headings and subheadings for organization.
- Where possible, cross-reference related entities within the markdown.
- Do not skip the reasoning process: always show your step-by-step thought process before presenting the extracted entities.

# Steps

1. Review the boardgame.io documentation to understand the framework's concepts and API features for entity representation.
2. Read the provided rules document thoroughly, analyzing each section step by step.
3. Identify all distinct entities (e.g., game pieces, actions, states, roles, rule sections, zones, resources, etc.).
4. For each entity:
    - Reason about its function, relationships, and importance.
    - Determine the most appropriate format for representing it in markdown.
    - Extract and define the entity, including all relevant details.
    - Cross-reference related entities and rule sections.
    - Reference relevant boardgame.io documentation sections, concepts, and API features that would be important for implementing the entity. Include concise notes on how boardgame.io could be leveraged for each entity (e.g., game state structure, moves, events, phases, player data, ctx management).
5. Ensure explicit, step-by-step reasoning during extraction and synthesis; do not jump to conclusions or summaries before all entities are analyzed.
6. Organize the extracted entities in a logical, navigable structure, grouping by logical categories if appropriate.
7. Present the output as a markdown document, with each entity clearly defined, cross-referenced, and including boardgame.io implementation guidance.

# Output Format

Produce a Markdown document structured for Copilot agents and boardgame.io developers to understand and implement all entities of the game. Use the following format:

- Output a markdown document.
- Begin with a section showing your step-by-step reasoning and analysis.
- Follow with a section for each entity, using appropriate markdown formatting (headings, tables, lists, etc.).
- Each entity section must include: name, type, description, attributes, relationships, references, and boardgame.io implementation guidance.
- Use internal markdown links for cross-referencing entities and rule sections.
- The output should be clear, organized, and easy to navigate.

For each entity, provide an entry in the following format:

### [Entity Name]
- **Type:** [Entity type: Game Object, Action, State, Player Role, Rule, Zone, Resource, etc.]
- **Description:** [A concise, clear explanation of the entity's function and role in the game.]
- **Attributes:** [List of key properties, values, or characteristics]
- **Relationships:** [How this entity relates to other entities - use markdown links for cross-references in actual output]
- **References:** [Rule sections or documentation references]
- **boardgame.io Implementation Guidance:**
    - **Relevant Concepts:** [List boardgame.io concepts (e.g., game state structure, moves, events, phases, player data, ctx) applicable to this entity.]
    - **Data Structure:** [How this entity should be represented in boardgame.io game state (G) or context (ctx).]
    - **Integration Notes:** [Concise notes on how this entity could be implemented or represented using boardgame.io features. Reference specific API sections or documentation links if helpful.]

Organize entities into logical categories if appropriate (e.g., Game Objects, Actions, States, Player Elements, etc.).

# Examples

---

## Step-by-Step Reasoning

1. I read the rules and identified the following entities: [Piece], [Player], [Move], [Check], [Checkmate], [Draw Condition].
2. I analyzed each entity’s role and relationships:
    - [Piece]: Represents a physical object on the board, with subtypes (King, Queen, etc.).
    - [Player]: Controls pieces, takes turns.
    - [Move]: Action performed by a player, affects pieces and board state.
    - [Check]: A state triggered by a move, relates to King and opponent’s pieces.
    - [Checkmate]: Terminal state, ends the game.
    - [Draw Condition]: Special rules for ending the game without a winner.
3. I determined the best format for each entity (table for pieces, list for draw conditions, etc.).
4. I cross-referenced entities (e.g., [Check] references [King] and [Move]).

---

## Entity: Piece

### Name
Piece

### Type
Game Object

### Description
A physical object on the chessboard, controlled by a player. Includes subtypes: King, Queen, Rook, Bishop, Knight, Pawn. Each piece has unique movement patterns and strategic value.

### Attributes
- Subtype: King, Queen, Rook, Bishop, Knight, Pawn
- Color: White or Black
- Position: Board square (e.g., 'e4', 'a1')
- Movement Pattern: Defined per subtype
- Value: Strategic value varies by subtype
- Has Moved: Boolean flag for castling/en passant rules

### Relationships
- Controlled by: Player entity
- Positioned on: Square entity
- Affected by: Move entity
- Can be in: Check state (King only)
- Referenced in: Checkmate entity, Stalemate entity

### References
- See FIDE Laws Article 2.2, Article 3

### boardgame.io Implementation Guidance:
- **Relevant Concepts:** Game state (G), piece representation, position tracking, move validation
- **Data Structure:** 
  ```js
  G.pieces = {
    'e1': {type: 'king', color: 'white', hasMoved: false},
    'e8': {type: 'king', color: 'black', hasMoved: false},
    // ... other pieces
  }
  ```
- **Integration Notes:** Store pieces as objects in G with position keys. Track piece types, colors, and movement history for special rules. Use helper functions to query pieces by type/color. Integrate with move validation to enforce piece-specific movement patterns.

---

## Entity: Move

### Name
Move

### Type
Action

### Description
A legal action performed by a player, resulting in a change of board state. Includes regular moves, captures, castling, en passant, and promotion.

### Attributes
- Initiator: Player entity making the move
- Source: Starting Square entity
- Target: Destination Square entity
- Piece: Piece entity being moved
- Move Type: Regular, Capture, Castling, En Passant, Promotion
- Promotion Choice: New piece type (if pawn promotion)

### Relationships
- Performed by: Player entity
- Affects: Piece entity, Board entity state
- Can cause: Check state, Checkmate state, Stalemate state
- Governed by: Movement rules per piece type

### References
- See FIDE Laws Article 3, Article 4

### boardgame.io Implementation Guidance:
- **Relevant Concepts:** moves functions, move validation, events.endTurn, game state mutation
- **Data Structure:**
  ```js
  moves: {
    makeMove: ({G, ctx}, from, to, promotionPiece) => {
      // Validate and execute move
      // Update G.pieces
      // Handle special moves (castling, en passant, promotion)
    }
  }
  ```
- **Integration Notes:** Implement as boardgame.io move functions with validation. Use from/to parameters for source and destination. Handle special move types with additional parameters. Ensure moves call events.endTurn() to advance the game.

(Real examples should be longer and more detailed, with more entities and richer cross-referencing.)

# Notes

- Always show your reasoning before listing entities.
- Tailor the format to each entity type and include boardgame.io implementation guidance.
- Use markdown links for cross-references between entities.
- Ensure all relevant information is included for each entity, including how it maps to boardgame.io concepts.
- The output should be suitable for use in context-engineering, rule cross-referencing, and boardgame.io implementation.
- Include comprehensive boardgame.io implementation guidance for each entity, covering data structures, relevant concepts, and integration notes.
- Reference specific boardgame.io documentation sections where helpful for implementation guidance.