import { useLayoutEffect, useRef } from 'react';
import { useLang } from '../../i18n/LangContext';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { AD_DURATION, useAdRotation } from '../../hooks/useAdRotation';
import { AdCreative } from './AdCreative';

const languages = ['si', 'en'];

export function AdBanner() {
  const { lang, languageRevision, t } = useLang();
  const ref = useRef(null);
  const buttons = useRef([]);
  const inView = useInView(ref);
  const reducedMotion = useReducedMotion();
  const { language, revision, selectAd } = useAdRotation(lang, languageRevision, inView, reducedMotion);

  useLayoutEffect(() => {
    buttons.current.forEach(button => button.setAttribute('aria-pressed', 'false'));
    const active = buttons.current[languages.indexOf(language)];
    void active.offsetWidth;
    active.setAttribute('aria-pressed', 'true');
  }, [language, revision]);

  return (
    <section ref={ref} id="promo" className={inView ? undefined : 'ad-paused'}>
      <div className="wrap">
        <div className="ad-wrap">
          {languages.map(value => (
            <AdCreative key={value} language={value} active={value === language} revision={revision} />
          ))}
        </div>
        <div className="ad-dots" role="group" aria-label={t.adControls.label}>
          {languages.map((value, index) => (
            <button key={value} ref={node => { buttons.current[index] = node; }} type="button"
              data-ad={value} lang={value} aria-pressed={value === language}
              style={{ '--dur': `${AD_DURATION}ms` }} onClick={() => selectAd(value)}>
              {t.adControls[value]}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

