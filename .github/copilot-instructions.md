




# Copilot Instructions for AI Coding Agents

## Project Overview
This repository documents the rules, entities, and mechanics for multiple games (Chess, Pokémon TCG, Chessemon) in a modular, Markdown-based format. Each game is organized in its own top-level folder (`chess/`, `pokemon-tcg/`, `chessemon/`). Documentation is self-contained; code is present only in `chessemon/game/ui/` for the React client.

## Architecture & Structure
- **Per-game folders:**
  - `docs/`: Official rulebooks and printable/reference documents (Markdown or PDF). No references to files outside this folder.
  - `entities/`: Canonical entity definitions (cards, pieces, zones, actions, states, etc.).
  - `mechanics/`: Core mechanics, templates, and justifications.
  - `rules/`: Canonical rules, cross-references, and supporting documentation.
  - `research/`: Experimental or future documentation.
  - `dev/` (chessemon only): Development plans and implementation guidance for code integration (no source code; reference only files within `dev/`).
- **Chessemon UI:**
  - `chessemon/game/ui/` contains the React client (boardgame.io integration). All code, config, and assets for the UI are scoped to this folder. See its `README.md` for boundaries and usage.
- **README.md files:**
  - Each folder's `README.md` defines its scope, boundaries, and allowed cross-references. Subdirectories are not referenced unless listed in the folder's `README.md`.

## Conventions & Patterns
- All documentation is Markdown (or PDF for official rulebooks).
- No file in a `docs/` folder references files outside that folder.
- When adding documentation, place Markdown files in the correct folder and update the folder's `README.md` if needed.
- For entity extraction, see `entities/entities.md` in the relevant game folder.
- For Chessemon development plans, update only `dev/implementation-plan.md` and `dev/README.md`.

## Developer Workflows
- **Documentation:**
  - Edit Markdown or PDF files directly; no build/test workflows for documentation.
  - To update rules, edit the relevant `rules.md` file in the game folder.
  - For entities/mechanics, edit `entities.md` or `mechanics.md` in their respective folders.
- **Chessemon UI (React client):**
  - All development commands (`npm install`, `npm start`, `npm run build`, `npm test`, `npm run eject`) are run from `chessemon/game/ui/`.
  - See `chessemon/game/ui/README.md` for scripts, testing, and configuration details.
  - Tests are in `src/` (e.g., `App.test.js`), using Jest and React Testing Library.

## Integration & External Dependencies
- No external dependencies for documentation.
- Chessemon UI uses React, boardgame.io, and related packages (see `package.json` in `ui/`).
- For code integration planning (chessemon), reference boardgame.io and React only in documentation; do not add code/config files to `dev/`.

## Examples & Usage
- **Update rules:** Edit `chess/docs/rules.md`, `pokemon-tcg/rules/rules.md`, or `chessemon/rules/rules.md`.
- **Add entity:** Edit `entities/entities.md` in the relevant game folder and update the folder's `README.md` if needed.
- **Document mechanics:** Edit `mechanics/mechanics.md` in the relevant game folder.
- **Chessemon UI:**
  - For UI changes, edit files in `chessemon/game/ui/src/` and update `ui/README.md` as needed.
  - For scripts and testing, see `ui/README.md` for commands and boundaries.

---

*If any section is unclear or incomplete, request clarification or additional details from the user. These instructions are for AI coding agents to ensure consistency and productivity in this documentation-focused codebase.*
