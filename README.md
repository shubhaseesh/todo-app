# For Nidhi

A light-pink, bilingual (English + Hindi) note for **Nidhi**, from **Shubhaseesh** — friendship, apology, and honesty — built for [GitHub Pages](https://pages.github.com/).

## Local preview

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173/sorry-name/`).

## Edit your message

Almost everything lives in one file:

**[`src/content.ts`](src/content.ts)**

| What to change | Where in `content.ts` |
|----------------|------------------------|
| Names | `herName`, `yourName` |
| Hero (English) | `hero.title`, `hero.subtitle` |
| Section titles | `sections.*` |
| English letter | `letterEn` array |
| Hindi letter | `letterHi` array |
| Quotes | `quotes` — each has `lang: 'hi' \| 'en'`, `text`, `author` |
| Closing | `closing.lineHi`, `closing.feelingsHi`, `closing.signature`, `closing.signatory` |
| Photos | `photos` array — see below |

Empty Hindi quote slots show *“Apni line yahan likho”* until you fill in `text`.

## Add photos

1. Copy your images into [`public/photos/`](public/photos/) (e.g. `nidhi-1.jpg`, `nidhi-2.jpg`).
2. Update the `photos` list in `src/content.ts`:

```ts
photos: [
  { src: 'photos/nidhi-1.jpg', alt: 'Our day at the beach', caption: 'Summer 2024' },
  { src: 'photos/nidhi-2.jpg', alt: 'Smiling together' },
],
```

Remove entries you do not need, or add more — the gallery adapts (grid on desktop, swipe on mobile).

## Deploy to GitHub Pages

1. Push this repo to GitHub as **`sorry-name`** (must match `base` in [`vite.config.ts`](vite.config.ts)).
2. In the repo: **Settings → Pages → Build and deployment → Source**: **GitHub Actions**.
3. Push to `main` (or `master`). The workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes `dist/`.
4. Your site URL: `https://<your-username>.github.io/sorry-name/`

### Different repo name?

If the GitHub repo name is not `sorry-name`, change `base` in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/your-repo-name/',
})
```

Then update the GitHub Pages URL accordingly.

## Structure

```
src/content.ts   ← edit text here
src/main.ts      ← layout & behavior
src/styles.css   ← colors & typography
public/photos/   ← your images
```

Made with care for Nidhi.
