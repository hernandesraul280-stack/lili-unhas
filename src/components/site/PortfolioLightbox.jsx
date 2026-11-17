import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';

export default function PortfolioLightbox({ items, index, onClose, onIndexChange, onChoose, restoreFocus }) {
  const item = items[index];
  const move = (delta) => onIndexChange((index + delta + items.length) % items.length);

  function handleKeys(event) {
    if (event.target instanceof HTMLVideoElement || items.length < 2) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="la-dialog-backdrop" />
        <Dialog.Content
          className="la-dialog"
          onKeyDown={handleKeys}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            restoreFocus();
          }}
        >
          <div className="la-dialog-top">
            <p>Portfólio <span aria-hidden="true">·</span> {index + 1} de {items.length}</p>
            <Dialog.Close aria-label="Fechar galeria" className="la-dialog-icon">
              <X size={22} aria-hidden="true" />
            </Dialog.Close>
          </div>

          <div className="la-dialog-media">
            {item.type === 'video' ? (
              <video key={item.src} src={item.src} poster={item.poster} preload="metadata" controls playsInline aria-label={item.title} />
            ) : (
              <img src={item.src} alt={item.note} />
            )}
          </div>

          <div className="la-dialog-bottom">
            <div>
              <p className="la-card-label">{item.category}</p>
              <Dialog.Title>{item.title}</Dialog.Title>
              <Dialog.Description>{item.note}</Dialog.Description>
            </div>
            <div className="la-dialog-actions">
              {items.length > 1 && (
                <>
                  <button type="button" onClick={() => move(-1)} aria-label="Anterior" className="la-dialog-icon">
                    <ArrowLeft size={19} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => move(1)} aria-label="Próximo" className="la-dialog-icon">
                    <ArrowRight size={19} aria-hidden="true" />
                  </button>
                </>
              )}
              <a href="#agendar" onClick={() => onChoose(item)} className="la-button la-button--light">
                Usar como referência <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
