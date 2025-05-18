import React from 'react';
import CategoryCarousel from './CategoryCarousel';
import RecommendationCard from './RecommendationCard';

const mockItems = Array.from({ length: 9 }, (_, i) => ({ id: i + 1, title: `Wishlist Item ${i + 1}` }));
const mockBooks = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, title: `Book ${i + 1}` }));
const mockMovies = Array.from({ length: 9 }, (_, i) => ({ id: i + 1, title: `Movie ${i + 1}` }));
const mockRestaurants = Array.from({ length: 9 }, (_, i) => ({ id: i + 1, title: `Restaurant ${i + 1}` }));
const mockTravelSpots = Array.from({ length: 9 }, (_, i) => ({ id: i + 1, title: `Travel Spot ${i + 1}` }));

const WishlistScreen = () => (
  <div className="px-8">
    <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
    <CategoryCarousel title="Books in Wishlist">
      {mockBooks.map((book) => (
        <RecommendationCard key={book.id} id={book.id} type="book" title={book.title} />
      ))}
    </CategoryCarousel>
    <CategoryCarousel title="Restaurants in Wishlist">
      {mockRestaurants.map((restaurant) => (
        <RecommendationCard key={restaurant.id} id={restaurant.id} type="restaurant" title={restaurant.title} />
      ))}
    </CategoryCarousel>
    <CategoryCarousel title="Movies in Wishlist">
      {mockMovies.map((movie) => (
        <RecommendationCard key={movie.id} id={movie.id} type="movie" title={movie.title} />
      ))}
    </CategoryCarousel>
    <CategoryCarousel title="Travel Spots in Wishlist">
      {mockTravelSpots.map((spot) => (
        <RecommendationCard key={spot.id} id={spot.id} type="travel" title={spot.title} />
      ))}
    </CategoryCarousel>
    <CategoryCarousel title="Recommended For You">
      {mockItems.map((item) => (
        <RecommendationCard key={item.id} id={item.id} type="wishlist" title={item.title} />
      ))}
    </CategoryCarousel>
  </div>
);

export default WishlistScreen; 