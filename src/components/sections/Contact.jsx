import { useLang } from '../../i18n/LangContext';
import { sectionPath } from '../../data/navigation';
import { Copy } from '../shared/Copy';
import { Section } from '../shared/Section';

export function Contact() {
  const { t: { contact } } = useLang();
  return (
    <Section id="contact">
      <div className="cta">
        <div>
          <h2><Copy value={contact.title} /></h2>
          <div className="contact">
            <span><Copy value={contact.websiteLabel} /></span> <b>{contact.website}</b>
            <span><Copy value={contact.phoneLabel} /></span> <b className="mono">{contact.phone}</b>
          </div>
        </div>
        <div className="contact-actions">
          <a className="btn btn-primary" href="https://pentarixlabs.com"><Copy value={contact.visit} /></a>
          <a className="btn btn-ghost" href={sectionPath('features')}><Copy value={contact.features} /></a>
        </div>
      </div>
    </Section>
  );
}
