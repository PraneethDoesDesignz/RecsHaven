import React from 'react';
import SearchBar from './SearchBar';
import FavoritesSection from './FavoritesSection';
import CategoryCarousel from './CategoryCarousel';
import RecommendationCard from './RecommendationCard';

const mockTravelSpots = Array.from({ length: 9 }, (_, i) => ({ id: i + 1, title: `Travel Spot ${i + 1}` }));

const TravelScreen = () => (
  <>
    <div className="flex items-center justify-between px-8 mb-4">
      <h2 className="text-2xl font-semibold text-pastel-purple">Here Are Our Favorites <span className="ml-2">→</span></h2>
      <SearchBar category="Travel" />
    </div>
    <div className="px-8">
      <FavoritesSection title="" />
    </div>
    <div className="px-8">
      <CategoryCarousel title="Travel Spots Recommended By Others">
        {mockTravelSpots.map((spot) => (
          <RecommendationCard key={spot.id} id={spot.id} type="travel" title={spot.title} />
        ))}
      </CategoryCarousel>
      <CategoryCarousel title="Your Favorites">
        {mockTravelSpots.map((spot) => (
          <RecommendationCard key={spot.id} id={spot.id} type="travel" title={spot.title} />
        ))}
      </CategoryCarousel>
    </div>
  </>
);

export default TravelScreen; 