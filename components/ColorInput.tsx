import React, { useRef, ChangeEvent } from 'react';
import { isValidHex, getColorByName } from '../utils/color';

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ value, onChange }) => {
  const colorPickerRef = useRef<HTMLInputElement>(null);
  
  // Try to find a color from name first for the swatch
  let displayColor = value;
  if (!isValidHex(value)) {
    const colorFromName = getColorByName(value);
    if (colorFromName) {
      displayColor = colorFromName;
    }
  }
  const isDisplayColorValid = isValidHex(displayColor);


  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleColorPickerClick = () => {
    colorPickerRef.current?.click();
  };
  
  const handleColorPickerChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="relative flex items-center w-full bg-white dark:bg-slate-800 rounded-full shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-900 transition-shadow">
        <div
          onClick={handleColorPickerClick}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full m-1 border-4 border-slate-200 dark:border-slate-700 transition-transform hover:scale-105 cursor-pointer"
          style={{ backgroundColor: isDisplayColorValid ? displayColor : '#ffffff' }}
        />
        <input
          type="color"
          ref={colorPickerRef}
          value={isDisplayColorValid ? displayColor : '#ffffff'}
          onChange={handleColorPickerChange}
          className="absolute opacity-0 w-0 h-0"
        />
        <input
          type="text"
          value={value}
          onChange={handleTextChange}
          className="w-full pl-4 pr-16 py-4 bg-transparent text-lg md:text-xl font-mono focus:outline-none"
          placeholder="HEXコードまたは色名..."
        />
      </div>
    </div>
  );
};

export default ColorInput;