---  
applyTo: '**/*.test.js,**/*.spec.js,**/jest.config.js'
description: 'Jest testing best practices and file naming conventions for JavaScript/TypeScript projects'
---  

# Jest Testing Best Practices

## Test File Naming

- **Kebab-Case Format:**
  - All test files should use lowercase letters with hyphens separating words.
  - Suffix test files with `.test.js` or `.spec.js` (e.g., `user-service.test.js`).
  - Place test files alongside the code they test or in a dedicated `__tests__/` directory.

- **Descriptive Names:**
  - File names should clearly indicate the module or feature under test.
  - Avoid ambiguous or generic names.

### Examples

- `user-service.test.js`
- `api-client.spec.js`
- `calculate-score.test.js`

> **Best Practice:** Use descriptive, kebab-case file names with `.test.js` or `.spec.js` suffixes for all Jest test files.

## Test Structure and Organization

- **Describe Blocks:**
  - Group related tests using `describe()` blocks.
  - Use clear, descriptive names for each block.

- **Test Cases:**
  - Use `test()` or `it()` for individual test cases.
  - Test names should state expected behavior or outcome.

- **Setup and Teardown:**
  - Use `beforeAll`, `beforeEach`, `afterAll`, and `afterEach` for setup/cleanup.
  - Keep setup logic minimal and relevant to the tests.

### Example

```javascript
describe('UserService', () => {
    beforeEach(() => {
        // Setup code
    });

    test('should create a new user', () => {
        // Test logic
    });

    test('should throw error for invalid input', () => {
        // Test logic
    });
});
```

## Test Coverage and Granularity

- **Unit Tests:**
  - Test one function, method, or component per test case.
  - Avoid testing multiple behaviors in a single test.

- **Integration Tests:**
  - Use separate files or directories for integration tests.
  - Clearly document dependencies and setup.

- **Coverage:**
  - Aim for high coverage, but prioritize meaningful tests over 100% coverage.
  - Use `jest --coverage` to check coverage reports.

## Assertions and Error Handling

- **Assertions:**
  - Use `expect()` for all assertions.
  - Prefer specific matchers (e.g., `toBe`, `toEqual`, `toThrow`).

- **Error Handling:**
  - Test both success and failure cases.
  - Use `async/await` and `expect(...).rejects` for async error tests.

### Example

```javascript
test('should throw when user not found', async () => {
    await expect(getUserById('invalid-id')).rejects.toThrow('User not found');
});
```

## Mocking and Isolation

- **Mocking:**
  - Use `jest.mock()` to mock modules and dependencies.
  - Use spies (`jest.fn()`, `jest.spyOn()`) for function tracking.

- **Isolation:**
  - Avoid shared state between tests.
  - Reset mocks and modules as needed (`jest.resetAllMocks()`).

### Example

```javascript
jest.mock('../api-client');

test('should call API client', () => {
    // ...test logic...
    expect(apiClient.fetchData).toHaveBeenCalled();
});
```

## Output and Logging

- **Avoid Console Output:**
  - Do not use `console.log` in tests except for debugging.
  - Remove or comment out debug logs before committing.

- **Test Output:**
  - Use Jest reporters for structured output.
  - Prefer readable, actionable error messages.

## Documentation and Style

- **Commenting:**
  - Add comments to explain complex test logic or setup.
  - Use JSDoc for custom test utilities.

- **Consistent Formatting:**
  - Use consistent indentation (2 or 4 spaces).
  - Follow project or team style guides (e.g., Prettier, ESLint).

- **Avoid Aliases:**
  - Use full function and variable names.
  - Avoid abbreviations and unclear names.

## Example: End-to-End Jest Test Pattern

```javascript
// user-service.test.js

describe('UserService', () => {
    let userService;

    beforeEach(() => {
        userService = new UserService();
    });

    test('should register a new user', () => {
        const user = userService.register('alice', 'password123');
        expect(user).toHaveProperty('id');
        expect(user.username).toBe('alice');
    });

    test('should not register user with duplicate username', () => {
        userService.register('bob', 'pass');
        expect(() => userService.register('bob', 'pass2')).toThrow('Username already exists');
    });
});
```

---

*Follow these guidelines to ensure all Jest tests are maintainable, readable, and consistent with project standards. For file naming, see the file-naming conventions guide.*