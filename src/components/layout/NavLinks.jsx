import { navigationIds, sectionPath } from '../../data/navigation';
import { Copy } from '../shared/Copy';

export function NavLinks({ labels, active }) {
  return navigationIds.map((id, index) => (
    <a key={id} href={sectionPath(id)} className={active === id ? 'active' : undefined}><Copy value={labels[index]} /></a>
  ));
}
