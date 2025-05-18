import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const categories = [
  { name: 'Home', path: '/home' },
  { name: 'Books', path: '/books' },
  { name: 'Restaurants', path: '/restaurants' },
  { name: 'Movies', path: '/movies' },
  { name: 'Travel', path: '/travel' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="flex flex-col justify-between h-full w-64 bg-gray-300 p-6 text-black">
      <div>
        <div className="text-2xl font-bold mb-10">NAME<br/>AND<br/>LOGO</div>
        <nav className="flex flex-col gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(cat.path)}
              className={`text-left hover:text-pastel-blue transition font-medium ${location.pathname.startsWith(cat.path) ? 'underline:none' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </nav>
        <hr className="my-6 border-pastel-blue/30" />
        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate('/randomizer')}
            className={`text-left hover:text-pastel-blue transition font-medium ${location.pathname === '/randomizer' ? 'underline:none' : ''}`}
          >
            Randomizer ✨
          </button>
          <button
            onClick={() => navigate('/wishlist')}
            className={`text-left hover:text-pastel-blue transition font-medium ${location.pathname === '/wishlist' ? 'underline:none' : ''}`}
          >
            Wishlist
          </button>
        </div>
      </div>
      <div className="text-lg font-bold">COPY<br/>AND<br/>FOOTER</div>
    </aside>
  );
};

export default Sidebar; 