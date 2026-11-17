import { ArrowUpRight } from 'lucide-react';
import { brand } from '@/lib/siteContent';
import { Sparkle } from './BrandMark';

export default function Atelier() {
  return (
    <section id="atelier" className="la-section la-about" aria-labelledby="la-about-title">
      <div className="la-shell la-about-layout">
        <div className="la-about-art">
          <Sparkle className="la-about-spark la-about-spark--one" />
          <Sparkle className="la-about-spark la-about-spark--two" />
          <div className="la-about-logo">
            <img src={brand.logo} alt="Logo de Liliane Andrade" width={500} height={500} loading="lazy" />
          </div>
        </div>
        <div className="la-about-copy">
          <p className="la-kicker la-kicker--line">Sobre a Liliane</p>
          <h2 id="la-about-title">Oi, eu sou a Liliane.</h2>
          <p>Trabalho com manicure, pedicure e nail art. No meu portfólio, você encontra desde esmaltações em tons discretos até francesinhas coloridas e decorações com pedraria.</p>
          <p>Para o próximo atendimento, você pode me mostrar uma foto ou escolher uma ideia aqui na vitrine. A gente conversa sobre a cor, o formato e os detalhes que você quer.</p>
          <a href="#agendar" className="la-text-link">Consultar horários <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
