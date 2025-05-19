import React from 'react';

const HeroSection = () => (
  <section className="w-full bg-gray-300 mb-32 rounded-2xl p-0 my-6 min-h-[500px] relative overflow-hidden shadow-lg">
    <img
      src="./images/hero.png"
      alt="Hero"
      className="absolute inset-0 w-full h-full object-cover"
    />
  </section>
);

export default HeroSection;
