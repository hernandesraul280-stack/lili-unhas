import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/siteContent';

export default function Services({ onSelect }) {
  return (
    <section id="servicos" className="la-section la-services" aria-labelledby="la-services-title">
      <div className="la-shell">
        <div className="la-section-heading">
          <div>
            <p className="la-kicker">Serviços</p>
            <h2 id="la-services-title">Cuidado para mãos e pés</h2>
          </div>
          <p>Escolha o serviço que você procura para consultar valores e horários.</p>
        </div>
        <div className="la-service-grid">
          {services.map((service, index) => (
            <article key={service.id} className="la-service-card">
              <div className="la-service-card-head">
                <span className="la-service-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="la-card-label">{service.label}</span>
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <a
                href="#agendar"
                onClick={() => onSelect({ service: service.name })}
                aria-label={`Consultar horários para ${service.name}`}
                className="la-service-link"
              >
                Consultar horários
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
