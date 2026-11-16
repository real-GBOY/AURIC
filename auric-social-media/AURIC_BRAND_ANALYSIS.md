# AURIC — Brand analysis

Phase 1 of the social media identity project. Written 16 Nov 2026.

## What was inspected, and how

| Source | Status | Notes |
|---|---|---|
| Website source (this repository, which deploys to `auric404.me`) | **Inspected** | `tailwind.config.js`, `src/index.css`, `src/fonts.css`, `src/components/Logo.tsx`, `src/components/home/HeroPills.tsx`, `src/components/layout/BigCTA.tsx`, `src/lib/content.ts`, `home-copy.ts`, `projects.ts`, `creative.ts`, `site.ts`, `motion.ts`, `scripts/og/og.html`, `public/favicon.svg` |
| Rendered website | **Inspected** | The local dev build of this repository, in a browser: Home (hero, marquee, What we do, Selected work, How we work, Ways to work with us), Services (Create, Strategy, Build, Manage), footer and closing CTA. It was not compared pixel by pixel with the deployed site; check `auric404.me` matches the `main` branch. |
| Portfolio and case studies | **Inspected** (from the data files and images in `public/work/`) | Software: Mizan, Atlas, Hotel OS, Digitmask ERP, Ajwadi, Raqib, Admit, Clinic OS, Enactix, Weavolution, Build Art, OptiCare. Creative: TCG brand film, TCG reel, ELK Café, Digitmask identity, Green Teaching Kitchen recap, AURIC showreel. |
| Logo and brand assets | **Inspected** | Sun mark geometry in `Logo.tsx`, app icon `favicon.svg`, share image `og-image.png`. There is no separate brand book in the repository. |
| Existing Instagram (`@auric404`) and LinkedIn (`linkedin.com/company/auric-co`) | **Not reviewed** | The links are listed in `src/lib/site.ts`. Previous posts were not looked at in this pass, so this plan does not assume anything about the current feed. Archive or keep old posts as a separate decision (see the strategy). |

## Positioning: what the site says today, and what the brief adds

**The site today** positions AURIC as *"Your digital partner"*, with four divisions:

| Division | Site wording |
|---|---|
| Create | Video editing, graphic design, motion graphics, voiceover and content, made to one standard. |
| Strategy | Marketing and content plans, campaigns and calendars, so every piece has a job. |
| Build | Websites, mobile apps, business systems and AI automation, engineered to last. |
| Manage | One owner coordinating every specialist, deadline and review, start to finish. |

Other lines it uses: *"Your idea planned, built, launched."*, *"One partner."*, *"One team and one point of contact."*,
*"Every project is priced after a short call."*, *"Let's make it real."* Process: Plan, Create, Build, Deliver.
It names its audiences as businesses, startups, entrepreneurs, professionals and personal brands.

**The brief adds a fifth pillar, Experience** (VR, interactive and technology-driven experiences). This is a real gap:

- The website does not mention VR or interactive experiences anywhere.
- No VR or interactive project appears in the portfolio.
- **What this plan does:** Experience gets one capability post (Post 07). It makes no claim of past work and uses no client names. **Confirm AURIC can deliver VR work before publishing it.** If that can't be confirmed, swap Post 07 for the backup post in the strategy document.
- **Recommendation:** add Experience to the website before or along with the campaign, so that people who click through from social find it there too.

**The ecosystem in the brief** (Build, Create, Strategy, Experience, Manage) fits the site's model. The campaign presents it as one
integrated offer, not five departments, which matches the site's own *"One partner"* message.

## Personality: the evidence on the site

| Trait | Where it shows on the site |
|---|---|
| Premium | Near-black canvas, one restrained gold accent, large type and a lot of negative space |
| Modern, technologically capable | Real product screens shown in browser frames; a `</>` code pill; monospace labels |
| Creative | Huge Unbounded headlines with media "pills" set inside them; outlined type; a marquee |
| Strategic, professional | Numbered rows (01–04), a content calendar grid, the process steps, and honest placeholders ("Real clients only · with permission") |
| Human, confident without arrogance | Short, plain sentences: "You bring the idea." "If it doesn't, we'll say so." No superlatives |
| Distinctive | The pixel wordmark (Press Start 2P) next to a sun mark with 12 rays |

## Assets that can and cannot be used

**Can be used (real and attributed on the site):**

- **Software:**
  - Mizan (client project, law firm)
  - Atlas (AURIC product)
  - Hotel OS (showcase build, not a client)
  - Ajwadi (project)
  - Digitmask ERP (client project)
  - and others
- **Creative client work:**
  - TCG brand film (six minutes, documentary style)
  - TCG reel (46 seconds)
  - ELK Café Saudi National Day identity and content
  - Digitmask visual identity
  - Green Teaching Kitchen event recap
- **Contact details:** auric404@gmail.com, WhatsApp +20 102 659 7474, New Maadi, Cairo.

**Must not be used yet:**

- **Client quotes.** The two quotes in `content.ts` (Husam, Social Lens; Mohamed Barom, Ajwadi) are marked *"Drafted … to approve before it goes live"*. Nothing in this campaign quotes a client, and no testimonial post exists until both people approve their quote in writing.
- **Client logos as endorsement.** The logo strip on the site shows who AURIC has worked with. Using those logos in an ad-style "trusted by" post needs each client's permission.
- **Numbers.** The site states no project counts, years or results. This campaign has no statistics.

## Gaps to close (needed for the next batch, not this one)

1. A confirmed Experience/VR capability, plus one real or self-initiated piece that can be shown honestly.
2. Approved client quotes, ideally with photos.
3. Real team and behind-the-scenes photography. The site has two team portraits (`public/team/`), which isn't enough for a culture pillar.
4. Short video cut-downs of the work for Reels: the TCG film, the showreel and the event recap already exist in `public/media/`.
5. A native Arabic copy pass. The campaign is in English first; Arabic versions are recommended for the Egypt/Gulf audience (see the strategy).
