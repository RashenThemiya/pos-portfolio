import { useRef, useState } from 'react';
import { screenIds } from '../../data/screens';
import { useLang } from '../../i18n/LangContext';
import { Section } from '../shared/Section';
import { ScreenPanel } from './ScreenPanel';
import { DashboardPane } from './DashboardPane';
import { CashPane } from './CashPane';
import { TablePane } from './TablePane';
import { TillDemo } from './TillDemo';

export function Screens() {
  const { t: { screens } } = useLang();
  const [activeTab, setActiveTab] = useState('till');
  const buttons = useRef([]);
  const caption = screens.captions[activeTab];

  function onTabKeyDown(event, index) {
    const destinations = { ArrowRight: (index + 1) % screenIds.length, ArrowLeft: (index + screenIds.length - 1) % screenIds.length, Home: 0, End: screenIds.length - 1 };
    const next = destinations[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActiveTab(screenIds[next]);
    buttons.current[next].focus();
  }

  return (
    <Section id="screens" band title={screens.title} description={screens.intro}>
      <div className="tabs" role="tablist" aria-label={screens.tablistLabel}>
        {screenIds.map((id, index) => (
          <button key={id} ref={node => { buttons.current[index] = node; }} className="tab" type="button" role="tab" id={'tab-' + id}
            aria-selected={activeTab === id} aria-controls={'p-' + id} tabIndex={activeTab === id ? 0 : -1}
            onClick={() => setActiveTab(id)} onKeyDown={event => onTabKeyDown(event, index)}>{screens.tabs[id]}</button>
        ))}
      </div>
      <div className="frame">
        <div className="bar"><i /><i /><i /><span id="url">{caption.url}</span></div>
        <ScreenPanel id="till" active={activeTab === 'till'}>{activeTab === 'till' && <TillDemo />}</ScreenPanel>
        <ScreenPanel id="dash" active={activeTab === 'dash'}><DashboardPane /></ScreenPanel>
        <ScreenPanel id="cash" active={activeTab === 'cash'}><CashPane /></ScreenPanel>
        <ScreenPanel id="promo" active={activeTab === 'promo'}><TablePane kind="promo" /></ScreenPanel>
        <ScreenPanel id="stock" active={activeTab === 'stock'}><TablePane kind="stock" /></ScreenPanel>
      </div>
      <div className="caption"><h3 id="ctitle">{caption.title}</h3><p id="ctext">{caption.description}</p></div>
    </Section>
  );
}
