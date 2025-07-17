# Chessemon

Chessemon is a strategic tabletop game that fuses the tactical movement and board control of Chess with the dynamic creature battling and deck-building elements of the Pokémon Trading Card Game. Players command teams of unique creatures (Chessemon) on a modular board, using cards to unleash special moves, evolve their pieces, and outmaneuver their opponent. Victory is achieved by capturing the opponent's Kingmon or fulfilling special win conditions through card play.

## Table of Contents

- [Game Overview](#game-overview)
- [Folder Structure](#folder-structure)
- [Documentation Organization](#documentation-organization)
- [Quick Start Guide](#quick-start-guide)
- [Core Concepts](#core-concepts)
- [Development](#development)
- [Scope and Boundaries](#scope-and-boundaries)

## Game Overview

### Core Mechanics
- **Chess-style Movement**: Pieces move according to traditional chess patterns with unique abilities
- **Card-based Actions**: Play cards to enhance movement, attack, heal, or evolve pieces
- **Evolution System**: Transform basic Pawnmon into powerful evolved forms during gameplay
- **HP-based Combat**: Pieces have hit points and can survive multiple attacks
- **Strategic Deck Building**: Customize your deck with Move, Evolution, and Item cards

### Win Conditions
- Capture the opponent's Kingmon
- Fulfill special win conditions through card effects (e.g., control all Battle Zone squares)

### Game Components
- **Board**: 8x4 grid divided into Home Zones (2x4 each) and Battle Zone (4x4 center)
- **Chessemon Pieces**: 6 types with unique stats and abilities (Kingmon, Pawnmon, Knightmon, Bishopmon, Rookmon, Queenmon)
- **Cards**: 30-card deck containing Move, Evolution, and Item cards
- **Starting Setup**: 1 Kingmon + 6 Pawnmon per player

## Folder Structure

### Documentation Folders
- **`docs/`**: Official rulebooks and printable reference materials (PDF format)
  - `entities.pdf` - Printable reference for all game pieces and cards
  - `mechanics.pdf` - Core gameplay mechanics reference
  - `rules.pdf` - Complete official rulebook

- **`entities/`**: Canonical definitions of all game components
  - `entities.md` - Master list of Chessemon pieces, cards, zones, and states
  - Complete stat blocks and abilities for all pieces

- **`mechanics/`**: Core gameplay mechanics and systems
  - `mechanics.md` - Turn structure, movement, combat, evolution, and card play
  - Detailed examples and clarifications

- **`rules/`**: Official game rules and supporting documentation
  - `rules.md` - Complete official rulebook with setup, gameplay, and win conditions
  - Cross-references and rule clarifications

### Development Folder
- **`dev/`**: Development planning and implementation guidance
  - `implementation-plan.md` - boardgame.io integration guide
  - Technical architecture and development roadmap

### Implementation Folder ✅ **NEW**
- **`src/`**: Complete boardgame.io implementation
  - `Game.js` - Full game logic using boardgame.io framework
  - `Board.js` - Interactive React board component  
  - `App.js` - Main application with multiplayer support
  - `*.css` - Modern responsive styling
- **Root files**: `package.json`, `index.js`, `public/index.html` for React setup

## Documentation Organization

Each folder maintains strict scope boundaries:
- **Self-contained references**: No folder references files outside itself
- **Modular structure**: Each folder's `README.md` defines its scope and allowed cross-references
- **Clear boundaries**: Development plans are separate from game documentation
- **Consistent formatting**: All documentation uses Markdown format (except official PDFs)

## Quick Start Guide

### For Players
1. **Learn the basics**: Start with `rules/rules.md` for complete gameplay rules
2. **Understand pieces**: Reference `entities/entities.md` for piece stats and abilities
3. **Master mechanics**: Study `mechanics/mechanics.md` for turn structure and advanced play
4. **Print references**: Use PDFs in `docs/` for quick reference during play

### For Developers
1. **Review game design**: Read through `entities/`, `mechanics/`, and `rules/` folders
2. **Check development plans**: See `dev/implementation-plan.md` for boardgame.io integration guidance
3. **Understand architecture**: Review folder boundaries and cross-reference limitations

## Core Concepts

### Piece Types and Evolution
- **Pawnmon**: Basic units that can evolve into any advanced piece
- **Evolved Forms**: Knightmon (L-shaped movement), Bishopmon (diagonal), Rookmon (orthogonal), Queenmon (any direction)
- **Kingmon**: Victory condition piece with limited but powerful abilities

### Card Categories
- **Move Cards**: Grant extra movement or special attacks (e.g., "Dash", "Strike")
- **Evolution Cards**: Transform Pawnmon into evolved forms
- **Item Cards**: Provide healing, protection, or buffs (e.g., "Potion", "Shield")

### Turn Structure
1. **Draw Phase**: Draw 1 card (max hand size: 7)
2. **Action Phase**: Move pieces, play cards, attack, evolve (any order)
3. **End Phase**: Discard excess cards, resolve end-of-turn effects

## Development

### Current Status
- **Documentation Complete**: All game rules, mechanics, and entities fully documented ✅
- **Implementation Complete**: Full boardgame.io + React implementation ready ✅
- **Ready to Play**: Run `npm install && npm start` in project root ✅

### Quick Start - Play Now!

```bash
cd chessemon
npm install
npm start
```

Open http://localhost:3000 to play Chessemon!

### Development Approach
- **Documentation-first**: Complete game design before implementation
- **Modular architecture**: Separate documentation from code implementation
- **boardgame.io integration**: Planned React-based implementation using boardgame.io framework

## Scope and Boundaries

### This Folder Contains
- Complete game documentation and design specifications ✅
- Full boardgame.io + React implementation ✅ **NEW**
- Development planning and implementation guidance ✅
- Official reference materials and rulebooks ✅
- Self-contained, modular documentation structure ✅

### Ready-to-Run Implementation
- **Game Logic**: Complete boardgame.io implementation in `src/Game.js`
- **UI Components**: Interactive React board in `src/Board.js` and `src/App.js`
- **Build System**: Package.json with all dependencies and scripts
- **Styling**: Modern responsive CSS with animations and mobile support

### This Folder Does NOT Contain
- Source code or implementation files
- Build configurations or package management
- External dependencies or assets
- Files from parent directories or other game folders

### Cross-Reference Policy
- Each subfolder maintains strict boundaries as defined in its `README.md`
- No folder references files outside the `chessemon/` directory
- Documentation is self-contained within each respective folder
- Development plans reference only boardgame.io and React (external frameworks)

---

*For detailed information about any component, see the respective folder's documentation. Each folder's `README.md` defines its specific scope and cross-reference boundaries.*n

Chessemon is a strategic tabletop game that fuses the tactical movement and board control of Chess with the dynamic creature battling and deck-building elements of the Pokémon Trading Card Game. Players command teams of unique creatures (Chessemon) on a modular board, using cards to unleash special moves, evolve their pieces, and outmaneuver their opponent. Victory is achieved by capturing the opponent’s Kingmon or fulfilling special win conditions through card play.

## Folder Structure
- `entities/`: Definitions of Chessemon pieces, cards, zones, and states.
- `mechanics/`: Core gameplay mechanics, turn structure, and special actions.
- `rules/`: Official rules, win conditions, and cross-references.

See each folder’s `README.md` for details and cross-reference boundaries.
