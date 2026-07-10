import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import mango12 from "@/assets/bottles/mango-12.jpg.asset.json";
import sambac8 from "@/assets/bottles/sambac-8.jpg.asset.json";
import vetiver16 from "@/assets/bottles/vetiver-16.jpg.asset.json";
import bergamote10 from "@/assets/bottles/bergamote-10.jpg.asset.json";
import spice21 from "@/assets/bottles/spice-21.jpg.asset.json";
import { saveLastOrder, type Order } from "@/lib/order-storage";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — T.A.P" },
      { name: "description", content: "Complete your order. 48ml flask · ₹999." },
      { property: "og:title", content: "Checkout — T.A.P" },
      { property: "og:description", content: "Complete your T.A.P order." },
    ],
  }),
  component: Checkout,
});

const UNIT_PRICE = 999;
const FREE_SHIP_THRESHOLD = 2500;
const SHIPPING = 99;

type Item = { code: string; name: string; image: string };
const ITEMS: Item[] = [
  { code: "TAP-01", name: "Mango 12", image: mango12.url },
  { code: "TAP-02", name: "Sambac 8", image: sambac8.url },
  { code: "TAP-03", name: "Vetiver 16", image: vetiver16.url },
  { code: "TAP-04", name: "Bergamote 10", image: bergamote10.url },
  { code: "TAP-05", name: "Spice 21", image: spice21.url },
];

function genOrderId() {
  const n = Math.floor(Math.random() * 900000 + 100000);
  return `TAP-${new Date().getFullYear()}-${n}`;
}

function Checkout() {
  const navigate = useNavigate();
  const [qty, setQty] = useState<Record<string, number>>({ "TAP-01": 1 });
  const [pay, setPay] = useState<"upi" | "card" | "cod">("upi");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = useMemo(
    () => Object.values(qty).reduce((s, n) => s + n * UNIT_PRICE, 0),
    [qty],
  );
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIP_THRESHOLD ? 0 : SHIPPING;
  const total = subtotal + shipping;
  const count = Object.values(qty).reduce((s, n) => s + n, 0);

  const setQ = (code: string, n: number) =>
    setQty((q) => ({ ...q, [code]: Math.max(0, Math.min(9, n)) }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (count === 0 || submitting) return;
    setError(null);
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";

    const lineItems = ITEMS
      .filter((it) => (qty[it.code] ?? 0) > 0)
      .map((it) => ({
        code: it.code,
        name: it.name,
        image: it.image,
        quantity: qty[it.code],
        unitPrice: UNIT_PRICE,
      }));

    const order: Order = {
      id: genOrderId(),
      placedAt: new Date().toISOString(),
      email: get("email"),
      customer: {
        name: get("name"),
        phone: get("phone"),
        address: get("address"),
        city: get("city"),
        state: get("state"),
        pin: get("pin"),
        country: get("country") || "India",
      },
      payment: pay,
      items: lineItems,
      subtotal,
      shipping,
      total,
    };

    saveLastOrder(order);

    // Fire the confirmation email — failures don't block confirmation.
    try {
      await supabase.functions.invoke("send-order-confirmation", { body: order });
    } catch (err) {
      console.warn("Confirmation email failed to send", err);
    }

    navigate({ to: "/order-confirmed" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <Link to="/" className="mono truncate text-[10px] tracking-[0.2em] sm:text-xs">
            ← T.A.P / RETURN TO CATALOGUE
          </Link>
          <span className="ticker-label shrink-0">CHECKOUT · SECURE</span>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:py-16">
        <div className="mb-8 sm:mb-10 lg:mb-16">
          <p className="ticker-label">§ 00 / Checkout</p>
          <h1 className="mt-3 text-2xl font-light tracking-tight sm:text-3xl lg:text-5xl">
            Complete your order.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Each flask is 48 ml. Dispatched in 48 hours from the lab.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-12">
          <div className="space-y-10 sm:space-y-12">
            <section>
              <SectionHead n="01" label="Selection" />
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {ITEMS.map((it) => {
                  const n = qty[it.code] ?? 0;
                  return (
                    <li key={it.code} className="flex items-center gap-3 py-4 sm:gap-4">
                      <div className="h-14 w-14 shrink-0 overflow-hidden bg-muted sm:h-16 sm:w-16">
                        <img src={it.image} alt={it.name} className="h-full w-full object-cover" loading="lazy" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="mono text-[10px] tracking-[0.2em] text-muted-foreground">
                          {it.code} · 48 ML
                        </p>
                        <p className="truncate text-sm">{it.name}</p>
                      </div>
                      <p className="mono hidden text-xs tabular-nums text-muted-foreground md:block">
                        ₹{UNIT_PRICE}
                      </p>
                      <QtyStepper value={n} onChange={(v) => setQ(it.code, v)} />
                      <p className="mono w-14 shrink-0 text-right text-xs tabular-nums sm:w-20 sm:text-sm">₹{n * UNIT_PRICE}</p>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section>
              <SectionHead n="02" label="Shipping" />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field name="email" label="Email" type="email" placeholder="you@domain.com" full required />
                <Field name="name" label="Full name" placeholder="First Last" required />
                <Field name="phone" label="Phone" type="tel" placeholder="+91" required />
                <Field name="address" label="Address line" placeholder="Street, apartment" full required />
                <Field name="city" label="City" placeholder="Mumbai" required />
                <Field name="state" label="State" placeholder="Maharashtra" required />
                <Field name="pin" label="PIN code" placeholder="400001" required />
                <Field name="country" label="Country" placeholder="India" required />
              </div>
            </section>

            <section>
              <SectionHead n="03" label="Payment" />
              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                {(
                  [
                    ["upi", "UPI", "GPay · PhonePe · Paytm"],
                    ["card", "Card", "Visa · Mastercard · Rupay"],
                    ["cod", "COD", "Cash on delivery"],
                  ] as const
                ).map(([id, label, sub]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPay(id)}
                    className={`border p-4 text-left transition-colors ${
                      pay === id
                        ? "border-foreground bg-foreground/[0.03]"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <p className="mono text-[10px] tracking-[0.2em] text-muted-foreground">
                      / {id.toUpperCase()}
                    </p>
                    <p className="mt-1 text-sm">{label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="border border-border p-6">
              <p className="ticker-label">§ Order summary</p>
              <dl className="mt-6 space-y-2 text-sm">
                <Row k={`Subtotal (${count} ${count === 1 ? "flask" : "flasks"})`} v={`₹${subtotal}`} />
                <Row k="Shipping" v={subtotal === 0 ? "—" : shipping === 0 ? "Free" : `₹${shipping}`} />
                {subtotal > 0 && subtotal < FREE_SHIP_THRESHOLD && (
                  <p className="mono pt-1 text-[10px] tracking-[0.15em] text-muted-foreground">
                    ADD ₹{FREE_SHIP_THRESHOLD - subtotal} FOR FREE SHIPPING
                  </p>
                )}
              </dl>
              <div className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
                <span className="mono text-xs tracking-[0.2em]">TOTAL</span>
                <span className="text-2xl font-light tabular-nums">₹{total}</span>
              </div>
              <button
                type="submit"
                disabled={count === 0 || submitting}
                className="mt-6 w-full border border-foreground bg-foreground py-4 text-xs tracking-[0.25em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
              >
                {submitting ? "PLACING ORDER…" : "PLACE ORDER →"}
              </button>
              {error && (
                <p className="mono mt-3 text-[10px] tracking-[0.15em] text-destructive">{error}</p>
              )}
              <p className="mono mt-4 text-[10px] leading-relaxed tracking-[0.1em] text-muted-foreground">
                DEMO CHECKOUT · CONFIRMATION EMAIL SENT ON ORDER
              </p>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}

function SectionHead({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-border pb-3">
      <p className="ticker-label">§ {n} / {label}</p>
      <span className="mono text-[10px] tracking-[0.2em] text-muted-foreground">REQUIRED</span>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="mono tabular-nums">{v}</dd>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  full,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  full?: boolean;
  required?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mono text-[10px] tracking-[0.2em] text-muted-foreground">
        {label.toUpperCase()}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full border-0 border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-foreground"
      />
    </label>
  );
}

function QtyStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center border border-border">
      <button type="button" onClick={() => onChange(value - 1)} className="h-8 w-8 text-sm hover:bg-muted" aria-label="Decrease">−</button>
      <span className="mono w-8 text-center text-xs tabular-nums">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} className="h-8 w-8 text-sm hover:bg-muted" aria-label="Increase">+</button>
    </div>
  );
}
