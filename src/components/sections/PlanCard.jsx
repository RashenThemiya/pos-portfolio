import { Copy } from '../shared/Copy';
import { PHONE_HREF } from '../../data/contact';

export function PlanCard({ tag, title, description, fit, features, cta }) {
  return (
    <article className={tag ? 'plan pop' : 'plan'}>
      {tag && <span className="tag"><Copy value={tag} /></span>}
      <h3><Copy value={title} /></h3>
      <p className="pdesc"><Copy value={description} /></p>
      <p className="pfit"><Copy value={fit} /></p>
      <ul>{features.map((item, index) => <li key={index}><Copy value={item} /></li>)}</ul>
      <a className={tag ? 'btn btn-primary' : 'btn btn-ghost'} href={PHONE_HREF}><Copy value={cta} /></a>
    </article>
  );
}
