import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export const AD_DURATION = 10000;

export function useAdRotation(siteLanguage, languageRevision, inView, reducedMotion) {
  const [selection, setSelection] = useState({ language: siteLanguage, revision: 0 });
  const clock = useRef({ remaining: AD_DURATION });

  const selectAd = useCallback(language => {
    clock.current = { remaining: AD_DURATION };
    setSelection(previous => ({ language, revision: previous.revision + 1 }));
  }, []);

  useLayoutEffect(() => {
    selectAd(siteLanguage);
  }, [siteLanguage, languageRevision, selectAd]);

  useEffect(() => {
    if (reducedMotion) {
      clock.current = { remaining: AD_DURATION };
      return;
    }
    if (!inView) return;

    const current = clock.current;
    const delay = current.remaining;
    const startedAt = performance.now();
    const timeout = setTimeout(() => {
      clock.current = { remaining: AD_DURATION };
      setSelection(previous => ({
        language: previous.language === 'si' ? 'en' : 'si',
        revision: previous.revision + 1,
      }));
    }, delay);

    return () => {
      clearTimeout(timeout);
      current.remaining = Math.max(0, delay - (performance.now() - startedAt));
    };
  }, [inView, reducedMotion, selection.revision]);

  return { ...selection, selectAd };
}
