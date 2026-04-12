export const sendEmail = async (form: HTMLFormElement) => {
  const data = new FormData(form);
  const phone = String(data.get("user_phone") ?? "").trim();
  const dial = String(data.get("user_phone_country") ?? "").trim();
  const payload = {
    user_name: String(data.get("user_name") ?? ""),
    user_company: String(data.get("user_company") ?? ""),
    user_email: String(data.get("user_email") ?? ""),
    user_phone: phone ? `${dial} ${phone}`.trim() : "",
    service_interest: String(data.get("service_interest") ?? ""),
    message: String(data.get("message") ?? ""),
  };

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error ?? "Failed to send email");
  }

  return res.json();
};
