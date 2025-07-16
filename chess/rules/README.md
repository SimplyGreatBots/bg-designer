# Chess Rules Folder

## Overview

This folder contains the official FIDE Laws of Chess and a cross-referenced mapping of those rules to core chess mechanics. It serves as a canonical, self-contained reference for the rules governing over-the-board chess play, as well as a resource for understanding how each rule relates to fundamental game mechanics.

## Folder Structure

- `rules.md` — The full text of the FIDE Laws of Chess, including articles, appendices, and official commentary. This file is the authoritative source for chess rules in this project.
- `rules-crossref.md` — Presents each rule as an atomic, cross-referenced entry, mapping it to the relevant chess mechanics (as described in `../mechanics/mechanics.md`). This file enables clear linkage between rules and gameplay concepts.

## Contents

### File List

- `rules.md`: Complete, article-by-article documentation of the FIDE Laws of Chess, including:
  - Game objectives and win/draw conditions
  - Board setup and piece movement
  - Special moves (castling, en passant, promotion)
  - Draw and endgame scenarios
  - Chess clock and timing rules
  - Tournament and administrative provisions
- `rules-crossref.md`: Cross-references each rule to its underlying mechanic, with:
  - Direct mapping to mechanics (e.g., turn-based play, static capture)
  - Context and justification for each rule
  - Notes on unmapped rules and mechanics

### No Subdirectories

This folder does not contain any subdirectories.

## Usage

- **Reference**: Use `rules.md` for the full, official rules of chess. Use `rules-crossref.md` to understand how each rule implements or relates to specific chess mechanics.
- **System Design**: Useful for developers, arbiters, and researchers modeling chess rules or verifying rule compliance.
- **Documentation**: Serves as the canonical source for chess rules within this project.

## Scope & Boundaries

- All documentation in this folder is self-contained and does not reference or depend on files outside `chess/rules/`.
- This folder is limited to the rules of chess and their mapping to mechanics. It does not cover strategy, tactics, or implementation details.

## Disclaimer

This README and all documentation in this folder are limited in scope to the files present within `chess/rules/`. No external files or resources are referenced. For broader context, consult the appropriate documentation in other folders.
