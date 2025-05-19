import React, { useEffect, useState } from 'react';
import CategoryCarousel from './CategoryCarousel';
import RecommendationCard from './RecommendationCard';
import detailsData from '../detailsData.json';

// Type definitions
interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  rating: number;
  genre?: string[];
  likes?: number;
  recommendedBy?: string[];
  reviews: { user: string; comment: string }[];
}
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
interface Travel {
  id: string;
  title: string;
  approxExpenditure: string;
  description: string;
  image: string;
  rating: number;
  genre?: string[];
  likes?: number;
  recommendedBy?: string[];
  reviews: { user: string; comment: string }[];
}

const getWishlist = (key: string): string[] => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
};

const WishlistScreen = () => {
  const [wishlistBooks, setWishlistBooks] = useState<Book[]>([]);
  const [wishlistMovies, setWishlistMovies] = useState<Movie[]>([]);
  const [wishlistRestaurants, setWishlistRestaurants] = useState<Restaurant[]>([]);
  const [wishlistTravels, setWishlistTravels] = useState<Travel[]>([]);

  useEffect(() => {
    const updateWishlist = () => {
      const bookIds = getWishlist('wishlist_books');
      const movieIds = getWishlist('wishlist_movies');
      const restaurantIds = getWishlist('wishlist_restaurants');
      const travelIds = getWishlist('wishlist_travels');
      setWishlistBooks((detailsData.books as Book[]).filter((b) => bookIds.includes(b.id)));
      setWishlistMovies((detailsData.movies as Movie[]).filter((m) => movieIds.includes(m.id)));
      setWishlistRestaurants((detailsData.restaurants as Restaurant[]).filter((r) => restaurantIds.includes(r.id)));
      setWishlistTravels((detailsData.travels as Travel[]).filter((t) => travelIds.includes(t.id)));
    };
    updateWishlist();
    window.addEventListener('storage', updateWishlist);
    return () => window.removeEventListener('storage', updateWishlist);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-pink-50 px-4 md:px-8">
      <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
      <CategoryCarousel title="Books in Wishlist">
        {wishlistBooks.length === 0 ? (
          <div className="text-center w-full py-8 text-lg text-gray-500">No books in wishlist yet.</div>
        ) : (
          wishlistBooks.map((book) => (
            <RecommendationCard key={book.id} id={book.id} type="books" title={book.title} image={book.image} rating={book.rating} author={book.author} />
          ))
        )}
      </CategoryCarousel>
      <CategoryCarousel title="Restaurants in Wishlist">
        {wishlistRestaurants.length === 0 ? (
          <div className="text-center w-full py-8 text-lg text-gray-500">No restaurants in wishlist yet.</div>
        ) : (
          wishlistRestaurants.map((restaurant) => (
            <RecommendationCard key={restaurant.id} id={restaurant.id} type="restaurants" title={restaurant.title} image={restaurant.image} rating={restaurant.rating} author={restaurant.location} />
          ))
        )}
      </CategoryCarousel>
      <CategoryCarousel title="Movies in Wishlist">
        {wishlistMovies.length === 0 ? (
          <div className="text-center w-full py-8 text-lg text-gray-500">No movies in wishlist yet.</div>
        ) : (
          wishlistMovies.map((movie) => (
            <RecommendationCard key={movie.id} id={movie.id} type="movies" title={movie.title} image={movie.image} rating={movie.rating} author={movie.director} />
          ))
        )}
      </CategoryCarousel>
      <CategoryCarousel title="Travel Spots in Wishlist">
        {wishlistTravels.length === 0 ? (
          <div className="text-center w-full py-8 text-lg text-gray-500">No travel spots in wishlist yet.</div>
        ) : (
          wishlistTravels.map((spot) => (
            <RecommendationCard key={spot.id} id={spot.id} type="travels" title={spot.title} image={spot.image} rating={spot.rating} author={spot.approxExpenditure} />
          ))
        )}
      </CategoryCarousel>
    </div>
  );
};

export default WishlistScreen; 
