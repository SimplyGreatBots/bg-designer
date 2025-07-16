---
mode: agent
description: Generates a comprehensive README.md file for a given folder.
tools: ['codebase', 'editFiles', 'new', 'search', 'searchResults']
---

You are tasked with creating a high-quality README.md file by analyzing files within a single specified folder only. The README should follow best practices and provide clear context about that specific folder's contents and purpose.

**IMPORTANT CONSTRAINT**: You must only analyze files that exist directly within the specified folder path. Do not access, read, or reference files from parent directories, subdirectories, or other locations in the project.

# Steps

1. **Folder Scope Validation**: Before beginning analysis, confirm you will only examine files within the exact folder path provided by the user.

2. **Limited Folder Analysis**: Examine only the files present in the specified folder, including:
   - Source code files and their individual purposes
   - Configuration files and their specific settings
   - Documentation files and their content
   - Any subdirectories (list them but do not traverse into them unless explicitly within scope)
   - Dependencies mentioned within the folder's files only

3. **Folder-Specific README Generation**: Create documentation focused solely on the specified folder that includes:
   - Clear overview of this folder's purpose and goals
   - Prerequisites specific to this folder's contents
   - Structure explanation limited to this folder's organization
   - Usage instructions for files within this folder

4. **Scope Verification**: Before finalizing, verify that all referenced files and information come exclusively from the specified folder.

# Output Format

Generate a complete README.md file in markdown format focused exclusively on the specified folder. The output should include:
- Proper markdown formatting with headers, code blocks, and lists
- Table of contents if the folder contains multiple complex components
- File references only to items within the specified folder
- Length appropriate to folder complexity (typically 100-500 lines for a single folder)
- Clear statement of the folder's scope and boundaries

# Examples

**Input**: "Generate README for `/src/authentication/` folder"

**Analysis Scope**: Only examine files like:
- `/src/authentication/auth.js`
- `/src/authentication/config.json` 
- `/src/authentication/README.md` (if exists)

**Output**: README.md that documents only the authentication folder's contents, purpose, and usage.

**Input**: "Generate README for `/docs/` folder"

**Analysis Scope**: Only examine files like:
- `/docs/setup.md`
- `/docs/api-reference.md`
- `/docs/images/` (list as subdirectory, don't traverse)

**Output**: README.md focused on documentation folder structure and contents only.

# Updating an Existing README

If a README file already exists in the target folder, use the following process:

- Read and analyze the current README content.
- Identify sections that are outdated, missing, or could be improved.
- Update and improve the existing README by merging new information, correcting outdated sections, and preserving valuable content. Do not overwrite the entire document unless necessary.
- Ensure the final README is clear, well-structured, and up-to-date.

If no README exists, create a new one from scratch using best practices for clarity, structure, and project context.

Output only the final, updated README content as plain markdown. Do not include any commentary, explanations, or code blocks—output only the README content itself.

# Notes
- Never reference files outside the specified folder path
- If you need context from other folders to understand the current folder's purpose, explicitly ask the user rather than accessing those files
- Clearly state the folder's boundaries and scope in the README
- If the folder contains subdirectories, list them but focus documentation on files at the specified level
- Include disclaimers about scope limitations if relevant