// ============================================================
// RISE FILMS — Formulário de contato
// NOTE: não há backend configurado ainda. O submit é interceptado e
// mostra feedback visual; plugue aqui uma Vercel Function, Formspree,
// HubSpot ou outro endpoint quando estiver disponível.
// ============================================================
import { qs, qsa } from './utils.js';

export function initContactForm() {
  const form = qs('[data-contact-form]');
  if (!form) return;

  const status = qs('[data-form-status]', form);
  const select = qs('select', form);

  // Select não tem :placeholder-shown — controla a label manualmente.
  if (select) {
    const field = select.closest('.field');
    const sync = () => field?.classList.toggle('has-value', !!select.value);
    select.addEventListener('change', sync);
    sync();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = qs('button[type="submit"]', form);
    submitBtn?.setAttribute('disabled', 'true');
    if (status) status.textContent = 'Enviando...';

    try {
      // Placeholder: substitua por uma chamada real (ex.: fetch('/api/contact', {...})).
      await new Promise((resolve) => setTimeout(resolve, 900));
      if (status) status.textContent = 'Recebemos sua mensagem. Em breve entraremos em contato.';
      form.reset();
      qsa('.field', form).forEach((f) => f.classList.remove('has-value'));
    } catch (err) {
      if (status) status.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
    } finally {
      submitBtn?.removeAttribute('disabled');
    }
  });
}
