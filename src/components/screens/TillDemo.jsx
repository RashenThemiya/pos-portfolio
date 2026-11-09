import { useRef } from 'react';
import { tillItems } from '../../data/till';
import { useLang } from '../../i18n/LangContext';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTillSequence } from '../../hooks/useTillSequence';

const formatMoney = value => value.toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function TillDemo() {
  const { t: { till } } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref);
  const reducedMotion = useReducedMotion();
  const frame = useTillSequence(inView, reducedMotion);
  const items = tillItems.slice(0, frame.count);
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const discount = items.reduce((sum, item) => sum + (item.promotion?.amount ?? 0), 0);
  const code = frame.scanning ? items[items.length - 1]?.code : '';

  return (
    <div ref={ref} className={`till${inView ? '' : ' till-paused'}`} aria-label={till.label}>
      <div className="till-bar">
        <span><b>{till.counter}</b>{till.branchCashier}</span>
        <span className="live">{till.session}</span>
      </div>
      <div className="scan">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 6v12M8 6v12M11 6v12M15 6v12M18 6v12M21 6v12" />
        </svg>
        <span>{till.scan}</span>
        <span className="code mono">{code}</span>
        <div key={`${frame.cycle}-${frame.count}`} className={`beam${frame.scanning ? ' go' : ''}`} />
      </div>
      <ul className="lines">
        {items.map(item => (
          <li key={`${frame.cycle}-${item.code}`} className={reducedMotion ? undefined : 'in'}>
            <span className="nm">{till.items[item.id].name}</span>
            <span className="amt mono">{formatMoney(item.amount)}</span>
            <span className="sub mono">{till.items[item.id].sub}</span>
            {item.promotion && (
              <span className="promo">
                <span>{till.promoPrefix}{till.items[item.id].promotion}</span>
                <span className="mono">{formatMoney(item.promotion.amount)}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="tot">
        <span>{till.subtotal}</span><span className="mono">{formatMoney(subtotal)}</span>
        <span>{till.promotions}</span><span className="mono" style={{ color: 'var(--d-ok)' }}>{formatMoney(discount)}</span>
        <span className="big">{till.total}</span><span className="big mono">{formatMoney(subtotal + discount)}</span>
      </div>
      <div className="pays">
        {till.payments.map((payment, index) => (
          <span key={payment} className={frame.payment && index < 2 ? 'on' : undefined}>{payment}</span>
        ))}
      </div>
      <div className={`paid${frame.paid ? '' : ' off'}`}>
        <span>{till.paid}</span><span className="mono">{till.invoice}</span>
      </div>
    </div>
  );
}
