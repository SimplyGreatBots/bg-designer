---
applyTo: '**/'
description: 'Standardized file and directory naming conventions for all projects.'
---

# Standard File Naming Conventions

These guidelines define standardized file and directory naming patterns for all projects to ensure clarity, consistency, and maintainability.

## Core Principles

### Descriptive Names
File names should clearly indicate their content and purpose without requiring additional context.

**Good Examples:**
- `user-profile-service.js`
- `data-migration-script.sql`
- `api-client.test.ts`

**Poor Examples:**
- `file1.js`
- `misc.txt`
- `temp.md`

### Kebab-Case Format
All file names should use lowercase letters with hyphens separating words, unless a language or framework requires a different convention (e.g., `PascalCase` for C# classes).

**Format:** `word1-word2-word3.ext`

### Consistent Categorization
Include category or type indicators in file names when helpful for organization and clarity.

## File Naming Patterns

- **Configuration Files:**
  - Pattern: `[tool]-config.ext` (e.g., `jest-config.js`, `webpack-config.js`)
- **Test Files:**
  - Pattern: `[module]-test.js` or `[module].test.js` (e.g., `user-service.test.js`)
- **Scripts:**
  - Pattern: `[purpose]-script.ext` (e.g., `data-migration-script.sql`)
- **Templates:**
  - Pattern: `[type]-template.ext` (e.g., `email-template.html`)
- **Guides/Docs:**
  - Pattern: `[topic]-guide.md`, `[topic]-standards.md` (e.g., `contributing-guide.md`)

## Directory Naming

- Use clear, plural nouns for main categories (e.g., `services/`, `models/`, `tests/`, `docs/`, `scripts/`).
- Use descriptive names for subdirectories to indicate their content or purpose (e.g., `docs/api/`, `tests/integration/`).

## Special Files

- **README Files:**
  - Always name directory overview files `README.md` for automatic display in git repositories and markdown viewers.
- **Template Files:**
  - Always end template file names with `-template.ext` to clearly identify their purpose.

## Common Mistakes to Avoid

- **Ambiguous Names:**
  - ❌ `misc.md` (too generic)
  - ✅ `error-handling-guide.md` (specific and clear)
- **Inconsistent Casing:**
  - ❌ `UserProfileService.js`
  - ✅ `user-profile-service.js`
- **Missing Context:**
  - ❌ `main.js` (unclear what module or feature)
  - ✅ `auth-main.js` (clear context)
- **Overly Long Names:**
  - ❌ `very-long-and-unnecessarily-descriptive-file-name-for-user-profile-management.js`
  - ✅ `user-profile-service.js`

## Important Migration Guidelines

When renaming existing files:
1. Update all cross-references to the file
2. Document the change in commit messages
3. Consider creating redirects for significant renames
4. Update any external documentation that references the file