import React from 'react';
import SearchBar from './SearchBar';
import FavoritesSection from './FavoritesSection';
import CategoryCarousel from './CategoryCarousel';
import RecommendationCard from './RecommendationCard';

const mockBooks = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, title: `Book ${i + 1}` }));

const BooksScreen = () => (
  <>
    <div className="flex items-center justify-between px-8 mb-4">
      <h2 className="text-2xl font-semibold text-pastel-purple">Here Are Our Favorites <span className="ml-2">→</span></h2>
      <SearchBar category="Books" />
    </div>
    <div className="px-8">
      <FavoritesSection title="" />
    </div>
    <div className="px-8">
      <CategoryCarousel title="Books Recommended By Others">
        {mockBooks.map((book) => (
          <RecommendationCard key={book.id} id={book.id} type="book" title={book.title} />
        ))}
      </CategoryCarousel>
      <CategoryCarousel title="Your Favorites">
        {mockBooks.map((book) => (
          <RecommendationCard key={book.id} id={book.id} type="book" title={book.title} />
        ))}
      </CategoryCarousel>
    </div>
    <div className="px-8">
      <h2 className="text-xl font-semibold text-pastel-purple mb-4">Pick A Book To Read</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {mockBooks.map((book) => (
          <RecommendationCard key={book.id} id={book.id} type="book" title={book.title} />
        ))}
      </div>
    </div>
  </>
);

export default BooksScreen; 