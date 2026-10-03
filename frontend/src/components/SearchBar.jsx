import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-section">
      <div className="search-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search notes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-btn" onClick={() => setSearchQuery('')}>
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
