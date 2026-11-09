import { useEffect, useState } from 'react';
import { navigationIds } from '../data/navigation';

export function useScrollSpy() {
  const [position, setPosition] = useState({ active: '', scrolled: false });
  useEffect(() => {
    function update() {
      const active = navigationIds.filter(id => document.getElementById(id)?.getBoundingClientRect().top < 140).at(-1) || '';
      const scrolled = window.scrollY > 20;
      setPosition(previous => previous.active === active && previous.scrolled === scrolled ? previous : { active, scrolled });
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return position;
}
