import React, { useRef } from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const CARD_WIDTH = 320; // w-80 in Tailwind = 320px
const VISIBLE_CARDS = 6;
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

  return (
    <section className="my-8 relative">
      <h2 className="text-lg font-semibold text-pastel-purple mb-4">
        {title} <span className="ml-2">→</span>
      </h2>
      <div className="relative" style={{ width: `${CONTAINER_WIDTH}px`, maxWidth: "100%" }}>
        {/* Left button */}
        <button
          type="button"
          onClick={handleScrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-pastel-blue/80 w-12 h-12 flex items-center justify-center shadow-md"
          aria-label="Scroll left"
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
        {/* Scrollable area with padding for buttons */}
        <div
          className="overflow-x-auto hide-scrollbar pl-16 pr-16"
          ref={scrollRef}
        >
          <div
            className="flex gap-5 pb-2 scroll-smooth"
            style={{ minWidth: "max-content" }}
          >
            {children}
          </div>
        </div>
        {/* Right button */}
        <button
          type="button"
          onClick={handleScrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-pastel-blue/80 w-12 h-12 flex items-center justify-center shadow-md"
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
        </button>
      </div>
    </section>
  );
};

export default CategoryCarousel; 