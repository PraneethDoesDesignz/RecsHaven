import React, { useState, useRef, useLayoutEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import SearchBar from './SearchBar';
import FavoritesSection from './FavoritesSection';
import CategoryCarousel from './CategoryCarousel';
import RecommendationCard from './RecommendationCard';
import detailsData from '../detailsData.json';
import { BookFilters } from './ui/BookFilters';

interface Movie {
  id: string;
  title: string;
  director: string;
  description: string;
  image: string;
  rating: number;
  genre?: string[];
  likes?: number;
  recommendedBy?: string[];
  reviews: { user: string; comment: string }[];
}

const allMovies: Movie[] = detailsData.movies;

const getAllGenres = (movies: Movie[]) => Array.from(new Set(movies.flatMap(m => m.genre ?? [])));
const getAllRecommendedBy = (movies: Movie[]) => Array.from(new Set(movies.flatMap(m => m.recommendedBy ?? [])));

const MovieScreen = () => {
  const allMovies: Movie[] = detailsData.movies;
  const genres = getAllGenres(allMovies);
  const recommendedByList = getAllRecommendedBy(allMovies);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(allMovies);
  const [search, setSearch] = useState('');

  const handleApplyFilters = (filters: any[]) => {
    if (!filters || filters.length === 0) {
      setFilteredMovies(allMovies);
      return;
    }
    let movies = [...allMovies];
    filters.forEach((filter) => {
      if (filter.type === 'Genre' && filter.value.length > 0) {
        movies = movies.filter((movie) =>
          Array.isArray(movie.genre) &&
          movie.genre.some(
            (g) => g.trim().toLowerCase() === filter.value[0].trim().toLowerCase()
          )
        );
      }
      if (filter.type === 'Likes' && filter.value.length > 0) {
        if (filter.value[0] === 'Most Liked') {
          movies.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
        } else if (filter.value[0] === 'Least Liked') {
          movies.sort((a, b) => (a.likes ?? 0) - (b.likes ?? 0));
        }
      }
      if (filter.type === 'Recommendations') {
        movies = movies.filter((movie) => (movie.recommendedBy && movie.recommendedBy.length > 0));
      }
      if (filter.type === 'Your Favourites') {
        const favKey = 'favourites_movies';
        const favs = JSON.parse(localStorage.getItem(favKey) || '[]');
        movies = movies.filter((movie) => favs.includes(movie.id));
      }
      if (filter.type === 'Director' && filter.value.length > 0) {
        movies = movies.filter((movie) =>
          movie.director && movie.director.trim().toLowerCase() === filter.value[0].trim().toLowerCase()
        );
      }
    });
    setFilteredMovies(movies);
  };

  // Filter movies by search
  const displayedMovies = filteredMovies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase()) ||
    movie.director.toLowerCase().includes(search.toLowerCase())
  );

  const filtersActive = filteredMovies.length !== allMovies.length || search !== '';

  return (
    <>
      <div className="flex items-center justify-between px-8 mb-4">
        <h2 className="text-2xl font-semibold text-black">This Week's Favourites <span className="ml-2">→</span></h2>
        <div className="flex items-center gap-2">
          <SearchBar category="Movies" value={search} onChange={e => setSearch(e.target.value)} />
          <BookFilters screenType="movies" onApply={handleApplyFilters} />
        </div>
      </div>
      <div className="px-8">
        <div className="flex gap-8 justify-center my-8">
          {allMovies.slice(0, 2).map((movie) => (
            <RecommendationCard
              key={movie.id}
              id={movie.id}
              type="movies"
              title={movie.title}
              image={movie.image}
              rating={movie.rating}
              author={movie.director}
              featured={true}
              className="w-[550px] h-[250px] text-2xl"
            />
          ))}
        </div>
        {!filtersActive && (
          <>
            <CategoryCarousel title="Movies Recommended By Others">
              {(function() {
                const recommended = allMovies.filter((movie) => {
                  const recs = JSON.parse(localStorage.getItem('recommendedBy_movies') || '{}');
                  return recs[movie.id]?.includes('You');
                });
                if (recommended.length === 0) {
                  return <div className="text-center w-full py-8 text-lg text-gray-500">No Recommendations Yet. Be the one to recommend!</div>;
                }
                return recommended.map((movie) => (
                  <RecommendationCard key={movie.id} id={movie.id} type="movies" title={movie.title} image={movie.image} rating={movie.rating} author={movie.director} />
                ));
              })()}
            </CategoryCarousel>
            <CategoryCarousel title="Your Favorites">
              {(function() {
                const favs = JSON.parse(localStorage.getItem('favourites_movies') || '[]');
                const favourites = allMovies.filter((movie) => favs.includes(movie.id));
                if (favourites.length === 0) {
                  return <div className="text-center w-full py-8 text-lg text-gray-500">No Favourites Yet. Add some!</div>;
                }
                return favourites.map((movie) => (
                  <RecommendationCard key={movie.id} id={movie.id} type="movies" title={movie.title} image={movie.image} rating={movie.rating} author={movie.director} />
                ));
              })()}
            </CategoryCarousel>
          </>
        )}
      </div>
      <div className="px-8">
        <h2 className="text-xl font-semibold text-black mb-[40px]">Here's What We Have</h2>
        {displayedMovies.length === 0 ? (
          <div className="text-center w-full py-8 text-lg text-gray-500">Oops We Could Not Find That!</div>
        ) : (() => {
          const shuffled = [...displayedMovies];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          return (
            <div className="grid grid-cols-5 grid-rows-3 gap-4 auto-rows-[200px]">
              {shuffled.map((movie, idx) => {
                let extraClass = '';
                if (idx === 0) extraClass = 'col-span-3 row-span-2';
                else if (idx === 1) extraClass = 'col-span-2 row-span-1';
                else if (idx === 2) extraClass = 'col-span-2 row-span-2';
                else if (idx === 3) extraClass = 'col-span-1 row-span-1';
                else if (idx === 4) extraClass = 'col-span-2 row-span-1';
                else if (idx === 5) extraClass = 'col-span-3 row-span-1';
                else if (idx === 6) extraClass = 'col-span-1 row-span-2';
                else if (idx === 7) extraClass = 'col-span-2 row-span-2';
                else if (idx === 8) extraClass = 'col-span-1 row-span-1';
                else if (idx === 9) extraClass = 'col-span-1 row-span-2';
                // else default size
                return (
                  <RecommendationCard
                    key={movie.id}
                    id={movie.id}
                    type="movies"
                    title={movie.title}
                    image={movie.image}
                    rating={movie.rating}
                    author={movie.director}
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

export default MovieScreen; 