import { BrandMark } from '../shared/BrandMark';
import { Fragment, useLayoutEffect, useRef } from 'react';
import { en } from '../../i18n/en';
import { si } from '../../i18n/si';
import { Copy } from '../shared/Copy';

export function AdCreative({ language, active, revision }) {
  const ref = useRef(null);
  const copy = language === 'si' ? si.ad : en.ad;

  useLayoutEffect(() => {
    const ad = ref.current;
    ad.classList.remove('play');
    if (active) {
      // Flush the previous animation before replaying even the same language.
      void ad.offsetWidth;
      ad.classList.add('play');
    }
  }, [active, revision]);

  return (
    <div ref={ref} className={`ad ad-${language}${active ? ' on' : ''}`} lang={language} aria-hidden={!active}>
      <div className="ad-head"><Copy value={copy.heading} /></div>
      <div className="ad-sub"><Copy value={copy.subheading} /></div>
      <div className="ad-grid">
        <div className="ad-col ad-colq">{copy.problemLabel}</div><div /><div className="ad-col ad-cola">{copy.solutionLabel}</div>
        {copy.rows.map((row, index) => (
          <Fragment key={index}>
            <div className="ad-q" style={{ '--i': index }}><i>{copy.questionIcon}</i><span>{row.question}</span></div>
            <div className="ad-arr" aria-hidden="true" style={{ '--i': index }}>{copy.arrow}</div>
            <div className="ad-a" style={{ '--i': index }}><i>{copy.answerIcon}</i><span>{row.answer}</span></div>
          </Fragment>
        ))}
      </div>
      <div className="ad-close"><Copy value={copy.close} /></div>
      <div className="ad-foot">
        <span><Copy value={copy.website} /></span>
        <span className="ad-logo">
          <BrandMark />
          <span><small>{copy.brand.small}</small><strong>{copy.brand.strong}</strong><em>{copy.brand.em}</em></span>
        </span>
        <span><Copy value={copy.phone} /></span>
      </div>
    </div>
  );
}
