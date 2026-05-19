# Deploying FRANKO CLOTHING to DigitalOcean

Full stack: **Strapi CMS + PostgreSQL + Spaces CDN** — all on DigitalOcean.

---

## Prerequisites

- DigitalOcean account
- GitHub account (repo must be public or connected to DO)
- Node.js 18+ installed locally

---

## Step 1 — Create a DigitalOcean Space (file storage)

1. DO Dashboard → **Spaces Object Storage** → **Create a Space**
2. Choose region (e.g. `nyc3`) — remember this, you'll need it
3. Name it `franko-clothing-media`
4. Under **Settings → CDN** → enable CDN
5. Note your CDN endpoint: `https://franko-clothing-media.nyc3.cdn.digitaloceanspaces.com`
6. GO to **API → Spaces Keys** → **Generate New Key**
7. Save the **Access Key** and **Secret Key** — you only see the secret once

---

## Step 2 — Push to GitHub

```bash
cd clothing-line
git add .
git commit -m "add Strapi backend and dynamic frontend"
git push origin main
```

---

## Step 3 — Deploy via App Platform

### Option A — One-click with app.yaml (recommended)

1. Open `.do/app.yaml` and replace every `YOUR_GITHUB_USERNAME` with your actual GitHub username
2. In the DO dashboard: **App Platform → Create App → From GitHub**
3. Select your repo and branch (`main`)
4. DO will detect the `app.yaml` — review and confirm
5. Fill in all `SECRET` env vars in the dashboard before deploying:

| Key | Value |
|-----|-------|
| `APP_KEYS` | 4 random strings, comma-separated (e.g. use `openssl rand -base64 32` × 4) |
| `API_TOKEN_SALT` | random string |
| `ADMIN_JWT_SECRET` | random string |
| `TRANSFER_TOKEN_SALT` | random string |
| `JWT_SECRET` | random string |
| `DO_SPACES_KEY` | from Step 1 |
| `DO_SPACES_SECRET` | from Step 1 |

6. Click **Deploy**

### Option B — Manual via dashboard

Same as above but configure each service manually through the UI.

---

## Step 4 — Create your Strapi admin account

Once deployed (takes ~5 min):

1. Visit `https://YOUR-APP.ondigitalocean.app/admin`
2. Register your admin user (first visit only)
3. You're in the CMS — start adding products and blog posts

---

## Step 5 — Point your frontend at the backend

Open `js/config.js` and set your backend URL:

```js
window.STRAPI_URL = 'https://YOUR-APP.ondigitalocean.app';
```

Commit and push — App Platform will redeploy the frontend automatically.

---

## Step 6 — Add your first products

In the Strapi admin:

1. **Content Manager → Product → + Create new entry**
2. Fill in Name, Price, Category, Badge (optional), upload Image
3. Toggle **Featured** on for products you want on the homepage
4. Click **Save** then **Publish**

The shop page and homepage fetch live from the API — no code changes needed.

---

## Local Development

```bash
# Install backend dependencies
cd backend
npm install

# Copy and fill in your local env
cp .env.example .env
# Edit .env: set DATABASE_* for local Postgres, leave DO_SPACES_* empty for local uploads

# Start Strapi in dev mode (auto-reloads)
npm run develop
# → Admin panel at http://localhost:1337/admin

# In a separate terminal, serve the frontend
cd ..
# Open index.html in a browser, or use Live Server in VS Code
# Set STRAPI_URL = 'http://localhost:1337' in js/config.js for local dev
```

> **Tip:** For local dev without Postgres, Strapi defaults to SQLite — just leave `DATABASE_*` vars pointing to localhost and run a local Postgres, or use a free cloud Postgres (e.g. Neon.tech).

---

## File Structure

```
clothing-line/
├── backend/                  Strapi 4 CMS
│   ├── config/               database, server, CORS, Spaces upload
│   ├── src/
│   │   ├── api/product/      Product content type
│   │   ├── api/blog-post/    Blog Post content type
│   │   └── index.js          Bootstrap: auto-sets public read permissions
│   ├── .env.example
│   └── package.json
├── js/
│   ├── config.js             ← Set STRAPI_URL here
│   ├── api.js                Fetches from Strapi (falls back to localStorage)
│   ├── store.js              localStorage CMS (local dev / no-backend fallback)
│   └── main.js               Cart, nav, scroll reveal
├── admin/index.html          Local-only admin (replaced by Strapi in production)
├── .do/app.yaml              DigitalOcean App Platform spec
└── pages/
    ├── shop.html             Dynamic products from API
    ├── blog.html             Dynamic blog posts from API
    ├── about.html
    └── contact.html
```

---

## Monthly Cost Summary

| Resource | Size | Cost |
|----------|------|------|
| App Platform — frontend (static) | Starter | ~$0–3 |
| App Platform — backend (Node.js) | basic-xs | ~$12 |
| Managed PostgreSQL | dev tier | ~$15 |
| Spaces + CDN | 250 GB | ~$5 |
| **Total** | | **~$32–35/mo** |
