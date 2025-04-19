import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { HomeIcon, Sparkles, Component, Users, ScrollText, Mail } from 'lucide-react';
import React from 'react';

const customDockData = [
  {
    title: 'Home',
    icon: <HomeIcon className='h-7 w-7 text-neutral-600 dark:text-purple-300' />,
    target: 'home',
  },
  {
    title: 'Features',
    icon: <Sparkles className='h-7 w-7 text-neutral-600 dark:text-yellow-300' />,
    target: 'glowing-effect-demo',
  },
  {
    title: 'How It Works',
    icon: <Component className='h-7 w-7 text-neutral-600 dark:text-green-300' />,
    target: 'how-it-works',
  },
  {
    title: 'About VIBE',
    icon: <Users className='h-7 w-7 text-neutral-600 dark:text-red-500' />,
    target: 'background-paths',
  },
  {
    title: 'Join Waitlist',
    icon: <ScrollText className='h-7 w-7 text-neutral-600 dark:text-blue-300' />,
    target: 'waitlist',
  },
  {
    title: 'Contact',
    icon: <Mail className='h-7 w-7 text-neutral-600 dark:text-pink-500' />,
    target: 'contact',
  },
];

export function CustomDock() {
  function handleDockScroll(target: string) {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      let scrollTarget = target;
      if (target === 'features' || target === 'glowing-effect-demo') {
        scrollTarget = 'glowing-effect-demo';
      }
      if (target === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(scrollTarget);
      if (el) {
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop - (window.innerHeight / 2) + (rect.height / 2);
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    };
  }

  return (
    <Dock className='mt-4 gap-4' magnification={65} panelHeight={50} distance={90}>
      {customDockData.map((item, idx) => (
        <DockItem key={idx} className='cursor-pointer flex flex-col items-center' onClick={handleDockScroll(item.target)}>
          <DockIcon>
            <span className="flex items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800 shadow-md w-full h-full">
              {item.icon}
            </span>
          </DockIcon>
          <DockLabel>{item.title}</DockLabel>
        </DockItem>
      ))}
    </Dock>
  );
}
