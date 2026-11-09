import { Copy } from '../shared/Copy';
import { FeatureIcon } from './FeatureIcon';

export function FeatureCard({ id, title, items }) {
  return (
    <div className="grp">
      <div className="grp-h">
        <div className="ic"><FeatureIcon name={id} /></div>
        <h3><Copy value={title} /></h3>
      </div>
      <ul>{items.map((item, index) => <li key={index}><Copy value={item} /></li>)}</ul>
    </div>
  );
}
