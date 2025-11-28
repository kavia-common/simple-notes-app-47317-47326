/* See above for file content. */
import React from "react";

// PUBLIC_INTERFACE
function Header({ theme, onToggleTheme, searchTerm, onSearchChange, filter, onFilterChange }) {
  /**
   * Renders the Ocean Professional themed Header.
   * @param {string} theme - Current theme ('light' or 'dark')
   * @param {function} onToggleTheme - Callback for theme change
   */
  return (
    <header className="notes-header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className="logo">Notes Ocean</span>
        <span className="subtitle">Professional Notes App</span>
        {/* Search + filter */}
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search notes"
            data-testid="search-input"
          />
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            aria-label="Filter notes"
            data-testid="filter-select"
          >
            <option value="all">All</option>
            <option value="recent">Recent</option>
          </select>
        </div>
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
