import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const categories = [
  { name: 'Home', path: '/home' },
  { name: 'Books', path: '/books' },
  { name: 'Restaurants', path: '/restaurants' },
  { name: 'Movies', path: '/movies' },
  { name: 'Travel', path: '/travel' },
];

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="flex flex-col justify-between h-full w-64 bg-gray-300 p-6 text-black relative">
      <div>
        <div className="mb-10 flex flex-col items-center">
          <img src="./images/logo.png" alt="Logo" className="mx-auto mb-2 w-16 h-16 object-contain" />
          <div className="text-2xl font-bold">RecsHaven</div>
        </div>
        <nav className="flex flex-col gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => { navigate(cat.path); if (onClose) onClose(); }}
              className={`text-left hover:text-violet-500 transition font-medium ${location.pathname.startsWith(cat.path) ? 'underline:none' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </nav>
        <hr className="my-6 border-black" />
        <div className="flex flex-col gap-2">
          <button
            onClick={() => { navigate('/randomizer'); if (onClose) onClose(); }}
            className={`text-left hover:text-violet-500 transition font-medium ${location.pathname === '/randomizer' ? 'underline:none' : ''}`}
          >
            Randomizer ✨
          </button>
          <button
            onClick={() => { navigate('/wishlist'); if (onClose) onClose(); }}
            className={`text-left hover:text-violet-500 transition font-medium ${location.pathname === '/wishlist' ? 'underline:none' : ''}`}
          >
            Wishlist
          </button>
        </div>
      </div>
      <div className="text-center text-xs text-gray-600 mt-8">
        <div>&copy; {new Date().getFullYear()} RecsHaven</div>
        <div>Made with <span className="text-pink-500">&#10084;</span> by a VibeCoder</div>
      </div>
    </aside>
  );
};

export default Sidebar; 