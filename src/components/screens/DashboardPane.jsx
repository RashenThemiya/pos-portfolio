import { useLang } from '../../i18n/LangContext';
import { paymentMix, weeklySales } from '../../data/screens';
import { ScreenBox } from './ScreenBox';

export function DashboardPane() {
  const { t: { screens: { dashboard } } } = useLang();
  return (
    <>
      <div className="kpis">
        {dashboard.kpis.map((item, index) => (
          <div className="kpi" key={index}><small>{item.label}</small><b>{item.value}</b><em style={index === 3 ? { color: '#ffb23e' } : undefined}>{item.note}</em></div>
        ))}
      </div>
      <div className="two">
        <ScreenBox title={dashboard.salesTitle}>
          <div className="bars">{weeklySales.map((height, index) => <div key={index} className={index === weeklySales.length - 1 ? 'last' : undefined} style={{ height: height + '%' }} />)}</div>
          <div className="blabels">{dashboard.days.map(day => <span key={day}>{day}</span>)}</div>
        </ScreenBox>
        <ScreenBox title={dashboard.paymentTitle}>
          <div className="mix">{paymentMix.map(item => <div key={item.color} style={{ width: item.share + '%', background: item.color }} />)}</div>
          <div className="legend">{dashboard.payments.map((item, index) => (
            <div key={index}><span style={{ '--c': paymentMix[index].color }}>{item.label}</span><span className="mono">{item.value}</span></div>
          ))}</div>
        </ScreenBox>
      </div>
    </>
  );
}
