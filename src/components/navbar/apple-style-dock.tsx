import {
  Users,
  Component,
  HomeIcon,
  Mail,
  Sparkles,
  ScrollText,
} from 'lucide-react';

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const data = [
  {
    title: 'Home',
    icon: (
      <HomeIcon className='h-full w-full text-neutral-600 dark:text-purple-300' />
    ),
    target: 'home',
  },
  {
    title: 'Features',
    icon: (
      <Sparkles className='h-full w-full text-neutral-600 dark:text-yellow-300' />
    ),
    target: 'glowing-effect-demo',
  },
  {
    title: 'How It Works',
    icon: (
      <Component className='h-full w-full text-neutral-600 dark:text-green-300' />
    ),
    target: 'how-it-works',
  },
  {
    title: 'About VIBE',
    icon: (
      <Users className='h-full w-full text-neutral-600 dark:text-red-500' />
    ),
    target: 'background-paths',
  },
  {
    title: 'Join Waitlist',
    icon: (
      <ScrollText className='h-full w-full text-neutral-600 dark:text-blue-300' />
    ),
    target: 'waitlist',
  },
  {
    title: 'Contact',
    icon: (
      <Mail className='h-full w-full text-neutral-600 dark:text-pink-500' />
    ),
    target: 'contact',
  },
];

export function AppleStyleDock() {
  // Restored to original dock: no click, no anchor, only DockLabel and DockIcon as children
  return (
    <div className='absolute bottom-2 left-1/2 max-w-full -translate-x-1/2'>
      <Dock className='items-end pb-3'>
        {data.map((item, idx) => (
          <DockItem
            key={idx}
            className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 cursor-pointer'
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}
