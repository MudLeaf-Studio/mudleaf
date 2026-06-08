# Mudleaf — mudleaf.com.au

Full-stack Next.js website for Mudleaf Therapeutic Horticulture & Wellbeing.

## What this is

- Public marketing site (all pages from the design prototype)
- MLAT participant portal (coming in next sprint)
- Blog and shop with admin management
- Supabase backend for data, auth, and file storage
- Deployed on Vercel, connected to mudleaf.com.au

---

## First-time setup — do this once

### Step 1 — Install Node.js

Go to https://nodejs.org and download the LTS version. Install it. This is required to run the project.

### Step 2 — Clone the repository

Open Terminal (Mac: press Cmd+Space, type Terminal, press Enter).

```bash
git clone https://github.com/MudLeaf-Studio/mudleaf.git
cd mudleaf
```

### Step 3 — Install dependencies

```bash
npm install
```

This installs everything the project needs. Takes about a minute.

### Step 4 — Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` in any text editor (TextEdit on Mac works). Fill in:

- `NEXT_PUBLIC_SUPABASE_URL` — go to supabase.com → your project → Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — same page → anon public key
- `SUPABASE_SERVICE_ROLE_KEY` — same page → service_role key (keep this secret)

### Step 5 — Set up the database

Go to supabase.com → your project → SQL Editor → New query.
Copy the entire contents of `lib/schema.sql` and paste it in. Click Run.
This creates all the tables Mudleaf needs.

### Step 6 — Run locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser. The site is running.

---

## Deploying to Vercel (making it live on mudleaf.com.au)

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "Initial Mudleaf site"
git push origin main
```

### Step 2 — Connect to Vercel

1. Go to vercel.com and sign up (use your GitHub account — MudLeaf-Studio)
2. Click "Add New Project"
3. Import the `mudleaf` repository from GitHub
4. In the Environment Variables section, add all four variables from your `.env.local`
5. Click Deploy

Vercel builds and deploys the site. Takes about 2 minutes.

### Step 3 — Add your domain

1. In Vercel → your project → Settings → Domains
2. Add `mudleaf.com.au` and `www.mudleaf.com.au`
3. Vercel gives you DNS values — two lines that look like:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

### Step 4 — Update DNS at Tucows

1. Log into your domain registrar (Tucows via auDA)
2. Find DNS Management for mudleaf.com.au
3. Update or add the two records Vercel gave you
4. Save

DNS propagates within 15–60 minutes. After that, mudleaf.com.au serves the new site.

---

## Making changes

### Updating text content

Every page is a file in the `app/` folder. For example:
- Home page: `app/page.tsx`
- About page: `app/about/page.tsx`
- NDIS page: `app/ndis/page.tsx`

Open the file, find the text, change it, save. Then:

```bash
git add .
git commit -m "Updated about page text"
git push
```

Vercel automatically redeploys. Live in about 90 seconds.

### Adding a blog post

1. Go to supabase.com → your project → Table Editor → blog_posts
2. Click Insert Row
3. Fill in: slug (URL-friendly name), title, category, excerpt, content, published: true
4. The post appears on the site immediately — no redeploy needed

### Adding images

Put image files in the `public/images/` folder, then reference them as `/images/filename.jpg` in any page.

---

## Project structure

```
mudleaf/
├── app/                    # All pages
│   ├── page.tsx           # Home
│   ├── about/page.tsx     # About
│   ├── programs/page.tsx  # Programs
│   ├── ndis/page.tsx      # NDIS
│   ├── mlat/page.tsx      # MLAT
│   ├── blog/              # Blog pages
│   ├── shop/page.tsx      # Shop
│   ├── contact/page.tsx   # Contact
│   └── feedback/page.tsx  # Feedback
├── components/
│   ├── layout/
│   │   ├── Nav.tsx        # Navigation
│   │   └── Footer.tsx     # Footer
│   └── ui/
│       └── index.tsx      # Reusable components
├── lib/
│   ├── supabase.ts        # Database client
│   └── schema.sql         # Database tables
├── styles/
│   └── globals.css        # All styles
├── public/
│   └── images/            # Site images
└── README.md              # This file
```

---

## Getting help

For changes to the site, content, or new features — bring this codebase back to Claude with a description of what you want changed. Claude can update any file directly.

For Supabase issues: supabase.com/docs
For Vercel issues: vercel.com/docs
For Next.js questions: nextjs.org/docs
