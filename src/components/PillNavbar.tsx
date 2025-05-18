import React from 'react';

const categories = [
  'Home',
  'Books',
  'Restaurants',
  'Movies',
  'Travel',
];

type Props = {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
};

const PillNavbar = ({ selectedCategory, onSelectCategory }: Props) => (
  <nav className="flex justify-center items-center gap-4">
    <div className="bg-gray-300 rounded-full px-8 py-2 flex gap-6 shadow-sm">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`px-4 py-1 rounded-full transition font-medium ${selectedCategory === cat ? 'bg-pastel-purple text-black' : 'hover:bg-pastel-purple/30'}`}
        >
          {cat}
        </button>
      ))}
    </div>
  </nav>
);

export default PillNavbar; 