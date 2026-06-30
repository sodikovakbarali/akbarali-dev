# Akbarali.dev

Public proof-of-work website for **Akbarali Sodikov** — a CS graduate and EdTech builder shipping exam-tech products from Bukhara, Uzbekistan.

This is not a generic portfolio. It is a polished public builder profile showcasing real products like **IELTS Acer** and **SAT Acer**.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**
- **Framer Motion**
- **Lucide React**
- **Clerk** — admin authentication
- **Neon Postgres** — analytics storage
- **Drizzle ORM** — database schema and queries

Content lives in TypeScript config files under `src/data/`. Visitor analytics are stored in Neon Postgres.

## Features

- Dossier-style public portfolio aesthetic
- Mobile-first responsive design
- Data-driven content (profile, projects, timeline, stack, build log)
- SEO + Open Graph metadata
- **Custom domain**: [akbaralidev.uz](https://akbaralidev.uz)
- **Analytics admin portal** at `/admin/analytics` (Clerk-protected)
- First-party visitor tracking with metadata (geo, device, referrer, UTM, sessions)
- Pages: Home, Projects, Build Log, Contact

## Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other Commands

```bash
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
npm run db:push    # Push schema to Neon (requires .env.local)
npm run db:studio  # Open Drizzle Studio
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk server key |
| `DATABASE_URL` | Neon Postgres connection string |
| `ANALYTICS_IP_SALT` | Salt for hashing visitor IPs |

### Provision on Vercel

```bash
vercel integration add clerk
vercel integration add neon
vercel env pull .env.local --yes
npm run db:push
```

Set `ANALYTICS_IP_SALT` manually in Vercel → Settings → Environment Variables (use a long random string).

## Analytics Admin Portal

- **URL**: `/admin/analytics` (requires Clerk sign-in)
- **Sign in**: `/sign-in`
- Tracks page views, sessions, referrers, UTM campaigns, geo, device/browser/OS
- Live visitors (last 5 minutes), bounce rate, session duration
- CSV export for any time range
- Auto-refreshes every 60 seconds

Visitor IPs are hashed before storage. Bot traffic is flagged and excluded from visitor counts.

## Custom Domain (akbaralidev.uz)

See [docs/domain-setup.md](docs/domain-setup.md) for full DNS instructions.

**Quick DNS changes** (keep mail records unchanged):

| Record | Type | Value |
|--------|------|-------|
| `akbaralidev.uz` | A | `76.76.21.21` |
| `www.akbaralidev.uz` | CNAME | `cname.vercel-dns.com` |

## How to Edit Profile Data

Edit [`src/data/profile.ts`](src/data/profile.ts):

- Name, title, location, headlines
- Social links (GitHub, Telegram, LinkedIn, email)
- Stats section numbers
- Currently building section
- Contact intro and availability list

## How to Add New Projects

1. Open [`src/data/projects.ts`](src/data/projects.ts)
2. Add a new object to the `projects` array following the `Project` type
3. Include screenshots as `ScreenshotMock` entries (mock previews only)
4. The project will appear on the home page and `/projects` automatically

## Build Log

Edit placeholder entries in [`src/data/build-log.ts`](src/data/build-log.ts).

## Timeline & Stack

- Timeline: [`src/data/timeline.ts`](src/data/timeline.ts)
- Tech stack: [`src/data/stack.ts`](src/data/stack.ts)

## Deployment (Vercel)

This project is connected to Vercel with **automatic production deploys on push to `main`**.

| | |
|---|---|
| Production URL | https://akbaralidev.uz (also https://akbarali-dev.vercel.app) |
| Vercel project | `akbarali-dev` (team: `akbarali-s-org-vercel`) |
| Build time | ~30–45 seconds |

### Verify a deploy

```bash
vercel ls
vercel inspect akbarali-dev.vercel.app
```

### Manual deploy (optional)

```bash
npx vercel deploy --yes            # preview
npx vercel deploy --prod --yes     # production
```

Cursor agents should read `.cursor/rules/vercel-deployment.mdc` for full deployment context when answering deploy questions.

## Public Safety Note

This site uses **mock UI screenshots and placeholder data only**.

Do **not** add to the public site:

- Real student names, emails, phone numbers, or scores
- Login credentials, API keys, or payment data
- Private staging URLs, infrastructure IPs, or internal database details
- Real exam questions unless clearly safe for public display

Replace mock screenshot components with sanitized marketing screenshots when ready.

## Project Structure

```
src/
├── app/
│   ├── admin/analytics/   # Protected analytics dashboard
│   ├── api/analytics/     # Public tracking endpoint
│   ├── api/admin/         # Protected analytics API
│   └── sign-in/           # Clerk auth
├── components/
│   ├── admin/             # Dashboard UI
│   └── AnalyticsTracker.tsx
├── db/                    # Drizzle schema + Neon client
├── data/                  # Content config files
└── lib/analytics/         # Tracking + dashboard queries
```

## License

Private — all rights reserved.
