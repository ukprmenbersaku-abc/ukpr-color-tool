
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Palette } from './types';
import { generatePalettes, isValidHex, getColorByName } from './utils/color';
import ColorInput from './components/ColorInput';
import PaletteDisplay from './components/PaletteDisplay';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const [baseColor, setBaseColor] = useState<string>('#3b82f6');
  const [inputValue, setInputValue] = useState<string>('#3b82f6');
  const [palettes, setPalettes] = useState<Palette[]>([]);
  
  // Initialize viewMode based on window width automatically
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 'mobile' : 'desktop';
    }
    return 'desktop';
  });

  // --- Theme Management ---
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return (saved as 'light' | 'dark' | 'system') || 'system';
    }
    return 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // --- Color Format Management ---
  const [colorFormat, setColorFormat] = useState<'hex' | 'rgb' | 'hsl'>(() => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('colorFormat');
        return (saved as 'hex' | 'rgb' | 'hsl') || 'hex';
      }
      return 'hex';
  });

  useEffect(() => {
      localStorage.setItem('colorFormat', colorFormat);
  }, [colorFormat]);


  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isValidHex(baseColor)) {
      const generated = generatePalettes(baseColor);
      // Define the desired order of palettes
      const desiredOrder = [
        '補色 (Complementary)',
        '類似色 (Analogous)',
        'トライアド (Triadic)',
        'テトラード (Tetradic)',
        'シェード (Shades)',
        'ティント (Tints)',
      ];
      // Sort the palettes based on the desired order
      const sortedPalettes = generated.sort((a, b) => {
        return desiredOrder.indexOf(a.name) - desiredOrder.indexOf(b.name);
      });
      setPalettes(sortedPalettes);
    }
  }, [baseColor]);

  const handleColorChange = useCallback((text: string) => {
    setInputValue(text);
    if (isValidHex(text)) {
      setBaseColor(text);
    } else {
      const colorFromName = getColorByName(text);
      if (colorFromName) {
        setBaseColor(colorFromName);
      }
    }
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.clientWidth;
      const newSlide = Math.round(scrollLeft / slideWidth);
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide);
      }
    }
  }, [currentSlide]);
  
  // Debounce scroll event
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (viewMode === 'mobile' && container) {
      let timeoutId: number;
      const debouncedScrollHandler = () => {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(handleScroll, 100);
      };
      container.addEventListener('scroll', debouncedScrollHandler, { passive: true });
      return () => container.removeEventListener('scroll', debouncedScrollHandler);
    }
  }, [viewMode, handleScroll]);

  const handleDotClick = (index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const slideWidth = container.clientWidth;
      container.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 p-4 sm:p-6 lg:p-8 overflow-x-hidden transition-colors duration-300">
      <main className="max-w-7xl mx-auto relative">
        {/* Header Actions */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            aria-label="設定を開く"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            カラーパレットジェネレーター
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            HEXコードまたは簡単な色の名前（例：「赤」, 「blue」）を入力して配色を作成します。
          </p>
        </header>

        <ColorInput value={inputValue} onChange={handleColorChange} />
        
        {viewMode === 'desktop' ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {palettes.map((p) => (
              <PaletteDisplay 
                key={p.name} 
                name={p.name} 
                description={p.description} 
                colors={p.colors} 
                isMobileView={false}
                colorFormat={colorFormat}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4"
              style={{ paddingBottom: '1rem' }}
            >
              {palettes.map((p, index) => (
                <div key={index} className="flex-shrink-0 w-full snap-center px-2">
                   <PaletteDisplay 
                      name={p.name} 
                      description={p.description} 
                      colors={p.colors} 
                      isMobileView={true}
                      colorFormat={colorFormat}
                    />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center space-x-2 mt-4">
              {palettes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  aria-label={`パレット ${index + 1}へ移動`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                    currentSlide === index ? 'bg-blue-500 scale-125' : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        
        <footer className="text-center mt-16 text-slate-500 dark:text-slate-400 text-sm">
          <p className="mb-2">
            カラーパレットジェネレーターを利用する際は、
            <a 
              href="https://ukpr-riyoukiyaku.pages.dev/#/tos/general" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 dark:text-blue-400 hover:underline mx-1"
            >
              UKPR共通利用規約
            </a>
            、
            <a 
              href="https://ukpr-riyoukiyaku.pages.dev/#/tos/color-palette" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 dark:text-blue-400 hover:underline mx-1"
            >
              カラーパレットジェネレーター利用規約
            </a>
            に同意したこととみなします。
          </p>
          <p>&copy; 2024 Google AI Studio</p>
        </footer>

        {/* Settings Modal */}
        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
          viewMode={viewMode}
          setViewMode={setViewMode}
          theme={theme}
          setTheme={setTheme}
          colorFormat={colorFormat}
          setColorFormat={setColorFormat}
        />
      </main>
    </div>
  );
};

export default App;
