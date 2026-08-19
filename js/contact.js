// ============================================================
// RISE FILMS — Formulário de contato
// Envia os dados para /api/contact (função serverless da Vercel),
// que despacha o e-mail via Resend. Ver api/contact.js.
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

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao enviar.');
      }

      if (status) status.textContent = 'Recebemos sua mensagem. Em breve entraremos em contato.';
      form.reset();
      qsa('.field', form).forEach((f) => f.classList.remove('has-value'));
    } catch (err) {
      if (status) status.textContent = err.message || 'Não foi possível enviar agora. Tente novamente em instantes.';
    } finally {
      submitBtn?.removeAttribute('disabled');
    }
  });
}
