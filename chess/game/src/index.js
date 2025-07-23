/**
 * Chess Game Entry Point
 * 
 * Main entry point for the Chess application using boardgame.io.
 * Renders the React app to the DOM.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container);

// Render the app
root.render(<App />);
