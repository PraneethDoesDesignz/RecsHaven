import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { DockNav } from './components/ui/DockNav';
import ProfileIcon from './components/ProfileIcon';
import Footer from './components/Footer';
import BooksScreen from './components/BooksScreen';
import HomeScreen from './components/HomeScreen';
import RestaurantScreen from './components/RestaurantScreen';
import MovieScreen from './components/MovieScreen';
import TravelScreen from './components/TravelScreen';
import WishlistScreen from './components/WishlistScreen';
import RandomizerScreen from './components/RandomizerScreen';
import DetailsScreen from './components/DetailsScreen';
import ScrollToTop from './components/ScrollToTop';
import LoadingAnimation from './components/LoadingAnimation';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith('/details/');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Loading animation state
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setFadeIn(true), 50); // Small delay to trigger fade-in
    }, 8000); // 8 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleSelectCategory = (category: string) => {
    const categories = ['books', 'restaurants', 'movies', 'travel'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    navigate(`/details/${randomCategory}/${Math.floor(Math.random() * 10)}`);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div
      className={`transition-transform duration-1000`}
      style={{
        transform: fadeIn ? 'scale(1)' : 'scale(0.92)',
      }}
    >
      {/* Hamburger/Close button for sidebar toggle - now outside main layout for true fixed positioning */}
      <button
        className="fixed top-4 left-4 z-60 bg-white rounded-full shadow-lg p-2 flex items-center justify-center transition-colors duration-300"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {/* Animated Hamburger/X Icon */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <g>
            {/* Top line */}
            <path
              d={sidebarOpen ? "M6 6L18 18" : "M4 7h16"}
              className={`transition-all duration-300 origin-center ${sidebarOpen ? 'rotate-45' : ''}`}
            />
            {/* Middle line */}
            <path
              d="M4 12h16"
              className={`transition-all duration-300 origin-center ${sidebarOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            {/* Bottom line */}
            <path
              d={sidebarOpen ? "M6 18L18 6" : "M4 17h16"}
              className={`transition-all duration-300 origin-center ${sidebarOpen ? '-rotate-45' : ''}`}
            />
          </g>
        </svg>
      </button>
      {/* Sidebar overlay for all screen sizes */}
      <div>
        {/* Overlay background, only when sidebarOpen */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSidebarOpen(false)} />
        )}
        {/* Sidebar panel: always rendered for animation, above overlay */}
        <div className={`fixed inset-y-0 left-0 z-50 h-full w-64 bg-gray-300 p-0 shadow-xl transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
          <Sidebar />
        </div>
      </div>
      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen max-h-screen overflow-y-auto relative`}>
        {/* DockNav: Overlay for DetailsScreen, normal for others */}
        {isDetailsPage ? (
          <div className="absolute top-0 left-0 w-full z-30 flex justify-center pointer-events-none">
            <div className="pointer-events-auto mt-4">
              <DockNav />
            </div>
          </div>
        ) : (
          <div className="flex justify-center w-full z-30 mt-4 mb-8">
            <DockNav />
          </div>
        )}
        {/* ProfileIcon remains in the top right, if desired */}
        <div className="absolute top-0 right-0 z-30 mt-4 mr-8">
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
          <Route path="/randomizer" element={<RandomizerScreen onSelectCategory={handleSelectCategory} />} />
          <Route path="/details/:type/:id" element={<DetailsScreen />} />
        </Routes>
        {/* Footer */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <ScrollToTop />
    <App />
  </Router>
);

export default AppWithRouter; 