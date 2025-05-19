import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the main content area to the top
    document.querySelector('.overflow-y-auto')?.scrollTo(0, 0);
    // Also scroll the window to the top as a fallback
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop; 