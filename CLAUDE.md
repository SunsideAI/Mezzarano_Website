# CLAUDE.md - Mezzarano Website

This file provides guidance for AI assistants working on this codebase.

## Project Overview

**Mezzarano Immobilien Website** - A modern real estate (Immobilien) web application for Mezzarano Immobilien, a Wüstenrot real estate partner in the Heilbronn region of Germany.

### Key Features
- Property listings with advanced filtering (buy/rent, category, price, area)
- AI-powered blog content generation system
- Regional information pages for Heilbronn area
- Contact forms and property inquiry system
- SEO-optimized with structured data markup
- Fully German-language interface

### Technology Stack

| Package | Purpose | Version |
|---------|---------|---------|
| Next.js | React framework with App Router | ^14.1.0 |
| TypeScript | Type-safe language | ^5.3.3 |
| Tailwind CSS | Utility-first CSS framework | ^3.4.1 |
| React | UI library | ^18.2.0 |
| Lucide React | Icon library | ^0.312.0 |
| MDX | Markdown with React components | ^3.0.0 |
| Anthropic SDK | Claude AI integration for blog generation | ^0.39.0 |
| gray-matter | YAML frontmatter parser | ^4.0.3 |
| React-Leaflet | Interactive maps | ^4.2.1 |
| next-mdx-remote | MDX rendering | ^4.4.1 |

## Codebase Structure

```
Mezzarano_Website/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx               # Root layout with Header/Footer
│   │   ├── page.tsx                 # Homepage
│   │   ├── globals.css              # Global styles with Tailwind
│   │   ├── immobilien/
│   │   │   ├── page.tsx             # Properties listing (filterable)
│   │   │   └── [id]/page.tsx        # Property detail page
│   │   ├── ratgeber/
│   │   │   ├── page.tsx             # Blog listing
│   │   │   └── [slug]/page.tsx      # Blog post detail
│   │   ├── kontakt/page.tsx         # Contact page
│   │   ├── ueber-uns/page.tsx       # About page
│   │   └── regionen/                # Regional pages
│   │       ├── heilbronn/page.tsx
│   │       └── weinsberg/page.tsx
│   │
│   ├── components/
│   │   ├── Header.tsx               # Navigation with dropdowns
│   │   ├── Footer.tsx               # Footer with links
│   │   ├── PropertyCard.tsx         # Reusable property card
│   │   ├── BlogCard.tsx             # Featured/regular blog cards
│   │   ├── FAQSection.tsx           # Accordion FAQ component
│   │   └── SchemaMarkup.tsx         # Structured data markup
│   │
│   ├── data/
│   │   └── properties.ts            # Property data with interfaces
│   │
│   ├── lib/
│   │   └── blog.ts                  # Blog post utilities
│   │
│   └── content/
│       ├── blog/                    # Markdown blog posts
│       └── blog-topics.json         # Pre-planned blog topics
│
├── scripts/
│   ├── generate-blog-post.js        # Single blog post generator
│   ├── generate-batch.js            # Batch generator with filtering
│   └── auto-generate.js             # GitHub Actions automation
│
├── .github/workflows/
│   └── generate-blog-posts.yml      # CI/CD for blog generation
│
├── Configuration Files
│   ├── package.json                 # Dependencies & scripts
│   ├── tsconfig.json                # TypeScript config (ES2018)
│   ├── tailwind.config.ts           # Tailwind theme customization
│   ├── next.config.js               # Next.js config
│   └── postcss.config.js            # PostCSS plugins
│
└── Documentation
    ├── CLAUDE.md                    # AI assistant guidelines (this file)
    └── README.md                    # Project documentation
```

## Key Data Models

### Property Interface (`src/data/properties.ts`)
```typescript
interface Property {
  id: string;
  title: string;
  description: string;
  type: 'kauf' | 'miete';           // Buy or Rent
  price: number;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt: number;
  features: string[];
  images: string[];
  featured: boolean;
  category: 'wohnung' | 'haus' | 'villa' | 'gewerbe';
}
```

### BlogPost Interface (`src/lib/blog.ts`)
```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  category: string;
  author: string;
  image: string;
  featured: boolean;
  tags: string[];
  content: string;
  readingTime: number;  // Calculated at ~200 words/minute
}
```

## Key Components

| Component | Purpose | Client/Server |
|-----------|---------|---------------|
| `Header.tsx` | Navigation with dropdowns, mobile menu | Client |
| `Footer.tsx` | Links, contact info, Wüstenrot branding | Server |
| `PropertyCard.tsx` | Property listing card with image, specs | Server |
| `BlogCard.tsx` | Blog post card (featured/regular variants) | Server |
| `FAQSection.tsx` | Accordion FAQ with animations | Client |
| `SchemaMarkup.tsx` | JSON-LD structured data | Server |

## Styling & Theming

### Wüstenrot Brand Colors (in `tailwind.config.ts`)
- **Primary**: Red (#E30613) - Wüstenrot brand color
- **Secondary**: Dark slate grays
- **Accent**: Amber/Gold

### Custom Tailwind Classes
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.section-title` - Section heading style
- `.container-custom` - Custom container width
- `.prose-blog` - Blog content typography

### Fonts
- **Sans**: Inter
- **Serif**: Playfair Display

## Common Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Blog generation commands
npm run blog:generate    # Generate single blog post
npm run blog:batch       # Generate multiple posts with filters
npm run blog:auto        # Auto-generate (used by GitHub Actions)
```

## Blog Generation System

The project includes an AI-powered blog generation system using Claude:

### Scripts
- **`generate-blog-post.js`**: Generate a single blog post from a topic
- **`generate-batch.js`**: Process multiple topics with priority filtering
- **`auto-generate.js`**: Automated generation for GitHub Actions

### Usage
```bash
# Generate a single post
npm run blog:generate -- --topic "Your topic here" --keywords "keyword1,keyword2"

# Batch generate (high priority topics, limit 3)
npm run blog:batch -- --priority high --limit 3

# Dry run (preview without generating)
npm run blog:batch -- --priority high --dry-run
```

### Blog Topics (`src/content/blog-topics.json`)
Pre-planned topics across 9 categories:
- Marktberichte (Market Reports)
- Immobilienverkauf (Property Sales)
- Immobilienkauf (Property Purchase)
- Immobilienbewertung (Valuation)
- Regionen (Regional Guides)
- Finanzierung (Financing)
- Kapitalanlage (Investment)
- Recht & Steuern (Legal & Taxes)
- Tipps & Ratgeber (Tips & Guides)

### GitHub Actions Workflow
Automated blog generation runs on:
- **Schedule**: Mondays & Thursdays at 9 AM UTC
- **Manual trigger**: Via workflow_dispatch

## onOffice CRM Integration

The website integrates with onOffice enterprise CRM for lead management.

### Integrated Forms

| Form | API Route | onOffice Modules |
|------|-----------|------------------|
| Kontaktformular | `/api/contact` | `address`, `agentslog` |
| Suchprofil | `/api/suchprofil` | `address`, `searchcriteria`, `agentslog` |

### API Library

The onOffice integration is implemented in `src/lib/onoffice.ts`:

- **HMAC v2 Authentication**: Secure request signing
- **createContact()**: Create lead from contact form
- **createSearchProfile()**: Create address + search criteria from search profile wizard

### Setup

1. Log into onOffice enterprise
2. Navigate to: **Extras > Einstellungen > Benutzer > API-Benutzer**
3. Create new API user with rights:
   - Adressen: Lesen, Anlegen
   - Suchkriterien: Lesen, Anlegen
   - Maklerbuch: Anlegen
4. Copy Token (32 chars) and Secret (64 chars)
5. Add to `.env.local` or production environment

### API Documentation

Full onOffice API documentation: `onOffice_api.md` (in repo root)

## Environment Variables

Create a `.env.local` file for local development:

```env
# Required for blog generation
ANTHROPIC_API_KEY=your-anthropic-api-key

# Required for onOffice CRM integration (Lead forms)
ONOFFICE_TOKEN=your-32-character-token
ONOFFICE_SECRET=your-64-character-secret

# Optional: Deployment webhook
DEPLOY_WEBHOOK_URL=https://your-deployment-webhook
```

**Important**: Never commit API keys. The `.env.local` file is in `.gitignore`.

## Development Workflows

### Getting Started
1. Clone the repository
2. Run `npm install`
3. Create `.env.local` with your API keys (if using blog generation)
4. Run `npm run dev`
5. Open http://localhost:3000

### Branch Strategy
- `main` - Production-ready code
- `claude/*` - AI-assisted development branches
- `feature/*` - Feature development branches
- `bugfix/*` - Bug fix branches

### Commit Conventions
Use conventional commit messages:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `content:` - Blog/content additions

Example: `feat: add property comparison feature`

## Code Conventions

### File Naming
- Components: **PascalCase** (`PropertyCard.tsx`)
- Utilities: **camelCase** (`formatPrice.ts`)
- Pages: **kebab-case** folders with `page.tsx`

### Component Structure
- Use functional components with hooks
- Mark client components with `'use client'` directive
- Server components are default (no directive needed)
- Use TypeScript interfaces for props

### Styling Approach
- Use Tailwind CSS utilities
- Use custom classes for reusable patterns
- Mobile-first responsive design
- Follow Wüstenrot brand guidelines

## Key Files Reference

| Purpose | File Path |
|---------|-----------|
| Homepage | `src/app/page.tsx` |
| Property Data | `src/data/properties.ts` |
| Blog Utilities | `src/lib/blog.ts` |
| Root Layout | `src/app/layout.tsx` |
| Global Styles | `src/app/globals.css` |
| Theme Config | `tailwind.config.ts` |
| TypeScript Config | `tsconfig.json` |
| Blog Generator | `scripts/generate-blog-post.js` |
| CI/CD Workflow | `.github/workflows/generate-blog-posts.yml` |

## AI Assistant Guidelines

### When Working on This Codebase

1. **Always read before editing** - Understand existing code patterns
2. **Follow Wüstenrot branding** - Use established colors and styling
3. **Keep content in German** - All user-facing text should be German
4. **Maintain TypeScript types** - Add proper interfaces for new data
5. **Test responsive design** - Verify changes work on mobile

### Key Patterns to Follow

- Use `'use client'` only when needed (state, effects, event handlers)
- Import icons from `lucide-react`
- Use the established Property and BlogPost interfaces
- Format prices with German locale (€ symbol, thousands separator)
- Use Tailwind's responsive prefixes (`md:`, `lg:`) for layouts

### Things to Avoid

- Adding English text to UI (keep German)
- Breaking the Wüstenrot brand color scheme
- Over-engineering simple features
- Adding dependencies without clear need
- Committing API keys or secrets

### Security Considerations

- Never commit `.env.local` or API keys
- Validate user input in forms
- Sanitize markdown content before rendering
- Use HTTPS for all external requests

## Troubleshooting

### Common Issues

1. **Build fails with regex error**
   - Ensure `tsconfig.json` has `"target": "ES2018"` or higher
   - This is needed for regex dotall flag support

2. **Blog generation fails**
   - Check `ANTHROPIC_API_KEY` is set in `.env.local`
   - Verify API key has sufficient credits

3. **Images not loading**
   - Check `next.config.js` includes the image domain
   - Currently configured for `images.unsplash.com`

4. **TypeScript path alias not working**
   - Use `@/` prefix for imports from `src/`
   - Example: `import { Property } from '@/data/properties'`

## Deployment

The project is configured for Netlify deployment:
- `@netlify/plugin-nextjs` handles Next.js optimizations
- GitHub Actions can trigger deployment webhooks
- Production builds run on push to `main`

---

*Last Updated: January 2026*

*This document should be updated when adding major features or changing architecture.*
