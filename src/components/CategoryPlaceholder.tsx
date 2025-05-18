import React from 'react';

const CategoryPlaceholder = ({ category }: { category: string }) => (
  <div className="flex flex-col items-center justify-center h-full w-full py-32">
    <h2 className="text-3xl font-bold text-pastel-purple mb-4">{category}</h2>
    <p className="text-lg text-gray-500">This is the {category} screen. Content coming soon!</p>
  </div>
);

export default CategoryPlaceholder; 