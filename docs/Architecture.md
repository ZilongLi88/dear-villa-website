# Dear Villa Resort Website

Architecture  
Version: 0.1  
Status: Initial Baseline  
Last updated: 27 July 2026

---

# 1. Purpose

This document defines the technical organisation of the Dear Villa website: folder ownership, routing, reusable components, internationalisation, content and asset management, conventions, testing, scalability, and deployment.

It describes the target architecture while respecting the existing repository. The current working framework and build system must not be replaced merely to match an earlier planning assumption.

---

# 2. Architectural Principles

- Preserve the approved information architecture
- Prefer simple static rendering for Phase 1
- Keep content separate from presentation
- Generate navigation from configuration
- Reuse components based on shared behaviour, not premature abstraction
- Treat English and Simplified Chinese as equal product requirements
- Keep image assignments centralised and replaceable
- Build accessibility and responsiveness into components
- Keep future Membership and booking features isolated
- Verify changes with automated and manual checks

---

# 3. Runtime and Technology

## Current Application

Use the framework, scripts, and conventions already present in the repository. Before changing architecture, inspect:

- `package.json`
- framework configuration
- route structure
- existing tests
- current shared layout
- current i18n implementation

The prior plan referenced React, Vite, React Router, and `react-i18next`; however, the observed project output references a vinext/Vite-based runtime. The repository is the source of truth. Framework migration requires a separate approved decision.

## Phase 1 Characteristics

- Primarily static marketing content
- Bilingual routes and content
- Client-side interactive navigation and carousel
- Enquiry integration
- No authenticated area
- No public Membership feature

---

# 4. Recommended Folder Structure

Adapt names to the existing framework rather than duplicating equivalent directories.

```text
project/
├── docs/
│   ├── Requirements.md
│   ├── Project-Plan.md
│   ├── Design-System.md
│   └── Architecture.md
│
├── app/ or src/
│   ├── routes/ or pages/
│   │   ├── home
│   │   ├── about
│   │   ├── events
│   │   ├── accommodation
│   │   ├── experiences
│   │   ├── international-programs
│   │   └── contact
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── common/
│   │   ├── home/
│   │   ├── forms/
│   │   └── media/
│   │
│   ├── content/
│   │   ├── navigation
│   │   ├── homepage
│   │   └── images
│   │
│   ├── i18n/ or locales/
│   │   ├── en
│   │   └── zh-CN
│   │
│   ├── styles/
│   │   ├── tokens
│   │   ├── global
│   │   └── utilities
│   │
│   ├── hooks/
│   ├── lib/
│   └── tests/
│
├── assets/
│   ├── images/
│   └── logo/
│
├── public/
├── package.json
└── framework configuration
```

## Ownership

- Routes/pages: page composition and route-level metadata
- Layout: shared header, footer, and global landmarks
- Common components: reusable visual primitives
- Feature components: homepage, form, and media-specific behaviour
- Content: structured assignments and page data
- i18n: user-facing strings
- Styles: tokens and shared rules
- Lib: integrations and pure utilities

Avoid multiple competing locations for the same responsibility.

---

# 5. Routing

## Approved Routes

```text
/
/about
/about/history
/about/gallery
/events
/events/weddings
/events/corporate
/accommodation
/accommodation/boutique-stay
/accommodation/healing-retreat
/experiences
/experiences/tea-room
/experiences/private-dining
/international-programs
/contact
```

Reserved:

```text
/membership
```

The Membership route must not be linked, indexed, or publicly promoted during Phase 1. Prefer a disabled feature configuration or a not-found response rather than an accessible placeholder page unless product approval says otherwise.

## Route Rules

- International Programs is top-level
- Events contains only Weddings and Corporate Events
- Accommodation contains Boutique Stay and Healing Retreat
- International Program categories are in-page sections
- Every public route must work on direct request in production
- Active navigation should handle parent and child routes
- Route changes after publication require redirects

## Route Metadata

Each route should define:

- Translation keys for title and description
- Canonical path
- Social-sharing title, description, and image where supported
- Indexing rule

---

# 6. Navigation Configuration

Navigation should be generated from one typed or schema-validated configuration.

Example shape:

```js
{
  id: "internationalPrograms",
  labelKey: "nav.internationalPrograms",
  href: "/international-programs",
  enabled: true,
  children: []
}
```

Membership:

```js
{
  id: "membership",
  labelKey: "nav.membership",
  href: "/membership",
  enabled: false,
  children: []
}
```

Rules:

- Filter disabled items before rendering
- Do not position items by numeric index
- Reuse the same source for desktop, mobile, and footer where appropriate
- Keep UI-specific state outside configuration
- Tests must verify IA-critical labels, parents, routes, and disabled Membership

---

# 7. Component Organisation

## Layout Components

- `SiteHeader`
- `DesktopNavigation`
- `MobileNavigation`
- `LanguageSwitch`
- `SiteFooter`
- `PageShell`

## Common Components

- `Button` or `LinkButton`
- `SectionHeader`
- `PageHero`
- `EditorialSplit`
- `ContactCTA`
- `Breadcrumbs`

## Homepage Components

- `HomeHero`
- `ServicePreview`
- `InternationalProgramsPreview`
- `ExperiencePair`
- `EstateCarousel`

## Form Components

- `FormField`
- `SelectField`
- `FormMessage`
- `EnquiryForm`

## Component Rules

- Keep components focused
- Pass structured content through props
- Do not read unrelated global data inside low-level components
- Prefer composition over a large number of boolean props
- Keep DOM order meaningful on mobile
- Interactive components must expose keyboard and screen-reader behaviour
- Avoid extracting a component solely because markup appears once

---

# 8. Content Architecture

## Translation Content

User-facing text belongs in English and Simplified Chinese resources.

Suggested namespaces:

```text
common
navigation
home
about
events
accommodation
experiences
internationalPrograms
contact
forms
metadata
```

## Structured Page Content

Images, route references, focal points, and layout variants may live in typed page configuration:

```js
{
  id: "events",
  titleKey: "home.events.title",
  bodyKey: "home.events.body",
  href: "/events",
  image: {
    src: "...",
    altKey: "images.events.alt",
    focalPoint: "50% 45%"
  },
  layout: "image-left"
}
```

Do not duplicate translated prose in image configuration.

## Temporary Copy

Temporary copy must:

- Use the same keys as final copy
- Avoid unsupported claims
- Be marked in content review notes where necessary
- Be replaceable without component edits

---

# 9. Internationalisation

## Locales

- `en`
- `zh-CN`

## Requirements

- Persist language preference
- Set the document language attribute
- Translate navigation, pages, forms, validation, metadata, and alt text
- Preserve the current route during language switching
- Provide a deterministic fallback language
- Avoid building sentences from translated fragments
- Permit language-specific line breaks or shorter display copy where needed

## Quality

Chinese copy should be naturally written and reviewed by a fluent speaker before launch. Visual testing must cover both languages at all major breakpoints.

---

# 10. Asset Management

## Source Images

Original estate photographs may remain under the repository’s established asset directory. Do not rename, convert, delete, overwrite, or destructively edit originals without approval.

## Delivery Strategy

- Use framework-supported image imports or public URLs consistently
- Generate optimised derivatives during build or through approved tooling
- Provide responsive sizes where supported
- Lazy-load below-the-fold images
- Prioritise the Hero image appropriately
- Preserve aspect ratio and focal point

## Central Image Registry

Centralise homepage assignments:

```js
{
  hero: { src, altKey, focalPoint },
  about: { src, altKey, focalPoint },
  events: { src, altKey, focalPoint },
  accommodation: { src, altKey, focalPoint },
  experiences: { src, altKey, focalPoint },
  internationalPrograms: { src, altKey, focalPoint },
  gallery: [{ src, altKey, focalPoint }]
}
```

## Rights and Privacy

Before launch, confirm permission for:

- Estate photography
- Wedding and event photography
- Images containing identifiable guests
- Partner names and logos
- Institutional references

---

# 11. Styling Architecture

- Define colour, typography, spacing, container, radius, shadow, and motion tokens
- Keep global styles limited to reset, typography defaults, and shared primitives
- Co-locate component styles according to the existing project convention
- Avoid arbitrary values when a token exists
- Avoid `!important` except for documented integration constraints
- Use logical properties where practical
- Support `prefers-reduced-motion`
- Do not rely on hover for essential information

The values in `Design-System.md` are the design source of truth.

---

# 12. State and Interactivity

Phase 1 state should remain local where possible:

- Mobile menu open/closed
- Dropdown state
- Language preference
- Carousel position
- Form field and submission state

Do not add a global state-management library without demonstrated need.

Interactive components must:

- Avoid hydration-dependent layout changes where applicable
- Clean up listeners
- Preserve focus intentionally
- Avoid blocking scrolling
- Remain usable with reduced motion

---

# 13. Enquiry Integration

## Boundary

The frontend should call one defined enquiry service boundary rather than embedding provider-specific calls throughout components.

```text
EnquiryForm
→ validation
→ enquiry service
→ approved provider/API
→ success or error state
```

## Requirements

- Server-side secret protection
- Input validation and sanitisation
- Spam protection
- Rate limiting where supported
- Clear operational delivery destination
- Logging without unnecessary personal data
- Privacy notice and consent handling

Provider selection remains an implementation decision subject to approval.

---

# 14. Testing and Quality Gates

## Required Automated Checks

- Lint
- Production build
- Existing unit/integration tests
- Navigation configuration tests
- Route availability checks
- Membership-disabled test
- English and Chinese key coverage where feasible

## Critical Tests

- International Programs is top-level
- International Programs is absent from Events children
- Accommodation has both approved children
- Contact remains prominent
- Membership is disabled and hidden
- Carousel loops in both directions
- Keyboard controls work
- Enquiry validation and result states work

## Manual Review

- Desktop, tablet, and mobile
- Common laptop widths
- Keyboard-only navigation
- English and Chinese layouts
- Image cropping and focal points
- Browser compatibility
- Form delivery

---

# 15. Coding Conventions

- Follow existing formatter and lint rules
- Prefer descriptive names over abbreviations
- Keep public component APIs small
- Use stable IDs for navigation and content entries
- Avoid hard-coded user-facing strings
- Avoid hard-coded route duplication; use route constants where useful
- Remove dead code and unused assets only with explicit scope awareness
- Add comments for intent or constraints, not obvious syntax
- Keep accessibility attributes accurate; do not add redundant ARIA
- Preserve unrelated user changes in a dirty worktree

If TypeScript is present, avoid `any` and define shared content/navigation types.

---

# 16. Scalability

## Membership

Membership should become a separate feature boundary with:

- Authentication
- Member profile
- Activity schedule
- Registration
- Email communications
- Administration

It must not be mixed into Phase 1 public-page components.

## Booking

Future booking should integrate behind service interfaces:

- Accommodation availability
- Activity/event registration
- Payment
- Confirmation and cancellation

## CMS

If content editing becomes necessary, introduce a CMS through a content adapter. Page components should continue consuming stable structured content rather than vendor-specific data directly.

---

# 17. Deployment Architecture

## Phase 1

Recommended logical flow:

```text
Source repository
→ automated checks
→ production build
→ CDN-based hosting
→ custom domain + HTTPS
→ visitors in New Zealand and overseas
```

Suitable platforms include Cloudflare Pages, Vercel, or an equivalent service compatible with the actual framework.

## Production Requirements

- Custom domain
- HTTPS
- Correct direct-route handling
- Environment variables
- Cache policy for static assets
- Compression
- Security headers
- Sitemap and robots rules
- Error monitoring where approved
- Documented rollback

## China Accessibility

Phase 1 should optimise globally through small bundles, compressed images, minimal third-party scripts, and CDN delivery. It should not claim guaranteed mainland-China performance. Mainland hosting or China-specific CDN architecture would require separate compliance, operational, and cost review.

## Future AWS Mapping

If migration to AWS is desired:

```text
Static assets → S3
CDN and TLS → CloudFront
DNS → Route 53
API → API Gateway / application service
Serverless logic → Lambda
Database → approved managed database
```

Do not use EC2 solely to host static frontend files unless an operational requirement justifies it.

---

# 18. Security and Privacy

- Never commit secrets
- Use least-privilege credentials
- Validate all external input
- Keep dependencies maintained
- Add appropriate security headers
- Collect only necessary personal information
- Document retention and deletion expectations before storing enquiries
- Provide a privacy policy appropriate to the operational context
- Treat analytics and marketing tools as privacy-impacting integrations

---

# 19. Architectural Decision Process

Material changes should be recorded as short Architecture Decision Records when they affect:

- Framework
- Hosting provider
- Enquiry provider
- CMS
- Authentication
- Membership backend
- Booking or payment
- URL structure

Each record should include context, decision, alternatives, consequences, and date.

---

# 20. Definition of Architectural Readiness

The Phase 1 architecture is ready when:

- Approved routes and navigation are implemented
- Membership is isolated and hidden
- Content and image assignments are centralised
- Both languages work across public routes
- Shared components meet responsive and accessibility rules
- Enquiry integration protects secrets
- Lint, build, tests, and route checks pass
- Production hosting supports direct routes, HTTPS, and rollback
- Documentation matches the deployed implementation

