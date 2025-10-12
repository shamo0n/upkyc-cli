import React, {useState, useEffect, useContext} from 'react';
import App from './components/Routes';
import en from './Theme/languages/en.json';
import zh from './Theme/languages/zh.json';
import {RNLocalize} from './Libraries';

type LanguageContextType = {
  AppName: string;
};

const LanguageContext = React.createContext<LanguageContextType>(
  {} as LanguageContextType,
);

const languageObj = {
  en: en,
  'zh-Hans-US': zh,
};

export const LanguageContextProvider: React.FC = ({children}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const currentLanguage = RNLocalize.findBestAvailableLanguage(
      Object.keys(languageObj),
    );

    setSelectedLanguage(currentLanguage?.languageTag || 'en');
  }, []);

  const value = {
    ...languageObj[selectedLanguage as 'en' | 'zh-Hans-US'],
  };
  return (
    <LanguageContext.Provider value={value}>
      <App />
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);