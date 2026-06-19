# Incydent Reporter

Static SPA version of the Powiadomienie o Awarii generator. Hosted on GitHub Pages at
**https://adambigos.github.io/Incydent_reporter/**.

## Local development

```bash
npm install
npm run dev
```

## Deploy

1. Create a new GitHub repo named `Incydent_reporter` under your account.
2. Copy the contents of this folder to the repo root and push to `main`.
3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Every push to `main` triggers the workflow in `.github/workflows/deploy.yml` and publishes `dist/` to Pages.

The Vite `base` in `vite.config.ts` is set to `/Incydent_reporter/` to match the repo path.
If you ever rename the repo, update that value.
