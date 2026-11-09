import { useLang } from '../../i18n/LangContext';
import { DataTable } from './DataTable';
import { ScreenBox } from './ScreenBox';

export function CashPane() {
  const { t: { screens: { cash } } } = useLang();
  const rows = [...cash.rows, [<b key="label">{cash.totalLabel}</b>, null, <b key="total">{cash.total}</b>]];
  return (
    <div className="two">
      <ScreenBox title={cash.title}><DataTable headers={cash.headers} rows={rows} columnClasses={['', 'n', 'n']} /></ScreenBox>
      <ScreenBox title={cash.summaryTitle}>
        {cash.summary.map(([label, value], index) => (
          <div className="row" key={index}>
            {index === cash.summary.length - 1
              ? <><b>{label}</b><span className="chip warn">{value}</span></>
              : <><span className={index < 5 ? 'k' : undefined}>{label}</span><span className="mono">{value}</span></>}
          </div>
        ))}
      </ScreenBox>
    </div>
  );
}
