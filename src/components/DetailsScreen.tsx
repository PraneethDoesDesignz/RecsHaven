import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock data for demonstration
const mockDetails = {
  book: {
    title: 'Title Of The Book',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.',
    rating: 5,
    reviews: [
      { user: 'Lorem Ipsum', comment: 'Such a good book!' },
      { user: 'Bookworm', comment: 'Couldn\'t put it down!' },
      { user: 'ReaderGal', comment: 'A masterpiece.' },
      { user: 'PageTurner', comment: 'Highly recommended.' },
      { user: 'NovelFan', comment: 'Loved every page!' }
    ]
  },
  restaurant: {
    title: 'Title Of The Restaurant',
    description: 'A wonderful place to dine with family and friends. Enjoy a variety of cuisines and a cozy atmosphere.',
    rating: 4,
    reviews: [
      { user: 'Foodie123', comment: 'Amazing food and service!' },
      { user: 'DineOut', comment: 'Loved the ambiance.' },
      { user: 'ChefMike', comment: 'Tasty dishes.' },
      { user: 'GourmetGal', comment: 'Will visit again.' },
      { user: 'HappyCustomer', comment: 'Great experience!' }
    ]
  },
  movie: {
    title: 'Title Of The Movie',
    description: 'An epic tale of adventure and discovery. A must-watch for movie lovers.',
    rating: 4.5,
    reviews: [
      { user: 'MovieBuff', comment: 'Incredible visuals!' },
      { user: 'CinemaLover', comment: 'Great story and acting.' },
      { user: 'FilmFan', comment: 'A cinematic treat.' },
      { user: 'PopcornGuy', comment: 'Would watch again.' },
      { user: 'Critique', comment: 'Oscar-worthy!' }
    ]
  },
  travel: {
    title: 'Title Of The Travel Spot',
    description: 'A breathtaking destination for your next vacation. Experience nature like never before.',
    rating: 5,
    reviews: [
      { user: 'Traveler', comment: 'A paradise on earth!' },
      { user: 'Explorer', comment: 'Unforgettable experience.' },
      { user: 'Nomad', comment: 'Stunning views.' },
      { user: 'Wanderer', comment: 'Will come back!' },
      { user: 'Adventurer', comment: 'Bucket list spot.' }
    ]
  }
};

type CategoryType = keyof typeof mockDetails;

const getCategoryData = (type: CategoryType | undefined) => mockDetails[type ?? 'book'] || mockDetails.book;

const DetailsScreen = () => {
  const { type = 'book', id } = useParams<{ type?: CategoryType; id?: string }>();
  const navigate = useNavigate();
  const data = getCategoryData(type);

  return (
    <div className="p-8 flex flex-col">
      <button
        className="mb-4 px-4 py-2 bg-pastel-blue text-white rounded hover:bg-pastel-purple transition w-max"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      <div className="flex flex-row gap-8">
        {/* Left: Title, Description, Actions */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
          <div className="font-semibold mb-1">Description :</div>
          <p className="mb-6">{data.description}</p>
          <div className="flex gap-4 mb-6">
            <button className="px-6 py-2 bg-gray-200 rounded font-semibold hover:bg-gray-300 transition">Recommend</button>
            <button className="px-6 py-2 bg-gray-200 rounded font-semibold hover:bg-gray-300 transition">Add To Wishlist</button>
          </div>
        </div>
        {/* Right: Image/Media and Rating */}
        <div className="flex flex-col items-end">
          <div className="w-[350px] h-[250px] bg-gray-300 rounded-lg mb-2 flex items-end justify-end relative">
            <div className="absolute bottom-4 left-4 flex items-center">
              <span className="font-bold mr-2">Rating:</span>
              {[...Array(Math.floor(data.rating))].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
              {data.rating % 1 !== 0 && <span className="text-yellow-400 text-xl">☆</span>}
            </div>
          </div>
        </div>
      </div>
      {/* Reviews Section - Marquee */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4">Here's What Others Have To Say About This</h2>
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-6 animate-marquee"
            style={{ width: 'max-content' }}
          >
            {[...data.reviews, ...data.reviews].map((review, idx) => (
              <div
                key={idx}
                className="bg-gray-200 rounded-xl p-6 w-72 flex-shrink-0 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{review.user}</span>
                  <span className="w-6 h-6 bg-gray-400 rounded-full inline-block" />
                </div>
                <div className="font-bold text-center mt-4">"{review.comment}"</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsScreen;

// Add this CSS to your global stylesheet (e.g., index.css):
// @keyframes marquee {
//   0% { transform: translateX(0%); }
//   100% { transform: translateX(-50%); }
// }
// .animate-marquee {
//   animation: marquee 20s linear infinite;
// } 