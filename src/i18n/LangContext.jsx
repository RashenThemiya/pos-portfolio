import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { en } from './en';
import { si } from './si';

export const LangContext = createContext(null);

function initialLanguage() {
  try {
    return localStorage.getItem('pos-lang') === 'si' ? 'si' : 'en';
  } catch {
    return 'en';
  }
}

export function LangProvider({ children }) {
  const [lang, updateLang] = useState(initialLanguage);
  const [languageRevision, setLanguageRevision] = useState(0);
  const setLang = useCallback(value => {
    updateLang(value === 'si' ? 'si' : 'en');
    setLanguageRevision(revision => revision + 1);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('pos-lang', lang);
    } catch {
      // Language switching remains available when storage is blocked.
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, languageRevision, setLang, t: lang === 'si' ? si : en }), [lang, languageRevision, setLang]);

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error('useLang requires LangProvider');
  return context;
}
