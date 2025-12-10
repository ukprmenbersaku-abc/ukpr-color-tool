
import React from 'react';
import ColorSwatch from './ColorSwatch';
import { Palette } from '../types';

type PaletteDisplayProps = Palette & {
  isMobileView: boolean;
  colorFormat?: 'hex' | 'rgb' | 'hsl';
};

const PaletteDisplay: React.FC<PaletteDisplayProps> = ({ name, description, colors, isMobileView, colorFormat = 'hex' }) => {
  const containerClasses = `bg-white dark:bg-slate-800/50 rounded-xl shadow-md overflow-hidden transition-all ${!isMobileView ? 'hover:shadow-xl hover:-translate-y-1' : ''} flex flex-col h-full`;
  
  return (
    <div className={containerClasses}>
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">{name}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <div className="flex flex-wrap flex-grow">
        {colors.map((color, index) => (
          <ColorSwatch key={`${color}-${index}`} color={color} format={colorFormat} />
        ))}
      </div>
    </div>
  );
};

export default PaletteDisplay;
