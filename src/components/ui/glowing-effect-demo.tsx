"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function GlowingEffectDemo() {
  return (
    <div id="glowing-effect-demo">
      <h2 id="features" className="text-3xl font-bold text-white text-center mb-8 tracking-tight">
        Key Features
      </h2>
      <p className="text-base text-gray-400 text-center mt-2 mb-8 max-w-2xl mx-auto">
        VIBE transforms how you experience and interact with your surroundings
      </p>
      <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={<Box className="h-4 w-4" />}
          title="Real-time Discovery"
          description="See what’s happening around you in real-time."
          example="Example: Choosing the ethical option even when no one is watching."
          hoverIcon={<Settings className="h-4 w-4 text-purple-100" />}
          hoverTitle="Outdated Information"
          hoverDescription="Reviews and ratings from months or years ago remain visible indefinitely, creating a misleading picture of what's happening now."
          hoverExample="A restaurant with great reviews from 2 years ago may have completely changed management and quality."
        />
        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={<Settings className="h-4 w-4" />}
          title="Digital Pheromones"
          description="Leave your mark with digital signals."
          example="Example: Refactoring code in seconds with AI assistance."
          hoverIcon={<Sparkles className="h-4 w-4 text-yellow-200" />}
          hoverTitle="Manipulated Ratings"
          hoverDescription="Current platforms are vulnerable to fake reviews, rating manipulation, and paid promotion that obscures authentic experiences."
          hoverExample="Businesses can pay for positive reviews or use bots to artificially inflate their ratings."
        />
        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={<Sparkles className="h-4 w-4" />}
          title="Personalized Experience"
          description="Get recommendations tailored to you."
          example="Example: Unlocking premium UI components for your next project."
          hoverIcon={<Lock className="h-4 w-4 text-green-200" />}
          hoverTitle="Disconnected Experiences"
          hoverDescription="Most platforms treat each location or event as an isolated entity, missing the connections between related experiences."
          hoverExample="A coffee shop, bookstore, and park that form a perfect afternoon experience remain disconnected in traditional apps."
        />
        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={<Lock className="h-4 w-4" />}
          title="Privacy Control"
          description="Full control over your digital presence."
          example="Example: Fast prototyping with AI-powered tools."
          hoverIcon={<Search className="h-4 w-4 text-blue-300" />}
          hoverTitle="Cold Start Problem"
          hoverDescription="New locations, events, and activities struggle to gain visibility without an established user base or review history."
          hoverExample="A fantastic new pop-up shop remains invisible on traditional platforms until it accumulates enough reviews."
        />
        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
          icon={<Search className="h-4 w-4" />}
          title="Coming soon on Aceternity UI"
          description="I'm writing the code as I record this, no shit."
          example="Example: Stay tuned for more updates."
          hoverIcon={<Box className="h-4 w-4 text-pink-300" />}
          hoverTitle="Stay Tuned!"
          hoverDescription="Exciting updates are just around the corner."
          hoverExample="New features will be announced soon!"
        />
      </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  example: React.ReactNode;
  hoverIcon: React.ReactNode;
  hoverTitle: string;
  hoverDescription: React.ReactNode;
  hoverExample: React.ReactNode;
}

const GridItem = ({
  area,
  icon,
  title,
  description,
  example,
  hoverIcon,
  hoverTitle,
  hoverDescription,
  hoverExample,
}: GridItemProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div
        className="relative h-full rounded-[1.5rem]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Outer glowing border (positioned absolutely) */}
        <div className="relative h-full rounded-[1.5rem] border-2 border-gray-700">
          {/* Outer Glowing Border (glow effect wrapper) */}
          <div className="absolute inset-0 z-0 rounded-[1.5rem]">
            <GlowingEffect
              spread={50}
              glow={true}
              disabled={false}
              proximity={20}
              inactiveZone={0.0015}
              movementDuration={1.5}
              borderWidth={3}
              className="h-full w-full rounded-[1.5rem]"
            />
          </div>

          {/* Add spacing inside to make the inner card smaller */}
          <div className="relative z-10 h-full w-full p-[6px] md:p-[8px] xl:p-[10px]">
            {/* Inner Static Border Card */}
            <div className="h-full w-full rounded-[1.25rem] border-2 border-gray-600 bg-black p-4 md:p-6 xl:p-8">
              <div className="flex h-full flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hovered ? 'hover' : 'default'}
                    initial={hovered ? { opacity: 0, x: 40 } : { opacity: 1, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={hovered ? { opacity: 0, x: 40 } : { opacity: 0, x: -40 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col justify-between h-full w-full"
                    style={{ minHeight: '12rem', minWidth: '12rem', height: '100%', width: '100%' }}
                  >
                    {!hovered ? (
                      <>
                        <div>
                          <div className="flex items-center gap-4 text-white">
                            {icon}
                            <span className="font-bold text-base md:text-lg">{title}</span>
                          </div>
                          <div className="mt-2 text-sm md:text-base text-gray-300 font-light">
                            {description}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="flex items-center gap-2 text-white">
                            {hoverIcon}
                            <span className="font-bold text-base md:text-lg">{hoverTitle}</span>
                          </div>
                          <div className="mt-2 text-sm md:text-base text-gray-300 font-light">
                            {hoverDescription}
                          </div>
                          <div className="mt-2 text-xs md:text-sm text-purple-400 italic">
                            <span className="font-semibold text-purple-300 mr-1">Example:</span>
                            {hoverExample}
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
