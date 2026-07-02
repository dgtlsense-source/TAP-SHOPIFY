import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadLastOrder, type Order } from "@/lib/order-storage";

export const Route = createFileRoute("/order-confirmed")({
  head: () => ({
    meta: [
      { title: "Order confirmed — T.A.P" },
      { name: "description", content: "Your T.A.P order has been placed. Confirmation on the way." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Order confirmed — T.A.P" },
      { property: "og:description", content: "Your T.A.P order has been placed." },
    ],
  }),
  component: OrderConfirmed,
});

function OrderConfirmed() {
  const [order, setOrder] = useState<Order | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrder(loadLastOrder());
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!order) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="mx-auto max-w-[1400px] px-6 py-24">
          <p className="ticker-label">§ 00 / No recent order</p>
          <h1 className="mt-3 text-3xl font-light tracking-tight lg:text-5xl">
            Nothing to confirm yet.
          </h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            We can't find a recent order in this session. Head back to the catalogue to start one.
          </p>
          <Link
            to="/"
            className="mono mt-8 inline-block border border-foreground bg-foreground px-6 py-3 text-xs tracking-[0.25em] text-background"
          >
            RETURN TO CATALOGUE →
          </Link>
        </main>
      </div>
    );
  }

  const placed = new Date(order.placedAt);
  const eta = new Date(placed.getTime() + 1000 * 60 * 60 * 24 * 5);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1000px] px-6 py-12 lg:py-20">
        {/* Confirmation banner */}
        <div className="border border-border bg-foreground/[0.02] p-8 lg:p-10">
          <p className="ticker-label">§ Order confirmed</p>
          <h1 className="mt-3 text-3xl font-light tracking-tight lg:text-5xl">
            The lab has your order.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            A confirmation is on its way to{" "}
            <span className="text-foreground">{order.email}</span>. Keep this order code
            for your records — dispatched in 48 hours from Ahmedabad.
          </p>

          <dl className="mono mt-8 grid grid-cols-2 gap-6 text-[11px] tracking-[0.15em] sm:grid-cols-4">
            <Meta k="ORDER" v={order.id} />
            <Meta k="PLACED" v={fmt(placed)} />
            <Meta k="EST. DELIVERY" v={fmt(eta)} />
            <Meta k="PAYMENT" v={order.payment.toUpperCase()} />
          </dl>
        </div>

        {/* Items */}
        <section className="mt-12">
          <p className="ticker-label">§ 01 / Contents</p>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {order.items.map((it) => (
              <li key={it.code} className="flex items-center gap-4 py-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden bg-muted">
                  <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mono text-[10px] tracking-[0.2em] text-muted-foreground">
                    {it.code} · 48 ML · × {it.quantity}
                  </p>
                  <p className="text-sm">{it.name}</p>
                </div>
                <p className="mono w-24 text-right text-sm tabular-nums">
                  ₹{it.unitPrice * it.quantity}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-6 ml-auto max-w-sm space-y-2 text-sm">
            <Row k="Subtotal" v={`₹${order.subtotal}`} />
            <Row k="Shipping" v={order.shipping === 0 ? "Free" : `₹${order.shipping}`} />
            <div className="flex items-baseline justify-between border-t border-border pt-3">
              <span className="mono text-xs tracking-[0.2em]">TOTAL</span>
              <span className="text-2xl font-light tabular-nums">₹{order.total}</span>
            </div>
          </dl>
        </section>

        {/* Ship to */}
        <section className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
          <div>
            <p className="ticker-label">§ 02 / Ship to</p>
            <div className="mt-4 text-sm leading-relaxed">
              <p>{order.customer.name}</p>
              <p className="text-muted-foreground">{order.customer.address}</p>
              <p className="text-muted-foreground">
                {order.customer.city}, {order.customer.state} {order.customer.pin}
              </p>
              <p className="text-muted-foreground">{order.customer.country}</p>
              <p className="mono mt-3 text-[11px] tracking-[0.15em] text-muted-foreground">
                {order.customer.phone}
              </p>
            </div>
          </div>
          <div>
            <p className="ticker-label">§ 03 / Support</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Questions on your order? Reply to your confirmation email or write to{" "}
              <a href="mailto:admin@thearomaproject.com" className="text-foreground underline">
                admin@thearomaproject.com
              </a>
              .
            </p>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/"
            className="mono border border-foreground bg-foreground px-6 py-3 text-xs tracking-[0.25em] text-background"
          >
            RETURN TO CATALOGUE →
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="mono border border-border px-6 py-3 text-xs tracking-[0.25em] hover:border-foreground/40"
          >
            PRINT RECEIPT
          </button>
        </div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <Link to="/" className="mono text-xs tracking-[0.2em]">
          ← T.A.P
        </Link>
        <span className="ticker-label">ORDER · CONFIRMED</span>
      </div>
    </header>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="mt-1 text-foreground">{v}</dd>
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
