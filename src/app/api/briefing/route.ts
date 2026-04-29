import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface BriefingPayload {
  name?: string;
  company?: string;
  email?: string;
  business_summary?: string;
  site_type?: string;
  site_goal?: string;
  has_current_site?: string;
  current_site_url?: string;
  visual_style?: string;
  color_palette?: string;
  theme?: string;
  inspiration?: string;
  brand_identity?: string;
  features?: string[];
  languages?: string[];
  content_ready?: string;
  photos_ready?: string;
  extra_notes?: string;
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
      <td style="padding:10px 14px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e5e7eb;vertical-align:top;width:180px;font-weight:600;">${label}</td>
      <td style="padding:10px 14px;color:#111827;font-size:14px;border-bottom:1px solid #e5e7eb;line-height:1.5;">${value || '<em style="color:#9ca3af;">—</em>'}</td>
    </tr>
  `;
}

function sectionHeader(title: string) {
  return `
    <tr>
      <td colspan="2" style="padding:16px 14px 8px;background:#f9fafb;color:#00A688;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;font-weight:700;border-bottom:1px solid #e5e7eb;">${title}</td>
    </tr>
  `;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BriefingPayload;

    const name = (body.name ?? "").trim();
    const company = (body.company ?? "").trim();
    const email = (body.email ?? "").trim();
    const businessSummary = (body.business_summary ?? "").trim();

    if (!name || !email || !company || !businessSummary) {
      return NextResponse.json(
        { error: "missing_fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "invalid_email" },
        { status: 400 }
      );
    }

    const features = Array.isArray(body.features) ? body.features : [];
    const languages = Array.isArray(body.languages) ? body.languages : [];

    const featuresHtml = features.length
      ? features.map((f) => escapeHtml(f)).join(" · ")
      : "";
    const languagesHtml = languages.length
      ? languages.map((l) => escapeHtml(l)).join(" · ")
      : "";

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;padding:24px;">
        <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="background:linear-gradient(135deg,#00D4AA,#00A688);padding:28px 24px;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">Novo briefing recebido</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.92);font-size:13px;">Upward Media — Briefing de site</p>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            ${sectionHeader("Sobre você")}
            ${row("Nome", escapeHtml(name))}
            ${row("Empresa", escapeHtml(company))}
            ${row("E-mail", `<a href="mailto:${escapeHtml(email)}" style="color:#00A688;text-decoration:none;">${escapeHtml(email)}</a>`)}
            ${row("O que faz", escapeHtml(businessSummary))}

            ${sectionHeader("O projeto")}
            ${row("Tipo de site", escapeHtml(body.site_type ?? ""))}
            ${row("Objetivo principal", escapeHtml(body.site_goal ?? ""))}
            ${row("Tem site hoje?", escapeHtml(body.has_current_site ?? ""))}
            ${row("Link do site atual", body.current_site_url ? `<a href="${escapeHtml(body.current_site_url)}" style="color:#00A688;text-decoration:none;">${escapeHtml(body.current_site_url)}</a>` : "")}

            ${sectionHeader("Estilo visual")}
            ${row("Estilo", escapeHtml(body.visual_style ?? ""))}
            ${row("Paleta de cores", escapeHtml(body.color_palette ?? ""))}
            ${row("Tema", escapeHtml(body.theme ?? ""))}
            ${row("Inspiração / sites referência", escapeHtml(body.inspiration ?? ""))}

            ${sectionHeader("Identidade de marca")}
            ${row("Status da identidade", escapeHtml(body.brand_identity ?? ""))}

            ${sectionHeader("Funcionalidades")}
            ${row("Recursos desejados", featuresHtml)}
            ${row("Idiomas", languagesHtml)}

            ${sectionHeader("Conteúdo")}
            ${row("Textos prontos?", escapeHtml(body.content_ready ?? ""))}
            ${row("Fotos profissionais?", escapeHtml(body.photos_ready ?? ""))}

            ${sectionHeader("Observações")}
            ${row("Algo mais", `<div style="white-space:pre-wrap;">${escapeHtml(body.extra_notes ?? "")}</div>`)}
          </table>
          <div style="padding:16px 24px;background:#f9fafb;color:#6b7280;font-size:12px;text-align:center;border-top:1px solid #e5e7eb;">
            Responda diretamente para falar com ${escapeHtml(name)}.
          </div>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "Upward Media <contato@upwardbr.com>",
      to: ["hello@upwardbr.com"],
      replyTo: email,
      subject: `Novo briefing — ${company} (${name})`,
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
    console.error("Briefing API error:", err);
    return NextResponse.json(
      { error: "Unexpected error." },
      { status: 500 }
    );
  }
}
