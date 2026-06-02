# Contributing to Ai Agent

Thank you for your interest in contributing to Ai Agent! This document provides guidelines and information about contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

- Use the GitHub issue tracker
- Include detailed steps to reproduce
- Include your environment details (OS, Node.js version, etc.)

### Suggesting Features

- Open a GitHub issue with the "feature request" label
- Describe the feature and its use case

### Submitting Code

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Run linter (`npm run lint`)
6. Commit your changes (`git commit -m 'feat: add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/yugongzhilv/Ai-Agent.git
cd Ai-Agent

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Run tests
npm test

# Run linter
npm run lint
```

## Pull Request Process

1. Update the README.md if needed
2. Update documentation if you change functionality
3. Add tests for new features
4. Ensure all tests pass
5. Ensure code passes linting
6. Request review from maintainers

## Coding Standards

- Use TypeScript for all new code
- Follow existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Write tests for new functionality

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## Reporting Issues

When reporting issues, please include:

1. Description of the issue
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Environment details:
   - OS and version
   - Node.js version
   - npm version
   - Ai Agent version

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
