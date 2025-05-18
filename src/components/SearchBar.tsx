import React from 'react';

interface SearchBarProps {
  category: string;
}

const SearchBar = ({ category }: SearchBarProps) => (
  <div className="flex items-center bg-pastel-blue/60 rounded-full px-6 py-2 shadow-sm w-72 ml-auto">
    <input
      type="text"
      placeholder={`Search ${category}`}
      className="bg-transparent outline-none flex-1 text-pastel-purple placeholder-pastel-purple"
    />
    <button className="ml-2">
      {/* Filter icon (sliders) */}
      <svg width="24" height="24" fill="none" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sliders">
        <line x1="4" y1="21" x2="4" y2="14"></line>
        <line x1="4" y1="10" x2="4" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12" y2="3"></line>
        <line x1="20" y1="21" x2="20" y2="16"></line>
        <line x1="20" y1="12" x2="20" y2="3"></line>
        <line x1="1" y1="14" x2="7" y2="14"></line>
        <line x1="9" y1="8" x2="15" y2="8"></line>
        <line x1="17" y1="16" x2="23" y2="16"></line>
      </svg>
    </button>
  </div>
);

export default SearchBar; 