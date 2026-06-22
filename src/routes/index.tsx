import { createFileRoute } from "@tanstack/react-router";
import heroLab from "@/assets/hero-lab.jpg";
import bottlesRow from "@/assets/bottles-row.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Aroma Project — Engineered Fragrances" },
      {
        name: "description",
        content:
          "T.A.P — a raw laboratory of engineered fragrances. Five compositions. Direct from the lab.",
      },
      { property: "og:title", content: "The Aroma Project — Engineered Fragrances" },
      { property: "og:description", content: "Five engineered fragrances. Direct from the lab." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const FRAGRANCES = [
  {
    code: "TAP-01",
    name: "Concrete",
    family: "Mineral / Woody",
    notes: ["Vetiver", "Iso E Super", "Wet Stone", "Ambroxan"],
    abv: "20%",
    batch: "0001 / 250",
  },
  {
    code: "TAP-02",
    name: "Solvent",
    family: "Aldehydic / Citrus",
    notes: ["Bergamot", "Aldehyde C-12", "Petitgrain", "White Musk"],
    abv: "22%",
    batch: "0001 / 250",
  },
  {
    code: "TAP-03",
    name: "Graphite",
    family: "Smoky / Leather",
    notes: ["Birch Tar", "Cade", "Leather Accord", "Labdanum"],
    abv: "24%",
    batch: "0001 / 200",
  },
  {
    code: "TAP-04",
    name: "Oxide",
    family: "Metallic / Floral",
    notes: ["Iris ISO", "Steel Accord", "Violet Leaf", "Suede"],
    abv: "20%",
    batch: "0001 / 250",
  },
  {
    code: "TAP-05",
    name: "Reagent",
    family: "Aromatic / Spicy",
    notes: ["Black Pepper", "Cardamom", "Cypress", "Cashmeran"],
    abv: "22%",
    batch: "0001 / 200",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Nav />
      <Hero />
      <Manifest />
      <Catalogue />
      <Process />
      <Newsletter />
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <div className="border-b border-border bg-foreground text-background">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-1.5 mono text-[10px] tracking-[0.2em] uppercase">
        <span>Batch 0001 — Now Shipping Worldwide</span>
        <span className="hidden md:inline">LAB / 51.5074° N, 0.1278° W</span>
        <span>Free Carrier · Orders &gt; €120</span>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
        <a href="/" className="flex items-baseline gap-3">
          <span className="mono text-xs tracking-[0.3em]">T.A.P</span>
          <span className="ticker-label hidden sm:inline">The Aroma Project</span>
        </a>
        <nav className="hidden gap-8 md:flex">
          {["Catalogue", "Process", "Lab Notes", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground transition hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#catalogue"
          className="mono inline-flex items-center border border-foreground bg-foreground px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-background transition hover:bg-background hover:text-foreground"
        >
          Acquire ↗
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative border-b border-border">
      <div className="bg-grid">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-0 lg:grid-cols-12">
          <div className="col-span-1 flex flex-col justify-between px-6 py-16 lg:col-span-7 lg:py-28">
            <div className="space-y-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-foreground" />
                <span className="ticker-label">Vol. 01 — 2026 / Edition I</span>
              </div>
              <h1 className="font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.04em] font-light">
                Engineered<br />
                <span className="italic text-steel">scent,</span><br />
                raw and<br />
                unfinished.
              </h1>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                The Aroma Project is a working laboratory.
                Five compositions, distilled in small batches,
                shipped direct from the bench. No marketing.
                No mascots. Just the formula.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href="#catalogue"
                  className="mono inline-flex items-center border border-foreground bg-foreground px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-background transition hover:bg-background hover:text-foreground"
                >
                  View Catalogue / 05
                </a>
                <a
                  href="#process"
                  className="mono inline-flex items-center border border-border px-6 py-3 text-[11px] uppercase tracking-[0.2em] transition hover:border-foreground"
                >
                  The Process →
                </a>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["05", "Compositions"],
                ["200—250", "Per Batch"],
                ["50ml", "Standard Flask"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="mono text-2xl">{v}</div>
                  <div className="ticker-label mt-2">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 relative border-l-0 border-t border-border lg:col-span-5 lg:border-l lg:border-t-0">
            <img src={heroLab} alt="Laboratory still life with grey perfume bottle and glassware" className="h-full max-h-[720px] w-full object-cover grayscale" />
            <div className="absolute bottom-0 left-0 right-0 flex justify-between border-t border-border bg-background/90 px-4 py-2 mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              <span>FIG. 001 — Bench Study</span>
              <span>ISO 8589</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Manifest() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="ticker-label">§ 01 / Manifest</span>
        </div>
        <div className="md:col-span-9">
          <p className="text-2xl leading-snug tracking-[-0.02em] md:text-4xl">
            We treat perfumery as <em className="italic text-steel">applied chemistry</em>.
            Every flask is mixed, macerated and filtered on the bench —
            then numbered, capped and shipped. The label is the data sheet.
            The packaging is the packaging.
          </p>
        </div>
      </div>
    </section>
  );
}

function Catalogue() {
  return (
    <section id="catalogue" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-border pb-6">
          <div className="space-y-3">
            <span className="ticker-label">§ 02 / Catalogue</span>
            <h2 className="font-display text-4xl tracking-[-0.03em] md:text-6xl font-light">
              Five compositions.
            </h2>
          </div>
          <span className="mono hidden text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:inline">
            TAP-01 → TAP-05
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -m-px">
          {FRAGRANCES.map((f, i) => (
            <FragranceCard key={f.code} f={f} idx={i} />
          ))}
          <div className="hidden lg:flex items-center justify-center border border-border p-10 text-center bg-grid">
            <div className="space-y-3">
              <span className="ticker-label">In Development</span>
              <div className="font-display text-3xl tracking-[-0.02em] text-muted-foreground">TAP-06</div>
              <div className="ticker-label">Q3 2026</div>
            </div>
          </div>
          <div className="hidden md:flex lg:hidden items-center justify-center border border-border p-10 text-center bg-grid">
            <div className="space-y-3">
              <span className="ticker-label">In Development</span>
              <div className="font-display text-3xl tracking-[-0.02em] text-muted-foreground">TAP-06</div>
              <div className="ticker-label">Q3 2026</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FragranceCard({ f, idx }: { f: typeof FRAGRANCES[number]; idx: number }) {
  return (
    <article className="group relative flex flex-col border border-border bg-card p-6 transition hover:bg-background">
      <div className="flex items-start justify-between">
        <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {f.code}
        </span>
        <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          № {String(idx + 1).padStart(2, "0")} / 05
        </span>
      </div>

      <div className="my-10 flex h-44 items-end justify-center">
        <div className="relative flex h-40 w-16 flex-col items-center">
          <div className="h-3 w-7 bg-foreground" />
          <div className="h-2 w-10 bg-steel" />
          <div className="relative flex-1 w-full overflow-hidden border border-border bg-gradient-to-b from-transparent via-muted to-accent">
            <div className="absolute inset-x-2 bottom-2 top-1/3 bg-foreground/15 backdrop-blur-sm" />
          </div>
        </div>
      </div>

      <h3 className="font-display text-3xl tracking-[-0.02em] font-light">{f.name}</h3>
      <div className="mono mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {f.family}
      </div>

      <dl className="mt-6 space-y-1.5 border-t border-border pt-4 text-xs">
        {f.notes.map((n) => (
          <div key={n} className="flex justify-between text-muted-foreground">
            <dt className="mono uppercase tracking-[0.15em]">{n}</dt>
            <dd className="mono">●</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4">
        <div>
          <div className="ticker-label">Concentration</div>
          <div className="mono mt-1 text-sm">{f.abv}</div>
        </div>
        <div>
          <div className="ticker-label">Batch</div>
          <div className="mono mt-1 text-sm">{f.batch}</div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="font-display text-2xl tracking-[-0.02em]">€ 145</span>
        <button className="mono border border-foreground bg-transparent px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-background">
          Acquire ↗
        </button>
      </div>
    </article>
  );
}

function Process() {
  const steps = [
    ["Source", "Raw materials catalogued and weighed to the milligram. Natural absolutes alongside synthesised molecules."],
    ["Compose", "Formulas drafted on paper, mixed on the bench. Iterated across 40–60 trial flasks per composition."],
    ["Macerate", "Each batch rests in amber glass for 6 weeks. Filtered, decanted, and bottled by hand."],
    ["Dispatch", "Sealed, numbered, and shipped direct. No retailers. No middlemen."],
  ];
  return (
    <section id="process" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3 space-y-3">
            <span className="ticker-label">§ 03 / Process</span>
            <h2 className="font-display text-4xl tracking-[-0.03em] font-light md:text-5xl">
              Bench to bottle.
            </h2>
          </div>
          <div className="md:col-span-9">
            <img src={bottlesRow} alt="Five perfume flasks arranged on a concrete laboratory bench" className="mb-10 w-full grayscale" />
            <ol className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              {steps.map(([title, body], i) => (
                <li key={title} className="flex flex-col gap-3 bg-background p-6">
                  <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Step / 0{i + 1}
                  </span>
                  <h3 className="font-display text-xl tracking-[-0.02em]">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section id="lab-notes" className="border-b border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-20 md:grid-cols-12">
        <div className="md:col-span-6 space-y-4">
          <span className="mono text-[10px] uppercase tracking-[0.2em] text-background/60">§ 04 / Lab Notes</span>
          <h2 className="font-display text-4xl tracking-[-0.03em] font-light md:text-6xl">
            Dispatches from the bench.
          </h2>
          <p className="max-w-md text-background/70">
            Formulation diaries, raw material studies, and early access
            to upcoming batches. Sent when there is something to say.
          </p>
        </div>
        <form className="md:col-span-6 flex flex-col justify-end gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="you@domain.com"
            className="mono flex-1 border border-background/30 bg-transparent px-4 py-4 text-sm text-background placeholder:text-background/40 focus:border-background focus:outline-none"
          />
          <button className="mono border border-background bg-background px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-foreground transition hover:bg-transparent hover:text-background">
            Subscribe ↗
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 space-y-4">
            <div className="mono text-xs tracking-[0.3em]">T.A.P</div>
            <p className="max-w-xs text-sm text-muted-foreground">
              The Aroma Project. A working laboratory of engineered fragrances.
              Mixed, bottled and dispatched from London.
            </p>
          </div>
          <div className="space-y-3">
            <div className="ticker-label">Catalogue</div>
            {FRAGRANCES.map((f) => (
              <div key={f.code} className="mono text-xs">{f.code} — {f.name}</div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="ticker-label">Contact</div>
            <div className="mono text-xs">lab@aromaproject.co</div>
            <div className="mono text-xs">+44 (0)20 0000 0000</div>
            <div className="mono text-xs">Unit 4, Hackney Wick<br />London E9</div>
          </div>
        </div>
        <div className="hairline mt-12 flex flex-col justify-between gap-3 pt-6 mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row">
          <span>© 2026 The Aroma Project Ltd.</span>
          <span>All formulas proprietary · Made in UK</span>
        </div>
      </div>
    </footer>
  );
}
