# File Naming Conventions

Standardized file and directory naming patterns for the Chess project.

## Core Principles

### Descriptive Names
File names should clearly indicate their content and purpose without requiring additional context.

**Good Examples:**
- `move-validation-system.md`
- `piece-movement-mechanics.md`
- `tournament-tiebreak-rules.md`

**Poor Examples:**
- `system1.md`
- `mechanics.md`
- `rules.md`

### Kebab-Case Format
All file names use lowercase letters with hyphens separating words.

**Format:** `word1-word2-word3.md`

### Consistent Categorization
Include category indicators when helpful for organization and clarity.

## File Naming Patterns

### Systems Directory
- **Pattern:** `[descriptor]-[system-type].md`
- **Examples:**
  - `core-game-system.md`
  - `move-validation-system.md`
  - `turn-structure-system.md`

### Mechanics Directory
- **Pattern:** `[action]-[mechanics-type].md`
- **Examples:**
  - `piece-movement-mechanics.md`
  - `castling-mechanics.md`
  - `pawn-promotion-mechanics.md`

### Rules Directory
- **Pattern:** `[scope]-[rule-category].md`
- **Examples:**
  - `basic-turn-rules.md`
  - `tournament-tiebreak-rules.md`
  - `draw-conditions-rules.md`

### Content Directory
- **Pattern:** `[name]-[content-type].md`
- **Examples:**
  - `white-queen-piece.md`
  - `standard-board-setup.md`
  - `en-passant-example.md`

### Templates Directory
- **Pattern:** `[content-type]-template.md`
- **Examples:**
  - `system-template.md`
  - `mechanic-template.md`
  - `piece-template.md`

### Guides Directory
- **Pattern:** `[topic]-guide.md` or `[topic]-standards.md`
- **Examples:**
  - `contributing-guide.md`
  - `markdown-standards.md`
  - `cross-reference-guide.md`

## Directory Naming

### Primary Directories
Use clear, plural nouns for main categories:
- `systems/`
- `mechanics/`
- `rules/`
- `content/`
- `templates/`

### Subdirectories
Use descriptive names that indicate the subcategory:
- `content/pieces/`
- `rules/tournament/`
- `systems/core/`

## Special Files

### README Files
Always name directory overview files `README.md` for automatic display in git repositories and markdown viewers.

### Template Files
Always end template file names with `-template.md` to clearly identify their purpose.

## Common Mistakes to Avoid

### Ambiguous Names
- ❌ `mechanics.md` (too generic)
- ✅ `castling-mechanics.md` (specific and clear)

### Inconsistent Casing
- ❌ `Move_Validation_System.md`
- ✅ `move-validation-system.md`

### Missing Context
- ❌ `queen.md` (unclear what type of content)
- ✅ `white-queen-piece.md` (clear content type)

### Overly Long Names
- ❌ `advanced-tournament-competitive-play-tiebreak-and-scoring-rules.md`
- ✅ `tournament-tiebreak-rules.md`

## Important Migration Guidelines

When renaming existing files:
1. Update all cross-references to the file
2. Document the change in commit messages
3. Consider creating redirects for significant renames
4. Update any external documentation that references the file