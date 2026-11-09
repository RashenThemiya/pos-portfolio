import { useLang } from '../../i18n/LangContext';
import { Copy } from '../shared/Copy';
import { Section } from '../shared/Section';

export function Why() {
  const { t: { why } } = useLang();
  return (
    <Section id="why" title={why.title} description={why.description}>
      <div className="why-head" aria-hidden="true">
        {why.columns.map((label, index) => <span key={index}><Copy value={label} /></span>)}
      </div>
      {why.items.map((item, index) => (
        <div className="pair" key={index}>
          <p className="before"><Copy value={item.before} /></p>
          <p className="after"><Copy value={item.after} /></p>
        </div>
      ))}
    </Section>
  );
}
