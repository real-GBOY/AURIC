# AURIC — Social visual guidelines

The website is the source of truth for every value in this guide. Each one cites the file it was taken from.
Anything that could not be verified is marked **Assumption**.

The implementation is [`assets/brand.css`](assets/brand.css) and [`assets/brand.js`](assets/brand.js). Every post imports both,
so a change made there reaches every post.

---

## 1. Colour

All values come from `tailwind.config.js` and `src/index.css` (`:root`).

| Token | HEX | Role on the site | Role on social |
|---|---|---|---|
| `ink` | `#0A0A0B` | Page background | Main canvas, about 50% of posts |
| `bg` | `#121214` | Alternate section background | Second dark surface, for carousel rhythm |
| `surface` | `#19191B` | Cards, frames | Cards, calendar panels |
| `surface-2` | `#202023` | Frame bars | Browser frame bar, empty calendar cells |
| `cream` | `#F4F1E8` | Headline colour; light sections (Services → Create) | Headline colour on dark; light canvas |
| `sand` | `#D9D4C7` | Calendar pill cells | Same |
| `gold` | `#DCA733` | The single accent: buttons, labels, the full stop | Accent, CTA canvas, the full stop |
| `gold-hi` | `#E6B545` | Button hover | Not used in statics |
| `gold-deep` | `#7A5A12` | Labels on cream | Labels and accents on cream (gold is too light there) |
| `muted` | `#96928A` | Mono labels | Mono labels, counters |
| `copy` | `#B3AFA6` | Body text on dark | Body text on dark |
| `charcoal` | `#3A3A3F` | Timeline pill, frame dots | Unlit sun rays, pill cells |
| text on gold/cream | `#141414` | `btn-gold` text, cream section text | Same |
| body on cream | `#4A4740` | Services copy on cream | Same |
| hairline | `rgba(244,241,232,.12)` / `.24` | `--line`, `--line-strong` | Row dividers, chip borders |

**Proportion:**

- Dark canvases carry the feed.
- Cream and gold alternate in for rhythm, about one in three.
- Gold is never a large area on a dark post; it is the accent.
- On a gold post, everything else is `#141414`.

**Gradients (from `og.html`):**

- Only one: a soft gold radial glow, `radial-gradient(circle at 88% 18%, rgba(220,167,51,.16), transparent 46%)`.
- No multi-colour gradients.

## 2. Typography

The fonts are self-hosted in `public/fonts`, and their roles come from the comment in `src/fonts.css` and `src/index.css`. The files are copied to `assets/fonts/`.

| Role | Font | Site setting | Social setting (1080 canvas) |
|---|---|---|---|
| Display ("mega") | **Unbounded** 800 | line-height .88, tracking −0.055em | 96–230px, same leading and tracking |
| Headline ("h2") | Unbounded 700 | lh .95, tracking −0.04em | 66–94px |
| Subhead ("h3") | Unbounded 600 | lh 1.15, tracking −0.01em | 30–46px |
| Body | **Geist** 400–500 | 15–17px, lh 1.55 | 32–42px, lh 1.4–1.45 |
| Label ("lab") | **Geist Mono** 500, uppercase | 11.5px, tracking .12em | 18–22px, tracking .12em |
| Wordmark only | **Press Start 2P** | Logo only | Logo only. Never for any other text |
| Arabic display | Alexandria 800–900, no negative tracking | `/ar` pages | Arabic versions |
| Arabic text | IBM Plex Sans Arabic | `/ar` pages | Arabic versions |

**Signature details to keep:**

- **The gold full stop.** Headlines end in a gold `.` or `?` (e.g. "One partner**.**"). On gold canvases it turns `#141414`.
- **Outlined type.** For one phrase per headline at most (site: `.stroke-gold`, `.stroke-cream`).
  - Rendered with `paint-order: stroke fill`, so the overlapping contours of the variable font stay clean.
  - Slightly looser tracking (−0.012em).
- **Numbered mono labels:** "01 / AURIC CREATE", "02 / 06".
- **Minimum sizes:**
  - Body never below 30px on a 1080 canvas.
  - Labels never below 18px.
  - Captions inside images never below 22px.

## 3. Logo

Source: `src/components/Logo.tsx`. The PNG exports are in `assets/logo/`.

**Mark:**

- 12 rays, 30° apart, alternating long (5.8 × 14) and short (4.5 × 9), radius 1.2, around a core of r 10.2, on a 64 grid.
- Gold on dark. `#141414` on gold. Gold or `#141414` on cream.

**Lockup:**

- The mark, then the wordmark in Press Start 2P: "A**U**RIC", with the U in gold.
- Gap is about 0.4× the mark height.
- Always left-to-right, even in Arabic layouts.

**Placement on social:**

- Top-left at the 80px margin, 40px mark and 24px wordmark, on covers and end slides.
- Inner carousel slides drop the logo and use a mono label in its place, so the work gets the room.

**Never:**

- Redraw, stretch, rotate or recolour the rays individually. The one exception is the progress use in §5, which keeps the geometry and only dims unlit rays.
- Set the wordmark in any other font.
- Add effects (glow, bevel, gradient) to it.

**Profile picture:** `assets/logo/profile-picture.png` (`#141414` mark on gold), cropped as a circle by the app.

Files:

- `lockup-on-ink.png`
- `lockup-on-cream.png`
- `lockup-on-gold.png`
- `mark-gold-on-ink.png`
- `profile-picture.png`
- `app-icon.svg` (the site favicon)

## 4. Layout and spacing

- **Canvases:**
  - 1080 × 1350 (feed, 4:5)
  - 1080 × 1920 (Story)
  - 1200 × 627 (LinkedIn)
  - 1080 × 1080 (square, if needed)
- **Margin: 80px all round** on feed posts. This is the safe area.
  - The Instagram profile grid crops 4:5 posts to 3:4, which takes about 34px off each side. Nothing important sits in the outer 80px.
- **Stories:** keep the top 250px and bottom 300px clear of text (the app UI covers them).
- **Structure, which mirrors the site sections:**
  - top bar: logo or label left, counter right
  - big headline
  - supporting copy
  - footer: handle left, swipe cue or CTA right
- **Rows:** hairline-divided numbered lists (site services list, packages, process).
- **Radii:**
  - Buttons 8px (site 4px at 1×).
  - Media tiles 18px (site 10px).
  - Chips and pills fully round.
  - Browser frames 14px.

## 5. Recurring visual elements (the system)

| Element | Site source | Use on social |
|---|---|---|
| **Media pills inside headlines**: timeline (video), calendar (strategy), `</>` (build), check (delivered) | `HeroPills.tsx` | Cover of Post 01 (the hero, transposed); one pill on each capability cover (Build = code, Create = timeline, Strategy = calendar) |
| **The sun mark as a diagram** | `Logo.tsx` | Post 03 labels its 12 rays as disciplines. This is a campaign reading of the mark, not its documented origin; confirm with the founder before stating it as the logo's meaning |
| **The sun as progress** | Workspace product: rays light with progress | Post 09: rays light up step by step (0 → 12) |
| **Browser frame** around real product screens | `.frame` | Every software screenshot. Never a fake screen |
| **Content calendar grid** (gold, cream, charcoal cells) | Services → Strategy | Strategy posts |
| **Big outlined and solid numerals** 01–04 | How we work | Process and question carousels |
| **Grid texture** (72px, radial mask) + gold glow | `og.html` | Background on dark covers, at most one texture per slide |
| **Perspective grid floor** | Built from the site grid | Experience only, so that pillar has its own feel |
| **Slot labels** on media ("BRAND FILM · TCG") | `.slot` | Captions on work images |

## 6. Image direction

- **Real work only.**
  - Product screenshots come from `public/work/` and keep their frame.
  - Video stills come from the delivered films.
  - Every image has a mono label stating what it is and whether it was client work, an AURIC product or a showcase build.
- **Photography:** the site has no stock imagery. Keep it that way.
  - When people appear, they are clients in delivered work or the real AURIC team.
  - No stock "business people".
  - No AI-generated people.
- **Treatment:**
  - Full-bleed stills get a dark gradient at the bottom (to `#0A0A0B`) for type.
  - No colour filters on client work: its colours belong to the client's brand.
- **Illustration:**
  - Only geometric, built from the system (sun, grid, pills, bars).
  - No 3D blobs.
  - No isometric clip-art.

## 7. Motion language

Source: `motion.ts`, `HeroPills.tsx`, `index.css`.

- **Ease:** `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Entrance durations:** 0.6–0.9s.
- **Reveals:**
  - Fade and rise 28px.
  - Pieces drop in with −2° rotation that settles to 0.
  - Pills grow from 20% width.
- **Loops:**
  - The timeline playhead sweeps (6s).
  - The code cursor blinks (1.1s step).
  - The marquee scrolls (32s).
- **Social motion:** use these same moves, nothing else. No glitch, no bounce, no 3D spin. Each post's `caption.md` gives motion notes.

## 8. Social layout principles

1. One idea per slide. If it needs two headlines, it needs two slides.
2. The headline carries the post; body copy confirms it in 40 words or fewer.
3. Alternate canvases inside a carousel (dark, cream, dark, gold) so each swipe registers as a change.
4. Covers must work as a 3:4 grid tile and on their own.
5. The end slide is the CTA, and it is the only slide with a button.
6. Captions add context the image doesn't (the story, the why), and are never the slide text pasted again.

## 9. Do / avoid

| Do | Avoid |
|---|---|
| Use the gold full stop and Unbounded at display sizes | Mixing in other display fonts or script fonts |
| Show real screens in frames, labelled honestly | Mock-ups of products that don't exist, fake dashboards |
| Use a lot of negative space on `#0A0A0B` | Filling space with icons, emojis or decorative shapes |
| One accent colour (gold) | Neon, purple or blue "tech" gradients |
| Mono labels for metadata | Pills and badges on every element |
| Plain, specific copy ("A website that books appointments.") | "Next level", "unleash", "cutting-edge", "solutions" |
| Mark examples as examples ("Illustrative example") | Presenting concept work as client work |
| Use the logo at the top-left at 40px | Giant logo stamps on every post (the sun as a large graphic is fine; the lockup stays small) |
