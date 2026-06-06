import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Announcements from './components/Announcements';
import Features from './components/Features';
import Games from './components/Games';
import Injectors from './components/Injectors';
import Scripts from './components/Scripts';
import GetKey from './components/GetKey';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Team from './components/Team';
import CookieConsent from './components/CookieConsent';

type Page = 'home' | 'version' | 'games' | 'scripts' | 'getkey' | 'team';

const hashToPage: Record<string, Page> = {
  '#/version': 'version',
  '#/games': 'games',
  '#/scripts': 'scripts',
  '#/getkey': 'getkey',
};

const pageToHash: Record<Page, string> = {
  home: '',
  version: '#/version',
  games: '#/games',
  scripts: '#/scripts',
  getkey: '#/getkey',
  team: '#/team', 
};

function getPageFromHash(): Page {
  return hashToPage[window.location.hash] || 'home';
}

export default function App() {
  const [page, setPage] = useState<Page>(getPageFromHash);

  const navigate = (p: Page) => {
    setPage(p);
    window.location.hash = pageToHash[p];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#050510] text-slate-200 antialiased">
      <Navbar navigate={navigate} currentPage={page} />

      {page === 'home' && (
        <>
          <Hero navigate={navigate} />
          <Team />
          <Announcements />
          <Features />
          <FAQ />
        </>
      )}

      {page === 'games' && (
        <SubPage navigate={navigate}>
          <Games />
        </SubPage>
      )}

      {page === 'scripts' && (
        <SubPage navigate={navigate}>
          <Scripts />
        </SubPage>
      )}

      {page === 'version' && (
        <SubPage navigate={navigate}>
          <Injectors />
        </SubPage>
      )}

      {page === 'getkey' && (
        <SubPage navigate={navigate}>
          <GetKey />
        </SubPage>
      )}

      {page === 'team' && (
        <SubPage navigate={navigate}>
          <Team />
        </SubPage>
      )}

      <Footer navigate={navigate} />
      <CookieConsent />
    </div>
  );
}

function SubPage({
  navigate,
  children,
}: {
  navigate: (p: Page) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-400 transition-colors group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </button>
      </div>
      {children}
    </div>
  );
}
