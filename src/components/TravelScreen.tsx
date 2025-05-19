import React, { useState, useRef, useLayoutEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import SearchBar from './SearchBar';
import FavoritesSection from './FavoritesSection';
import CategoryCarousel from './CategoryCarousel';
import RecommendationCard from './RecommendationCard';
import detailsData from '../detailsData.json';
import { BookFilters } from './ui/BookFilters';

interface Travel {
  id: string;
  title: string;
  approxExpenditure: string;
  description: string;
  image: string;
  rating: number;
  likes?: number;
  recommendedBy?: string[];
  reviews: { user: string; comment: string }[];
}

const allTravel: Travel[] = detailsData.travels;

const getAllRecommendedBy = (travel: Travel[]) => Array.from(new Set(travel.flatMap(t => t.recommendedBy ?? [])));

const TravelScreen = () => {
  const allTravel: Travel[] = detailsData.travels;
  const recommendedByList = getAllRecommendedBy(allTravel);
  const [filteredTravel, setFilteredTravel] = useState<Travel[]>(allTravel);
  const [search, setSearch] = useState('');

  const handleApplyFilters = (filters: any[]) => {
    if (!filters || filters.length === 0) {
      setFilteredTravel(allTravel);
      return;
    }
    let travel = [...allTravel];
    filters.forEach((filter) => {
      if (filter.type === 'Likes' && filter.value.length > 0) {
        if (filter.value[0] === 'Most Liked') {
          const maxLikes = Math.max(...travel.map(t => t.likes ?? 0));
          travel = travel.filter(t => (t.likes ?? 0) === maxLikes);
        } else if (filter.value[0] === 'Least Liked') {
          const minLikes = Math.min(...travel.map(t => t.likes ?? 0));
          travel = travel.filter(t => (t.likes ?? 0) === minLikes);
        }
      }
      if (filter.type === 'Recommendations') {
        travel = travel.filter((travel) => (travel.recommendedBy && travel.recommendedBy.length > 0));
      }
      if (filter.type === 'Your Favourites') {
        const favKey = 'favourites_travels';
        const favs = JSON.parse(localStorage.getItem(favKey) || '[]');
        travel = travel.filter((travel) => favs.includes(travel.id));
      }
      if (filter.type === 'Approx Expenditure' && filter.value.length > 0) {
        const parseAmount = (amount: string) => {
          const match = amount.match(/\d+/);
          return match ? parseInt(match[0]) : 0;
        };
        if (filter.value[0] === 'Most Expensive') {
          travel.sort((a, b) => parseAmount(b.approxExpenditure) - parseAmount(a.approxExpenditure));
        } else if (filter.value[0] === 'Least Expensive') {
          travel.sort((a, b) => parseAmount(a.approxExpenditure) - parseAmount(b.approxExpenditure));
        }
      }
    });
    setFilteredTravel(travel);
  };

  // Filter travel spots by search
  const displayedTravel = filteredTravel.filter(travel =>
    travel.title.toLowerCase().includes(search.toLowerCase()) ||
    travel.approxExpenditure.toLowerCase().includes(search.toLowerCase())
  );

  const filtersActive = filteredTravel.length !== allTravel.length || search !== '';

  return (
    <>
      <div className="flex items-center justify-between px-8 mb-4">
        <h2 className="text-2xl font-semibold text-black">This Week's Favourites <span className="ml-2">→</span></h2>
        <div className="flex items-center gap-2">
          <SearchBar category="Travel" value={search} onChange={e => setSearch(e.target.value)} />
          <BookFilters screenType="travel" onApply={handleApplyFilters} />
        </div>
      </div>
      <div className="px-8">
        <div className="flex gap-12 justify-center my-8">
          {allTravel.slice(0, 2).map((travel) => (
            <RecommendationCard
              key={travel.id}
              id={travel.id}
              type="travels"
              title={travel.title}
              image={travel.image}
              rating={travel.rating}
              author={travel.approxExpenditure}
              featured={true}
              className="w-[550px] h-[250px] text-2xl"
            />
          ))}
        </div>
        {!filtersActive && (
          <>
            <CategoryCarousel title="Travel Recommended By Others">
              {(function() {
                const recommended = allTravel.filter((travel) => {
                  const recs = JSON.parse(localStorage.getItem('recommendedBy_travels') || '{}');
                  return recs[travel.id]?.includes('You');
                });
                if (recommended.length === 0) {
                  return <div className="text-center w-full py-8 text-lg text-gray-500">No Recommendations Yet. Be the one to recommend!</div>;
                }
                return recommended.map((travel) => (
                  <RecommendationCard key={travel.id} id={travel.id} type="travels" title={travel.title} image={travel.image} rating={travel.rating} author={travel.approxExpenditure} />
                ));
              })()}
            </CategoryCarousel>
            <CategoryCarousel title="Your Favorites">
              {(function() {
                const favs = JSON.parse(localStorage.getItem('favourites_travels') || '[]');
                const favourites = allTravel.filter((travel) => favs.includes(travel.id));
                if (favourites.length === 0) {
                  return <div className="text-center w-full py-8 text-lg text-gray-500">No Favourites Yet. Add some!</div>;
                }
                return favourites.map((travel) => (
                  <RecommendationCard key={travel.id} id={travel.id} type="travels" title={travel.title} image={travel.image} rating={travel.rating} author={travel.approxExpenditure} />
                ));
              })()}
            </CategoryCarousel>
          </>
        )}
      </div>
      <div className="px-8">
        <h2 className="text-xl font-semibold text-black mb-[40px]">Here's What We Have</h2>
        {displayedTravel.length === 0 ? (
          <div className="text-center w-full py-8 text-lg text-gray-500">Oops We Could Not Find That!</div>
        ) : (() => {
          const shuffled = [...displayedTravel];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          return (
            <div className="grid grid-cols-5 grid-rows-3 gap-4 auto-rows-[200px]">
              {shuffled.map((travel, idx) => {
                let extraClass = '';
                if (idx === 0) extraClass = 'col-span-2 row-span-1';
                else if (idx === 1) extraClass = 'col-span-3 row-span-1';
                else if (idx === 2) extraClass = 'col-span-3 row-span-1';
                else if (idx === 3) extraClass = 'col-span-2 row-span-2';
                else if (idx === 4) extraClass = 'col-span-3 row-span-1';
                else if (idx === 5) extraClass = 'col-span-2 row-span-2';
                else if (idx === 6) extraClass = 'col-span-3 row-span-3';
                else if (idx === 7) extraClass = 'col-span-2 row-span-2';
                else if (idx === 8) extraClass = 'col-span-3 row-span-2';
                else if (idx === 9) extraClass = 'col-span-2 row-span-2';
                // else default size
                return (
                  <RecommendationCard
                    key={travel.id}
                    id={travel.id}
                    type="travels"
                    title={travel.title}
                    image={travel.image}
                    rating={travel.rating}
                    author={travel.approxExpenditure}
                    className={`h-full ${extraClass}`}
                    bento={true}
                  />
                );
              })}
            </div>
          );
        })()}
      </div>
    </>
  );
};

export default TravelScreen; 