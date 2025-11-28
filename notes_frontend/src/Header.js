/* See above for file content. */
import React from "react";

// PUBLIC_INTERFACE
function Header({ theme, onToggleTheme }) {
  /**
   * Renders the Ocean Professional themed Header.
   * @param {string} theme - Current theme ('light' or 'dark')
   * @param {function} onToggleTheme - Callback for theme change
   */
  return (
    <header className="notes-header">
      <div>
        <span className="logo">Notes Ocean</span>
        <span className="subtitle">Professional Notes App</span>
      </div>
      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        data-testid="theme-toggle"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
}

export default Header;
