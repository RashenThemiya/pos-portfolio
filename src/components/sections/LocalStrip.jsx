import { useLang } from '../../i18n/LangContext';
import { Copy } from '../shared/Copy';
import { Section } from '../shared/Section';

export function LocalStrip() {
  const { t: { local } } = useLang();
  return (
    <Section title={local.title}>
      <div className="local">
        {local.items.map((item, index) => (
          <div key={index}><b><Copy value={item.title} /></b><p><Copy value={item.description} /></p></div>
        ))}
      </div>
    </Section>
  );
}
