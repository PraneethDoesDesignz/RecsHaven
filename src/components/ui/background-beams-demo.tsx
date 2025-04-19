"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";

function BackgroundBeamsDemo() {
  return (
    <div id="waitlist" className="flex justify-center items-center w-full">
      <div className="ml-10 border border-gray-500 rounded-2xl p-2 bg-background shadow-lg w-full max-w-none">
        <div className="h-[20rem] w-full max-w-none rounded-md bg-background relative flex flex-col items-center justify-center antialiased">
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-black/80 text-center font-sans font-bold">
              Join The Waitlist
            </h1>
            <p></p>
            <p className="text-muted-foreground max-w-lg mx-auto my-2 text-sm text-center relative z-10 bg-clip-text text-white bg-gradient-to-b from-white to-black/80">
            Be the first to experience VIBE when we launch. Our digital pheromone technology is revolutionizing how people discover what's happening around them in real-time. Get early access and exclusive updates on our progress.
            </p>
            <div className="flex justify-center">
              <Input
                type="email"
                placeholder="#FeelTheVIBE"
                className="w-1/2 mt-4 relative z-10"
              />
            </div>
          </div>
          <BackgroundBeams />
        </div>
      </div>
    </div>
  );
}

export { BackgroundBeamsDemo };