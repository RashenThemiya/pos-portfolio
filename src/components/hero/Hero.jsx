import { useCallback, useState } from 'react';
import { useLang } from '../../i18n/LangContext';
import { INITIAL_BILLS } from '../../data/network';
import { sectionPath } from '../../data/navigation';
import { Copy } from '../shared/Copy';
import { NetworkScene } from './NetworkScene';

export function Hero({ sceneRef, onSceneDispose }) {
  const { t } = useLang();
  const [bills, setBills] = useState(INITIAL_BILLS);
  const onBill = useCallback(increment => setBills(previous => previous + increment), []);
  const copy = t.hero;

  return (
    <section className="hero" aria-label={copy.label}>
      <NetworkScene onBill={onBill} sceneRef={sceneRef} onDispose={onSceneDispose} />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-copy">
          <p className="eyebrow"><Copy value={copy.eyebrow} /></p>
          <h1><Copy value={copy.heading} /></h1>
          <p className="lede"><Copy value={copy.description} /></p>
          <div className="ctas">
            <a className="btn btn-primary" href={sectionPath('plans')}><Copy value={copy.demo} /></a>
            <a className="btn btn-ghost" href={sectionPath('screens')}><Copy value={copy.screens} /></a>
          </div>
          <div className="facts">{copy.facts.map((fact, index) => <span key={index}><Copy value={fact} /></span>)}</div>
        </div>
        <div className="netcard" aria-label={copy.networkLabel}>
          <span className="live"><Copy value={copy.live} /></span>
          <div className="net-stats">
            {copy.stats.map((stat, index) => (
              <div key={index}>
                <b id={index === 3 ? 'n-bills' : undefined}>{index === 3 ? bills.toLocaleString('en-US') : stat.value}</b>
                <small><Copy value={stat.label} /></small>
              </div>
            ))}
          </div>
          <div className="legend3d">
            {copy.legend.map(item => <span key={item.color} style={{ '--c': item.color }}><Copy value={item.label} /></span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
