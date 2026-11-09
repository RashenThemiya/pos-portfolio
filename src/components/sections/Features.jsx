import { useLang } from '../../i18n/LangContext';
import { Copy } from '../shared/Copy';
import { Section } from '../shared/Section';
import { FeatureCard } from './FeatureCard';

export function Features() {
  const { t: { features } } = useLang();
  return (
    <Section id="features" title={features.title} description={features.description}>
      <div className="groups">
        {Object.entries(features.groups).map(([id, group]) => <FeatureCard key={id} id={id} {...group} />)}
      </div>
      <div className="paystrip">
        <strong><Copy value={features.paymentLabel} /></strong>
        {features.payments.map(payment => <span key={payment}>{payment}</span>)}
      </div>
    </Section>
  );
}
