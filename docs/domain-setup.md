# Domain setup for akbaralidev.uz

Connect the custom domain to the Vercel project `akbarali-dev`.

## 1. Add domain in Vercel

```bash
vercel domains add akbaralidev.uz
vercel domains add www.akbaralidev.uz
```

Or in the Vercel dashboard: **Project → Settings → Domains → Add**.

## 2. Update DNS at your registrar

Based on your current DNS panel, change **only** the website records. **Do not** change mail records.

| Name | Type | Current | Change to |
|------|------|---------|-----------|
| `akbaralidev.uz` | A | `45.138.159.4` | `76.76.21.21` |
| `www.akbaralidev.uz` | CNAME | `akbaralidev.uz` | `cname.vercel-dns.com` |

**Keep unchanged:**
- `mail.akbaralidev.uz` (A → `45.138.159.4`)
- `webmail.akbaralidev.uz` (A → `45.138.159.4`)
- `ftp.akbaralidev.uz` (A → `45.138.159.4`)
- MX, SPF (TXT), DMARC (TXT) records

## 3. Verify

```bash
vercel domains ls
vercel inspect akbaralidev.uz
```

DNS propagation can take up to 48 hours. Vercel will auto-provision SSL once DNS is correct.

## 4. Redirect www (optional)

Vercel automatically redirects between apex and www when both are added. Set your preferred primary domain in **Project → Settings → Domains**.
