import React from 'react';

type Props = {
  title: string;
};

const FavoritesSection = ({ title }: Props) => (
  <section className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-semibold text-pastel-purple">{title}</h2>
    </div>
    <div className="flex gap-8">
      <div className="flex-1 min-h-[180px] bg-pastel-blue/40 rounded-2xl shadow-md"></div>
      <div className="flex-1 min-h-[180px] bg-pastel-blue/40 rounded-2xl shadow-md"></div>
    </div>
  </section>
);

export default FavoritesSection; 