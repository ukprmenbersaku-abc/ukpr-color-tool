
import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  viewMode: 'desktop' | 'mobile';
  setViewMode: (mode: 'desktop' | 'mobile') => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  colorFormat: 'hex' | 'rgb' | 'hsl';
  setColorFormat: (format: 'hex' | 'rgb' | 'hsl') => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  viewMode, 
  setViewMode,
  theme,
  setTheme,
  colorFormat,
  setColorFormat
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">設定</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label="閉じる"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          
          {/* Theme Setting */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              テーマ
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center justify-center px-2 py-3 rounded-xl border-2 transition-all duration-200 ${
                  theme === 'light'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-xs font-semibold">ライト</span>
              </button>
              
              <button
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center justify-center px-2 py-3 rounded-xl border-2 transition-all duration-200 ${
                  theme === 'dark'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span className="text-xs font-semibold">ダーク</span>
              </button>

              <button
                onClick={() => setTheme('system')}
                className={`flex flex-col items-center justify-center px-2 py-3 rounded-xl border-2 transition-all duration-200 ${
                  theme === 'system'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-semibold">システム</span>
              </button>
            </div>
          </div>

          {/* View Mode Setting */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              表示レイアウト
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setViewMode('desktop')}
                className={`flex items-center justify-center px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                  viewMode === 'desktop'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span className="font-semibold">PC表示</span>
              </button>
              
              <button
                onClick={() => setViewMode('mobile')}
                className={`flex items-center justify-center px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                  viewMode === 'mobile'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold">モバイル表示</span>
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
              ※ デフォルトは画面サイズに合わせて自動判定されます。
            </p>
          </div>

           {/* Color Format Setting */}
           <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              カラーコード形式
            </label>
            <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
               <button
                onClick={() => setColorFormat('hex')}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  colorFormat === 'hex'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                HEX (#123456)
              </button>
              <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
              <button
                onClick={() => setColorFormat('rgb')}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  colorFormat === 'rgb'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                RGB (18, 52, 86)
              </button>
               <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
               <button
                onClick={() => setColorFormat('hsl')}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${
                  colorFormat === 'hsl'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                HSL
              </button>
            </div>
             <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
              コピーおよび表示されるカラーコードの形式を選択できます。
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 text-right sticky bottom-0 z-10">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
          >
            完了
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
