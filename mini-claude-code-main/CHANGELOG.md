# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-02

### Added
- Initial release as `@yugongzhilv/ai-agent`
- CLI interface for AI-powered coding assistance
- File operations (read, write, edit)
- Shell command execution with security restrictions
- MCP (Model Context Protocol) integration
- Skills system for extensible capabilities
- Sub-agent system with context isolation
- Context compression (auto and manual)
- Real-time status bar display
- Todo list management
- Comprehensive documentation (English and Chinese)
- Unit test framework with Jest
- CI/CD pipeline with GitHub Actions
- ESLint configuration
- Contributing guidelines

### Changed
- Rebranded from Mini Claude Code to Ai Agent
- Updated package name to `@yugongzhilv/ai-agent`
- Updated repository URL to `https://github.com/yugongzhilv/Ai-Agent`

### Security
- Path traversal prevention
- Dangerous command detection (50+ patterns)
- Symlink resolution for file access
- Command execution timeout protection

## [0.8.2] - 2026-06-02

### Fixed
- Removed unused `docx` dependency
- Fixed `.gitignore` typo
- Fixed `edit_text` replace to handle all occurrences
- Fixed TypeScript build errors (ES2021 lib, MCP capabilities type)
- Removed duplicate type definitions

## [0.8.1] - 2025-XX-XX

### Added
- Initial project setup
