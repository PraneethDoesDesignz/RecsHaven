import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import FavoritesSection from './FavoritesSection';
import CategoryCarousel from './CategoryCarousel';
import RecommendationCard from './RecommendationCard';

const TABS = ['Books', 'Restaurants', 'Movies', 'Travel'];
const CARDS_PER_TAB = 6;

const illustrationUrl = './random_illustration.jpg'; // Source: Freepik

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

interface RandomizerScreenProps {
  onSelectCategory: (cat: string) => void;
}

const RandomizerScreen = ({ onSelectCategory }: RandomizerScreenProps) => {
  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);
  const [randomizeKey, setRandomizeKey] = useState(0);
  const [randomCategoryIdx, setRandomCategoryIdx] = useState(() => getRandomInt(TABS.length));

  const toggleTab = (tab: string) => {
    setSelectedTabs(prev =>
      prev.includes(tab) ? prev.filter(t => t !== tab) : [...prev, tab]
    );
  };

  const allTabsSelected = selectedTabs.length === TABS.length;

  useEffect(() => {
    if (allTabsSelected) {
      setRandomCategoryIdx(getRandomInt(TABS.length));
    }
    // eslint-disable-next-line
  }, [randomizeKey, allTabsSelected]);

  const randomCategory = allTabsSelected ? TABS[randomCategoryIdx] : null;

  return (
    <div className="px-8 pt-8">
      <h2 className="text-3xl font-bold text-pastel-purple mb-6">Randomizer</h2>
      <div className="text-lg mb-4">What Do You Feel Like Doing Today?</div>
      <div className="flex gap-6 mb-8">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => toggleTab(tab)}
            className={`px-8 py-2 rounded-lg font-semibold text-lg shadow-sm transition border border-gray-300 ${selectedTabs.includes(tab) ? 'bg-pastel-purple text-black' : 'bg-gray-200 text-black hover:bg-pastel-purple/20'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      {selectedTabs.length === 0 ? (
        <div className="flex flex-col items-center mt-8">
          <div className="text-xl font-medium mb-2">Can't Decide?</div>
          <div className="mb-1">Choose All For A Random Activity!</div>
          <img src={illustrationUrl} alt="Randomizer Illustration" className="w-[400px] h-[400px] object-cover rounded-xl" />
        </div>
      ) : allTabsSelected ? (
        <div className="flex flex-col items-center mt-8">
          <div className="text-2xl font-semibold text-pastel-purple mb-4">Your Random Activity</div>
          <button
            className="w-64 h-40 bg-pastel-blue/40 rounded-2xl shadow-md flex items-center justify-center text-2xl font-bold text-pastel-purple hover:bg-pastel-purple/20 transition"
            onClick={() => randomCategory && onSelectCategory(randomCategory)}
          >
            {randomCategory}
          </button>
          <button
            className="mt-6 px-6 py-2 bg-pastel-purple text-black font-semibold rounded-lg shadow hover:bg-pastel-purple/80 transition"
            onClick={() => setRandomizeKey(k => k + 1)}
          >
            Randomize Again
          </button>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-12">
          {selectedTabs.map(tab => (
            <div key={tab}>
              <div className="text-2xl font-semibold text-pastel-purple mb-4">Random {tab}</div>
              <div className="flex flex-wrap gap-8 justify-center">
                {[...Array(CARDS_PER_TAB)].map((_, i) => (
                  <div key={i} className="w-48 h-32 bg-pastel-blue/40 rounded-2xl shadow-md flex items-center justify-center text-lg font-bold text-pastel-purple">
                    {tab} #{i + 1}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RandomizerScreen; 