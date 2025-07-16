---
mode: agent
description: Extracts and defines all relevant game mechanics from a rules markdown file.
tools: ['editFiles', 'new', 'search', 'bgg-collection', 'bgg-details', 'bgg-search', 'bgg-user']
---


Extract and synthesize all game mechanics from a provided rules document, creating a comprehensive, structured file of the game's mechanics. If you do not have a rules document, you must request one from the user. The mechanics should be categorized, described, and mapped to BoardGameGeek (BGG) mechanics where applicable. If a mechanic does not fit any BGG category, it should be marked as "Unique" with justification.

You must utilize the BoardGameGeek (BGG) tools (e.g., #bgg) to look up and cross-reference mechanics for the game being analyzed. When extracting mechanics, supplement your analysis with authoritative BGG mechanic names, IDs, and descriptions where relevant. Always check BGG for existing mechanic mappings and include this data in your output.


You must:
- Critically analyze the rules document step by step, identifying, categorizing, and describing each unique game mechanic.
- Use the BGG tools to search for the game and retrieve its mechanics, including BGG mechanic names, IDs, and descriptions.
- Reference the BoardGameGeek (BGG) mechanics list (https://boardgamegeek.com/browse/boardgamemechanic) to inform your categorization, but do not limit yourself to only those mechanics—include any unique or game-specific mechanics found in the rules.
- For each mechanic, provide a clear name, a concise description, and, if applicable, a mapping to the closest BGG mechanic(s), including BGG mechanic IDs and descriptions where possible.
- If a mechanic does not fit any BGG category, clearly mark it as "Unique" and provide a justification.
- Ensure your reasoning is explicit: first, analyze and extract mechanics step by step, then synthesize and organize them into the final output. Do not jump to conclusions or summaries before the extraction process is complete.


# Steps

1. Review the BGG mechanics list to understand standard mechanic categories.
2. Use the BGG tools to search for the game and retrieve its mechanics, including BGG mechanic names, IDs, and descriptions.
3. Read the provided rules document thoroughly.
4. For each section or rule, identify potential mechanics, reasoning through their function and categorization.
5. For each mechanic:
    - Name the mechanic.
    - Describe its function and role in the game.
    - Map it to the closest BGG mechanic(s) if possible, including BGG mechanic IDs and descriptions, or mark as "Unique" with justification.
6. After all mechanics are extracted, organize them into a comprehensive, structured file.

# Output Format


## Output Format


Produce a Markdown document structured for Copilot agents to understand all mechanics of the game. Use the following format:

---
# Game Mechanics Reference

## Mechanics List

For each mechanic, provide an entry in the following format:

### [Mechanic Name]
- **Description:** [A concise, clear explanation of the mechanic's function and role in the game.]
- **BGG Mapping:** [Closest BoardGameGeek mechanic(s), or "Unique" if not applicable.]
- **BGG Mechanic ID(s):** [BGG mechanic ID(s), if available.]
- **BGG Mechanic Description(s):** [BGG mechanic description(s), if available.]
- **Justification:** [If marked as Unique or ambiguous, explain why.]

Repeat the above for each mechanic. Organize mechanics into logical categories if appropriate (e.g., Turn Structure, Resource Management, Combat, etc.).

---

At the end, include a summary table:

| Mechanic Name | BGG Mapping | BGG Mechanic ID(s) | Unique/Standard | Category |
|--------------|-------------|-------------------|----------------|----------|
| ...          | ...         | ...               | ...            | ...      |

This document should be exhaustive and unambiguous, enabling Copilot agents to reason about and utilize all game mechanics effectively.

# Notes

- Always perform step-by-step reasoning before presenting the final list.
- If a mechanic is ambiguous, include your reasoning in the "justification" field.
- Be exhaustive: do not omit minor or implicit mechanics.
- Use clear, unambiguous language for all descriptions.