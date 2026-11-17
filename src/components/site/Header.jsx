import { useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { nav } from '@/lib/siteContent';
import { BrandLink } from './BrandMark';

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuToggle = useRef(null);

  function handleKeys(event) {
    if (open && event.key === 'Escape') {
      setOpen(false);
      menuToggle.current?.focus();
    }
  }

  return (
    <header className="la-header" onKeyDown={handleKeys}>
      <div className="la-shell la-header-row">
        <BrandLink />
        <nav aria-label="Navegação principal" className="la-main-nav">
          {nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="la-header-actions">
          <a href="#agendar" className="la-button la-button--primary la-header-book" onClick={() => setOpen(false)}>
            Agendar
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <button
            ref={menuToggle}
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="la-mobile-navigation"
            className="la-menu-toggle"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="la-mobile-navigation" aria-label="Navegação no celular" className="la-mobile-nav" hidden={!open}>
        <div className="la-shell">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a href="#agendar" onClick={() => setOpen(false)}>Consultar horários <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </nav>
    </header>
  );
}
