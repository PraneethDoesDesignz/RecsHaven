import React from 'react';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import RecommendationCard from './RecommendationCard';

const mockItems = Array.from({ length: 9 }, (_, i) => ({ id: i + 1, title: `Favorite ${i + 1}` }));
const mockBooks = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, title: `Book ${i + 1}` }));
const mockMovies = Array.from({ length: 9 }, (_, i) => ({ id: i + 1, title: `Movie ${i + 1}` }));
const mockRestaurants = Array.from({ length: 9 }, (_, i) => ({ id: i + 1, title: `Restaurant ${i + 1}` }));
const mockTravelSpots = Array.from({ length: 9 }, (_, i) => ({ id: i + 1, title: `Travel Spot ${i + 1}` }));

const HomeScreen = () => (
  <div className="w-full">
    <div className="px-8 mb-8">
      <HeroSection />
    </div>
    <div className="px-8">
      <h2 className="text-2xl font-semibold mb-4">Here Are Our Favorites</h2>
      <CategoryCarousel title="Favorites">
        {mockItems.map((item) => (
          <RecommendationCard key={item.id} id={item.id} type="favorite" title={item.title} />
        ))}
      </CategoryCarousel>
      <CategoryCarousel title="Recommended By Others">
        {mockItems.map((item) => (
          <RecommendationCard key={item.id} id={item.id} type="favorite" title={item.title} />
        ))}
      </CategoryCarousel>
      <CategoryCarousel title="Books Recommended By Others">
        {mockBooks.map((book) => (
          <RecommendationCard key={book.id} id={book.id} type="book" title={book.title} />
        ))}
      </CategoryCarousel>
      <CategoryCarousel title="Restaurants Recommended By Others">
        {mockRestaurants.map((restaurant) => (
          <RecommendationCard key={restaurant.id} id={restaurant.id} type="restaurant" title={restaurant.title} />
        ))}
      </CategoryCarousel>
      <CategoryCarousel title="Movies Recommended By Others">
        {mockMovies.map((movie) => (
          <RecommendationCard key={movie.id} id={movie.id} type="movie" title={movie.title} />
        ))}
      </CategoryCarousel>
      <CategoryCarousel title="Travel Spots Recommended By Others">
        {mockTravelSpots.map((spot) => (
          <RecommendationCard key={spot.id} id={spot.id} type="travel" title={spot.title} />
        ))}
      </CategoryCarousel>
    </div>
  </div>
);

export default HomeScreen; 