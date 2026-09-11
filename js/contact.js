// ============================================================
// RISE FILMS — Formulário de contato
// Envia os dados para /api/contact (função serverless da Vercel),
// que despacha o e-mail via Resend. Ver api/contact.js.
//
// Proteção anti-spam: reCAPTCHA v3 (invisível, sem desafio para o
// usuário). A "Site Key" abaixo é pública por natureza — pode ficar
// no código-fonte. A chave secreta correspondente fica só no servidor
// (variável de ambiente RECAPTCHA_SECRET_KEY na Vercel, ver api/contact.js).
// ============================================================
import { qs, qsa } from './utils.js';

const RECAPTCHA_SITE_KEY = '6Ldg4LItAAAAAHVlaGq8rQkYQfAzZZ_KbjaoEH6m';

function getRecaptchaToken() {
  return new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      // reCAPTCHA não carregou (bloqueador de anúncios, sem internet, etc.).
      // Resolve com token vazio para não travar o envio do formulário.
      resolve('');
      return;
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: 'contact' })
        .then(resolve)
        .catch(() => resolve(''));
    });
  });
}

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
    payload.recaptcha_token = await getRecaptchaToken();

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
