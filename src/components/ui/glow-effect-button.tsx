import { GlowEffect } from '@/components/ui/glow-effect';
import { ArrowRight } from 'lucide-react';

export function GlowEffectButton() {
  // Custom scroll handler for 'Get Started' button
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const section = document.getElementById('waitlist');
    if (section) {
      const rect = section.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = rect.top + scrollTop - (window.innerHeight / 2) + (rect.height / 2);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-fit mx-auto overflow-visible">
      <GlowEffect
        colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
        mode="colorShift"
        blur="soft"
        duration={3}
        scale={0.95}
        className="z-0 rounded-lg"
      />
      <button
        className="relative z-10 inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-8 py-4 text-lg font-semibold text-zinc-50 outline outline-1 outline-[#fff2f21f] shadow-lg overflow-hidden"
        onClick={handleClick}
      >
        Get Started <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}
