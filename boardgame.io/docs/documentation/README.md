# Boardgame.io Documentation Site

This README documents the `documentation` folder for the boardgame.io project. All information is limited to files and subdirectories directly within this folder.

---

## Table of Contents

- [Overview](#overview)
- [Folder Structure](#folder-structure)
- [Core Documentation](#core-documentation)
- [Docsify Configuration](#docsify-configuration)
- [Content Organization](#content-organization)
- [Prerequisites](#prerequisites)
- [Usage Instructions](#usage-instructions)
- [Configuration Files](#configuration-files)
- [Scope & Boundaries](#scope--boundaries)

---

## Overview

The `documentation` folder contains the complete boardgame.io documentation site built with Docsify. It provides comprehensive guides, tutorials, API references, and interactive examples for developers using the boardgame.io game engine. This folder serves as a self-contained documentation website with markdown-based content and rich interactive features.

---

## Folder Structure

### Root Level Files
- `index.html` – Main Docsify application entry point
- `sidebar.md` – Navigation structure for the documentation
- `theme.css` – Custom styling and theme configuration
- `.nojekyll` – GitHub Pages configuration to bypass Jekyll processing

### Documentation Content
- `concepts.md` – Core boardgame.io concepts and architecture
- `tutorial.md` – Complete step-by-step tutorial for beginners
- `CHANGELOG.md` – Version history and release notes
- `notable_projects.md` – Showcase of projects built with boardgame.io

### Feature Guides
- `multiplayer.md` – Multiplayer game implementation
- `turn-order.md` – Turn management and player sequences
- `phases.md` – Game phase management and transitions
- `stages.md` – Stage-based game flow control
- `events.md` – Game event handling and dispatching
- `undo.md` – Undo/redo functionality implementation
- `random.md` – Randomness and pseudo-random number generation
- `secret-state.md` – Hidden information and private state management
- `immutability.md` – State immutability patterns and best practices

### Development & Tools
- `plugins.md` – Plugin system architecture and extensions
- `debugging.md` – Debugging tools and development techniques
- `testing.md` – Testing strategies and utilities
- `deployment.md` – Production deployment guidance and configuration
- `storage.md` – State persistence and storage backend options
- `chat.md` – In-game chat system implementation
- `typescript.md` – TypeScript integration and type definitions

### Subdirectories
- `api/` – API reference documentation
- `snippets/` – Interactive code examples and demonstrations

---

## Core Documentation

### Getting Started Materials
- **`concepts.md`** – Fundamental concepts including state management (`G` and `ctx` objects), game flow, and architecture patterns
- **`tutorial.md`** – Complete Tic-Tac-Toe tutorial walking through game creation from setup to deployment

### Version Information
- **`CHANGELOG.md`** – Comprehensive version history with bugfixes, features, and breaking changes
- **`notable_projects.md`** – Community showcase of games and applications built with boardgame.io

---

## Docsify Configuration

### Main Application (`index.html`)
Single-page application setup featuring:
- Docsify v4 integration with themeable support
- Custom CSS variables and responsive design
- Plugin integrations: search, pagination, tabs, GitHub editing
- Syntax highlighting for JavaScript, JSX, TypeScript, and JSON
- Social media meta tags and branding
- Iframe styling for embedded examples

### Navigation (`sidebar.md`)
Structured navigation with sections:
- **Getting Started** – Core concepts and tutorial
- **Guides** – Feature-specific implementation guides
- **Reference** – API documentation for Game, Client, Server, and Lobby

### Theme Configuration (`theme.css`)
Custom styling including:
- Color scheme with CSS custom properties
- Sidebar layout and navigation styling
- Typography and spacing customization
- Responsive design patterns
- Border radius and visual polish

---

## Content Organization

### Documentation Categories

**Conceptual Guides:**
- Core framework concepts and state management
- Architecture patterns and best practices
- Game design considerations

**Implementation Guides:**
- Step-by-step feature implementation
- Code examples and usage patterns
- Configuration options and customization

**Reference Materials:**
- API documentation and method signatures
- Version history and migration guides
- Community resources and examples

### Interactive Elements
The documentation includes:
- Live code examples via the `snippets/` folder
- Embedded demonstrations with custom iframe styling
- Syntax-highlighted code blocks
- Search functionality across all content
- Pagination between related topics

---

## Prerequisites

### Viewing Documentation
- Modern web browser with JavaScript enabled
- Internet connection for CDN resources (Docsify, plugins, syntax highlighting)

### Local Development
- Static file server for local preview
- Text editor for markdown content editing
- Basic understanding of Docsify configuration

### Dependencies (External CDN)
- Docsify v4 core and themeable plugin
- Search, pagination, tabs, and GitHub editing plugins
- Prism.js syntax highlighting for multiple languages

---

## Usage Instructions

### Accessing Documentation
1. **Online:** Documentation is served as part of the main boardgame.io website
2. **Local:** Serve the folder with any static file server to preview locally

### Navigation
- Use the sidebar for structured browsing of topics
- Search functionality available for finding specific content
- Pagination links for sequential reading
- GitHub edit links for contributing improvements

### Content Structure
- Homepage starts with `concepts.md` introducing core ideas
- Tutorial provides hands-on learning experience
- Guides cover specific features and implementation patterns
- API reference provides detailed technical specifications

---

## Configuration Files

### Docsify Settings (`index.html`)
- **Name:** "boardgame.io" with logo integration
- **Homepage:** `concepts.md` as the landing page
- **Repository:** Links to GitHub repository for contributions
- **Sidebar:** Auto-generated from `sidebar.md`
- **Search:** Full-text search across all documentation
- **Plugins:** Enhanced functionality for editing, navigation, and code display

### GitHub Pages (`.nojekyll`)
Prevents Jekyll processing to ensure proper Docsify functionality on GitHub Pages.

### Theme Customization (`theme.css`)
- Custom color scheme based on boardgame.io branding
- Responsive layout optimizations
- Enhanced sidebar and navigation styling
- Consistent typography and spacing

---

## Scope & Boundaries

- This README only documents files and subdirectories within the `documentation` folder
- No references to files outside this folder are included
- Subdirectories (`api/`, `snippets/`) are listed but their internal structure is not detailed
- The documentation focuses on boardgame.io framework usage and implementation
- All content and configuration are self-contained within this folder structure
- External dependencies are limited to CDN resources for Docsify and related plugins

---

_Disclaimer: This documentation is limited to the `documentation` folder and does not cover source code or implementation details outside this scope._
