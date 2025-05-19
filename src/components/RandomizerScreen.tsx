import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import SearchBar from './SearchBar';
import FavoritesSection from './FavoritesSection';
import CategoryCarousel from './CategoryCarousel';
import RecommendationCard from './RecommendationCard';
import detailsData from '../detailsData.json';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  const navigate = useNavigate();

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
  }, [randomizeKey, allTabsSelected]);

  const randomCategory = allTabsSelected ? TABS[randomCategoryIdx] : null;

  const handleRandomize = () => {
    setRandomizeKey(prev => prev + 1);
  };

  const handleCategorySelect = () => {
    if (randomCategory) {
      let dataArr: any[] = [];
      let type = '';
      if (randomCategory === 'Books') { dataArr = detailsData.books || []; type = 'books'; }
      else if (randomCategory === 'Restaurants') { dataArr = detailsData.restaurants || []; type = 'restaurants'; }
      else if (randomCategory === 'Movies') { dataArr = detailsData.movies || []; type = 'movies'; }
      else if (randomCategory === 'Travel') { dataArr = detailsData.travels || []; type = 'travels'; }
      if (dataArr.length > 0) {
        const randomItem = dataArr[Math.floor(Math.random() * dataArr.length)];
        if (randomItem && randomItem.id) {
          navigate(`/details/${type}/${randomItem.id}`);
        }
      }
    }
  };

  return (
    <div className="px-8 pt-8">
      <h2 className="text-3xl font-bold text-black mb-6">Randomizer</h2>
      <div className="text-lg mb-4">What Do You Feel Like Doing Today?</div>
        <div className="flex flex-wrap gap-4 mb-8">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => toggleTab(tab)}
              className={`px-6 py-2 rounded-lg font-semibold text-lg shadow-sm transition-all duration-200 border border-gray-300 ${
                selectedTabs.includes(tab)
                  ? ''
                  : 'bg-gray-200 text-gray-700 hover:bg-violet-100'
              }`}
              style={selectedTabs.includes(tab) ? { background: '#da5a86', color: '#fff' } : {}}
            >
              {tab}
            </button>
          ))}
        </div>
        {selectedTabs.length === 0 ? (
        <div className="flex flex-col items-center mt-8">
          <div className="text-xl font-medium mb-2">Can't Decide?</div>
          <div className="text-gray-600">Select categories to get a recommendation!</div>
          <img src={illustrationUrl} alt="Random illustration" className="w-80 h-auto mb-6 rounded-xl" />
        </div>
      ) : allTabsSelected ? (
        <div className="flex flex-col items-center mt-8">
          <div className="text-2xl font-semibold text-black mb-4">Your Random Activity</div>
          <button
            className="w-64 h-40 rounded-2xl shadow-md flex items-center justify-center text-2xl font-bold transition-all duration-200"
            style={{ background: '#da5a86', color: '#fff' }}
            onClick={handleCategorySelect}
            onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = '#c94a74'; }}
            onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = '#da5a86'; }}
          >
            {randomCategory}
          </button>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-12">
          {selectedTabs.map(tab => {
            // Get the correct data array for the tab
            let dataArr: any[] = [];
            if (tab === 'Books') dataArr = detailsData.books || [];
            else if (tab === 'Restaurants') dataArr = detailsData.restaurants || [];
            else if (tab === 'Movies') dataArr = detailsData.movies || [];
            else if (tab === 'Travel') dataArr = detailsData.travels || [];
            // Shuffle and pick 6 random items  
            const shuffled = [...dataArr];
            for (let i = shuffled.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            const randomItems = shuffled.slice(0, CARDS_PER_TAB);
            return (
              <div key={tab}>
                <div className="text-2xl font-semibold text-black mb-4">Random {tab}</div>
                <div className="grid grid-cols-5 grid-rows-3 gap-3 auto-rows-[120px]">
                  {randomItems.map((item, idx) => {
                    let extraClass = '';
                    if (idx === 0) extraClass = 'col-span-2 row-span-2';
                    else if (idx === 1) extraClass = 'col-span-3 row-span-1';
                    else if (idx === 2) extraClass = 'col-span-1 row-span-1';
                    else if (idx === 3) extraClass = 'col-span-2 row-span-1';
                    else if (idx === 4) extraClass = 'col-span-2 row-span-1';
                    else if (idx === 5) extraClass = 'col-span-1 row-span-1';
                    // else default size
                    return (
                      <RecommendationCard
                        key={item.id || idx}
                        id={item.id}
                        type={tab.toLowerCase()}
                        title={item.title}
                        image={item.image}
                        rating={item.rating}
                        author={item.author || item.director || item.location || item.approxExpenditure}
                        className={`h-full ${extraClass}`}
                        bento={true}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};    

export default RandomizerScreen; 