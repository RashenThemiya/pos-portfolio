import { useLang } from '../../i18n/LangContext';

export function Footer() {
  const { t } = useLang();
  return <footer className="foot"><div className="wrap">{t.footer.map(line => <span key={line}>{line}</span>)}</div></footer>;
}
