import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Page = 'home' | 'version' | 'games' | 'scripts' | 'getkey';

import SSImage from './icon.png';

const sectionLinks = [
  { label: '功能', href: '#features', page: null as Page | null },
  { label: '游戏', href: '#/games', page: 'games' as Page },
  { label: '脚本', href: '#/scripts', page: 'scripts' as Page },
  { label: '获取卡密', href: '#/getkey', page: 'getkey' as Page },
  { label: '版本', href: '#/version', page: 'version' as Page },
  { label: '常见问题', href: '#faq', page: null as Page | null },
];

export default function Navbar({
  navigate,
  currentPage,
}: {
  navigate: (p: Page) => void;
  currentPage: Page;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (link: typeof sectionLinks[number]) => {
    setMobileOpen(false);
    if (link.page) {
      navigate(link.page);
    } else {
      if (currentPage !== 'home') {
        navigate('home');
        setTimeout(() => {
          const el = document.querySelector(link.href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const handleLogoClick = () => {
    setMobileOpen(false);
    navigate('home');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050510]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-indigo-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={handleLogoClick} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg overflow-hidden shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
            <img
              src={SSImage}
              alt="RSHub Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"><span class="text-white text-xs font-black">LX</span></div>`;
                }
              }}
            />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">RS</span>
            <span className="text-gradient">Hub</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {sectionLinks.map((l) => {
            const isActive = l.page ? currentPage === l.page : false;
            return l.page ? (
              <button
                key={l.label}
                onClick={() => handleLinkClick(l)}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.label}
              </button>
            ) : (
              <a
                key={l.label}
                href={currentPage === 'home' ? l.href : undefined}
                onClick={(e) => {
                  if (currentPage !== 'home') {
                    e.preventDefault();
                    handleLinkClick(l);
                  }
                }}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                {l.label}
              </a>
            );
          })}
          <a
            href="https://discord.gg/pvpdkxhJ7Y"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-[#5865F2]/20"
          >
            <svg className="w-4 h-4" viewBox="0 0 127.14 96.36" fill="currentColor">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
            </svg>
            Discord
          </a>
          <a
            href="https://qm.qq.com/q/ALly9zVZbq"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-[#12B7F5] hover:bg-[#0EA1D9] text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-[#12B7F5]/20"
          >
            <svg className="w-4 h-4" viewBox="0 0 1024 1024" fill="currentColor">
              <path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.4-1.1 19.4-46.3-14.5-155.8z"/>
            </svg>
            QQ 群
          </a>
        </div>

        <button
          className="md:hidden text-slate-300"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {sectionLinks.map((l) => {
                const isActive = l.page ? currentPage === l.page : false;
                return l.page ? (
                  <button
                    key={l.label}
                    onClick={() => handleLinkClick(l)}
                    className={`px-4 py-3 text-left rounded-lg transition-all ${
                      isActive
                        ? 'text-indigo-400 bg-indigo-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {l.label}
                  </button>
                ) : (
                  <a
                    key={l.label}
                    href={currentPage === 'home' ? l.href : undefined}
                    onClick={(e) => {
                      if (currentPage !== 'home') {
                        e.preventDefault();
                        handleLinkClick(l);
                      } else {
                        setMobileOpen(false);
                      }
                    }}
                    className="px-4 py-3 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                  >
                    {l.label}
                  </a>
                );
              })}
              <a
                href="https://discord.gg/pvpdkxhJ7Y"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 127.14 96.36" fill="currentColor">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                </svg>
                加入 Discord
              </a>
              <a
                href="https://qm.qq.com/q/ALly9zVZbq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#12B7F5] hover:bg-[#0EA1D9] text-white font-semibold transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 1024 1024" fill="currentColor">
                  <path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.4-1.1 19.4-46.3-14.5-155.8z"/>
                </svg>
                加入 QQ 群
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
