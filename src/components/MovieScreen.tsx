import React from 'react';
import SearchBar from './SearchBar';
import FavoritesSection from './FavoritesSection';
import CategoryCarousel from './CategoryCarousel';
import RecommendationCard from './RecommendationCard';

const mockMovies = Array.from({ length: 9 }, (_, i) => ({ id: i + 1, title: `Movie ${i + 1}` }));

const MovieScreen = () => (
  <>
    <div className="flex items-center justify-between px-8 mb-4">
      <h2 className="text-2xl font-semibold text-pastel-purple">Here Are Our Favorites <span className="ml-2">→</span></h2>
      <SearchBar category="Movies" />
    </div>
    <div className="px-8">
      <FavoritesSection title="" />
    </div>
    <div className="px-8">
      <CategoryCarousel title="Movies Recommended By Others">
        {mockMovies.map((movie) => (
          <RecommendationCard key={movie.id} id={movie.id} type="movie" title={movie.title} />
        ))}
      </CategoryCarousel>
      <CategoryCarousel title="Your Favorites">
        {mockMovies.map((movie) => (
          <RecommendationCard key={movie.id} id={movie.id} type="movie" title={movie.title} />
        ))}
      </CategoryCarousel>
    </div>
  </>
);

export default MovieScreen; 