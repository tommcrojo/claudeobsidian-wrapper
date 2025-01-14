import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  themeClasses: {
    secondaryText: string;
    input: string;
    border: string;
  };
}

const SearchBar = ({ searchQuery, onSearchChange, themeClasses }: SearchBarProps) => {
  return (
    <div className="pb-2">
      <div className="relative">
        <Search className={`absolute left-2 top-2 h-4 w-4 ${themeClasses.secondaryText}`} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notes..."
          className={`w-full pl-8 pr-3 py-1.5 text-sm ${themeClasses.input} rounded-md border ${themeClasses.border} focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none`}
        />
      </div>
    </div>
  );
};

export default SearchBar;