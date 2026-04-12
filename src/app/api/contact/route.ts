import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactPayload {
  user_name?: string;
  user_company?: string;
  user_email?: string;
  user_phone?: string;
  service_interest?: string;
  message?: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:8px 12px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e5e7eb;vertical-align:top;width:160px;">${label}</td>
      <td style="padding:8px 12px;color:#111827;font-size:14px;border-bottom:1px solid #e5e7eb;">${value || "<em style=\"color:#9ca3af;\">—</em>"}</td>
    </tr>
  `;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const name = (body.user_name ?? "").trim();
    const email = (body.user_email ?? "").trim();
    const company = (body.user_company ?? "").trim();
    const phone = (body.user_phone ?? "").trim();
    const service = (body.service_interest ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;padding:24px;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="background:linear-gradient(135deg,#00D4AA,#8B5CF6);padding:24px;">
            <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">Novo contato do site</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">Upward Media — Formulário de contato</p>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            ${row("Nome", escapeHtml(name))}
            ${row("Empresa", escapeHtml(company))}
            ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#00A688;text-decoration:none;">${escapeHtml(email)}</a>`)}
            ${row("Telefone", escapeHtml(phone))}
            ${row("Serviço de interesse", escapeHtml(service))}
            ${row("Mensagem", `<div style="white-space:pre-wrap;">${escapeHtml(message)}</div>`)}
          </table>
          <div style="padding:16px 24px;background:#f9fafb;color:#6b7280;font-size:12px;text-align:center;">
            Responda diretamente para falar com ${escapeHtml(name)}.
          </div>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "Upward Media <contato@upwardbr.com>",
      to: ["hello@upwardbr.com"],
      replyTo: email,
      subject: `Novo contato do site - ${name}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Unexpected error." },
      { status: 500 }
    );
  }
}
