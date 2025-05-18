import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { DockNav } from './components/ui/DockNav';
import ProfileIcon from './components/ProfileIcon';
import Footer from './components/Footer';
import BooksScreen from './components/BooksScreen';
import CategoryPlaceholder from './components/CategoryPlaceholder';
import HomeScreen from './components/HomeScreen';
import RestaurantScreen from './components/RestaurantScreen';
import MovieScreen from './components/MovieScreen';
import TravelScreen from './components/TravelScreen';
import WishlistScreen from './components/WishlistScreen';
import RandomizerScreen from './components/RandomizerScreen';
import DetailsScreen from './components/DetailsScreen';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex bg-white">
        {/* Sidebar */}
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen max-h-screen overflow-y-auto">
          {/* Top bar: Centered DockNav, ProfileIcon right, both aligned */}
          <div className="flex items-center px-8 mt-6 mb-8">
            <div className="flex-1 flex justify-center">
              <DockNav />
            </div>
            <ProfileIcon />
          </div>
          {/* Main content area: Use React Router for navigation */}
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/books" element={<BooksScreen />} />
            <Route path="/restaurants" element={<RestaurantScreen />} />
            <Route path="/movies" element={<MovieScreen />} />
            <Route path="/travel" element={<TravelScreen />} />
            <Route path="/wishlist" element={<WishlistScreen />} />
            <Route path="/randomizer" element={<RandomizerScreen />} />
            <Route path="/details/:type/:id" element={<DetailsScreen />} />
            <Route path="*" element={<CategoryPlaceholder category="Not Found" />} />
          </Routes>
          {/* Footer */}
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App; 