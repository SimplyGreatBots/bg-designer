# Chess Entities Documentation

This folder contains the complete entity definitions for chess game implementation, providing a structured foundation for boardgame.io development.

## Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [Entity Categories](#entity-categories)
- [Using This Documentation](#using-this-documentation)
- [Implementation Guidance](#implementation-guidance)
- [Entity Relationships](#entity-relationships)
- [Contributing](#contributing)

## Overview

The chess entities documentation provides a comprehensive analysis of all chess game components extracted from the FIDE Laws of Chess. Each entity is carefully mapped to boardgame.io framework concepts with detailed implementation guidance.

This documentation serves as the canonical reference for:
- **Game Object Definitions**: All pieces, board components, and player entities
- **Action Specifications**: Move types, special moves, and meta-actions  
- **State Management**: Game conditions, timing states, and rule constraints
- **Implementation Mapping**: Direct connection to boardgame.io patterns and best practices

## File Structure

```
entities/
├── README.md           # This file - overview and usage guide
└── entities.md         # Complete entity definitions and analysis
```

### Core Documentation

- **`entities.md`**: The primary entity reference containing:
  - Step-by-step analysis methodology
  - Complete entity catalog organized by category
  - boardgame.io implementation guidance for each entity
  - Cross-references and relationship mappings
  - Code examples and data structure recommendations

## Entity Categories

The documentation organizes chess entities into logical categories:

### Game Objects
Physical and logical components of the chess game:
- **Chessboard** - 8x8 grid with coordinate system
- **Square** - Individual board locations
- **Pieces** - All six piece types (King, Queen, Rook, Bishop, Knight, Pawn)
- **Player** - Game participants with color assignments

### Actions
Player interactions and moves:
- **Move** - Basic piece movement
- **Capture** - Removing opponent pieces
- **Castling** - King-Rook special move
- **En Passant** - Special pawn capture
- **Pawn Promotion** - Pawn transformation
- **Draw Offer** - Game termination proposal
- **Resignation** - Voluntary surrender

### States
Game conditions and status tracking:
- **Check** - King under attack
- **Checkmate** - Game ending condition
- **Stalemate** - Draw condition
- **Draw** - Tied game outcomes
- **Castling Rights** - Special move eligibility
- **Turn Structure** - Player alternation system

### Rules
Constraints and validation systems:
- **Movement Rules** - Piece-specific constraints
- **King Safety** - Check prevention
- **50-Move Rule** - Draw by rule
- **Threefold Repetition** - Position-based draw

### Management
Game administration and tracking:
- **Time Control** - Clock management
- **Algebraic Notation** - Move recording
- **Move History** - Complete game record
- **Position Evaluation** - Analysis systems

## Using This Documentation

### For Developers
1. **Start with Entity Categories** - Understand the organizational structure
2. **Review Individual Entities** - Each has detailed attributes, relationships, and implementation guidance
3. **Follow Implementation Guidance** - boardgame.io-specific code examples and patterns
4. **Use Cross-References** - Navigate entity relationships for complete understanding

### For Implementation Planning
1. **Map Requirements** - Identify which entities your implementation needs
2. **Follow Dependencies** - Use relationship mappings to understand entity interdependencies
3. **Apply boardgame.io Patterns** - Each entity includes framework-specific guidance
4. **Validate Coverage** - Ensure all required chess rules are represented

### For Rules Analysis
1. **FIDE Law References** - Each entity links to official chess rules
2. **Attribute Specifications** - Complete property definitions for each entity
3. **Relationship Mappings** - How entities interact and depend on each other
4. **Special Cases** - Edge cases and complex rule interactions

## Implementation Guidance

### boardgame.io Integration
Each entity includes specific guidance for boardgame.io implementation:

- **Relevant Concepts** - Which framework features apply
- **Data Structures** - Recommended state organization patterns
- **Integration Notes** - Implementation tips and common patterns
- **Code Examples** - JavaScript snippets for key functionality

### Key Implementation Patterns
- **Game State (G)** - Store board, pieces, and game-specific data
- **Context (ctx)** - Use for turn management and framework metadata
- **Moves Object** - Implement actions as move functions
- **Events** - Framework functions for turn/game management
- **Validation** - Rule enforcement and legal move checking

### State Management Strategy
- **Immutable Updates** - Follow boardgame.io state mutation patterns
- **Efficient Storage** - Optimize data structures for performance
- **Cross-Entity Communication** - Design for entity interaction patterns
- **Validation Integration** - Embed rule checking in state transitions

## Entity Relationships

The entities form a complex web of relationships that mirror real chess gameplay:

### Core Dependencies
- **Board** ↔ **Squares** ↔ **Pieces** - Spatial relationships
- **Players** ↔ **Turns** ↔ **Moves** - Temporal flow
- **Pieces** ↔ **Movement Rules** ↔ **Validation** - Rule enforcement

### Special Interactions
- **King** + **Check** + **King Safety** - Central game safety system
- **Castling** ↔ **King** + **Rook** + **Castling Rights** - Complex special move
- **Pawn** + **En Passant** + **Pawn Promotion** - Unique pawn behaviors
- **Move History** + **Threefold Repetition** + **50-Move Rule** - Draw conditions

### Implementation Order
Recommended implementation sequence based on dependencies:
1. **Foundation**: Board, Square, basic Piece entities
2. **Core Movement**: Move, basic Movement Rules, Turn Structure
3. **Special Moves**: Castling, En Passant, Pawn Promotion
4. **Game States**: Check, Checkmate, Stalemate detection
5. **Advanced Features**: Draw rules, time controls, notation

## Boundaries and Scope

### Included in This Folder
- Complete entity definitions from FIDE Laws of Chess
- boardgame.io implementation guidance
- Entity relationships and dependencies
- Code examples and data structure recommendations

### References to Other Folders
This documentation is self-contained but may reference:
- **`../rules/`** - For official rule citations and detailed rule analysis
- **`../mechanics/`** - For gameplay mechanic explanations
- **`../docs/`** - For complete rulebooks and reference materials

### Not Included
- Source code implementation (belongs in game implementation folders)
- User interface specifications
- Testing strategies
- Performance optimization details

## Contributing

When updating entity definitions:

1. **Maintain Consistency** - Follow the established entity template format
2. **Include All Sections** - Type, Description, Attributes, Relationships, References, Implementation Guidance
3. **Verify FIDE References** - Ensure all rule citations are accurate
4. **Update Cross-References** - Maintain relationship mappings when adding/modifying entities
5. **Test Implementation Guidance** - Verify code examples are functional and follow boardgame.io patterns

### Entity Template
```markdown
### [Entity Name](#entity-anchor)
- **Type:** Category (Game Object, Action, State, Rule, Management)
- **Description:** Clear, concise explanation of the entity's purpose
- **Attributes:** Key properties and characteristics
- **Relationships:** How this entity connects to others
- **References:** FIDE Laws citations
- **boardgame.io Implementation Guidance:**
  - **Relevant Concepts:** Framework features that apply
  - **Data Structure:** Code examples for state representation
  - **Integration Notes:** Implementation tips and patterns
```

## Additional Resources

- **FIDE Laws of Chess** - Official rules referenced throughout
- **boardgame.io Documentation** - Framework concepts and patterns
- **Chess Programming Resources** - Additional implementation references

---

This entity documentation provides the foundation for implementing a complete, rule-compliant chess game using the boardgame.io framework. Each entity is carefully analyzed and mapped to support robust, maintainable game development.
