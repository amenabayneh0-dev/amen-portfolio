# Amen — Portfolio

A single-page, animated personal portfolio built with React 19, TypeScript, Tailwind CSS v4 and Framer Motion, server-rendered with [TanStack Start](https://tanstack.com/start). It is configured to deploy on **Vercel**.

## Sections

| Section          | File                  | What it shows                             |
| ---------------- | --------------------- | ----------------------------------------- |
| Header / Hero    | `HeroSection.tsx`     | Sticky nav, animated heading and portrait |
| Marquee          | `MarqueeSection.tsx`  | Scrolling logo/image strip                |
| About            | `AboutSection.tsx`    | Bio with a scroll-reveal text animation   |
| Skills           | `SkillsSection.tsx`   | Auto-scrolling row of skill pills         |
| Services         | `ServicesSection.tsx` | Numbered list of services                 |
| Projects         | `ProjectsSection.tsx` | Scroll-driven stacked project cards       |
| Footer / Contact | `FooterSection.tsx`   | Call to action, email and social links    |

All section files live in `src/components/jack/`. Images live in `src/assets/`.

## Run locally

Requires **Node.js 20+**.

```bash
npm install      # an .npmrc in the repo sets legacy-peer-deps automatically
npm run dev      # start the dev server
```

Other scripts: `npm run build` (production build), `npm run lint`, `npm run format`.

## Customize your content

Before deploying, replace the placeholders:

- **Email:** `amenabayneh0@gmail.com` (already set) in `src/components/jack/ContactButton.tsx` and `FooterSection.tsx`
- **GitHub link:** `https://github.com/amenabayneh0-dev` (already set) in `FooterSection.tsx`; Instagram and Telegram are set to `@xausolus`
- **Bio:** the text in `AboutSection.tsx`
- **Skills / services / projects:** `SkillsSection.tsx`, `ServicesSection.tsx`, `ProjectsSection.tsx`
- **Images:** replace `src/assets/amen-portrait.png` and the `project-*.png` files (keep the same filenames, or update the imports)
- **Page title / description:** `src/routes/index.tsx` and `src/routes/__root.tsx`

---

## Deploy to Vercel through GitHub

### 1. Push the project to GitHub

1. Create a new **empty** repository on [github.com/new](https://github.com/new) (no README, no .gitignore).
2. In the project folder, run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If the folder already has a git history (for example you cloned it), run `git remote set-url origin <new-repo-url>` instead of `git remote add origin ...`.

### 2. Import the repo into Vercel

1. Sign in at [vercel.com](https://vercel.com) with **Continue with GitHub**.
2. Click **Add New… → Project**.
3. Find your repository and click **Import**. If it isn't listed, click **Adjust GitHub App Permissions** and grant Vercel access to it.

### 3. Check the build settings

Vercel should detect everything automatically. Confirm these values:

| Setting          | Value                                                          |
| ---------------- | -------------------------------------------------------------- |
| Framework Preset | TanStack Start (or Other, if not listed)                       |
| Build Command    | `npm run build` (default)                                      |
| Install Command  | `npm install` (default; `.npmrc` handles peer dependencies)    |
| Output Directory | leave blank; the build writes Vercel's `.vercel/output` itself |
| Node.js Version  | 20.x or newer (22.x is the default)                            |

No environment variables are required.

### 4. Deploy

Click **Deploy**. The first build takes about a minute. When it finishes, Vercel gives you a live URL like `https://your-repo.vercel.app`.

### 5. Updating the site

Every `git push` to `main` triggers a new production deployment automatically. Pushes to other branches and pull requests get their own preview URLs.

### 6. Add a custom domain (optional)

In the Vercel dashboard open **Project → Settings → Domains**, add your domain, and set the DNS records Vercel shows you at your domain registrar.

## How the Vercel build works

`vite.config.ts` sets the Nitro preset to `vercel`:

```ts
nitro: { preset: "vercel" }
```

`npm run build` then writes Vercel's Build Output API format to `.vercel/output/` (static files plus a serverless function for server rendering), and Vercel serves that directly. To deploy on Cloudflare Pages instead, change the preset to `"cloudflare-module"`.

## Troubleshooting

| Problem                                      | Fix                                                                                                          |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `ERESOLVE unable to resolve dependency tree` | Make sure `.npmrc` (`legacy-peer-deps=true`) is committed, or run `npm install --legacy-peer-deps`.          |
| Build succeeds but the site shows a 404      | Confirm `nitro: { preset: "vercel" }` is in `vite.config.ts` and that Output Directory is blank in Vercel.   |
| Images missing after swapping                | Check that the filenames in `src/assets/` match the imports in the section files.                            |
| Changes don't appear                         | Confirm you pushed to the branch Vercel treats as Production (`main` by default).                            |

---

© 2026 Amen. All rights reserved.
