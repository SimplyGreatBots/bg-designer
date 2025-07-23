---
applyTo: "**"
---

# bg-builder Chat Mode Instructions

This document defines the specific instructions for the `bg-builder` chat mode, which is designed to implement board games using the boardgame.io framework. These instructions complement the general Copilot rules and ensure robust, testable, and well-structured game implementations.

## Additional Requirements

1. **Documentation Review (MANDATORY FIRST STEP - ALWAYS DO THIS):**

   - BEFORE making ANY implementation changes, code edits, or answering questions about boardgame.io:
     - FIRST read the relevant [boardgame.io documentation](../../boardgame.io/docs/documentation) in the workspace
     - Review the boardgame.io docs folder for API references, concepts, turn order, player IDs, and framework patterns
     - Consult existing examples and best practices from the documentation
     - Understand the specific boardgame.io concepts needed for the task at hand
   - This documentation review is REQUIRED before:
     - Writing any game logic or React components
     - Making any file edits or code changes
     - Answering questions about boardgame.io implementation
     - Debugging boardgame.io-related issues
     - Creating new games or modifying existing ones
   - Never assume framework behavior - always verify with the documentation first.
   - If you cannot find the answer in the workspace documentation, clearly state what specific information is missing.

2. **Rules Review (MANDATORY SECOND STEP - ALWAYS DO THIS):**

   - BEFORE making ANY implementation changes, ALWAYS create a detailed plan

   **Review Mechanics**

   - Review the `game/mechancis` folder
   - Review the mechanics documentation in the game's `mechanics/` folder.
   - Summarize the core mechanics, their categories, and any unique features.
   - Ensure your implementation plan addresses each mechanic and its impact on gameplay, turn structure, player actions, and win/loss conditions.
   - Reference the mechanics documentation to justify design decisions and framework usage.

   **Review Rules**

   - Review the `game/rules` folder
   - Review the rules documentation in the game's `rules/` folder.
   - Summarize the key rules, player actions, and game flow.
   - Ensure your implementation plan aligns with the documented rules and addresses any special cases or exceptions.
   - Reference the rules documentation to justify design decisions and framework usage.

   **Review Entities**

   - Review the `game/entities` folder
   - Review the entities documentation in the game's `entities/` folder.
   - Summarize the key entities, their attributes, and relationships.
   - Ensure your implementation plan incorporates the entities and their interactions as defined in the documentation.

3. **Planning and Implementation:**

   - Always create a detailed implementation plan before writing any code.
   - The plan must include:
     - Game mechanics and rules overview
     - Player actions and turn structure
     - Game state management
     - Component structure for React-based games
     - Integration with boardgame.io features (e.g., phases, stages, multiplayer)
   - Ensure the plan aligns with the boardgame.io documentation and best practices.
   - Use the plan to guide your implementation, ensuring all aspects of the game are covered.
   - Document any deviations from the plan and justify them based on gameplay requirements or technical constraints.

4. **Code Quality and Structure:**
   - Always follow best practices for code organization and readability.
   - Use clear, descriptive names for functions, variables, and components.
   - Maintain consistent coding style (indentation, spacing, etc.) throughout the project.
   - Use comments to explain complex logic or important decisions in the code.
   - Ensure all game logic is modular and reusable where possible.
   - Avoid hardcoding values; use constants or configuration files for game settings.

5. **Game Implementation:**
   - Always implement game logic in a modular way, separating concerns (e.g., game state management, UI components, player actions).
   - Use boardgame.io's built-in features for managing game state, phases, and player actions.
   - Ensure all game rules are enforced through the implementation, including win/loss conditions and player interactions.
   - Use boardgame.io's debugging tools to test and validate game behavior during development.

6. **React Components (if applicable):**
   - Always create React components for UI elements, ensuring they are reusable and composable.
   - Use functional components with hooks where appropriate.
   - Ensure components are properly connected to the boardgame.io game state.
   - Use PropTypes or TypeScript for type checking and documentation of component props.

7. **Testing and Validation:**
   - Always write comprehensive tests for game logic and React components.
   - Use Jest and React Testing Library for unit and integration tests.
   - Ensure all tests cover edge cases and validate game rules and mechanics.
   - Run tests regularly during development to catch issues early.
   - Use boardgame.io's testing utilities to simulate game scenarios and validate behavior.

8. **Documentation and Comments:**
   - Always document your code thoroughly, including:
     - Function and component descriptions
     - Parameters and return values
     - Game mechanics and rules explanations
   - Use JSDoc or similar tools to generate documentation from comments.
   - Ensure the documentation is clear, concise, and accessible to other developers.
   - Update documentation as the implementation evolves to reflect changes accurately.

9. **Project Structure:**

   - Always create a `game/` folder for all game-building scripts, source files, and configuration.
   - All code, configuration, and scripts (including `package.json`) must reside in the `game/` folder.
   - Never place game scripts or configs in the project root.

10. **Working Directory:**

    - Always ensure you are in the `game/` folder when running commands like `npm start`, `npm install`, or when adding a `package.json`.
    - Do not run these commands or add configuration in the project root.

11. **PowerShell Command Syntax:**

    - Always use `;` for command chaining in PowerShell, never `&&` or `||`.
    - Example: `cd "path"; npm install` instead of `cd "path" && npm install`.
    - Follow PowerShell-specific syntax as defined in the powershell.instructions.md file.

12. **Testing Dependencies and Configuration:**

    - Required devDependencies for React testing: `jest`, `jest-environment-jsdom`, `@testing-library/jest-dom`, `@testing-library/react`.
    - **Babel dependencies (OPTIONAL)**: Only install `@babel/core`, `@babel/preset-env`, `@babel/preset-react` if you need custom Babel configuration beyond Parcel's built-in transpilation.
    - Required for CSS mocking: `identity-obj-proxy`.
    - setupTests.js must use `require('@testing-library/jest-dom');` (CommonJS) not ES6 import syntax.
    - Jest configuration must include: `"testEnvironment": "jsdom"`, `"setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"]`, and `"moduleNameMapper": {"\\.(css|less|scss|sass)$": "identity-obj-proxy"}`.
    - **Babel configuration**: Only create `.babelrc` if you need custom plugins - Parcel handles React/JSX transpilation automatically.
    - Always verify tests run successfully with `npm test` before considering implementation complete.
    - **Error Handling**: Add defensive programming practices:
      - Safety checks for undefined props from boardgame.io
      - Error boundaries for React components
      - Console logging for debugging prop passing issues

13. **Client Architecture and Multiplayer Configuration:**
    - **Default to Single Client Architecture**: For testing and pass-and-play games, always start with a simple single client setup.
    - **Basic Client Setup**: Use `Client({ game: GameDefinition, board: BoardComponent, debug: true })` without multiplayer configuration initially.
    - **Pass-and-Play Mode**: For local pass-and-play games, do NOT add `multiplayer: Local()` or other multiplayer configurations.
    - **Props Safety**: Always add safety checks in React components for boardgame.io props:
      ```javascript
      function Board({ G, ctx, moves, events }) {
        // Safety check for props that might be undefined
        if (!G || !ctx || !moves) {
          return <div>Loading...</div>;
        }
        // ... rest of component
      }
      ```
    - **Debugging Setup**: Always include `debug: true` in the Client configuration during development to enable boardgame.io's debugging tools.
    - **Turn Management**: Use `events.endTurn()` in move functions to properly advance turns in boardgame.io.

14. **Babel Configuration (OPTIONAL - Parcel Has Built-in Transpilation):**
    - **IMPORTANT**: When using Parcel bundler, Babel configuration is usually NOT needed.
    - Parcel includes transpilation by default and `.babelrc` files can hurt build performance.
    - Only create a `.babelrc` file if you need custom Babel plugins beyond standard React/JSX transpilation.
    - If you must use custom Babel configuration with Parcel, use `@parcel/babel-preset-env` instead of `@babel/preset-env`.
    - For most boardgame.io projects with Parcel: **DO NOT create a `.babelrc` file** - let Parcel handle transpilation automatically.

15. **Common Issues and Troubleshooting:**
    - **"moves.functionName is undefined" Error**: This indicates props are not being passed correctly from boardgame.io Client. Solutions:
      - Add safety checks: `if (!G || !ctx || !moves) return <div>Loading...</div>;`
      - Verify Client configuration is correct (game, board, debug)
      - Start with basic Client setup without multiplayer for testing
      - Use console.log to debug which props are undefined
    - **Parcel Babel Warnings**: If you see warnings about redundant presets, delete `.babelrc` file - Parcel handles transpilation automatically.
    - **PowerShell Command Errors**: Use `;` for command chaining, never `&&` or `||` which are bash-specific.
    - **Turn Management Issues**: Ensure moves call `events.endTurn()` to properly advance game state.
    - **Props Not Updating**: Verify game state mutations are returning new objects, not modifying existing state.
    - **Debugging Strategy**: 
      1. Start with simplest Client setup (no multiplayer)
      2. Add safety checks for all boardgame.io props
      3. Use `debug: true` in Client configuration
      4. Add console logging to track prop values
      5. Only add complexity (multiplayer) after basic functionality works
