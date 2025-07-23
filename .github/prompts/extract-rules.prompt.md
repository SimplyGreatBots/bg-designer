---
mode: agent
description: Extracts and cross-references all game rules from a rules markdown file with mechanics and boardgame.io implementation guidance.
tools: ['codebase', 'editFiles', 'new', 'search', 'searchResults']
---

Extract and synthesize all game rules from a provided rules document, creating a comprehensive, cross-referenced file that connects rules to mechanics and includes boardgame.io implementation guidance. You must have both a mechanics document (mechanics.md) and a rules document (rules.md) to proceed. If either is missing, request them from the user.

You are tasked with creating a cross-referenced rules document that connects each rule to its corresponding mechanics and provides implementation guidance for boardgame.io developers.

# References
- Mechanics document (mechanics.md) - Required for cross-referencing
- Boardgame.io [Documentation](../../boardgame.io/docs/documentation/README.md)

You must:
- Critically analyze the rules document step by step, identifying, categorizing, and describing each distinct rule.
- Cross-reference each rule with the corresponding mechanics from the mechanics document.
- For each rule, provide clear statement, context, relationships to mechanics, and references to rule sections.
- For each rule, reference relevant boardgame.io documentation sections, concepts, and API features that would be important for implementing the rule. This should include guidance for an LLM on which boardgame.io features (e.g., moves, validation, events, state management, rule enforcement) are most applicable for implementing each rule.
- Organize rules in a way that maximizes clarity and utility for cross-referencing and implementation.
- Ensure your reasoning is explicit: first, analyze and extract rules step by step, then synthesize and organize them into the final output.

# Steps
1. Parse mechanics.md to extract all mechanics, their headings, and anchors.
2. Parse rules.md to extract all rules, articles, and sub-articles.
3. For each mechanic, search rules.md for relevant rules and create a cross-referenced section for each.
4. For each rule, add a "Related Mechanic(s)" field with a markdown link to the mechanic(s) it implements.
5. Output the new rules document in Markdown, with each rule as a discrete, clearly labeled section.
6. If mechanics.md is missing, halt and prompt the user to provide it.

# Output Format
- Output a single Markdown file with atomic, cross-referenced rule sections.
- Use the file-naming instructions guidlines specified in the project when creating the filae name.
- Name the file 'rules-crossref.md'.
- Each section should use the following template:

### [Rule Title] (Article X.Y)
- **Rule:** [Explicit statement of the rule]
- **Context:** [Short explanation or rationale, if needed]
- **Related Mechanic(s):** [Markdown link(s) to mechanics.md]
- **Example:** [Optional, for clarity]

# Example

### Alternating Moves (Article 1.1)
- **Rule:** Players move their pieces alternately; the player with the white pieces moves first.
- **Context:** Establishes turn order and who begins the game.
- **Related Mechanic(s):** [Turn-Based Play]()

# Notes
- All cross-references must use relative Markdown links.
- If a mechanic is not referenced by any rule, note this in the output.
- If a rule does not clearly map to a mechanic, include it in an "Unmapped Rules" section at the end.
- If mechanics.md is not provided, halt and prompt the user to supply it before proceeding.
