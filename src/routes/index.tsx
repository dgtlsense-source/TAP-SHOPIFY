import { createFileRoute, Link } from "@tanstack/react-router";
import mango12 from "@/assets/bottles/mango-12.jpg.asset.json";
import sambac8 from "@/assets/bottles/sambac-8.jpg.asset.json";
import vetiver16 from "@/assets/bottles/vetiver-16.jpg.asset.json";
import bergamote10 from "@/assets/bottles/bergamote-10.jpg.asset.json";
import spice21 from "@/assets/bottles/spice-21.jpg.asset.json";
import labBanner from "@/assets/lab-banner.mp4.asset.json";
import logo from "@/assets/brand/logo-v2.png.asset.json";
import hands from "@/assets/brand/hands.png.asset.json";
import collection from "@/assets/brand/collection.png.asset.json";
import labGiant from "@/assets/brand/lab-giant.png.asset.json";
import bottleHero from "@/assets/brand/bottle-hero.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "T.A.P — The Aroma Project · Engineered Fragrances" },
      {
        name: "description",
        content:
          "T.A.P — a modern perfumery lab. Five engineered fragrances: Mango 12, Sambac 8, Vetiver 16, Bergamote 10, Spice 21. 48ml · ₹999. Phthalate-free, cruelty-free.",
      },
      { property: "og:title", content: "T.A.P — The Aroma Project" },
      {
        property: "og:description",
        content:
          "Engineered for modern everyday rituals. Five fragrances, raw accords sourced from around the world.",
      },
      { property: "og:image", content: collection.url },
      { name: "twitter:image", content: collection.url },
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
};

const FRAGRANCES: Fragrance[] = [
  {
    code: "TAP-01",
    name: "MANGO 12",
    family: "TROPICAL / FRESH",
    notes: ["Citrus", "Tropical", "Amber"],
    origin: "Konkan, India",
    engineered: "Engineered to feel refreshing and uplifted.",
    story:
      "Mango 12 captures the essence of vibrant tropical Konkan mangoes blended with crisp citrus and warm woods.",
    image: mango12.url,
  },
  {
    code: "TAP-02",
    name: "SAMBAC 8",
    family: "FRESH / FLORAL / MUSK",
    notes: ["Fresh", "Floral", "Musk"],
    origin: "Madurai, S. India",
    engineered: "Engineered to feel soft and gentle.",
    story:
      "Sambac 8 inherits the exceptionally intense sweet floral scent from jasmines of the Madurai region, blended with rich creamy vanilla and musk.",
    image: sambac8.url,
  },
  {
    code: "TAP-03",
    name: "VETIVER 16",
    family: "EARTHY / WOODY",
    notes: ["Citrus", "Woody", "Musk"],
    origin: "Les Cayes, Haiti",
    engineered: "Engineered for a long-lasting boost.",
    story:
      "Vetiver 16 envelops the earthy, damp vibes of Haitian vetiver found in Les Cayes, blended with dry woods and musk.",
    image: vetiver16.url,
  },
  {
    code: "TAP-04",
    name: "BERGAMOTE 10",
    family: "CITRUS / LEATHER",
    notes: ["Citrus", "Oriental", "Woody"],
    origin: "Reggio Calabria, Italy",
    engineered: "Engineered for deep emotional and psychological impact.",
    story:
      "Bergamote 10 brings the complex citrus freshness of bergamot from Reggio Calabria, blended with spicy woods and leather.",
    image: bergamote10.url,
  },
  {
    code: "TAP-05",
    name: "SPICE 21",
    family: "SPICY / WARM",
    notes: ["Warm", "Spicy", "Amber"],
    origin: "Malabar, W. India",
    engineered: "Engineered to boost body and mind.",
    story:
      "Spice 21 lets in the heat of Indian spices from the Malabar coast, blended with sweet, warm woods.",
    image: spice21.url,
  },
];

const CORE_VALUES = ["PRECISION", "ORIGIN", "RAWNESS", "CONTROL", "DISTINCTION"];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Nav />
      <VideoBanner />
      <Hero />
      <Marquee />
      <BrandStory />
      <Catalogue />
      <Editorial />
      <Sourcing />
      <Purpose />
      <Newsletter />
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <div className="bg-foreground text-background">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-1.5 mono text-[10px] tracking-[0.25em] uppercase">
        <span>Batch 0001 — Now Shipping</span>
        <span className="hidden md:inline">Phthalate-free · Cruelty-free · Made in India</span>
        <span>Free Ship &gt; ₹2,500</span>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3">
          <img src={logo.url} alt="T.A.P — The Aroma Project" className="h-9 w-auto md:h-11" />
        </a>
        <nav className="hidden gap-8 md:flex">
          {[
            ["Catalogue", "catalogue"],
            ["Sourcing", "sourcing"],
            ["Lab", "lab"],
            ["Story", "story"],
          ].map(([l, id]) => (
            <a key={id} href={`#${id}`} className="mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground transition hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <Link
          to="/checkout"
          className="mono inline-flex items-center border border-foreground bg-foreground px-4 py-2.5 text-[11px] uppercase tracking-[0.25em] text-background transition hover:bg-background hover:text-foreground"
        >
          Acquire ↗
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative border-b border-border">
      <div className="bg-grid">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:py-24">
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-foreground" />
              <span className="ticker-label">Vol. 01 / 2026 — Edition I</span>
            </div>
            <h1 className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.88] tracking-[-0.01em] font-black uppercase">
              Engineered<br />
              for modern<br />
              <span className="text-steel">everyday</span><br />
              rituals.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              T.A.P is a modern perfumery lab — sourcing rare accords from
              farmlands across the world and shaping them into precise,
              long-lasting fragrance formulas. Each scent is crafted to elevate
              you and your surroundings, leaving a lasting impression.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#catalogue"
                className="mono inline-flex items-center border border-foreground bg-foreground px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] text-background transition hover:bg-background hover:text-foreground"
              >
                Discover the Five ↗
              </a>
              <a
                href="#story"
                className="mono inline-flex items-center border border-foreground bg-transparent px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] transition hover:bg-foreground hover:text-background"
              >
                Our Story
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4">
            {[
              ["05", "Compositions"],
              ["48 ml", "Eau de Parfum"],
              ["₹ 999", "Per Flask"],
              ["100%", "Phthalate-free"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-medium tracking-tight">{v}</div>
                <div className="ticker-label mt-2">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...CORE_VALUES, ...CORE_VALUES, ...CORE_VALUES];
  return (
    <div className="overflow-hidden border-b border-border bg-foreground text-background">
      <div className="flex gap-12 whitespace-nowrap py-4 mono text-[11px] tracking-[0.35em] uppercase animate-[marquee_40s_linear_infinite]">
        {items.map((v, i) => (
          <span key={i} className="flex items-center gap-12">
            {v} <span className="text-background/40">◆</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
    </div>
  );
}

function BrandStory() {
  return (
    <section id="story" className="border-b border-border">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 lg:py-28">
        <div className="md:col-span-4">
          <span className="ticker-label">§ 01 / Brand Story</span>
          <h2 className="font-display mt-4 text-5xl font-bold uppercase tracking-tight leading-[0.92] md:text-6xl">
            A lab,<br />not a<br />brand.
          </h2>
        </div>
        <div className="md:col-span-8 space-y-8">
          <p className="text-2xl leading-snug tracking-[-0.01em] md:text-3xl">
            T.A.P began as a small perfumery laboratory, sourcing rare accords
            from beautiful farmlands across the world and shaping them into
            <em className="italic text-steel"> precise modern fragrances.</em>
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Built on transparency, we reveal the accords behind every scent so
            consumers can discover, understand, and choose what truly becomes
            their signature.
          </p>
          <div className="border-t border-border pt-6">
            <div className="ticker-label mb-4">Core Values</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mono text-sm tracking-[0.2em]">
              {CORE_VALUES.map((v, i) => (
                <span key={v} className="flex items-center gap-3">
                  <span className="text-muted-foreground">0{i + 1}</span>
                  <span>{v}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Catalogue() {
  return (
    <section id="catalogue" className="border-b border-border bg-card">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:py-28">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-border pb-6">
          <div className="space-y-3">
            <span className="ticker-label">§ 02 / Catalogue</span>
            <h2 className="font-display text-5xl tracking-tight font-bold uppercase md:text-7xl">
              Five compositions.
            </h2>
          </div>
          <span className="mono hidden text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:inline">
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
        <span className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {f.code}
        </span>
        <span className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          № {String(idx + 1).padStart(2, "0")} / 05
        </span>
      </div>

      <div className="my-6 flex aspect-[3/4] items-center justify-center overflow-hidden bg-muted bg-grid">
        <img
          src={f.image}
          alt={`T.A.P ${f.name} — 48ml eau de parfum`}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]"
          loading={idx < 2 ? "eager" : "lazy"}
        />
      </div>

      <h3 className="font-display text-2xl font-bold uppercase tracking-tight">{f.name}</h3>
      <div className="mono mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {f.family}
      </div>
      <div className="mono mt-0.5 text-[10px] uppercase tracking-[0.2em] text-steel">
        ↳ {f.origin}
      </div>

      <dl className="mt-5 space-y-1 border-t border-border pt-4 text-xs">
        <div className="ticker-label mb-2">Notes</div>
        {f.notes.map((n, i) => (
          <div key={n} className="flex gap-3 text-foreground/80">
            <dt className="mono w-6 text-muted-foreground">{String(i + 1).padStart(2, "0")}</dt>
            <dd className="mono uppercase tracking-[0.18em]">{n}</dd>
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
          <div className="font-display mt-0.5 text-xl font-bold">₹ 999</div>
        </div>
      </div>

      <Link
        to="/checkout"
        className="mono mt-4 border border-foreground bg-transparent px-4 py-3 text-center text-[10px] uppercase tracking-[0.25em] transition hover:bg-foreground hover:text-background"
      >
        Acquire ↗
      </Link>
    </article>
  );
}

function Editorial() {
  return (
    <section className="relative border-b border-border bg-[#0d0d0d] text-background">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 relative">
          <img src={collection.url} alt="T.A.P — five fragrance collection on concrete plinths with lab glassware" className="h-full w-full object-cover" />
        </div>
        <div className="lg:col-span-5 flex flex-col justify-between gap-10 px-6 py-16 lg:px-12 lg:py-24">
          <div className="space-y-8">
            <span className="ticker-label text-background/60">§ The Collection</span>
            <h2 className="font-display text-5xl font-bold uppercase tracking-tight leading-[0.92] md:text-7xl">
              Raw materials.<br />
              <span className="text-background/50">Studied.</span>
            </h2>
            <p className="max-w-md text-background/70 leading-relaxed">
              Every accord is shown as a lab material — not a decorative prop.
              Five formulas. One philosophy: raw ingredients, precise composition,
              controlled design.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 mono text-xs tracking-[0.2em] uppercase border-t border-background/20 pt-6">
            {FRAGRANCES.map((f) => (
              <li key={f.code} className="flex justify-between gap-4 border-b border-background/10 pb-2">
                <span>{f.name}</span>
                <span className="text-background/50">{f.code}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Sourcing() {
  return (
    <section id="sourcing" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:py-28">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-border pb-6">
          <div className="space-y-3">
            <span className="ticker-label">§ 03 / Sourcing</span>
            <h2 className="font-display text-5xl tracking-tight font-bold uppercase md:text-6xl">
              Real places.<br />Rare accords.
            </h2>
          </div>
          <span className="mono hidden text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:inline">
            5 origins · 4 countries
          </span>
        </div>

        <ol className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-5">
          {FRAGRANCES.map((f, i) => (
            <li key={f.code} className="flex flex-col gap-4 bg-background p-6">
              <div className="flex items-center justify-between">
                <span className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Origin / 0{i + 1}
                </span>
                <span className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {f.code}
                </span>
              </div>
              <div>
                <div className="font-display text-xl font-bold uppercase tracking-tight">{f.origin}</div>
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

function VideoBanner() {
  return (
    <section className="relative w-full overflow-hidden border-b border-border">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-[40vh] w-full object-cover md:h-[60vh]"
        src={labBanner.url}
      />
      <div className="absolute bottom-0 left-0 right-0 flex justify-between border-t border-border bg-background/80 px-6 py-2 mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
        <span>Batch 0001 — Atmosphere Study</span>
        <span>Vol. 01 / 2026</span>
      </div>
    </section>
  );
}

function Purpose() {
  return (
    <section id="lab" className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 lg:py-28">
        <div className="md:col-span-4">
          <span className="ticker-label">§ 04 / Brand Purpose</span>
        </div>
        <div className="md:col-span-8 space-y-8">
          <p className="font-display text-3xl uppercase font-bold tracking-tight leading-[1.02] md:text-5xl">
            To enlighten the world with a deeper understanding of what they wear — bringing clarity, transparency, and sophistication to every fragrance experience.
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Through meticulously crafted formulas, we create scents that feel
            indulgent, empowering, and profoundly personal — elevating confidence
            with every spray. Our fragrances are <strong className="text-foreground">phthalate-free, toxin-free, and cruelty-free</strong>,
            created with respect for skin, life, and Mother Earth.
          </p>
          <div className="grid grid-cols-3 gap-px bg-border border border-border">
            {[
              ["Phthalate-free", "Skin-safe formulation"],
              ["Toxin-free", "Tested & verified"],
              ["Cruelty-free", "Never on animals"],
            ].map(([k, v]) => (
              <div key={k} className="bg-background p-5">
                <div className="font-display text-xl font-bold uppercase tracking-tight">{k}</div>
                <div className="ticker-label mt-1">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function Newsletter() {
  return (
    <section id="contact" className="border-b border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-20 md:grid-cols-12">
        <div className="md:col-span-6 space-y-4">
          <span className="mono text-[10px] uppercase tracking-[0.25em] text-background/60">§ 06 / Lab Notes</span>
          <h2 className="font-display text-5xl font-bold uppercase tracking-tight md:text-7xl">
            Dispatches<br />from the bench.
          </h2>
          <p className="max-w-md text-background/70">
            Formulation diaries, raw material studies, and early access to
            upcoming batches. Sent only when there is something to say.
          </p>
        </div>
        <form className="md:col-span-6 flex flex-col justify-end gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="you@domain.com"
            className="mono flex-1 border border-background/30 bg-transparent px-4 py-4 text-sm text-background placeholder:text-background/40 focus:border-background focus:outline-none"
          />
          <button className="mono border border-background bg-background px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-foreground transition hover:bg-transparent hover:text-background">
            Subscribe ↗
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 space-y-5">
            <img src={logo.url} alt="T.A.P" className="h-10 w-auto" />
            <p className="max-w-xs text-sm text-muted-foreground">
              The Aroma Project — a modern perfumery lab.
              Engineered for modern everyday rituals.
            </p>
            <div className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Phthalate-free · Toxin-free · Cruelty-free
            </div>
          </div>
          <div className="space-y-3">
            <div className="ticker-label">Catalogue</div>
            {FRAGRANCES.map((f) => (
              <div key={f.code} className="mono text-xs uppercase tracking-[0.15em]">{f.code} — {f.name}</div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="ticker-label">Lab</div>
            <a href="#story" className="mono block text-xs uppercase tracking-[0.15em]">Our Story</a>
            <a href="#sourcing" className="mono block text-xs uppercase tracking-[0.15em]">Sourcing</a>
            <a href="#lab" className="mono block text-xs uppercase tracking-[0.15em]">Brand Purpose</a>
            <Link to="/checkout" className="mono block text-xs uppercase tracking-[0.15em]">Checkout</Link>
          </div>
          <div className="space-y-3">
            <div className="ticker-label">Contact</div>
            <div className="mono text-xs">admin@thearomaproject.com</div>
            <div className="mono text-xs">www.thearomaproject.com</div>
            <div className="mono text-xs leading-relaxed text-muted-foreground">
              Zion, 1803 Sindhu Bhawan<br />
              Ahmedabad, India
            </div>
          </div>
        </div>
        <div className="hairline mt-12 flex flex-col justify-between gap-3 pt-6 mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:flex-row">
          <span>© 2026 The Aroma Project</span>
          <span>All formulas proprietary · Engineered in India</span>
        </div>
      </div>
    </footer>
  );
}

function BottleHero() {
  // reserved single-bottle hero image for future use
  return <img src={bottleHero.url} alt="T.A.P bottle" />;
}
void BottleHero;
