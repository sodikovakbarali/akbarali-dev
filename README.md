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

No database — all content lives in TypeScript config files under `src/data/`.

## Features

- Dark premium developer-tool aesthetic
- Mobile-first responsive design
- Data-driven content (profile, projects, timeline, stack, build log)
- Reusable components with glassmorphism cards and subtle animations
- SEO + Open Graph metadata
- Mock UI screenshot placeholders (no real private data)
- Pages: Home, Projects, Build Log, Contact

## Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other Commands

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint
```

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
| Production URL | https://akbarali-dev.vercel.app |
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
├── app/              # Next.js pages (/, /projects, /build-log, /contact)
├── components/       # Reusable UI components
├── data/             # Content config files
└── lib/              # Utilities (cn helper)
```

## License

Private — all rights reserved.
