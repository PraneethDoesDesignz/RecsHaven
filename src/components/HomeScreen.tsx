import React from 'react';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import RecommendationCard from './RecommendationCard';
import detailsData from '../detailsData.json';

const HomeScreen = () => (
  <div className="w-full">
    <div className="px-8 mb-8">
      <HeroSection />
    </div>
    <div className="px-8">
      <CategoryCarousel title="Books Recommended By Others">
        {detailsData.books.filter(book => book.image && book.rating).map((book) => (
          <RecommendationCard key={book.id} id={book.id} type="books" title={book.title} image={book.image} rating={book.rating} author={book.author} />
        ))}
      </CategoryCarousel>
      <CategoryCarousel title="Restaurants Recommended By Others">
        {detailsData.restaurants.filter(rest => rest.image && rest.rating).map((restaurant) => (
          <RecommendationCard key={restaurant.id} id={restaurant.id} type="restaurants" title={restaurant.title} image={restaurant.image} rating={restaurant.rating} author={restaurant.location} />
        ))}
      </CategoryCarousel>
      <CategoryCarousel title="Movies Recommended By Others">
        {detailsData.movies.filter(movie => movie.image && movie.rating).map((movie) => (
          <RecommendationCard key={movie.id} id={movie.id} type="movies" title={movie.title} image={movie.image} rating={movie.rating} author={movie.director} />
        ))}
      </CategoryCarousel>
      <CategoryCarousel title="Travel Spots Recommended By Others">
        {detailsData.travels.filter(spot => spot.image && spot.rating).map((spot) => (
          <RecommendationCard key={spot.id} id={spot.id} type="travels" title={spot.title} image={spot.image} rating={spot.rating} author={spot.approxExpenditure} />
        ))}
      </CategoryCarousel>
    </div>
  </div>
);

export default HomeScreen; 