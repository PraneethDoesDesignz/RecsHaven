import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import detailsData from '../detailsData.json';

interface Review {
  user: string;
  comment: string;
}

interface DetailItem {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviews: Review[];
}

type CategoryType = 'books' | 'restaurants' | 'movies' | 'travels';

const DetailsScreen = () => {
  const { type = 'books', id } = useParams<{ type?: CategoryType; id?: string }>();
  const navigate = useNavigate();

  const dataList = (detailsData as Record<CategoryType, DetailItem[]>)[type as CategoryType] || [];
  const data = dataList.find((item) => item.id === id) || dataList[0];

  // Ping-pong scroll animation for reviews
  const scrollRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Reset scroll position and direction when reviews change
    container.scrollLeft = 0;
    setDirection(1);
  }, [data.reviews]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrame: number;
    const speed = 1.5; // px per frame

    const animate = () => {
      if (!container) return;
      // Only animate if content is overflowing
      if (container.scrollWidth > container.clientWidth + 1) {
        if (direction === 1) {
          if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 1) {
            setDirection(-1);
          } else {
            container.scrollLeft += speed;
          }
        } else {
          if (container.scrollLeft <= 0) {
            setDirection(1);
          } else {
            container.scrollLeft -= speed;
          }
        }
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [direction, data.reviews]);

  useEffect(() => {
    const favKey = `favourites_${type}`;
    const favs = JSON.parse(localStorage.getItem(favKey) || '[]');
    setIsFavourite(favs.includes(data.id));
  }, [type, data.id]);

  useEffect(() => {
    // Check if this item is already recommended by 'You'
    const recKey = `recommendedBy_${type}`;
    const recs = JSON.parse(localStorage.getItem(recKey) || '{}');
    setIsRecommended(recs[data.id]?.includes('You'));
  }, [type, data.id]);

  useEffect(() => {
    // Check if this item is already in the wishlist
    const wishlistKey = `wishlist_${type}`;
    const wishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');
    setIsWishlisted(wishlist.includes(data.id));
  }, [type, data.id]);

  const handleToggleFavourite = () => {
    const favKey = `favourites_${type}`;
    let favs = JSON.parse(localStorage.getItem(favKey) || '[]');
    if (favs.includes(data.id)) {
      favs = favs.filter((id: string) => id !== data.id);
    } else {
      favs.push(data.id);
    }
    localStorage.setItem(favKey, JSON.stringify(favs));
    setIsFavourite(favs.includes(data.id));
  };

  const handleRecommend = () => {
    const recKey = `recommendedBy_${type}`;
    let recs = JSON.parse(localStorage.getItem(recKey) || '{}');
    if (!recs[data.id]) recs[data.id] = [];
    if (recs[data.id].includes('You')) {
      // Remove recommendation
      recs[data.id] = recs[data.id].filter((name: string) => name !== 'You');
      localStorage.setItem(recKey, JSON.stringify(recs));
      setIsRecommended(false);
    } else {
      // Add recommendation
      recs[data.id].push('You');
      localStorage.setItem(recKey, JSON.stringify(recs));
      setIsRecommended(true);
    }
  };

  const handleToggleWishlist = () => {
    const wishlistKey = `wishlist_${type}`;
    let wishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');
    if (wishlist.includes(data.id)) {
      wishlist = wishlist.filter((id: string) => id !== data.id);
    } else {
      wishlist.push(data.id);
    }
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    setIsWishlisted(wishlist.includes(data.id));
  };

  if (!data) {
    return (
      <div className="p-8">
        <button
          className="mb-4 px-4 py-2 bg-violet-100 text-black rounded hover:bg-violet-600 transition w-max"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <div className="text-xl text-red-500">Sorry, we couldn't find the details for this item.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Image Section */}
      <div className="w-full px-[10px] pt-[10px]">
        <div className="relative w-full h-[350px] md:h-[450px] lg:h-[520px] flex items-end justify-start overflow-hidden rounded-[10px] mt-0">
          {data.image && (
            <img
              src={
                data.image.startsWith('http')
                  ? data.image
                  : `/images/${data.image.replace('./images/', '')}`
              }
              alt={data.title}
              className="absolute inset-0 w-full h-full object-cover object-center z-0 rounded-[10px]"
            />
          )}
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 rounded-[10px]" />
          {/* Content Overlay */}
          <div className="relative z-20 p-8 pb-10 flex flex-col gap-4 max-w-3xl">
            <button
              className="mb-2 px-4 py-2 bg-white/40 text-black rounded hover:bg-white transition w-max"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">{data.title}</h1>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-white text-lg font-semibold">Rating:</span>
              {[...Array(Math.floor(data.rating))].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">★</span>
              ))}
              {data.rating % 1 !== 0 && <span className="text-yellow-400 text-2xl">☆</span>}
            </div>
            <div className="flex gap-4 flex-wrap">
              <button
                className={`px-6 py-2 rounded font-semibold transition ${isRecommended ? '' : 'bg-pink-200 text-black hover:bg-pink-300'}`}
                style={isRecommended ? { background: '#da5a86', color: '#fff' } : {}}
                onClick={handleRecommend}
              >
                {isRecommended ? 'Recommended' : 'Recommend'}
              </button>
              <button
                className={`px-6 py-2 rounded font-semibold transition ${isWishlisted ? '' : 'bg-pink-200 text-black hover:bg-pink-300'}`}
                style={isWishlisted ? { background: '#e680a6', color: '#fff' } : {}}
                onClick={handleToggleWishlist}
              >
                {isWishlisted ? 'Remove from Wishlist' : 'Add To Wishlist'}
              </button> 
              <button
                className={`px-6 py-2 rounded font-semibold transition ${isFavourite ? 'bg-yellow-300 hover:bg-yellow-400' : 'bg-pink-200 text-black hover:bg-pink-300'}`}
                onClick={handleToggleFavourite}
              >
                {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Description & Reviews Section */}
      <div className="px-8 mt-8">
        <div className="font-semibold mb-1 text-lg">Description :</div>
        <p className="mb-8 text-gray-800 text-lg">{data.description}</p>
        {/* Reviews Section - Marquee */}
        <div className="mt-10">
          <h2 className="text-lg font-bold mb-4">Here's What Others Have To Say About This</h2>
          <div className="relative w-full overflow-hidden bg-transparent backdrop-blur-lg border border-white/30 py-4 rounded-xl">
            <div className="w-full flex justify-center">
              <div
                ref={scrollRef}
                className="flex gap-4 whitespace-nowrap overflow-x-scroll scroll-smooth justify-center bg-transparent"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  width: '100%',
                  minWidth: '350px',
                  minHeight: '12rem',
                }}
              >
                {(data.reviews || []).map((review, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl p-6 h-48 flex-shrink-0 flex flex-col justify-center items-center gap-2 shadow-sm border border-white/30 backdrop-blur-md"
                    style={{ backgroundColor: '#f6d4e2', minWidth: '18rem', width: '28vw', maxWidth: '420px' }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold">{review.user}</span>
                      <span className="w-12 h-12 bg-gray-400 rounded-full inline-block" />
                    </div>
                    <div className="font-bold text-center flex-1 flex items-center justify-center">"{review.comment}"</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended By Others Section */}
        <div className="mt-16 mb-5">
          <h2 className="text-lg font-bold mb-4">Recommended By Others <span className="ml-2">→</span></h2>
          <div className="relative w-full overflow-visible py-4">
          
            <div className="w-full flex justify-center">
              <div
                className="flex gap-4 whitespace-nowrap overflow-x-scroll scroll-smooth justify-center"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  width: '100%',
                  minWidth: '350px',
                }}
              >
                {(() => {
                  const recommended = dataList.filter((item) => {
                    const recs = JSON.parse(localStorage.getItem(`recommendedBy_${type}`) || '{}');
                    return recs[item.id]?.length > 0 && item.id !== data.id;
                  });

                  if (recommended.length === 0) {
                    return (
                      <div className="text-center w-full py-8 text-lg text-gray-500">
                        No other recommendations yet. Be the first to recommend!
                      </div>
                    );
                  }

                  return recommended.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-row rounded-xl shadow-sm overflow-hidden border-2 border-black/10 cursor-pointer hover:shadow-lg transition"
                      style={{ width: '600px', minHeight: '220px', backgroundColor: '#f6d4e2' }}
                      onClick={() => navigate(`/details/${type}/${item.id}`)}
                    >
                      {/* Image */}
                      <div className="flex-shrink-0 rounded-lg overflow-hidden m-4 mr-2" style={{ width: '350px', height: '200px' }}>
                        <img
                          src={
                            item.image.startsWith('http')
                              ? item.image
                              : `/images/${item.image.replace('./images/', '')}`
                          }
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg shadow-sm"
                        />
                      </div>
                      {/* Info */}
                      <div className="flex flex-col justify-center px-8 py-6 gap-2 flex-1">
                        <div className="font-bold text-xl">{item.title}</div>
                        {/* Secondary field based on type */}
                        {type === 'books' && (item as any).author && (
                          <div className="text-gray-500 text-sm truncate">
                            <span className="mr-1">By</span>
                            <span className="font-semibold">{(item as any).author}</span>
                          </div>
                        )}
                        {type === 'movies' && (item as any).director && (
                          <div className="text-gray-500 text-sm truncate">
                            <span className="mr-1">By Director</span>
                            <span className="font-semibold">{(item as any).director}</span>
                          </div>
                        )}
                        {type === 'restaurants' && (item as any).location && (
                          <div className="text-gray-500 text-sm truncate">
                            <span className="mr-1">Location:</span>
                            <span className="font-semibold">{(item as any).location}</span>
                          </div>
                        )}
                        {type === 'travels' && (item as any).approxExpenditure && (
                          <div className="text-gray-500 text-sm truncate">
                            <span className="mr-1">Approx. Expenditure:</span>
                            <span className="font-semibold">{(item as any).approxExpenditure}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          {[...Array(Math.floor(item.rating))].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-lg">★</span>
                          ))}
                          {item.rating % 1 !== 0 && <span className="text-yellow-400 text-lg">☆</span>}
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsScreen;