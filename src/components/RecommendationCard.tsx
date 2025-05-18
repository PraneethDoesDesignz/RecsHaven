import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecommendationCard = ({ id, type, title }: { id: number; type: string; title: string }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-80 h-40 bg-white rounded-xl shadow-md flex items-center justify-center text-black cursor-pointer hover:scale-105 transition"
      onClick={() => navigate(`/details/${type}/${id}`)}
    >
      {title}
    </div>
  );
};

export default RecommendationCard; 