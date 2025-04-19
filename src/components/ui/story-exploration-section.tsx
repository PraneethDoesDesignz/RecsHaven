"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const personas = [
  { id: "explorer", name: "The Explorer", description: "Always seeking new experiences", color: "#3B82F6" }, // Top
  { id: "social", name: "The Connector", description: "Building meaningful relationships", color: "#EF4444" }, // Right
  { id: "local", name: "The Local", description: "Deeply invested in community", color: "#22C55E" }, // Bottom
  { id: "business", name: "The Entrepreneur", description: "Creating value for others", color: "#FACC15" }, // Left
];

const stories = {
  explorer: [
    { title: "Morning Discovery", text: "Alex wakes up in a new neighborhood and opens VIBE to see what's happening. The app shows several strong digital pheromone signals at a nearby café, indicating it's popular with locals who share Alex's interests in photography and hiking.", emotions: { joy: 85, depth: 40, authenticity: 70, serendipity: 90 } },
    { title: "Afternoon Adventure", text: "While exploring a park, Alex notices a trail signal created by a local hiking group. These digital pheromones have persisted because they're constantly reinforced by similar users. Following the signal leads to a hidden viewpoint not on traditional maps.", emotions: { joy: 75, depth: 55, authenticity: 80, serendipity: 70 } },
    { title: "Evening Exploration", text: "Alex sees an event signal pulsing strongly nearby - it's a pop-up art show that started just an hour ago. The signal is strong because several art enthusiasts are actively engaging, creating a dense cluster of digital pheromones that attract like-minded people.", emotions: { joy: 90, depth: 65, authenticity: 60, serendipity: 95 } },
    { title: "Night Reflection", text: "Before bed, Alex reviews the day's discoveries. The digital pheromones left by others led to three unexpected finds that would have been missed using traditional apps. Some signals are already fading as events end, maintaining the ecosystem's authenticity.", emotions: { joy: 80, depth: 75, authenticity: 85, serendipity: 100 } },
  ],
  social: [
    { title: "Morning Connections", text: "Jordan checks VIBE and notices a friend's digital pheromone signal at a nearby coffee shop. The app shows they've been there for 20 minutes, so Jordan sends a quick message and spontaneously meets up, turning a solo morning into a chance to catch up.", emotions: { joy: 80, depth: 70, authenticity: 75, serendipity: 65 } },
    { title: "Afternoon Networking", text: "At lunch, Jordan creates a signal for a casual meetup. Within an hour, three friends and two friends-of-friends with shared interests in music have joined, having discovered the signal through VIBE's tensor-based visualization system that matches interests.", emotions: { joy: 70, depth: 65, authenticity: 85, serendipity: 60 } },
    { title: "Evening Gathering", text: "Jordan notices several friends' signals converging at a new restaurant. The app shows they didn't explicitly plan this - they each independently discovered it through VIBE's recommendation engine based on their digital pheromone interactions.", emotions: { joy: 90, depth: 60, authenticity: 70, serendipity: 80 } },
    { title: "Night Planning", text: "Before bed, Jordan uses VIBE to create a signal for a weekend gathering. Rather than sending explicit invites, Jordan sets interest parameters so the right people will naturally discover it through the platform's synthetic pheromone system.", emotions: { joy: 85, depth: 85, authenticity: 95, serendipity: 75 } },
  ],
  local: [
    { title: "Morning Community Check", text: "Taylor starts the day by checking community alerts on VIBE. A neighbor has created a signal about a water main repair affecting several blocks. Taylor reinforces this signal with additional information, making it stronger and more visible to others.", emotions: { joy: 75, depth: 60, authenticity: 80, serendipity: 55 } },
    { title: "Afternoon Contribution", text: "While walking through the neighborhood, Taylor creates several spot signals highlighting community resources. Each signal is tagged with relevant interests, creating a rich layer of digital pheromones that will guide neighbors to these resources.", emotions: { joy: 70, depth: 75, authenticity: 85, serendipity: 50 } },
    { title: "Evening Organization", text: "Taylor attends a neighborhood meeting and creates an event signal for an upcoming community cleanup. As others interact with the signal, it grows stronger and begins to appear more prominently for everyone in the area with community interests.", emotions: { joy: 85, depth: 65, authenticity: 90, serendipity: 60 } },
    { title: "Night Reflection", text: "Before bed, Taylor reviews the community impact dashboard, seeing how their signals have helped neighbors discover resources. The ecosystem visualization shows how their consistent community contributions have created a rich information layer.", emotions: { joy: 80, depth: 80, authenticity: 95, serendipity: 70 } },
  ],
  business: [
    { title: "Morning Preparation", text: "Morgan's food truck changes location daily. As soon as they park and set up, Morgan creates a signal on VIBE that automatically appears for people nearby who have shown interest in similar cuisine, leveraging the cold-start solution system.", emotions: { joy: 65, depth: 70, authenticity: 60, serendipity: 40 } },
    { title: "Afternoon Engagement", text: "As customers visit the food truck, their presence naturally strengthens its signal on VIBE. Morgan notices a surge of visitors who mention they discovered the truck through VIBE's recommendation engine, which matched their food preferences.", emotions: { joy: 75, depth: 60, authenticity: 65, serendipity: 50 } },
    { title: "Evening Analysis", text: "After closing, Morgan checks VIBE's business insights. Unlike traditional platforms with manipulable reviews, Morgan can see genuine engagement patterns - which menu items created the strongest signals and how customer signals interacted.", emotions: { joy: 80, depth: 70, authenticity: 70, serendipity: 65 } },
    { title: "Night Planning", text: "Morgan plans tomorrow's location based on VIBE's ecosystem data, which shows areas where people with matching food interests tend to cluster. The platform's tensor-based visualization system suggests optimal locations for maximum engagement.", emotions: { joy: 85, depth: 80, authenticity: 75, serendipity: 85 } },
  ],
};

const timeLabels = ["Morning", "Afternoon", "Evening", "Night"];
const meterColors = [
  "bg-gradient-to-r from-blue-500 to-blue-300",
  "bg-gradient-to-r from-red-500 to-red-300",
  "bg-gradient-to-r from-yellow-400 to-yellow-200",
  "bg-gradient-to-r from-green-500 to-green-300",
];

export function StoryExplorationSection() {
  const [persona, setPersona] = useState("explorer");
  const [storyIndex, setStoryIndex] = useState(0);

  useEffect(() => {
    setStoryIndex(0);
  }, [persona]);

  const currentStory = stories[persona][storyIndex];

  return (
    <section id="stories" className="w-full max-w-6xl mx-auto py-12 px-4 md:px-8">
      {/* Section Title and Subtitle */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Experience VIBE Through Different Eyes</h2>
        <p className="text-lg md:text-xl text-zinc-300 font-medium">Select a persona to see how they would use VIBE in their daily life</p>
      </div>
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
        {/* Left: Story, Timeline, Emotions */}
        <div className="flex-1 min-w-[320px] max-w-xl w-full">
          {/* Story Time-of-Day & Content Layout */}
          <div className="flex flex-row gap-8 items-start w-full max-w-2xl mx-auto mt-6">
            {/* Time-of-day buttons */}
            <div className="flex flex-col items-start gap-4 min-w-[120px]">
              {timeLabels.map((label, i) => (
                <button
                  key={label}
                  onClick={() => setStoryIndex(i)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all border-2 text-sm font-semibold mb-0 md:mb-4 ${
                    storyIndex === i
                      ? "bg-purple-600/80 border-purple-400 text-white shadow"
                      : "bg-zinc-900/70 border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                  }`}
                  style={{ minWidth: 120 }}
                >
                  <span className="w-3 h-3 rounded-full bg-purple-400 mr-2" style={{ opacity: storyIndex === i ? 1 : 0.3 }} />
                  {label}
                </button>
              ))}
            </div>

            {/* Story Content */}
            <div className="flex-1 flex flex-col gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${persona}-${storyIndex}`}
                  className="rounded-xl bg-zinc-900/80 border border-zinc-800 shadow-lg p-6 mb-6 min-h-[10px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-white">{currentStory.title}</h3>
                  <p className="text-zinc-200 text-base leading-relaxed">{currentStory.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          {/* Emotions Meter - full width */}
          <div className="rounded-lg bg-zinc-900/70 border border-zinc-800 p-4 w-full max-w-2xl mx-auto mt-6">
            <h4 className="text-white text-base font-semibold mb-4">Emotional Impact</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Discovery Joy", key: "joy", color: meterColors[0] },
                { label: "Connection Depth", key: "depth", color: meterColors[1] },
                { label: "Authenticity", key: "authenticity", color: meterColors[2] },
                { label: "Serendipity", key: "serendipity", color: meterColors[3] },
              ].map(({ label, key, color }) => (
                <div key={key} className="flex flex-col gap-1">
                  <span className="text-xs text-zinc-300 mb-1">{label}</span>
                  <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-3 rounded-full transition-all duration-700 ${color}`}
                      style={{ width: `${currentStory.emotions[key]}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${currentStory.emotions[key]}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Persona Circular Grid */}
        <div className="flex-1 flex items-center justify-center min-w-[320px]">
          <div className="relative w-[410px] h-[410px] md:w-[500px] md:h-[500px] flex items-center justify-center overflow-visible">
            {/* SVG Pie Chart for 4 colored quadrants, now interactive and floating on select */}
            <svg viewBox="-30 -30 480 480" className="absolute w-full h-full z-0 overflow-visible">
              {/* Quadrant configs: id, path, fill, angle (radians) for floating direction */}
              {[
                {
                  id: 'explorer',
                  d: "M210,210 L210,10 A200,200 0 0,1 410,210 Z",
                  fill: "#3B82F6",
                  angle: 7 * Math.PI / 4 // 315°
                },
                {
                  id: 'social',
                  d: "M210,210 L410,210 A200,200 0 0,1 210,410 Z",
                  fill: "#EF4444",
                  angle: Math.PI / 4 // 45°
                },
                {
                  id: 'local',
                  d: "M210,210 L210,410 A200,200 0 0,1 10,210 Z",
                  fill: "#22C55E",
                  angle: 3 * Math.PI / 4 // 135°
                },
                {
                  id: 'business',
                  d: "M210,210 L10,210 A200,200 0 0,1 210,10 Z",
                  fill: "#FACC15",
                  angle: 5 * Math.PI / 4 // 225°
                }
              ].map((q) => {
                // Floating offset
                const floatDist = persona === q.id ? 24 : 0;
                const dx = Math.cos(q.angle) * floatDist;
                const dy = Math.sin(q.angle) * floatDist;
                return (
                  <motion.path
                    key={q.id}
                    d={q.d}
                    fill={q.fill}
                    fillOpacity={persona === q.id ? 0.45 : 0.20}
                    style={{ cursor: 'pointer' }}
                    animate={{
                      filter: persona === q.id ? `drop-shadow(0 0 8px ${q.fill})` : 'none',
                      translateX: dx,
                      translateY: dy,
                      zIndex: persona === q.id ? 2 : 1
                    }}
                    transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                    onClick={() => setPersona(q.id)}
                  />
                );
              })}
            </svg>
            {/* Center circle (optional for focus effect) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-black border-1 z-10" />
            {/* Persona Info in Each Quadrant - always inside wedge, floats with quadrant */}
            {personas.map((p, idx) => {
              // Bisector angles as above
              const angles = [7 * Math.PI / 4, Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4];
              const angle = angles[idx];
              const center = 200;
              // Use a smaller radius to keep text inside wedge
              const baseRadius = 95;
              const floatDist = persona === p.id ? 24 : 0;
              // Quadrant-specific tweaks
              let left = center + Math.cos(angle) * (baseRadius + floatDist);
              let top = center + Math.sin(angle) * (baseRadius + floatDist);
              let width = 80;
              let textAlign = 'center';
              let transform = 'translate(-50%, -50%)';
              if (idx === 1) { // Right
                left += 10;
                width = 90;
                textAlign = 'left';
                transform = 'translate(0, -50%)';
              } else if (idx === 3) { // Left
                left -= 10;
                width = 90;
                textAlign = 'right';
                transform = 'translate(-100%, -50%)';
              } else if (idx === 0) { // Top
                top -= 10;
              } else if (idx === 2) { // Bottom
                top += 10;
              }
              return (
                <div
                  key={p.id}
                  className={`absolute flex flex-col items-center justify-center pointer-events-none ${persona === p.id ? 'font-bold text-white' : 'opacity-80 text-zinc-200'}`}
                  style={{ left: `${left}px`, top: `${top}px`, width, textAlign, transform }}
                >
                  <span className="text-base md:text-lg drop-shadow-lg">{p.name}</span>
                  <span className="text-xs md:text-sm mt-1">{p.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
