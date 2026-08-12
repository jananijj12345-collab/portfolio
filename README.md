# Janani J — Portfolio

A single-page React + Vite portfolio for Janani J (B.Com Accounting & Finance).

## Local Development

```bash
npm install
npm run dev        # start dev server
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npm run lint       # run ESLint
```

## Deploying to GitHub Pages

The repo includes a ready-to-use GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the app and publishes it to GitHub Pages on every push to `main`.

### One-time setup (per repository)

1. Create a repo on GitHub and push this project to it (default branch **main**).

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. In the repo on GitHub go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push any commit to `main` (or go to **Actions → Deploy to GitHub Pages → Run workflow**) to trigger the first deployment.

Your site will be live at:

```
https://<your-username>.github.io/<your-repo>/
```

### How it works

- `vite.config.js` sets `base: './'` so all asset URLs are relative — this makes the site work regardless of the repository name.
- The workflow uses the official `configure-pages` / `upload-pages-artifact` / `deploy-pages` actions (no gh-pages branch needed).
- A `.nojekyll` file is added to the build output so GitHub Pages doesn't run Jekyll on the files.

### Updating content

- **Resume PDF**: replace `src/assets/resume.pdf` (used by the "Download Resume" buttons).
- **Personal info / skills / contact**: edit the data arrays at the top of `src/App.jsx`.
- After changes, commit and push to `main` — the workflow deploys automatically.
