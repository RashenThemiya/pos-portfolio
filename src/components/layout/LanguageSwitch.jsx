import { useLang } from '../../i18n/LangContext';

export function LanguageSwitch() {
  const { lang, setLang, t: { nav } } = useLang();
  return (
    <div className="lang" role="group" aria-label={nav.languageLabel}>
      {Object.entries(nav.languages).map(([language, label]) => (
        <button key={language} type="button" lang={language} aria-pressed={lang === language} onClick={() => setLang(language)}>{label}</button>
      ))}
    </div>
  );
}
