import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { brand, portfolio } from '@/lib/siteContent';
import { Sparkle } from './BrandMark';

const featured = portfolio.find((item) => item.id === 'rubi-strass');
const rose = portfolio.find((item) => item.id === 'rosa-suave');

export default function Hero() {
  return (
    <section className="la-hero" aria-labelledby="la-hero-title">
      <div className="la-shell la-hero-layout">
        <div className="la-hero-copy">
          <p className="la-kicker la-hero-kicker">
            <Sparkle />
            Manicure · Pedicure · Nail art
          </p>
          <h1 id="la-hero-title">
            Unhas com<br /><em>o seu estilo.</em>
          </h1>
          <p className="la-hero-description">
            Das esmaltações clássicas aos detalhes com pedraria, conheça o trabalho de {brand.name} e escolha uma ideia para o seu próximo atendimento.
          </p>
          <div className="la-hero-actions">
            <a href="#agendar" className="la-button la-button--primary">
              Consultar horários <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <a href="#portfolio" className="la-text-link">
              Ver portfólio <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="la-hero-art">
          <div className="la-hero-trace" aria-hidden="true" />
          <Sparkle className="la-hero-spark la-hero-spark--one" />
          <Sparkle className="la-hero-spark la-hero-spark--two" />
          <figure className="la-hero-photo">
            <img
              src={featured.src}
              alt={featured.note}
              width={1216}
              height={1312}
              fetchPriority="high"
            />
            <figcaption>
              <Sparkle />
              <span>{featured.title}</span>
            </figcaption>
          </figure>
          <div className="la-hero-inset" aria-hidden="true">
            <img src={rose.src} alt="" width={1440} height={1920} decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}
