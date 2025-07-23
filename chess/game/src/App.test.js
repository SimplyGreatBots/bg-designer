import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the CSS imports
jest.mock('./App.css', () => ({}));
jest.mock('./Board.css', () => ({}));

// Mock the boardgame.io client since we're testing the App component structure
jest.mock('boardgame.io/react', () => ({
  Client: jest.fn(() => {
    // Return a mock component
    return function MockChessClient() {
      return <div data-testid="chess-client">Mock Chess Game Client</div>;
    };
  })
}));

describe('App Component', () => {
  test('renders main app structure', () => {
    render(<App />);
    
    // Check header content
    expect(screen.getByText('Chess Game')).toBeInTheDocument();
    expect(screen.getByText('Built with boardgame.io following FIDE Laws of Chess')).toBeInTheDocument();
    
    // Check that the chess client is rendered
    expect(screen.getByTestId('chess-client')).toBeInTheDocument();
    
    // Check footer content
    expect(screen.getByText(/This chess implementation follows the official FIDE Laws of Chess/)).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    render(<App />);
    
    // Check for semantic HTML elements
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('main')).toBeInTheDocument();   // main
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
  });

  test('displays chess implementation information', () => {
    render(<App />);
    
    const implementationText = screen.getByText(/implements all standard rules including castling, en passant, pawn promotion/);
    expect(implementationText).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  test('has correct app class structure', () => {
    const { container } = render(<App />);
    
    expect(container.firstChild).toHaveClass('App');
    expect(container.querySelector('.App-header')).toBeInTheDocument();
    expect(container.querySelector('.App-main')).toBeInTheDocument();
    expect(container.querySelector('.App-footer')).toBeInTheDocument();
  });
});
