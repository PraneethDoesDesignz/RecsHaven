import React from "react";

// Helper for smooth scroll
type SectionMap = { [key: string]: string };

const sectionMap: SectionMap = {
  features: 'glowing-effect-demo', 
  stories: 'stories', 
  'how-it-works': 'how-it-works',
  pricing: 'pricing',
  about: 'background-paths', 
  careers: 'careers',
  blog: 'blog',
  press: 'press',
  support: 'support',
  'privacy-policy': 'privacy-policy',
  'terms-of-service': 'terms-of-service',
  contact: 'contact',
};

const handleSmoothScroll = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const mappedId = sectionMap[id] || id;
  const el = document.getElementById(mappedId);
  if (el) {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - (window.innerHeight / 2) + (rect.height / 2);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }
};

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0d0d0d] text-[#ccc] pt-[60px] pb-[30px] px-5 rounded-[30px] w-[95%] mx-auto shadow-[0_0_20px_rgba(255,255,255,0.05)] font-inter mt-10 overflow-hidden">
      {/* ViBE watermark background */}
      <h1 className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 opacity-10 z-0">
        ViBE
      </h1>
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="flex flex-wrap justify-between gap-10 md:gap-[40px] items-start footer-content">
          <div className="footer-logo text-4xl font-bold text-white mr-20 -ml-10 mb-8 md:mb-0">VIBE</div>
          <div className="footer-links flex flex-wrap gap-10 md:gap-[40px] flex-1 justify-between">
            <div className="footer-column min-w-[150px]">
              <h4 className="text-base text-white mb-[15px] relative font-semibold">Product</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-[10px]"><a href="#features" onClick={handleSmoothScroll('features')} className="text-[#999] hover:text-white transition-colors duration-300">Features</a></li>
                <li className="mb-[10px]"><a href="#how-it-works" onClick={handleSmoothScroll('how-it-works')} className="text-[#999] hover:text-white transition-colors duration-300">How It Works</a></li>
                <li className="mb-[10px]"><a href="#stories" onClick={handleSmoothScroll('stories')} className="text-[#999] hover:text-white transition-colors duration-300">Stories</a></li>
                <li className="mb-[10px]"><a href="#pricing" onClick={handleSmoothScroll('pricing')} className="text-[#999] hover:text-white transition-colors duration-300">Pricing</a></li>
              </ul>
            </div>
            <div className="footer-column min-w-[150px]">
              <h4 className="text-base text-white mb-[15px] relative font-semibold">Company</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-[10px]"><a href="#about" onClick={handleSmoothScroll('about')} className="text-[#999] hover:text-white transition-colors duration-300">About Us</a></li>
                <li className="mb-[10px]"><a href="#careers" onClick={handleSmoothScroll('careers')} className="text-[#999] hover:text-white transition-colors duration-300">Careers</a></li>
                <li className="mb-[10px]"><a href="#blog" onClick={handleSmoothScroll('blog')} className="text-[#999] hover:text-white transition-colors duration-300">Blog</a></li>
                <li className="mb-[10px]"><a href="#press" onClick={handleSmoothScroll('press')} className="text-[#999] hover:text-white transition-colors duration-300">Press</a></li>
              </ul>
            </div>
            <div className="footer-column min-w-[150px]">
              <h4 className="text-base text-white mb-[15px] relative font-semibold">Resources</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-[10px]"><a href="#support" onClick={handleSmoothScroll('support')} className="text-[#999] hover:text-white transition-colors duration-300">Support</a></li>
                <li className="mb-[10px]"><a href="#privacy-policy" onClick={handleSmoothScroll('privacy-policy')} className="text-[#999] hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                <li className="mb-[10px]"><a href="#terms-of-service" onClick={handleSmoothScroll('terms-of-service')} className="text-[#999] hover:text-white transition-colors duration-300">Terms of Service</a></li>
                <li className="mb-[10px]"><a href="#contact" onClick={handleSmoothScroll('contact')} className="text-[#999] hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            <div className="footer-column min-w-[150px]">
              <h4 className="text-base text-white mb-[15px] relative font-semibold">Connect</h4>
              <div className="social-links flex gap-[10px] mt-[10px]">
                <a href="#" className="social-link w-9 h-9 bg-[#1f1f1f] rounded-full inline-flex items-center justify-center transition-all duration-300 hover:bg-[#a855f7] hover:-translate-y-0.5" aria-label="Twitter">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.007-.857 3.17 0 2.188 1.115 4.117 2.823 5.247a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0 0 24 4.557z"/></svg>
                </a>
                <a href="#" className="social-link w-9 h-9 bg-[#1f1f1f] rounded-full inline-flex items-center justify-center transition-all duration-300 hover:bg-[#a855f7] hover:-translate-y-0.5" aria-label="Instagram">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.974.975 1.262 2.242 1.325 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.063 1.366-.351 2.633-1.325 3.608-.975.974-2.242 1.262-3.608 1.325-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.063-2.633-.351-3.608-1.325-.974-.975-1.262-2.242-1.325-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608C4.533 2.583 5.8 2.295 7.166 2.233 8.432 2.175 8.812 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.771.13 4.542.423 3.515 1.45 2.488 2.477 2.195 3.707 2.137 4.988.014 5.741 0 8.332 0 12c0 3.668.014 6.259.072 7.539.058 1.281.351 2.511 1.378 3.538 1.027 1.027 2.257 1.32 3.538 1.378C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.281-.058 2.511-.351 3.538-1.378 1.027-1.027 1.32-2.257 1.378-3.538C23.986 15.668 24 15.259 24 12c0-3.668-.014-6.259-.072-7.539-.058-1.281-.351-2.511-1.378-3.538C19.457.423 18.227.13 16.948.072 15.668.014 15.259 0 12 0z"/><path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
                <a href="#" className="social-link w-9 h-9 bg-[#1f1f1f] rounded-full inline-flex items-center justify-center transition-all duration-300 hover:bg-[#a855f7] hover:-translate-y-0.5" aria-label="LinkedIn">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.354V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.369-1.849 3.601 0 4.266 2.368 4.266 5.455v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.814 20.452H3.86V9h2.954v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z"/></svg>
                </a>
                <a href="#" className="social-link w-9 h-9 bg-[#1f1f1f] rounded-full inline-flex items-center justify-center transition-all duration-300 hover:bg-[#a855f7] hover:-translate-y-0.5" aria-label="YouTube">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.458 3.5 12 3.5 12 3.5s-7.458 0-9.386.574a2.994 2.994 0 0 0-2.112 2.112C0 8.114 0 12 0 12s0 3.886.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.542 20.5 12 20.5 12 20.5s7.458 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.886 24 12 24 12s0-3.886-.502-5.814zM9.75 15.568V8.432L15.818 12l-6.068 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom mt-10 border-t border-[#222] pt-5 text-center text-sm text-[#777]">
          &copy; 2025 VIBE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
