import { ArrowUp } from 'lucide-react';
import { brand, nav } from '@/lib/siteContent';
import { BrandLink } from './BrandMark';

export default function Footer() {
  return (
    <footer className="la-footer">
      <div className="la-shell">
        <div className="la-footer-main">
          <BrandLink />
          <nav aria-label="Links do rodapé">
            {nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            <a href="#agendar">Agendamento</a>
          </nav>
        </div>
        <div className="la-footer-bottom">
          <p>© {new Date().getFullYear()} {brand.name} · {brand.tagline}</p>
          <a href="#top">Voltar ao topo <ArrowUp size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
