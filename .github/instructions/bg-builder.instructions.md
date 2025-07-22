---
applyTo: '**'
---

# bg-builder Chat Mode Instructions

This document defines the specific instructions for the `bg-builder` chat mode, which is designed to implement board games using the boardgame.io framework. These instructions complement the general Copilot rules and ensure robust, testable, and well-structured game implementations.

## Additional Requirements

1. **Documentation Review (MANDATORY FIRST STEP - ALWAYS DO THIS BEFORE ANYTHING ELSE):**
   - BEFORE making ANY implementation changes, code edits, or answering questions about boardgame.io:
     * FIRST read the relevant boardgame.io documentation in the workspace
     * Review the boardgame.io docs folder for API references, concepts, turn order, player IDs, and framework patterns
     * Consult existing examples and best practices from the documentation
     * Understand the specific boardgame.io concepts needed for the task at hand
   - This documentation review is REQUIRED before:
     * Writing any game logic or React components
     * Making any file edits or code changes
     * Answering questions about boardgame.io implementation
     * Debugging boardgame.io-related issues
     * Creating new games or modifying existing ones
   - Never assume framework behavior - always verify with the documentation first.
   - If you cannot find the answer in the workspace documentation, clearly state what specific information is missing.

2. **Testing:**
2. **Testing:**
   - Always generate comprehensive Jest test files for every project.
   - Place all test files in the `game/` folder alongside the implementation.
   - All tests must be run and must pass before the game implementation is considered complete.
   - Always include `jest-environment-jsdom` in devDependencies when testing React components.
   - Configure Jest with `"testEnvironment": "jsdom"` in package.json for React testing.
   - Use CommonJS syntax (`require()`) in setupTests.js to avoid ES6 import issues with Jest.
   - Ensure setupFilesAfterEnv points to `"<rootDir>/src/setupTests.js"` in Jest configuration.

3. **Project Structure:**
3. **Project Structure:**
   - Always create a `game/` folder for all game-building scripts, source files, and configuration.
   - All code, configuration, and scripts (including `package.json`) must reside in the `game/` folder.
   - Never place game scripts or configs in the project root.

4. **Working Directory:**
4. **Working Directory:**
   - Always ensure you are in the `game/` folder when running commands like `npm start`, `npm install`, or when adding a `package.json`.
   - Do not run these commands or add configuration in the project root.

5. **PowerShell Command Syntax:**
5. **PowerShell Command Syntax:**
   - Always use `;` for command chaining in PowerShell, never `&&` or `||`.
   - Example: `cd "path"; npm install` instead of `cd "path" && npm install`.
   - Follow PowerShell-specific syntax as defined in the powershell.instructions.md file.

6. **Testing Dependencies and Configuration:**
6. **Testing Dependencies and Configuration:**
   - Required devDependencies for React testing: `jest`, `jest-environment-jsdom`, `@testing-library/jest-dom`, `@testing-library/react`.
   - Required Babel dependencies: `@babel/core`, `@babel/preset-env`, `@babel/preset-react`.
   - Required for CSS mocking: `identity-obj-proxy`.
   - setupTests.js must use `require('@testing-library/jest-dom');` (CommonJS) not ES6 import syntax.
   - Jest configuration must include: `"testEnvironment": "jsdom"`, `"setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"]`, and `"moduleNameMapper": {"\\.(css|less|scss|sass)$": "identity-obj-proxy"}`.
   - Create `.babelrc` with presets for env and react: `{"presets": [["@babel/preset-env", {"targets": {"node": "current"}}], ["@babel/preset-react", {"runtime": "automatic"}]]}`.
   - Always verify tests run successfully with `npm test` before considering implementation complete.

7. **Babel Configuration (REQUIRED FOR ALL GAMES):**
   - Always create a `.babelrc` file in the `game/` folder to configure JavaScript/JSX transpilation.
   - Standard configuration for boardgame.io projects:
     ```json
     {
       "presets": [
         ["@babel/preset-env", { "targets": { "node": "current" } }],
         ["@babel/preset-react", { "runtime": "automatic" }]
       ]
     }
     ```
   - `@babel/preset-env`: Transforms modern JavaScript features for browser compatibility.
   - `@babel/preset-react`: Handles JSX transformation and React component processing.
   - `"runtime": "automatic"`: Uses React 17+ JSX runtime (no need to import React in JSX files).
   - `"targets": { "node": "current" }`: Optimizes transpilation for your current Node.js version.
   - This configuration works with Parcel bundler and is essential for React + boardgame.io development.
