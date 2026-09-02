# Barath P — Personal Portfolio

A static, responsive personal portfolio built with plain HTML, CSS, and JavaScript — no build tools, no framework, no backend. Designed to be deployed on **Azure Static Web Apps** via **GitHub**.

## Folder structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   └── profile.jpg
│   └── resume/
│       └── Barath_P_Resume.pdf
└── README.md
```

## Before you go live — things to update

The site only uses information from your resume, plus a couple of clearly-marked placeholders you should fill in:

- **`index.html` → Projects section**: replace `[Add project repo/demo URL]` with a real link to the EduBlock project (repo or live demo) if you have one.
- **`index.html` → `<meta property="og:url">`**: replace `https://[add-your-deployed-url].azurestaticapps.net` with your real deployed URL once you have it.
- **`assets/resume/Barath_P_Resume.pdf`**: swap in an updated resume any time — just keep the same filename, or update the `href` in the "Download Resume" buttons in `index.html` if you rename it.
- **`assets/images/profile.jpg`**: swap in a different photo any time — just keep the same filename, or update the `src` in the About section.

## Running it locally

No build step is required — it's static HTML/CSS/JS.

**Option 1 — just open it**
Double-click `index.html`, or open it directly in a browser.

**Option 2 — local server (recommended, avoids browser file:// quirks)**

With Python installed:

```bash
cd portfolio
python -m http.server 8000
```

Then visit `http://localhost:8000`.

With Node.js installed:

```bash
cd portfolio
npx serve .
```

## Uploading to GitHub

```bash
cd portfolio
git init
git add .
git commit -m "Initial commit: personal portfolio"
git branch -M main
git remote add origin https://github.com/BARATH-1417/<your-repo-name>.git
git push -u origin main
```

Replace `<your-repo-name>` with the repository you create on GitHub for this project.

## Deploying to Azure Static Web Apps

**Option A — Azure Portal (no CLI needed)**

1. Push the project to a GitHub repository (see above).
2. Go to the [Azure Portal](https://portal.azure.com) → **Create a resource** → search **Static Web App** → **Create**.
3. Fill in:
   - **Subscription** / **Resource group** — pick or create one.
   - **Name** — e.g. `barath-portfolio`.
   - **Plan type** — `Free`.
   - **Deployment source** — `GitHub`, then sign in and select your repository and `main` branch.
4. Build details:
   - **Build presets** — `Custom`.
   - **App location** — `/` (or `portfolio` if the repo root isn't the site root).
   - **Api location** — leave blank (no backend).
   - **Output location** — leave blank (static files served as-is).
5. Click **Review + Create** → **Create**. Azure automatically adds a GitHub Actions workflow (`.github/workflows/azure-static-web-apps-*.yml`) to your repo and deploys on every push to `main`.
6. Once the first deployment finishes, your site is live at the generated `https://<app-name>.azurestaticapps.net` URL, shown in the Azure Portal under your Static Web App's **Overview**.

**Option B — Azure CLI**

```bash
az login
az staticwebapp create \
  --name barath-portfolio \
  --resource-group <your-resource-group> \
  --source https://github.com/BARATH-1417/<your-repo-name> \
  --location "Central US" \
  --branch main \
  --app-location "/" \
  --output-location "" \
  --login-with-github
```

This also wires up the GitHub Actions workflow automatically.

## Updating the live site

Any push to `main` redeploys automatically:

```bash
git add .
git commit -m "Update portfolio"
git push
```

## Connecting a custom domain later

1. In the Azure Portal, open your Static Web App resource.
2. Go to **Custom domains** → **Add**.
3. Choose:
   - **Free domain** (a `*.azurestaticapps.net` subdomain — no setup needed), or
   - **Custom domain** you own (e.g. `barathp.dev`).
4. For a custom domain, Azure will show you a DNS record to add (usually a `CNAME` pointing to your `*.azurestaticapps.net` address, or a `TXT` record for validation). Add that record with your domain registrar (GoDaddy, Namecheap, Google Domains, etc.).
5. Wait for DNS propagation (can take a few minutes to a few hours), then Azure automatically validates and issues a free TLS certificate for HTTPS.
6. Once validated, your custom domain will serve the same site with HTTPS enabled by default.

---

Built as a static site so it's cheap to host, fast to load, and easy to hand off to any static hosting provider if you ever move off Azure.
