## Replace catalogue with real T.A.P bottles & details

Now that you've shared the actual bottle renders, names, notes, sourcing stories and price, I'll swap the placeholder catalogue ("Concrete / Solvent / Graphite…") for the real product line and rework the brand voice to match.

### 1. Upload bottle images as assets
Push the 5 bottle photos (Mango 12, Sambac 8, Vetiver 16, Bergamote 10, Spice 21) through `lovable-assets` so they live on the CDN, then import their pointer JSON. Each fragrance gets its own hero render — no more drawn CSS bottle.

### 2. Rewrite the `FRAGRANCES` array
Replace with the 5 real compositions:

| Code | Name | Notes | Origin | Family |
|---|---|---|---|---|
| TAP-01 | Mango 12 | Citrus · Tropical · Amber | Konkan, India | Tropical / Fresh |
| TAP-02 | Sambac 8 | Fresh · Floral · Musk | Madurai, S. India | Floral / Soft |
| TAP-03 | Vetiver 16 | Citrus · Woody · Musk | Les Cayes, Haiti | Earthy / Woody |
| TAP-04 | Bergamote 10 | Citrus · Oriental · Woody | Reggio Calabria, Italy | Citrus / Leather |
| TAP-05 | Spice 21 | Warm · Spicy · Amber | Malabar, W. India | Spicy / Warm |

Each entry also stores: 48ml volume, ₹999 price, full sourcing description (your supplied paragraphs), and an "aroma engineered for…" tagline.

### 3. Redesign `FragranceCard`
- Use the real bottle image (silver bottle on warm grey) centered on a card with a subtle bg-grid backdrop.
- Below the image: code (TAP-0X) + name (e.g. "MANGO 12") in the exact label typography (bold condensed sans).
- Notes list rendered like the label: `01 CITRUS / 02 TROPICAL / 03 AMBER` in monospace.
- Footer row: `48 ML · 1.62 FL.OZ` left, `₹ 999` right, plus an "Acquire" button.
- Cards become 5-up on desktop (no more "TAP-06 in development" filler) — 1/2/3/5 column responsive grid, since the line is now complete at 5.

### 4. Add a "Sourcing" / story section
New section between Catalogue and Process: "§ 03 / Sourcing" — a horizontal strip with each fragrance's origin pin (Konkan, Madurai, Les Cayes, Reggio Calabria, Malabar) and its short engineered-for line. Reinforces the d2c "raw materials, real places" angle.

### 5. Brand-voice & metadata cleanup
- Hero copy stays minimal-lab but drops the UK/London framing (since sourcing is global, ops are India-implied). Footer address swapped to a neutral "lab@aromaproject.in" placeholder.
- Currency: ₹ everywhere (free shipping line: "Free shipping · orders > ₹2,500").
- Update `<title>` + meta description to mention the 5 named fragrances.
- Replace the generated `bottles-row.jpg` hero/process image with a composition built from the real bottle photos (or reuse one bottle close-up); delete the no-longer-used `bottles-row.jpg` generation if it's only referenced there.

### 6. Files touched
- `src/assets/bottles/*.asset.json` (new, 5 pointers)
- `src/routes/index.tsx` (FRAGRANCES data, FragranceCard, new Sourcing section, copy/currency)
- `src/routes/__root.tsx` (meta description)

### Technical notes
- Images go via `lovable-assets create --file /mnt/user-uploads/... --filename mango-12.jpg` so binaries stay off the repo.
- Card grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5` with `gap-px` on a border background for the hairline-divider look.
- Keep the existing concrete/steel design tokens — no CSS changes needed.

Approve and I'll build it.