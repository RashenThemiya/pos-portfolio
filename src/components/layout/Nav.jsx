import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../i18n/LangContext';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { BrandMark } from '../shared/BrandMark';
import { Copy } from '../shared/Copy';
import { LanguageSwitch } from './LanguageSwitch';
import { NavLinks } from './NavLinks';

export function Nav() {
  const { t: { nav } } = useLang();
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const { active, scrolled } = useScrollSpy();

  useEffect(() => {
    const mobileViewport = window.matchMedia('(max-width:880px)');
    function closeOnDesktop() {
      if (!mobileViewport.matches) setOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key !== 'Escape') return;
      if (menuButton.current?.getAttribute('aria-expanded') === 'true') menuButton.current.focus();
      setOpen(false);
    }
    document.addEventListener('keydown', closeOnEscape);
    mobileViewport.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      mobileViewport.removeEventListener('change', closeOnDesktop);
    };
  }, []);

  return (
    <header className={scrolled ? 'nav scrolled' : 'nav'} id="nav">
      <div className="wrap">
        <div className="nav-inner">
          <a className="logo" href="/"><BrandMark width="34" height="30" /><span><small>{nav.brand.name}</small><b>{nav.brand.product}</b></span></a>
          <nav className="nav-links" aria-label={nav.label}><NavLinks labels={nav.links} active={active} /></nav>
          <div className="nav-right">
            <LanguageSwitch />
            <a className="btn btn-primary nav-cta" href="/plans"><Copy value={nav.demo} /></a>
            <button ref={menuButton} className="menu-btn" id="menu-btn" aria-label={open ? nav.closeMenu : nav.openMenu}
              aria-expanded={open} onClick={() => setOpen(previous => !previous)} aria-controls="mobile-menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path id="menu-ic" d={open ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'} />
              </svg>
            </button>
          </div>
        </div>
        <nav className="mobile-menu" id="mobile-menu" aria-label={nav.mobileLabel} hidden={!open}
          onClick={event => { if (event.target.closest('a')) setOpen(false); }}>
          <NavLinks labels={nav.links} />
          <a className="btn btn-primary" href="/plans"><Copy value={nav.demo} /></a>
        </nav>
      </div>
    </header>
  );
}
