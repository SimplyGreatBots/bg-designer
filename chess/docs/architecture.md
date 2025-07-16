# Project Organization & Context Engineering Guide

This document outlines the structure, organization, and context engineering principles for the Chess project.

## Overview

This guide describes how the project is organized, the purpose of each directory, and the principles used to maintain clear, consistent, and actionable context throughout the project. The goal is to make information discoverable, up-to-date, and maximally useful for any design or development task.

## Navigation

**← [Main Project](../README.md)** | **[Documentation](./README.md)**

### Directory Structure

```
soa/
├── README.md        # Main navigation hub
├── systems/         # Foundational architecture
├── mechanics/       # Gameplay interactions
├── rules/           # Official regulations
├── content/         # Playable elements (pieces, boards, setups)
├── templates/       # Creation standards and documentation templates
├── docs/            # Meta-documentation (including this file)
```

**Categories:**
1. **Systems** – Core game infrastructure and foundational logic
2. **Mechanics** – Specific gameplay interactions and player actions
3. **Rules** – Authoritative regulations and official procedures
4. **Content** – Pieces, boards, setups, and other playable elements
5. **Templates** – Standardized creation patterns and documentation structures
6. **Docs** – Meta-documentation, rules, guides, and project context

## Organizational Principles

### 1. Hub-and-Spoke Navigation
Each directory acts as a navigation hub, with a comprehensive README guiding users to relevant content. This supports a hierarchical, discoverable information architecture.

### 2. Single Source of Truth
Every concept, definition, or specification exists in one authoritative location. This prevents inconsistencies and ensures updates propagate throughout the project.

**Best Practices:**
- Store definitions and documentation in their most logical, relevant directory
- Use markdown links for cross-references—never duplicate content
- Maintain clear ownership and responsibility for each section
- Directory README files provide complete, up-to-date overviews
- Keep documentation short, clear, and focused on intent and usage
- Use consistent formatting and naming conventions
- Summarize or link to long discussions or design decisions