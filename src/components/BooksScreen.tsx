import React, { useState, useRef, useLayoutEffect } from 'react';
import SearchBar from './SearchBar';
import FavoritesSection from './FavoritesSection';
import CategoryCarousel from './CategoryCarousel';
import RecommendationCard from './RecommendationCard';
import detailsData from '../detailsData.json';
import { BookFilters } from './ui/BookFilters';

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

const allBooks: Book[] = detailsData.books;

const getAllGenres = (books: Book[]) => Array.from(new Set(books.flatMap(b => b.genre ?? [])));
const getAllRecommendedBy = (books: Book[]) => Array.from(new Set(books.flatMap(b => b.recommendedBy ?? [])));

const BooksScreen = () => {
  const allBooks: Book[] = detailsData.books;
  const genres = getAllGenres(allBooks);
  const recommendedByList = getAllRecommendedBy(allBooks);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(allBooks);
  const [search, setSearch] = useState('');

  const handleApplyFilters = (filters: any[]) => {
    if (!filters || filters.length === 0) {
      setFilteredBooks(allBooks);
      return;
    }
    let books = [...allBooks];
    filters.forEach((filter) => {
      if (filter.type === 'Genre' && filter.value.length > 0) {
        books = books.filter((book) =>
          Array.isArray(book.genre) &&
          book.genre.some(
            (g) => g.trim().toLowerCase() === filter.value[0].trim().toLowerCase()
          )
        );
      }
      if (filter.type === 'Likes' && filter.value.length > 0) {
        if (filter.value[0] === 'Most Liked') {
          const maxLikes = Math.max(...books.map(b => b.likes ?? 0));
          books = books.filter(b => (b.likes ?? 0) === maxLikes);
        } else if (filter.value[0] === 'Least Liked') {
          const minLikes = Math.min(...books.map(b => b.likes ?? 0));
          books = books.filter(b => (b.likes ?? 0) === minLikes);
        }
      }
      if (filter.type === 'Recommendations') {
        books = books.filter((book) => (book.recommendedBy && book.recommendedBy.length > 0));
      }
      if (filter.type === 'Your Favourites') {
        const favKey = 'favourites_books';
        const favs = JSON.parse(localStorage.getItem(favKey) || '[]');
        books = books.filter((book) => favs.includes(book.id));
      }
      if (filter.type === 'Author' && filter.value.length > 0) {
        books = books.filter((book) =>
          book.author && book.author.trim().toLowerCase() === filter.value[0].trim().toLowerCase()
        );
      }
    });
    setFilteredBooks(books);
  };

  const displayedBooks = filteredBooks.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );
  let gridBooks = displayedBooks;

  const filtersActive = filteredBooks.length !== allBooks.length || search !== '';

  return (
    <>
      <div className="flex items-center justify-between px-8 mb-4">
        <h2 className="text-2xl font-semibold text-black">This Week's Favourites <span className="ml-2">→</span></h2>
        <div className="flex items-center gap-2">
          <SearchBar category="Books" value={search} onChange={e => setSearch(e.target.value)} />
          <BookFilters screenType="books" onApply={handleApplyFilters} />
        </div>
      </div>
      <div className="px-8">
        <div className="flex gap-8 justify-center my-8">
          {allBooks.slice(0, 2).map((book) => (
            <RecommendationCard
              key={book.id}
              id={book.id}
              type="books"
              title={book.title}
              image={book.image}
              rating={book.rating}
              author={book.author}
              featured={true}
              className="w-[550px] h-[250px] text-2xl"
            />
          ))}
        </div>
        {!filtersActive && (
          <>
            <CategoryCarousel title="Books Recommended By Others">
              {(function() {
                const recommended = allBooks.filter((book) => {
                  const recs = JSON.parse(localStorage.getItem('recommendedBy_books') || '{}');
                  return recs[book.id]?.includes('You');
                });
                if (recommended.length === 0) {
                  return <div className="text-center w-full py-8 text-lg text-gray-500">No Recommendations Yet. Be the one to recommend!</div>;
                }
                return recommended.map((book) => (
                  <RecommendationCard key={book.id} id={book.id} type="books" title={book.title} image={book.image} rating={book.rating} author={book.author} />
                ));
              })()}
            </CategoryCarousel>
            <CategoryCarousel title="Your Favorites">
              {(function() {
                const favs = JSON.parse(localStorage.getItem('favourites_books') || '[]');
                const favourites = allBooks.filter((book) => favs.includes(book.id));
                if (favourites.length === 0) {
                  return <div className="text-center w-full py-8 text-lg text-gray-500">No Favourites Yet. Add some!</div>;
                }
                return favourites.map((book) => (
                  <RecommendationCard key={book.id} id={book.id} type="books" title={book.title} image={book.image} rating={book.rating} author={book.author} />
                ));
              })()}
            </CategoryCarousel>
          </>
        )}
      </div>
      <div className="px-8">
        <h2 className="text-xl font-semibold text-black mb-[40px]">Here's What We Have</h2>
        {gridBooks.length === 0 ? (
          <div className="text-center w-full py-8 text-lg text-gray-500">Oops We Could Not Find That!</div>
        ) : (
          <div className="grid grid-cols-5 grid-rows-3 gap-4 auto-rows-[200px]">
            {gridBooks.map((book, idx) => {
              let extraClass = '';
              if (idx === 0) extraClass = 'col-span-2 row-span-2';
              else if (idx === 1) extraClass = 'col-span-3 row-span-1';
              else if (idx === 2) extraClass = 'col-span-1 row-span-1';
              else if (idx === 3) extraClass = 'col-span-2 row-span-1';
              else if (idx === 4) extraClass = 'col-span-3 row-span-1';
              else if (idx === 5) extraClass = 'col-span-2 row-span-1';
              else if (idx === 6) extraClass = 'col-span-2 row-span-3';
              else if (idx === 7) extraClass = 'col-span-3 row-span-2';
              else if (idx === 8) extraClass = 'col-span-1 row-span-2';
              else if (idx === 9) extraClass = 'col-span-1 row-span-2';
              return (
                <RecommendationCard
                  key={book.id}
                  id={book.id}
                  type="books"
                  title={book.title}
                  image={book.image}
                  rating={book.rating}
                  author={book.author}
                  className={`h-full ${extraClass}`}
                  bento={true}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default BooksScreen; 