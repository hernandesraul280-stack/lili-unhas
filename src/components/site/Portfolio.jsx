import { useRef, useState } from 'react';
import { ArrowUpRight, Maximize2, Play } from 'lucide-react';
import { portfolio, portfolioFilters } from '@/lib/siteContent';
import PortfolioLightbox from './PortfolioLightbox';

export default function Portfolio({ onSelect }) {
  const [filter, setFilter] = useState('Todos');
  const [active, setActive] = useState(-1);
  const focusTarget = useRef(null);
  const items = portfolio.filter((item) =>
    filter === 'Todos' || item.category === filter || (filter === 'Vídeos' && item.type === 'video')
  );
  const photos = items.filter((item) => item.type === 'image');
  const videos = items.filter((item) => item.type === 'video');

  function openItem(event, item) {
    focusTarget.current = event.currentTarget;
    setActive(items.indexOf(item));
  }

  function chooseReference(item) {
    onSelect({ service: item.category, reference: item.title });
    focusTarget.current = document.getElementById('booking-name');
    setActive(-1);
  }

  return (
    <section id="portfolio" className="la-section la-portfolio" aria-labelledby="la-portfolio-title">
      <div className="la-shell">
        <div className="la-section-heading">
          <div>
            <p className="la-kicker">Portfólio</p>
            <h2 id="la-portfolio-title">Ideias para suas próximas unhas</h2>
          </div>
          <p>Veja os acabamentos de perto e escolha um trabalho para levar como referência.</p>
        </div>

        <div className="la-gallery-toolbar">
          <div className="la-gallery-filters" role="group" aria-label="Filtrar trabalhos">
            {portfolioFilters.map((option) => (
              <button key={option} type="button" aria-pressed={filter === option} onClick={() => setFilter(option)}>
                {option}
              </button>
            ))}
          </div>
          <span className="la-gallery-count" aria-live="polite">
            {items.length} {items.length === 1 ? 'trabalho' : 'trabalhos'}
          </span>
        </div>

        {photos.length > 0 && (
          <div className={filter === 'Todos' ? 'la-photo-grid la-photo-grid--showcase' : 'la-photo-grid'}>
            {photos.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="la-photo-tile"
                aria-label={`Ampliar foto de ${item.title}`}
                onClick={(event) => openItem(event, item)}
              >
                <span className="la-tile-media">
                  <img src={item.src} alt="" style={{ objectPosition: item.position }} loading="lazy" decoding="async" />
                  {filter === 'Todos' && index === 0 && <span className="la-tile-flag">Em destaque</span>}
                  <span className="la-tile-open" aria-hidden="true"><Maximize2 size={16} /></span>
                </span>
                <span className="la-tile-caption">
                  <span className="la-card-label">{item.category}</span>
                  <span className="la-tile-title">{item.title}</span>
                </span>
              </button>
            ))}
          </div>
        )}

        {videos.length > 0 && (
          <div className={photos.length > 0 ? 'la-video-group la-video-group--below' : 'la-video-group'}>
            {photos.length > 0 && <h3>Trabalhos em vídeo</h3>}
            <div className="la-video-grid">
              {videos.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="la-video-tile"
                  aria-label={`Ver vídeo de ${item.title}`}
                  onClick={(event) => openItem(event, item)}
                >
                  <span className="la-video-thumb">
                    <img src={item.poster} alt="" style={{ objectPosition: item.position }} loading="lazy" decoding="async" />
                    <span className="la-video-play" aria-hidden="true"><Play size={17} fill="currentColor" /></span>
                  </span>
                  <span className="la-video-caption">
                    <span className="la-card-label">{item.category} · Vídeo</span>
                    <span className="la-tile-title">{item.title}</span>
                    <span className="la-video-action">Assistir <ArrowUpRight size={15} aria-hidden="true" /></span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {active >= 0 && (
        <PortfolioLightbox
          items={items}
          index={active}
          onClose={() => setActive(-1)}
          onIndexChange={setActive}
          onChoose={chooseReference}
          restoreFocus={() => focusTarget.current?.focus({ preventScroll: true })}
        />
      )}
    </section>
  );
}
