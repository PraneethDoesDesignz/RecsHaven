import React from 'react';
import SearchBar from './SearchBar';
import FavoritesSection from './FavoritesSection';
import CategoryCarousel from './CategoryCarousel';
import RecommendationCard from './RecommendationCard';

const mockRestaurants = Array.from({ length: 9 }, (_, i) => ({ id: i + 1, title: `Restaurant ${i + 1}` }));

const RestaurantScreen = () => (
  <>
    <div className="flex items-center justify-between px-8 mb-4">
      <h2 className="text-2xl font-semibold text-pastel-purple">Here Are Our Favorites <span className="ml-2">→</span></h2>
      <SearchBar category="Restaurants" />
    </div>
    <div className="px-8">
      <FavoritesSection title="" />
    </div>
    <div className="px-8">
      <CategoryCarousel title="Restaurants Recommended By Others">
        {mockRestaurants.map((restaurant) => (
          <RecommendationCard key={restaurant.id} id={restaurant.id} type="restaurant" title={restaurant.title} />
        ))}
      </CategoryCarousel>
      <CategoryCarousel title="Your Favorites">
        {mockRestaurants.map((restaurant) => (
          <RecommendationCard key={restaurant.id} id={restaurant.id} type="restaurant" title={restaurant.title} />
        ))}
      </CategoryCarousel>
    </div>
  </>
);

export default RestaurantScreen; 