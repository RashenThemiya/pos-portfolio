import { navigationIds } from '../../data/navigation';
import { Copy } from '../shared/Copy';

export function NavLinks({ labels, active }) {
  return navigationIds.map((id, index) => (
    <a key={id} href={'/' + id} className={active === id ? 'active' : undefined}><Copy value={labels[index]} /></a>
  ));
}
