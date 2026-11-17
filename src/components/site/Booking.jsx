import { MessageCircle } from 'lucide-react';
import BookingForm from './BookingForm';
import { Sparkle } from './BrandMark';

export default function Booking({ selection }) {
  return (
    <section id="agendar" className="la-section la-booking" aria-labelledby="la-booking-title">
      <div className="la-shell la-booking-layout">
        <div className="la-booking-copy">
          <p className="la-kicker"><Sparkle /> Agendamento</p>
          <h2 id="la-booking-title">Vamos combinar seu horário?</h2>
          <p>Conte o que você quer fazer e deixe seu WhatsApp para receber os valores e os horários disponíveis.</p>
          <div className="la-booking-note">
            <MessageCircle size={20} aria-hidden="true" />
            <span>O horário fica confirmado depois que você combinar com a Liliane pelo WhatsApp.</span>
          </div>
        </div>
        <BookingForm selection={selection} />
      </div>
    </section>
  );
}
