import { useLang } from '../../i18n/LangContext';
import { Copy } from '../shared/Copy';
import { Section } from '../shared/Section';
import { PlanCard } from './PlanCard';

export function Plans() {
  const { t: { plans } } = useLang();
  return (
    <Section id="plans" band title={plans.title} description={plans.description}>
      <div className="plans">{plans.items.map(plan => <PlanCard key={plan.id} {...plan} />)}</div>
      <p className="pnote"><Copy value={plans.note} /></p>
    </Section>
  );
}
