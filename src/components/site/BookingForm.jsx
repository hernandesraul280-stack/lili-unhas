import { useEffect, useState } from 'react';
import { ArrowRight, Check, Loader2, X } from 'lucide-react';
import { services } from '@/lib/siteContent';

const emptyForm = { name: '', whatsapp: '', service: '', preferred_date: '', notes: '' };

export default function BookingForm({ selection }) {
  const [form, setForm] = useState(emptyForm);
  const [reference, setReference] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selection) return;
    setForm((current) => ({ ...current, service: selection.service }));
    setReference(selection.reference ?? '');
    setSent(false);
  }, [selection]);

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    if (sending) return;

    const name = form.name.trim();
    const phone = form.whatsapp.replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '');
    if (name.length < 2 || !/^[1-9]\d{9,10}$/.test(phone)) {
      setError('Informe seu nome e um WhatsApp válido com DDD.');
      return;
    }

    const notes = [reference && `Referência da vitrine — ${reference}`, form.notes.trim()].filter(Boolean).join('\n');
    setError('');
    setSending(true);

    try {
      const response = await fetch('/api/appointment-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          whatsapp: `+55${phone}`,
          service: form.service,
          ...(form.preferred_date && { preferred_date: form.preferred_date }),
          ...(notes && { notes }),
        }),
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      setSent(true);
    } catch {
      setError('Confira sua conexão e tente enviar o pedido novamente.');
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="la-booking-form la-form-success">
        <div role="status">
          <span className="la-form-confirmation" aria-hidden="true"><Check size={24} /></span>
          <h3>Pedido enviado</h3>
          <p>Obrigada, {form.name.trim().split(/\s+/)[0]}. Aguarde o retorno da Liliane no WhatsApp para combinar seu horário.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setForm(emptyForm);
            setReference('');
            setSent(false);
          }}
          className="la-text-link"
        >
          Fazer outro pedido <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Solicitação de horário" aria-busy={sending} className="la-booking-form">
      <h3>Solicitar um horário</h3>
      <div className="la-form-grid">
        <div className="la-field">
          <label htmlFor="booking-name">Seu nome</label>
          <input
            id="booking-name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            value={form.name}
            onChange={update('name')}
            placeholder="Nome e sobrenome"
          />
        </div>
        <div className="la-field">
          <label htmlFor="booking-phone">Seu WhatsApp</label>
          <input
            id="booking-phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={24}
            value={form.whatsapp}
            onChange={update('whatsapp')}
            placeholder="DDD + número"
          />
        </div>
        <div className="la-field">
          <label htmlFor="booking-service">Serviço</label>
          <select id="booking-service" required value={form.service} onChange={update('service')}>
            <option value="">Escolha um serviço</option>
            {services.map((service) => <option key={service.id} value={service.name}>{service.name}</option>)}
            <option value="Ainda não sei">Quero ajuda para escolher</option>
          </select>
        </div>
        <div className="la-field">
          <label htmlFor="booking-date">Data preferida <span>(opcional)</span></label>
          <input id="booking-date" type="date" value={form.preferred_date} onChange={update('preferred_date')} />
        </div>
      </div>

      {reference && (
        <div className="la-reference">
          <p><strong>Referência escolhida</strong><br />{reference}</p>
          <button type="button" aria-label="Remover referência" onClick={() => setReference('')}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="la-field la-field--notes">
        <label htmlFor="booking-notes">Observações <span>(opcional)</span></label>
        <textarea
          id="booking-notes"
          value={form.notes}
          onChange={update('notes')}
          rows={3}
          maxLength={500}
          placeholder="Conte a cor, o formato ou algum detalhe que você imaginou"
        />
      </div>

      {error && <p role="alert" className="la-form-error">{error}</p>}

      <button type="submit" disabled={sending} className="la-button la-button--primary la-form-submit">
        {sending ? 'Enviando pedido' : 'Enviar pedido de horário'}
        {sending ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
      </button>
      <p className="la-form-privacy">Seu WhatsApp será usado para responder a esta solicitação.</p>
    </form>
  );
}
