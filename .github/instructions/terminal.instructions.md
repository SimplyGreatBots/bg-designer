---
applyTo: '**'
description: 'Terminal usage guidelines for AI coding agents to prevent multiple terminal spawning and ensure efficient command execution.'
---

# Terminal Usage Instructions for AI Coding Agents

This document defines best practices for terminal usage to prevent unnecessary terminal spawning and ensure efficient command execution.

## Core Principles

### Single Terminal Session
- **ALWAYS** reuse existing terminal sessions when possible
- Only create new terminals when absolutely necessary (e.g., running background processes that need to remain active)
- Check for existing active terminals before creating new ones

### Background vs Foreground Commands
- **Use `isBackground=false`** for commands that:
  - Need immediate output/results
  - Are short-running (build, test, install, etc.)
  - Require user interaction or confirmation
  - Need to complete before proceeding
- **Use `isBackground=true`** ONLY for commands that:
  - Start long-running services (dev servers, watch processes)
  - Should continue running independently
  - Don't need immediate output for the next step

### Working Directory Management
- The `run_in_terminal` tool respects the working directory context
- Commands run from the directory shown in the terminal context
- Use absolute paths when necessary to avoid directory confusion
- Don't change directories unnecessarily - leverage the working directory context

## Command Execution Patterns

### Development Server Pattern
```markdown
✅ CORRECT:
1. Start dev server: `npm start` with `isBackground=true`
2. Check status later with `get_terminal_output` if needed

❌ INCORRECT:
1. Start dev server: `npm start` with `isBackground=true`
2. Immediately run another command in a new terminal
3. Create multiple terminals for checking status
```

### Build/Test Pattern
```markdown
✅ CORRECT:
1. Run build: `npm run build` with `isBackground=false`
2. Wait for completion
3. Run tests: `npm test` with `isBackground=false` in same session

❌ INCORRECT:
1. Run build: `npm run build` with `isBackground=true`
2. Immediately start new terminal for tests
3. Multiple terminals running simultaneously
```

### Sequential Commands Pattern
```markdown
✅ CORRECT:
1. First command: `npm install` with `isBackground=false`
2. Second command: `npm run build` with `isBackground=false` (reuses terminal)
3. Third command: `npm start` with `isBackground=true` (for long-running server)

❌ INCORRECT:
1. First command: `npm install` with `isBackground=true`
2. Second command: `npm run build` with `isBackground=true` (new terminal)
3. Third command: `npm start` with `isBackground=true` (another new terminal)
```

## When to Create New Terminals

### Acceptable Scenarios
- **Parallel Long-Running Processes**: When you need multiple services running simultaneously (e.g., backend server + frontend dev server)
- **Different Working Directories**: When commands need to run from different project directories
- **Terminal Session Corruption**: When the current terminal session becomes unresponsive

### Unacceptable Scenarios
- **Sequential Commands**: Running one command after another in the same directory
- **Quick Status Checks**: Checking command output or running short utilities
- **Impatience**: Creating new terminals because a command is taking time to complete

## PowerShell Specific Guidelines

### Command Chaining
- Use `;` for command chaining in PowerShell
- Example: `cd "path"; npm install; npm start`
- Avoid `&&` or `||` which are bash-specific

### Path Handling
- Always quote paths with spaces: `cd "C:\Users\user\Desktop\project"`
- Use forward slashes or double backslashes for paths
- Be consistent with path separators

## Error Prevention

### Before Running Commands
1. **Check Context**: Verify working directory and existing terminals
2. **Plan Execution**: Determine if command should be background or foreground
3. **Consider Dependencies**: Ensure prerequisite commands have completed

### During Execution
1. **Monitor Output**: Use `get_terminal_output` for background processes
2. **Wait for Completion**: Don't spawn new terminals while commands are running
3. **Handle Errors**: Address issues in the same terminal session when possible

### After Execution
1. **Verify Results**: Check command completion and output
2. **Clean Up**: Only terminate terminals when truly necessary
3. **Document State**: Keep track of running background processes

## Common Mistakes to Avoid

1. **Terminal Spam**: Creating multiple terminals for sequential operations
2. **Background Overuse**: Using `isBackground=true` for short commands
3. **Directory Confusion**: Not leveraging the working directory context
4. **Premature New Terminals**: Creating new terminals before checking existing ones
5. **Status Check Terminals**: Creating terminals just to check command output

## Best Practices Summary

- **Default to `isBackground=false`** for most commands
- **Reuse terminals** for sequential operations
- **Use `isBackground=true`** only for servers and long-running processes
- **Check existing terminals** before creating new ones
- **Plan command sequences** to minimize terminal usage
- **Use `get_terminal_output`** to check background process status

Following these guidelines will result in cleaner, more efficient terminal usage and prevent the confusion of multiple unnecessary terminal sessions.
