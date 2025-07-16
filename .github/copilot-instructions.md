


# Copilot Instructions for AI Coding Agents

## Project Overview
This repository documents the official rules, entities, and mechanics for multiple games (e.g., Chess, Pokémon TCG) in a modular, Markdown-based format. Each game is organized in its own top-level folder (e.g., `chess/`, `pokemon-tcg/`), with all documentation self-contained and structured for clarity and reference.

## Architecture & Structure
- **Per-game folder structure:**
  - Each game (e.g., `chess/`, `pokemon-tcg/`) has its own subfolders:
    - `docs/`: Official rulebooks and printable/reference documents (Markdown or PDF).
    - `entities/`: Canonical entity definitions (cards, pieces, zones, actions, states, etc.).
    - `mechanics/`: Core mechanics, templates, and justifications.
    - `rules/`: Canonical rules, cross-references, and supporting documentation.
    - `research/`: Reserved for experimental or future documentation (may be empty).
  - Each subfolder is self-contained; cross-references are only within the same folder unless otherwise noted in the folder's `README.md`.
  - Subdirectories are not referenced unless explicitly listed in the folder's `README.md`.

## Conventions & Patterns
- All documentation is in Markdown (or PDF for official rulebooks).
- **No file in a `docs/` folder references files outside that folder.**
- Each folder's `README.md` defines its scope, boundaries, and cross-reference rules.
- When adding new documentation, place Markdown files in the appropriate folder and update the folder's `README.md` if needed.
- For entity extraction, see `entities/entities.md` in the relevant game folder for grouping and cross-references.

## Developer Workflows
- **No build, test, or code execution workflows** are defined for documentation files.
- To view or edit documentation, use any Markdown editor or viewer.
- For printing or sharing, use the relevant PDF in the `docs/` folder (e.g., `rules.pdf`, `dri_rulebook_en.pdf`).
- To update official rules, edit the appropriate `rules.md` in the relevant game folder.
- For entity or mechanics updates, edit `entities.md` or `mechanics.md` in their respective folders.

## Integration & External Dependencies
- No external dependencies or integrations are required for any documentation in this repository.

## Examples & Usage
- **Update rules:** Edit `chess/docs/rules.md` or `pokemon-tcg/rules/rules.md`.
- **Add entity:** Edit `entities/entities.md` in the relevant game folder and update the folder's `README.md` if needed.
- **Document mechanics:** Edit `mechanics/mechanics.md` in the relevant game folder.
- **Reference folder structure:** See each folder's `README.md` for scope and boundaries.

---

*If any section is unclear or incomplete, request clarification or additional details from the user. These instructions are for AI coding agents to ensure consistency and productivity in this documentation-focused codebase.*
