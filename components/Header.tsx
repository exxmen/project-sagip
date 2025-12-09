import React from 'react';
import { BookOpen, Globe } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  disabled: boolean;
}

const Header: React.FC<HeaderProps> = ({ selectedLanguage, onLanguageChange, disabled }) => {
  return (
    <header className="bg-deped-blue text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo / Brand */}
        <div className="flex items-center space-x-2">
          <div className="bg-white p-1.5 rounded-full text-deped-blue">
            <BookOpen size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Sagip</h1>
            <p className="text-xs text-blue-200 hidden sm:block">Remediation Assistant for Teachers</p>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="flex items-center space-x-2 bg-deped-dark bg-opacity-30 p-1 rounded-lg">
          <Globe size={16} className="ml-2 text-blue-200" />
          <select 
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            disabled={disabled}
            className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer text-white p-1 pr-2"
          >
            {Object.values(Language).map((lang) => (
              <option key={lang} value={lang} className="text-gray-900">
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;