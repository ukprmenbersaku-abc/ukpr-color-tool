
import React from 'react';
import ColorSwatch from './ColorSwatch';
import { Palette } from '../types';

interface ShadesTintsDisplayProps {
  shades: Palette;
  tints: Palette;
  isMobileView: boolean;
}

const ShadesTintsDisplay: React.FC<ShadesTintsDisplayProps> = ({ shades, tints, isMobileView }) => {
  const containerClasses = `bg-white dark:bg-slate-800/50 rounded-xl shadow-md overflow-hidden ${!isMobileView ? 'transition-all hover:shadow-xl hover:-translate-y-1' : ''} flex flex-col h-full`;
  
  return (
    <div className={containerClasses}>
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">シェード & ティント</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">ベースの色に黒（シェード）と白（ティント）を混ぜたバリエーションです。</p>
      </div>
      <div className="flex flex-grow">
        <div className="w-1/2 flex flex-col">
          {shades.colors.map((color, index) => (
            <ColorSwatch key={`shade-${color}-${index}`} color={color} />
          ))}
        </div>
        <div className="w-1/2 flex flex-col">
          {tints.colors.map((color, index) => (
            <ColorSwatch key={`tint-${color}-${index}`} color={color} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShadesTintsDisplay;
