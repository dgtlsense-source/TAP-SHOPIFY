import { createFileRoute } from "@tanstack/react-router";
import heroLab from "@/assets/hero-lab.jpg";
import mango12 from "@/assets/bottles/mango-12.jpg.asset.json";
import sambac8 from "@/assets/bottles/sambac-8.jpg.asset.json";
import vetiver16 from "@/assets/bottles/vetiver-16.jpg.asset.json";
import bergamote10 from "@/assets/bottles/bergamote-10.jpg.asset.json";
import spice21 from "@/assets/bottles/spice-21.jpg.asset.json";
import labBanner from "@/assets/lab-banner.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "T.A.P — The Aroma Project · Engineered Fragrances" },
      {
        name: "description",
        content:
          "T.A.P — The Aroma Project. Five engineered fragrances: Mango 12, Sambac 8, Vetiver 16, Bergamote 10, Spice 21. 48ml. ₹999. Direct from the lab.",
      },
      { property: "og:title", content: "T.A.P — The Aroma Project" },
      {
        property: "og:description",
        content:
          "Five engineered fragrances. Raw materials from Konkan, Madurai, Les Cayes, Calabria, Malabar. 48ml · ₹999.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

type Fragrance = {
  code: string;
  name: string;
  family: string;
  notes: [string, string, string];
  origin: string;
  engineered: string;
  story: string;
  image: string;
  vibe: string;
  emoji: string;
  tilt: string;
};

const FRAGRANCES: Fragrance[] = [
  {
    code: "TAP-01",
    name: "Mango 12",
    family: "Tropical / Fresh",
    notes: ["Citrus", "Tropical", "Amber"],
    origin: "Konkan, India",
    engineered: "Engineered to feel refreshing and uplifted.",
    story:
      "Mango 12 captures the essence of vibrant tropical Konkan mangoes blended with crisp citrus and warm woods.",
    image: mango12.url,
    vibe: "smells like skipping class in May.",
    emoji: "🥭",
    tilt: "-rotate-2",
  },
  {
    code: "TAP-02",
    name: "Sambac 8",
    family: "Floral / Soft",
    notes: ["Fresh", "Floral", "Musk"],
    origin: "Madurai, S. India",
    engineered: "Engineered to feel soft and gentle.",
    story:
      "Sambac 8 inherits an exceptionally intense sweet floral scent from jasmines found in the Madurai region of southern India, blended with rich creamy vanilla and musk.",
    image: sambac8.url,
    vibe: "smells like a temple courtyard at dusk.",
    emoji: "🌼",
    tilt: "rotate-1",
  },
  {
    code: "TAP-03",
    name: "Vetiver 16",
    family: "Earthy / Woody",
    notes: ["Citrus", "Woody", "Musk"],
    origin: "Les Cayes, Haiti",
    engineered: "Engineered for a long-lasting boost.",
    story:
      "Vetiver 16 envelops the earthy, damp vibes of Haitian vetiver found in Les Cayes, blended with dry woods and musk.",
    image: vetiver16.url,
    vibe: "smells like wet soil and quiet confidence.",
    emoji: "🌱",
    tilt: "-rotate-1",
  },
  {
    code: "TAP-04",
    name: "Bergamote 10",
    family: "Citrus / Leather",
    notes: ["Citrus", "Oriental", "Woody"],
    origin: "Reggio Calabria, Italy",
    engineered: "Engineered for deep emotional and psychological impact.",
    story:
      "Bergamote 10 brings the complex citrus freshness of bergamot from Reggio Calabria in southern Italy, blended with spicy woods and leather.",
    image: bergamote10.url,
    vibe: "smells like a freshly peeled orange in a leather chair.",
    emoji: "🍊",
    tilt: "rotate-2",
  },
  {
    code: "TAP-05",
    name: "Spice 21",
    family: "Spicy / Warm",
    notes: ["Warm", "Spicy", "Amber"],
    origin: "Malabar, W. India",
    engineered: "Engineered to boost body and mind.",
    story:
      "Spice 21 lets in the heat of Indian spices from the Malabar coast of western India, blended with sweet, warm woods.",
    image: spice21.url,
    vibe: "smells like a chai pan at sunrise.",
    emoji: "🌶️",
    tilt: "-rotate-2",
  },
];


function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Nav />
      <Hero />
      <VideoBanner />
      <Manifest />
      <Catalogue />
      <Sourcing />
      <Process />
      <Newsletter />
      <Footer />
    </div>
  );
}

function TopBar() {
  const items = [
    "Batch 0001 — now shipping",
    "Free ship over ₹2,500",
    "Made in a real lab, not a mood board",
    "48ml flasks · ₹999 each",
    "Sniff-tested by 1 chemist + 1 dog 🐕",
    "Smell loudly. Apologise later.",
  ];
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-border bg-foreground text-background">
      <div className="flex animate-marquee whitespace-nowrap py-1.5 mono text-[10px] tracking-[0.2em] uppercase">
        {loop.map((t, i) => (
          <span key={i} className="px-6 flex items-center gap-6">
            <span>{t}</span>
            <span aria-hidden className="text-background/40">◆</span>
          </span>
        ))}
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
          {[
            ["Catalogue", "catalogue"],
            ["Sourcing", "sourcing"],
            ["Process", "process"],
            ["Lab Notes", "lab-notes"],
          ].map(([l, id]) => (
            <a key={id} href={`#${id}`} className="mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground transition hover:text-foreground">
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
              <div className="flex flex-wrap items-center gap-3">
                <span className="tape -rotate-2">Vol. 01 — 2026 / Edition I</span>
                <span className="sticker animate-wobble">Batch 0001 · Fresh ↗</span>
              </div>
              <h1 className="font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.04em] font-light">
                Engineered<br />
                <span className="italic text-steel">scent,</span><br />
                raw &amp; a little<br />
                <span className="relative inline-block">
                  <span className="absolute inset-x-0 bottom-2 h-4 bg-[var(--tape)] -z-0" aria-hidden />
                  <span className="relative">unhinged.</span>
                </span>
              </h1>

              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                The Aroma Project is a working laboratory pretending to be a perfume brand.
                Five compositions. Real raw materials from Konkan to Calabria.
                Distilled in tiny batches and shipped from the bench — still smelling
                faintly of the chemist who made them.
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
                ["48ml", "Per Flask"],
                ["₹999", "Each"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="mono text-2xl">{v}</div>
                  <div className="ticker-label mt-2">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 relative border-l-0 border-t border-border lg:col-span-5 lg:border-l lg:border-t-0 bg-muted">
            <img src={spice21.url} alt="T.A.P Spice 21 — silver perfume bottle" className="h-full max-h-[720px] w-full object-cover" />
            <span className="tape absolute left-4 top-4 rotate-3">Specimen 005 / handle with glee</span>
            <span className="sticker absolute right-4 top-6 -rotate-6 animate-drip">🌶️ hot stuff</span>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between border-t border-border bg-background/90 px-4 py-2 mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              <span>FIG. 005 — TAP-05 / Spice 21</span>
              <span>48 ML · 1.62 FL.OZ</span>
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
            We treat perfumery as <em className="italic text-steel">applied chemistry</em>
            with a sense of humour. Every flask is mixed, macerated and filtered on
            the bench — then numbered, capped, kissed for luck, and shipped.
            The label is the data sheet. The packaging is the packaging.
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

        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FRAGRANCES.map((f, i) => (
            <FragranceCard key={f.code} f={f} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FragranceCard({ f, idx }: { f: Fragrance; idx: number }) {
  return (
    <article className="group relative flex flex-col bg-background p-5 transition hover:bg-card">
      <div className="flex items-start justify-between">
        <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {f.code}
        </span>
        <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          № {String(idx + 1).padStart(2, "0")} / 05
        </span>
      </div>

      <div className="my-6 flex aspect-[3/4] items-center justify-center overflow-hidden bg-muted bg-grid">
        <img
          src={f.image}
          alt={`T.A.P ${f.name} — 48ml eau de parfum`}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
          loading={idx < 2 ? "eager" : "lazy"}
        />
      </div>

      <h3 className="mono text-lg uppercase tracking-[0.15em] font-medium">{f.name}</h3>
      <div className="mono mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {f.family} · {f.origin}
      </div>

      <dl className="mt-5 space-y-1 border-t border-border pt-4 text-xs">
        <div className="ticker-label mb-2">Notes</div>
        {f.notes.map((n, i) => (
          <div key={n} className="flex gap-3 text-foreground/80">
            <dt className="mono w-6 text-muted-foreground">{String(i + 1).padStart(2, "0")}</dt>
            <dd className="mono uppercase tracking-[0.15em]">{n}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
        <div>
          <div className="ticker-label">Vol</div>
          <div className="mono mt-1 text-xs">48 ml · 1.62 fl.oz</div>
        </div>
        <div className="text-right">
          <div className="ticker-label">Price</div>
          <div className="mono mt-1 text-base">₹ 999</div>
        </div>
      </div>

      <button className="mono mt-4 border border-foreground bg-transparent px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-background">
        Acquire ↗
      </button>
    </article>
  );
}

function Sourcing() {
  return (
    <section id="sourcing" className="border-b border-border bg-card">
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-border pb-6">
          <div className="space-y-3">
            <span className="ticker-label">§ 03 / Sourcing</span>
            <h2 className="font-display text-4xl tracking-[-0.03em] md:text-5xl font-light">
              Raw materials, real places.
            </h2>
          </div>
          <span className="mono hidden text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:inline">
            5 origins · 4 countries
          </span>
        </div>

        <ol className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-5">
          {FRAGRANCES.map((f, i) => (
            <li key={f.code} className="flex flex-col gap-4 bg-background p-6">
              <div className="flex items-center justify-between">
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Origin / 0{i + 1}
                </span>
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {f.code}
                </span>
              </div>
              <div>
                <div className="mono text-sm uppercase tracking-[0.15em]">{f.origin}</div>
                <div className="ticker-label mt-1">{f.name}</div>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {f.story}
              </p>
              <p className="mono mt-auto text-[10px] uppercase tracking-[0.18em] text-steel">
                {f.engineered}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["Source", "Raw materials catalogued from Konkan, Madurai, Les Cayes, Calabria and Malabar. Weighed to the milligram."],
    ["Compose", "Formulas drafted on paper, mixed on the bench. Iterated across 40–60 trial flasks per composition."],
    ["Macerate", "Each batch rests in amber glass for 6 weeks. Filtered, decanted, and bottled by hand."],
    ["Dispatch", "Sealed, numbered, and shipped direct. No retailers. No middlemen."],
  ];
  return (
    <section id="process" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-3 space-y-3">
            <span className="ticker-label">§ 04 / Process</span>
            <h2 className="font-display text-4xl tracking-[-0.03em] font-light md:text-5xl">
              Bench to bottle.
            </h2>
          </div>
          <div className="md:col-span-9">
            <img src={heroLab} alt="Laboratory still life with glassware" className="mb-10 w-full grayscale" />
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
          <span className="mono text-[10px] uppercase tracking-[0.2em] text-background/60">§ 05 / Lab Notes</span>
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

function VideoBanner() {
  return (
    <section className="relative w-full overflow-hidden border-b border-border">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-[40vh] w-full object-cover md:h-[50vh]"
        src={labBanner.url}
      />
      <div className="absolute bottom-0 left-0 right-0 flex justify-between border-t border-border bg-background/80 px-6 py-2 mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
        <span>Batch 0001 — Atmosphere Study</span>
        <span>Vol. 01 — 2026</span>
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
              Mixed, bottled and dispatched direct.
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
            <div className="mono text-xs">lab@aromaproject.in</div>
            <div className="mono text-xs">48 ml · 1.62 fl.oz</div>
            <div className="mono text-xs">₹ 999 per flask</div>
          </div>
        </div>
        <div className="hairline mt-12 flex flex-col justify-between gap-3 pt-6 mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row">
          <span>© 2026 The Aroma Project</span>
          <span>All formulas proprietary · Made in India</span>
        </div>
      </div>
    </footer>
  );
}
