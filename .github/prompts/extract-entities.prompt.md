---
mode: agent
description: Extracts and defines all relevant entities from a rules markdown file.
tools: ['codebase', 'editFiles', 'new', 'search', 'searchResults']
---

You are tasked with extracting and defining all relevant entities from a rules markdown file for a game. The goal is to enable context-engineering by providing a structured, cross-referenced set of entities that can be used to understand and navigate the rules.

Carefully analyze the rules file step by step. For each entity you identify, reason about its role, relationships, and importance before extracting it. Organize entities in a way that maximizes clarity and utility for cross-referencing.

- Each entity should be defined in markdown.
- The format for each entity should be tailored to the entity type (e.g., piece, action, rule, player, state, etc.).
- Include all relevant information for each entity: name, type, description, attributes, relationships, and references to rule sections if applicable.
- Use clear headings and subheadings for organization.
- Where possible, cross-reference related entities within the markdown.
- Do not skip the reasoning process: always show your step-by-step thought process before presenting the extracted entities.

# Steps

1. Read the rules markdown file and identify all distinct entities (e.g., game pieces, actions, states, roles, rule sections).
2. For each entity:
    - Reason about its function, relationships, and importance.
    - Determine the most appropriate format for representing it in markdown.
    - Extract and define the entity, including all relevant details.
    - Cross-reference related entities and rule sections.
3. Organize the extracted entities in a logical, navigable structure.
4. Present the output as a markdown document, with each entity clearly defined and cross-referenced.

# Output Format

- Output a markdown document.
- Begin with a section showing your step-by-step reasoning and analysis.
- Follow with a section for each entity, using appropriate markdown formatting (headings, tables, lists, etc.).
- Each entity section must include: name, type, description, attributes, relationships, and references.
- Use internal markdown links for cross-referencing entities and rule sections.
- The output should be clear, organized, and easy to navigate.

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
A physical object on the chessboard, controlled by a player. Includes subtypes: King, Queen, Rook, Bishop, Knight, Pawn.

### Attributes
- Subtype: King, Queen, Rook, Bishop, Knight, Pawn
- Movement: Defined per subtype
- Value: Varies by subtype

### Relationships
- Controlled by: [Player]
- Affected by: [Move]
- Referenced in: [Check], [Checkmate]

### References
- See Rule 2.1–2.5

---

## Entity: Move

### Name
Move

### Type
Action

### Description
A legal action performed by a player, resulting in a change of board state.

### Attributes
- Initiator: [Player]
- Target: [Piece], Board Square
- Result: New board state

### Relationships
- Can cause: [Check], [Checkmate], [Draw Condition]
- Governed by: Rule 3.1–3.10

### References
- See Rule 3.1–3.10

(Real examples should be longer and more detailed, with more entities and richer cross-referencing.)

# Notes

- Always show your reasoning before listing entities.
- Tailor the format to each entity type.
- Use markdown links for cross-references.
- Ensure all relevant information is included for each entity.
- The output should be suitable for use in context-engineering and rule cross-referencing.