// Send an order confirmation email via Resend.
// Public endpoint (verify_jwt = false) — safe to call from the checkout page.
// Requires RESEND_API_KEY secret; optional ORDER_FROM_EMAIL (defaults to onboarding@resend.dev).

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type OrderItem = {
  code: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

type Order = {
  id: string;
  placedAt: string;
  email: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    country: string;
  };
  payment: "upi" | "card" | "cod";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHtml(order: Order) {
  const items = order.items
    .map(
      (it) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;font-family:Georgia,serif;font-size:14px;color:#111">
            <div style="letter-spacing:.15em;font-size:11px;color:#666;text-transform:uppercase">${esc(it.code)} · 48 ML · × ${it.quantity}</div>
            <div>${esc(it.name)}</div>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #e5e5e5;text-align:right;font-family:Georgia,serif;font-size:14px;color:#111">₹${it.unitPrice * it.quantity}</td>
        </tr>`,
    )
    .join("");

  const c = order.customer;

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f5f5;font-family:Helvetica,Arial,sans-serif;color:#111">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 12px">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:600px;width:100%">
            <tr>
              <td style="padding:32px 32px 8px 32px;border-bottom:1px solid #111">
                <div style="letter-spacing:.35em;font-size:11px;color:#666">T.A.P — THE AROMA PROJECT</div>
                <div style="margin-top:24px;font-size:28px;line-height:1.15;font-weight:300">The lab has your order.</div>
                <div style="margin-top:8px;color:#666;font-size:14px">Order <b style="color:#111">${esc(order.id)}</b> · placed ${esc(new Date(order.placedAt).toDateString())}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px 32px">
                <div style="letter-spacing:.2em;font-size:10px;color:#666;text-transform:uppercase">§ Contents</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;border-top:1px solid #e5e5e5">
                  ${items}
                </table>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px">
                  <tr><td style="color:#666;font-size:13px;padding:4px 0">Subtotal</td><td style="text-align:right;font-size:13px;padding:4px 0">₹${order.subtotal}</td></tr>
                  <tr><td style="color:#666;font-size:13px;padding:4px 0">Shipping</td><td style="text-align:right;font-size:13px;padding:4px 0">${order.shipping === 0 ? "Free" : "₹" + order.shipping}</td></tr>
                  <tr><td style="padding:12px 0 0 0;border-top:1px solid #111;letter-spacing:.2em;font-size:12px">TOTAL</td><td style="padding:12px 0 0 0;border-top:1px solid #111;text-align:right;font-size:22px;font-weight:300">₹${order.total}</td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px">
                <div style="letter-spacing:.2em;font-size:10px;color:#666;text-transform:uppercase">§ Ship to</div>
                <div style="margin-top:8px;font-size:14px;line-height:1.6">
                  ${esc(c.name)}<br/>
                  <span style="color:#666">${esc(c.address)}<br/>${esc(c.city)}, ${esc(c.state)} ${esc(c.pin)}<br/>${esc(c.country)}</span><br/>
                  <span style="color:#666;font-size:12px;letter-spacing:.1em">${esc(c.phone)}</span>
                </div>
                <div style="margin-top:16px;font-size:12px;color:#666">Payment · ${esc(order.payment.toUpperCase())} · Dispatched in 48 hours from Ahmedabad.</div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 32px 32px;border-top:1px solid #e5e5e5;color:#666;font-size:12px">
                Questions? Reply to this email or write to
                <a href="mailto:admin@thearomaproject.com" style="color:#111">admin@thearomaproject.com</a>.
              </td>
            </tr>
          </table>
          <div style="color:#999;font-size:11px;letter-spacing:.2em;margin-top:16px">T.A.P · AHMEDABAD · INDIA</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: CORS });
  }

  let order: Order;
  try {
    order = (await req.json()) as Order;
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  if (!order?.email || !order?.id || !Array.isArray(order.items)) {
    return json({ error: "Missing required order fields" }, 400);
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email send.");
    return json({ ok: true, sent: false, reason: "email_not_configured" });
  }

  const from = Deno.env.get("ORDER_FROM_EMAIL") ?? "T.A.P <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [order.email],
      subject: `T.A.P — Order ${order.id} confirmed`,
      html: renderHtml(order),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend send failed", res.status, detail);
    return json({ ok: false, sent: false, error: "email_send_failed", status: res.status }, 502);
  }

  return json({ ok: true, sent: true });
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}
