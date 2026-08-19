// ============================================================
// RISE FILMS — Função serverless da Vercel: envia o formulário de
// contato por e-mail usando a API da Resend (https://resend.com).
//
// Variáveis de ambiente necessárias (configure em
// Vercel → Project Settings → Environment Variables):
//   RESEND_API_KEY     -> chave de API gerada no painel da Resend
//   CONTACT_TO_EMAIL    -> e-mail que deve receber os leads
//                          (ex: vinicius@bddb.com.br)
//   CONTACT_FROM_EMAIL  -> opcional. Remetente do e-mail. Enquanto
//                          nenhum domínio próprio estiver verificado
//                          na Resend, deixe sem definir — o código
//                          usa "onboarding@resend.dev" como padrão.
// ============================================================

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { name, email, company, phone, project_type, message } = body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Preencha nome, e-mail e mensagem.' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'E-mail inválido.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Rise Films <onboarding@resend.dev>';

    if (!apiKey || !toEmail) {
      console.error('Faltam variáveis de ambiente RESEND_API_KEY / CONTACT_TO_EMAIL.');
      return res.status(500).json({ error: 'Formulário ainda não configurado. Tente novamente mais tarde.' });
    }

    const escapeHtml = (value = '') =>
      String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const html = `
      <div style="font-family: Arial, sans-serif; font-size: 15px; color: #181818;">
        <h2 style="margin-bottom: 4px;">Novo contato pelo site — Rise Films</h2>
        <p style="color:#65a04a; margin-top:0;">Recebido via risefilms.com.br</p>
        <table style="border-collapse: collapse; width: 100%; max-width: 480px;">
          <tr><td style="padding:6px 0; font-weight:bold; width:140px;">Nome</td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 0; font-weight:bold;">E-mail</td><td style="padding:6px 0;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:6px 0; font-weight:bold;">Empresa</td><td style="padding:6px 0;">${escapeHtml(company || '—')}</td></tr>
          <tr><td style="padding:6px 0; font-weight:bold;">Telefone</td><td style="padding:6px 0;">${escapeHtml(phone || '—')}</td></tr>
          <tr><td style="padding:6px 0; font-weight:bold;">Tipo de projeto</td><td style="padding:6px 0;">${escapeHtml(project_type || '—')}</td></tr>
        </table>
        <p style="font-weight:bold; margin-bottom:4px;">Mensagem</p>
        <p style="white-space: pre-wrap; border-left: 3px solid #65F461; padding-left: 12px;">${escapeHtml(message)}</p>
      </div>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Novo contato via site — ${name}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Erro da Resend:', resendRes.status, errText);
      return res.status(502).json({ error: 'Não foi possível enviar seu contato agora. Tente novamente em instantes.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Erro no /api/contact:', err);
    return res.status(500).json({ error: 'Erro interno ao processar o formulário.' });
  }
}
