# Abdulloh Talibov — portfolio

Personal site: who I am, what I build, and three case studies (customer-chat routing, clinic CRM analytics,
and joining an ERP after its MVP).

## Run it

```bash
npm install
npm run dev        # http://localhost:3100 while editing
npm run build      # static export to ./out
npm run preview    # serve ./out at http://localhost:3101, exactly as a static host would
npm run check      # after a build: accessibility (axe, WCAG 2.1 AA), layout at 390/768/1440 px in light
                   # and dark, broken links and anchors, keyboard skip link, reduced motion
```

## Edit the content

All text lives in [`src/content/site.ts`](src/content/site.ts): profile, experience, projects, skills,
education and contact links. Fields marked optional (job title, dates, email) are simply not shown until they
are filled in.

## Deploy

`npm run build` produces a plain static site in `out/`. It can be served by any static host
(Vercel, Netlify, Cloudflare Pages, GitHub Pages).

- Set `SITE_URL` to the public address (for example `SITE_URL=https://<user>.github.io/CV`) to add canonical
  links and absolute share URLs.
- For a sub-path such as `https://<user>.github.io/CV/`, also set `BASE_PATH=/CV`. Preview that build with
  `BASE_PATH=/CV npm run preview` and open `http://localhost:3101/CV/`.
- `public/.nojekyll` is included so GitHub Pages serves the `_next/` folder.

## Stack

Next.js 15 (App Router, static export) · React 19 · TypeScript · hand-written CSS with design tokens (light and
dark themes) · Playwright + axe for checks. No tracking, no external requests at runtime.
