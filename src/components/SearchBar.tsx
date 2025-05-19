import React, { forwardRef } from 'react';

interface SearchBarProps {
  category: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterClick?: () => void;
  filterButtonRef?: React.Ref<HTMLButtonElement>;
}

const SearchBar = ({ category, value, onChange }: SearchBarProps) => (
  <div className="flex items-center bg-violet-100 rounded-full px-6 py-2 shadow-sm w-72 ml-auto">
    <input
      type="text"
      placeholder={`Search ${category}`}
      className="bg-transparent outline-none flex-1 text-black placeholder-black-200"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default SearchBar; 