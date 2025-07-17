# Boardgame.io Documentation

This README documents the `docs` folder for the boardgame.io project. All information is limited to files and subdirectories directly within this folder.

---

## Table of Contents

- [Overview](#overview)
- [Folder Structure](#folder-structure)
- [Website Files](#website-files)
- [Documentation Content](#documentation-content)
- [Prerequisites](#prerequisites)
- [Usage Instructions](#usage-instructions)
- [Configuration](#configuration)
- [Scope & Boundaries](#scope--boundaries)

---

## Overview

The `docs` folder contains the complete documentation website for boardgame.io, including the main landing page, comprehensive documentation, API references, and all associated assets. This folder serves as a static website that provides developers with guides, tutorials, and reference materials for using the boardgame.io game engine.

---

## Folder Structure

### Root Level Files
- `CNAME` – Custom domain configuration for GitHub Pages (boardgame.io)
- `favicon.png` – Website favicon
- `index.css` – Main stylesheet for the landing page
- `index.html` – Main landing page for boardgame.io
- `logo-optimized.svg` – Optimized SVG logo
- `logo.svg` – Standard SVG logo

### Subdirectories
- `documentation/` – Complete documentation content and structure

---

## Website Files

### Landing Page (`index.html`)
The main entry point for the boardgame.io website featuring:
- Project branding and logo display
- Navigation to documentation sections
- GitHub integration and badges
- Social media meta tags for Twitter cards
- Responsive design with mobile support

### Styling (`index.css`)
Custom CSS providing:
- Responsive layout styling
- Theme variables and color schemes
- GitHub corner styling
- Typography and spacing definitions
- Mobile-responsive design elements

### Domain Configuration (`CNAME`)
GitHub Pages configuration file specifying the custom domain `boardgame.io`.

### Visual Assets
- `favicon.png` – 16x16 pixel favicon for browser tabs
- `logo-optimized.svg` – Performance-optimized vector logo
- `logo.svg` – Standard vector logo for various uses

---

## Documentation Content

The `documentation/` subdirectory contains comprehensive guides and references organized into several categories:

### Core Documentation Files
- `concepts.md` – Fundamental boardgame.io concepts and architecture
- `tutorial.md` – Step-by-step getting started guide
- `CHANGELOG.md` – Version history and release notes
- `notable_projects.md` – Showcase of projects built with boardgame.io

### Feature Guides
- `multiplayer.md` – Multiplayer game implementation
- `turn-order.md` – Turn management and player order
- `phases.md` – Game phase management
- `stages.md` – Stage-based game flow
- `events.md` – Game event handling
- `undo.md` – Undo/redo functionality
- `random.md` – Randomness and pseudo-random number generation
- `secret-state.md` – Hidden information management
- `immutability.md` – State immutability patterns

### Development Tools
- `plugins.md` – Plugin system and extensions
- `debugging.md` – Debugging tools and techniques
- `testing.md` – Testing strategies and utilities
- `deployment.md` – Production deployment guidance
- `storage.md` – State persistence and storage options
- `chat.md` – In-game chat implementation
- `typescript.md` – TypeScript integration and usage

### Documentation Infrastructure
- `index.html` – Documentation site entry point using Docsify
- `sidebar.md` – Navigation structure for documentation
- `theme.css` – Custom styling for documentation pages
- `.nojekyll` – GitHub Pages configuration
- `api/` – API reference documentation
- `snippets/` – Code examples and interactive demos

---

## Prerequisites

For viewing the documentation:
- Modern web browser with JavaScript enabled
- Internet connection (for CDN resources like Docsify)

For local development:
- Static file server (optional, for local preview)
- Text editor for content modification

---

## Usage Instructions

### Viewing Documentation
1. **Online:** Visit the live documentation at `boardgame.io`
2. **Local Preview:** Serve the folder with any static file server

### Content Organization
- Main landing page accessible via `index.html`
- Full documentation accessible via `documentation/index.html`
- Individual guides can be accessed directly or through the sidebar navigation

### Navigation Structure
The documentation uses Docsify for:
- Single-page application experience
- Client-side rendering of Markdown
- Automatic sidebar generation from `sidebar.md`
- Search functionality
- Mobile-responsive design

---

## Configuration

### Website Configuration
- **Domain:** Configured via `CNAME` for custom domain hosting
- **Theme:** Uses Docsify simple theme with custom overrides
- **Assets:** Self-hosted logos and favicon
- **Social:** Twitter card meta tags for sharing

### Documentation Configuration
- **Renderer:** Docsify-based documentation site
- **Navigation:** Structured via `sidebar.md`
- **Styling:** Custom theme in `theme.css`
- **Code Examples:** Interactive snippets in `snippets/` folder

### External Dependencies
- Docsify CSS theme from unpkg.com CDN
- GitHub corner SVG for source code links
- Various badges for npm, build status, and coverage

---

## Scope & Boundaries

- This README only documents files and subdirectories within the `docs` folder
- No references to files outside this folder are included
- Subdirectories are listed with their purpose, but detailed content is not covered
- The documentation content focuses on boardgame.io framework usage and implementation
- All website assets and configuration are self-contained within this folder

---

_Disclaimer: This documentation is limited to the `docs` folder and does not cover implementation details or source code outside this scope._
