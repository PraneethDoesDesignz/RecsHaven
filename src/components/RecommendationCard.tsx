import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RecommendationCardProps {
  id: string;
  type: string;
  title: string;
  author?: string;
  image?: string;
  rating?: number;
  votes?: number;
  className?: string;
  featured?: boolean;
  bento?: boolean;
}

const RecommendationCard = ({ id, type, title, author, image, rating, votes, className, featured, bento }: RecommendationCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Helper to render stars
  const renderStars = (rating?: number) => {
    if (typeof rating !== 'number') return null;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <span className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
        {halfStar && <span className="text-yellow-400 text-lg">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="text-gray-300 text-lg">★</span>
        ))}
      </span>
    );
  };

  // Label for the secondary field
  let secondaryLabel = '';
  if (type === 'books') secondaryLabel = 'By';
  else if (type === 'movies') secondaryLabel = 'By Director';
  else if (type === 'restaurants') secondaryLabel = 'Location:';
  else if (type === 'travels') secondaryLabel = 'Approx. Expenditure:';

  // Determine card and image container classes/styles
  let cardClass = `flex ${bento ? 'flex-col h-[300px]' : 'flex-row items-center'} relative cursor-pointer hover:shadow-lg transition rounded-xl shadow p-4 border-2 border-black/10`;
  let imageContainerClass = '';
  let imageContainerStyle = {};
  if (bento) {
    imageContainerClass = 'w-full flex-1 rounded-lg overflow-hidden mb-4';
    imageContainerStyle = {};
  } else if (featured) {
    imageContainerClass = 'flex-shrink-0 rounded-lg overflow-hidden mr-6'; // No -mt-12
    imageContainerStyle = { width: '380px', height: '220px' };
  } else {
    imageContainerClass = 'flex-shrink-0 rounded-lg overflow-hidden -mt-12 z-10 mr-6';
    imageContainerStyle = { width: '220px', height: '160px' };
  }

  // Apply featured styles if featured and not bento
  if (featured && !bento) {
    cardClass += ' w-[600px] h-[250px] text-2xl overflow-hidden';
  }

  // Append any custom className
  if (className) cardClass += ` ${className}`;

  return (
    <div
      className={cardClass}
      style={bento ? { backgroundColor: '#f6d4e2' } : { minHeight: '140px', backgroundColor: '#f6d4e2' }}
      onClick={() => navigate(`/details/${type}/${id}`)}
    >
      {/* Image Container with Shimmer */}
      <div className={imageContainerClass} style={imageContainerStyle}>
        {image && (
          <>
            {!imageLoaded && (
              <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />
            )}
            <img
              src={image}
              alt={title}
              className={bento
                ? `w-full h-full object-cover rounded-lg shadow-sm ${!imageLoaded ? 'hidden' : ''}`
                : `w-full h-full object-cover rounded-lg shadow-sm ${!imageLoaded ? 'hidden' : ''}`}
              onLoad={() => setImageLoaded(true)}
            />
          </>
        )}
      </div>
      {/* Info */}
      <div className={bento ? "min-h-[90px] flex flex-col justify-end min-w-0 text-left pb-0" : "flex-1 flex flex-col justify-end min-w-0 text-left pb-0"}>
        <div className="font-semibold text-xl mb-2">{title}</div>
        {author && (
          <div className="text-gray-500 text-sm mb-2 truncate">
            <span className="mr-1">{secondaryLabel}</span>
            <span className="font-semibold">{author}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          {renderStars(rating)}
          {votes !== undefined && (
            <span className="text-gray-400 text-xs ml-2">
              {votes.toLocaleString()} votes
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard; 