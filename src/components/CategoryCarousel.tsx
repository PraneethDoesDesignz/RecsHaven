import React, { useRef } from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const CARD_WIDTH = 600; // w-[600px] in Tailwind = 600px
const VISIBLE_CARDS = 2;
const GAP = 20; // gap-5 = 20px
const CONTAINER_WIDTH = CARD_WIDTH * VISIBLE_CARDS + (VISIBLE_CARDS - 1) * GAP;

const CategoryCarousel = ({ title, children }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: CARD_WIDTH + GAP, behavior: 'smooth' });
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -(CARD_WIDTH + GAP), behavior: 'smooth' });
    }
  };

  // Count only valid children (not fallback message)
  const cardCount = React.Children.toArray(children).filter(child => {
    // If it's a string or not a valid React element, it's likely the fallback message
    return React.isValidElement(child);
  }).length;

  return (
    <section className="my-8 overflow-visible w-full max-w-none">
      <h2 className="text-lg font-semibold text-black mb-4">
        {title} <span className="ml-2">→</span>
      </h2>
      <div className="relative overflow-visible w-full max-w-none">
        {/* Show blur and buttons only if 3 or more cards */}
        {cardCount >= 4 && <>
          {/* Left Blur */}
          <div
            className="absolute left-0 top-0 h-full w-29 z-10 pointer-events-none backdrop-blur-md"
            style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0.0) 100%)'
            }}
          />
          {/* Right Blur */}
          <div
            className="absolute right-0 top-0 h-full w-29 z-10 pointer-events-none backdrop-blur-md"
            style={{
              background: 'linear-gradient(to left, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0.0) 100%)'
            }}
          />
          {/* Left button */}
          <button
            type="button"
            onClick={handleScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white w-12 h-12 flex items-center justify-center shadow-lg border border-gray-200"
            aria-label="Scroll left"
            style={{ background: 'white' }}
          >
            <svg width="20" height="20" fill="currentColor" className="text-black rotate-90">
              <path
                d="M7 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>}
        {/* Scrollable area with padding for buttons */}
        <div
          className="overflow-x-auto overflow-y-visible hide-scrollbar w-full max-w-full"
          ref={scrollRef}
        >
          <div
            className="flex gap-5 pb-2 pt-8 scroll-smooth"
            style={{ minWidth: "max-content" }}
          >
            {children}
          </div>
        </div>
        {/* Right button */}
        {cardCount >= 4 && <button
          type="button"
          onClick={handleScrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white w-12 h-12 flex items-center justify-center shadow-md"
          aria-label="Scroll right"
        >
          <svg width="20" height="20" fill="currentColor" className="text-black">
            <path
              d="M7 5l5 5-5 5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>}
      </div>
    </section>
  );
};

export default CategoryCarousel; 