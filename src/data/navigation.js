export const navigationIds = ['why', 'flow', 'features', 'screens', 'plans'];
export const routeIds = [...navigationIds, 'contact'];

const base = import.meta.env.BASE_URL;
const root = base.replace(/\/$/, '');

export const sectionPath = id => (id ? base + id : base);

export function sectionFromPath(pathname) {
  const relative = pathname.startsWith(root) ? pathname.slice(root.length) : pathname;
  return relative.replace(/^\/|\/$/g, '');
}
