import { useEffect } from 'react';
import { routeIds, sectionFromPath, sectionPath } from '../data/navigation';

const sections = new Set(routeIds);

function readRoute() {
  const legacySection = window.location.hash.slice(1);
  const candidate = sections.has(legacySection) ? legacySection : sectionFromPath(window.location.pathname);
  const section = sections.has(candidate) ? candidate : null;
  return { path: sectionPath(section), section };
}

function scrollToRoute(behavior = 'instant') {
  const { section } = readRoute();
  if (section) document.getElementById(section)?.scrollIntoView({ behavior, block: 'start' });
  else window.scrollTo({ top: 0, behavior });
}

export function useSectionRouting() {
  useEffect(() => {
    let cancelled = false;
    let frame;
    let navigationCount = 0;
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    function restoreRoute() {
      navigationCount += 1;
      const { path } = readRoute();
      if (window.location.pathname !== path || window.location.hash) {
        window.history.replaceState(window.history.state, '', path + window.location.search);
      }
      scrollToRoute();
    }

    function navigate(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[href]');
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href);
      const target = sectionFromPath(url.pathname);
      if (url.origin !== window.location.origin || url.hash || (target && !sections.has(target))) return;
      event.preventDefault();
      navigationCount += 1;
      if (window.location.pathname + window.location.search !== url.pathname + url.search) {
        window.history.pushState(null, '', url.pathname + url.search);
      }
      scrollToRoute(window.matchMedia('(prefers-reduced-motion:reduce)').matches ? 'instant' : 'smooth');
    }

    restoreRoute();
    const initialNavigation = navigationCount;
    // Initial web-font loading can move a directly linked section.
    document.fonts.ready.then(() => {
      frame = requestAnimationFrame(() => {
        if (!cancelled && navigationCount === initialNavigation) scrollToRoute();
      });
    });
    document.addEventListener('click', navigate);
    window.addEventListener('popstate', restoreRoute);
    window.addEventListener('hashchange', restoreRoute);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      document.removeEventListener('click', navigate);
      window.removeEventListener('popstate', restoreRoute);
      window.removeEventListener('hashchange', restoreRoute);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);
}
