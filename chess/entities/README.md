# Chess Entities Folder

## Overview

This folder provides a comprehensive, structured extraction of all key entities defined in the official FIDE Laws of Chess. It is designed to support chess players, arbiters, organizers, and developers who require a detailed, cross-referenced understanding of the rules and mechanics of chess. The documentation here enables context-engineering, rule analysis, and systematization of chess concepts for both human and computational use.

**Scope:**
- This folder contains only entity extraction and documentation for chess rules.
- All content is self-contained; no files outside this folder are referenced.
- The main file is `entities.md`.

## Folder Structure

- `entities.md` — The primary documentation file. Contains:
  - Step-by-step reasoning for entity extraction
  - Detailed descriptions of all chess entities (game objects, actions, states, roles, mechanics, conventions)
  - Cross-references to mechanics and rules (as markdown links)
  - Grouping by type (Game Objects, Actions, States, Roles, Mechanics, Additional Entities)

## Usage

- **Reference**: Use `entities.md` to look up the definition, attributes, and relationships of any chess entity.
- **Navigation**: Follow markdown links within `entities.md` for cross-referenced mechanics and rules.
- **Editing**: To update or add entities, edit `entities.md` directly. Follow the existing structure for consistency.
- **Integration**: This folder is documentation-only; it does not contain code or require dependencies.

## Prerequisites

- No special tools or dependencies are required. Any Markdown editor or viewer can be used.

## Example Entities Covered

- Game Objects: Player, Piece (King, Queen, Rook, Bishop, Knight, Pawn), Board
- Actions: Move, Capture, Promotion, Castling, En Passant
- States: Check, Checkmate, Stalemate, Draw, Game End, Irregularity
- Roles: Arbiter
- Mechanics: Turn-Based Play, Grid Movement, Pattern Movement, Static Capture, Sudden Death Ending, Once-Per-Game Abilities, Hand Management, Player Elimination, Variable Setup, Time Track, Simultaneous Action Selection, Unique Win/Loss/Draw Conditions
- Conventions: Notation

## Subdirectories

- *(None)* — This folder does not contain subdirectories.

## Limitations & Boundaries

- **Scope Limitation**: This README and all documentation in this folder pertain only to the contents of `chess/entities/`. No references are made to files or systems outside this folder.
- **Updates**: For changes to chess rules or mechanics, update the relevant documentation in `entities.md`.

---

*This folder is part of a larger documentation project for the FIDE Laws of Chess. For other aspects (mechanics, rules, systems), see their respective folders.*
