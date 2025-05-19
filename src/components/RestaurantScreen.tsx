import React, { useState } from 'react';
import SearchBar from './SearchBar';
import FavoritesSection from './FavoritesSection';
import CategoryCarousel from './CategoryCarousel';
import RecommendationCard from './RecommendationCard';
import detailsData from '../detailsData.json';
import { BookFilters } from './ui/BookFilters';
import { motion } from 'framer-motion';

interface Restaurant {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  cuisine?: string[];
  likes?: number;
  recommendedBy?: string[];
  reviews: { user: string; comment: string }[];
}

const allRestaurants: Restaurant[] = detailsData.restaurants;

const getAllCuisines = (restaurants: Restaurant[]) => Array.from(new Set(restaurants.flatMap(r => r.cuisine ?? [])));
const getAllRecommendedBy = (restaurants: Restaurant[]) => Array.from(new Set(restaurants.flatMap(r => r.recommendedBy ?? [])));

const RestaurantScreen = () => {
  const cuisines = getAllCuisines(allRestaurants);
  const recommendedByList = getAllRecommendedBy(allRestaurants);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(allRestaurants);
  const [search, setSearch] = useState('');

  const handleApplyFilters = (filters: any[]) => {
    if (!filters || filters.length === 0) {
      setFilteredRestaurants(allRestaurants);
      return;
    }
    let restaurants = [...allRestaurants];
    filters.forEach((filter) => {
      if (filter.type === 'Cuisine' && filter.value.length > 0) {
        restaurants = restaurants.filter((rest) =>
          Array.isArray(rest.cuisine) &&
          rest.cuisine.some(
            (c) => typeof c === 'string' && c.trim().toLowerCase() === filter.value[0].trim().toLowerCase()
          )
        );
      }
      if (filter.type === 'Likes' && filter.value.length > 0) {
        if (filter.value[0] === 'Most Liked') {
          restaurants.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
        } else if (filter.value[0] === 'Least Liked') {
          restaurants.sort((a, b) => (a.likes ?? 0) - (b.likes ?? 0));
        }
      }
      if (filter.type === 'Recommendations') {
        restaurants = restaurants.filter((rest) => (rest.recommendedBy && rest.recommendedBy.length > 0));
      }
      if (filter.type === 'Your Favourites') {
        const favKey = 'favourites_restaurants';
        const favs = JSON.parse(localStorage.getItem(favKey) || '[]');
        restaurants = restaurants.filter((rest) => favs.includes(rest.id));
      }
      if (filter.type === 'Location' && filter.value.length > 0) {
        restaurants = restaurants.filter((rest) =>
          rest.location && rest.location.trim().toLowerCase() === filter.value[0].trim().toLowerCase()
        );
      }
    });
    setFilteredRestaurants(restaurants);
  };

  // Filter restaurants by search
  const displayedRestaurants = filteredRestaurants.filter(restaurant =>
    restaurant.title.toLowerCase().includes(search.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(search.toLowerCase())
  );

  const filtersActive = filteredRestaurants.length !== allRestaurants.length || search !== '';

  return (
    <>
      <div className="flex items-center justify-between px-8 mb-4">
        <h2 className="text-2xl font-semibold text-black">This Week's Favourites <span className="ml-2">→</span></h2>
        <div className="flex items-center gap-2">
          <SearchBar category="Restaurants" value={search} onChange={e => setSearch(e.target.value)} />
          <BookFilters screenType="restaurants" onApply={handleApplyFilters} />
        </div>
      </div>
      <div className="px-8">
          <div className="flex gap-12 justify-center my-8">
            {allRestaurants.slice(0, 2).map((restaurant) => (
              <RecommendationCard
                key={restaurant.id}
                id={restaurant.id}
                type="restaurants"
                title={restaurant.title}
                image={restaurant.image}
                rating={restaurant.rating}
                author={restaurant.location}
                featured={true}
                className="w-[550px] h-[250px] text-2xl"
              />
            ))}
          </div>
      </div>
      {!filtersActive && (
        <>
          <CategoryCarousel title="Restaurants Recommended By Others">
                {(function() {
                  const recommended = allRestaurants.filter((restaurant) => {
                    const recs = JSON.parse(localStorage.getItem('recommendedBy_restaurants') || '{}');
                    return recs[restaurant.id]?.includes('You');
                  });
                  if (recommended.length === 0) {
                    return <div className="text-center w-full py-8 text-lg text-gray-500">No Recommendations Yet. Be the one to recommend!</div>;
                  }
                  return recommended.map((restaurant) => (
                    <RecommendationCard key={restaurant.id} id={restaurant.id} type="restaurants" title={restaurant.title} image={restaurant.image} rating={restaurant.rating} author={restaurant.location} />
                  ));
                })()}
          </CategoryCarousel>
          <CategoryCarousel title="Your Favorites">
                {(function() {
                  const favs = JSON.parse(localStorage.getItem('favourites_restaurants') || '[]');
                  const favourites = allRestaurants.filter((restaurant) => favs.includes(restaurant.id));
                  if (favourites.length === 0) {
                    return <div className="text-center w-full py-8 text-lg text-gray-500">No Favourites Yet. Add some!</div>;
                  }
                  return favourites.map((restaurant) => (
                    <RecommendationCard key={restaurant.id} id={restaurant.id} type="restaurants" title={restaurant.title} image={restaurant.image} rating={restaurant.rating} author={restaurant.location} />
                  ));
                })()}
          </CategoryCarousel>
        </>
      )}
      <div className="px-8">
        <h2 className="text-xl font-semibold text-black mb-[40px]">Here's What We Have</h2>
        {displayedRestaurants.length === 0 ? (
          <div className="text-center w-full py-8 text-lg text-gray-500">Oops We Could Not Find That!</div>
        ) : (
          <div className="grid grid-cols-5 grid-rows-3 gap-4 auto-rows-[200px]">
            {(() => {
              const shuffled = [...displayedRestaurants];
                for (let i = shuffled.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                return shuffled.map((restaurant, idx) => {
                  let extraClass = '';
                  if (idx === 0) extraClass = 'col-span-2 row-span-1';
                  else if (idx === 1) extraClass = 'col-span-3 row-span-2';
                  else if (idx === 2) extraClass = 'col-span-1 row-span-2';
                  else if (idx === 3) extraClass = 'col-span-2 row-span-2';
                  else if (idx === 4) extraClass = 'col-span-2 row-span-1';
                  else if (idx === 5) extraClass = 'col-span-2 row-span-2';
                  else if (idx === 6) extraClass = 'col-span-2 row-span-2';
                  else if (idx === 7) extraClass = 'col-span-2 row-span-2';
                  else if (idx === 8) extraClass = 'col-span-1 row-span-2';
                  else if (idx === 9) extraClass = 'col-span-1 row-span-2';
                  // else default size
                  return (
                    <RecommendationCard
                      key={restaurant.id}
                      id={restaurant.id}
                      type="restaurants"
                      title={restaurant.title}
                      image={restaurant.image}
                      rating={restaurant.rating}
                      author={restaurant.location}
                      className={`h-full ${extraClass}`}
                      bento={true}
                    />
                  );
                });
              })()}
          </div>
        )}
      </div>
    </>
  );
};

export default RestaurantScreen;