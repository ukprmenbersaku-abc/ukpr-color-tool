import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Palette } from './types';
import { generatePalettes, isValidHex, getColorByName } from './utils/color';
import ColorInput from './components/ColorInput';
import PaletteDisplay from './components/PaletteDisplay';

const App: React.FC = () => {
  const [baseColor, setBaseColor] = useState<string>('#3b82f6');
  const [inputValue, setInputValue] = useState<string>('#3b82f6');
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
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
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
      <main className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-sm text-slate-500 dark:text-slate-400">表示切替:</span>
            <div className="flex p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
              <button
                  onClick={() => setViewMode('desktop')}
                  className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
                    viewMode === 'desktop'
                      ? 'bg-white text-blue-600 shadow'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-600/50'
                  }`}
                  aria-pressed={viewMode === 'desktop'}
                >
                  PC
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
                    viewMode === 'mobile'
                      ? 'bg-white text-blue-600 shadow'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-600/50'
                  }`}
                  aria-pressed={viewMode === 'mobile'}
                >
                  モバイル
                </button>
            </div>
          </div>
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
      </main>
    </div>
  );
};

export default App;