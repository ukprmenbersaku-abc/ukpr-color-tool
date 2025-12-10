
import React, { useState } from 'react';
import { getContrastYIQ } from '../utils/color';

interface ColorSwatchProps {
  color: string;
}

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


const ColorSwatch: React.FC<ColorSwatchProps> = ({ color }) => {
  const [copied, setCopied] = useState(false);
  const textColor = getContrastYIQ(color) > 128 ? 'text-slate-800' : 'text-white';

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative flex-grow min-h-20 sm:min-h-24 flex items-end justify-start p-2 group cursor-pointer"
      style={{ backgroundColor: color }}
      onClick={handleCopy}
    >
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className={`relative font-mono text-sm tracking-wide transition-all duration-300 ${textColor}`}>
        <div className={`absolute -top-6 -right-2 transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-xs bg-slate-900/80 text-white px-2 py-1 rounded-md">コピーしました！</span>
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
            {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
            <span>{color}</span>
        </div>
        <div className="absolute inset-0 flex items-end justify-start p-2 opacity-100 group-hover:opacity-0">
             <span>{color}</span>
        </div>
      </div>
    </div>
  );
};

export default ColorSwatch;
