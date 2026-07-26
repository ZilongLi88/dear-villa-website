# Dear Villa Resort Website

Design System  
Version: 0.3  
Status: Approved Baseline  
Last updated: 27 July 2026

---

# 1. Purpose

This document defines the visual language, reusable interface patterns, page composition, responsive behaviour, motion, and accessibility standards for Dear Villa.

The system should make the website feel premium, calm, natural, editorial, and distinctly tied to the estate. It should avoid generic hotel-booking, SaaS, or template-driven styling.

---

# 2. Design Principles

## Authentic Photography First

Use real Dear Villa photography as the primary visual asset. Images should communicate place, atmosphere, hospitality, and scale.

## Editorial, Not Crowded

Prefer strong hierarchy, generous whitespace, asymmetric editorial compositions, and a small number of meaningful elements.

## Quiet Luxury

Luxury is expressed through proportion, restraint, typography, materials, and photography—not heavy decoration.

## Clear Journeys

Visitors should quickly identify the four business pillars and reach the relevant enquiry pathway.

## Bilingual by Design

English and Simplified Chinese must both feel intentional. Layouts must tolerate different line lengths without losing hierarchy.

## Accessible by Default

Keyboard access, contrast, focus, semantic structure, touch targets, and reduced motion are component requirements, not later enhancements.

---

# 3. Colour Palette

Final values may be fine-tuned during visual review, but token names and roles should remain stable.

```css
:root {
  --color-forest-900: #183127;
  --color-forest-800: #244638;
  --color-forest-700: #315846;

  --color-ivory-50: #fbf8f1;
  --color-ivory-100: #f4efe4;
  --color-stone-200: #ded7ca;

  --color-gold-500: #aa8a54;
  --color-gold-600: #8f713f;

  --color-ink-900: #20231f;
  --color-ink-700: #4d514b;
  --color-white: #ffffff;

  --color-success: #2f6b4f;
  --color-error: #9b3a32;
  --color-focus: #c79b52;
}
```

## Usage

- Forest 900: primary navigation, footer, key CTA backgrounds
- Forest 800/700: hover states and dark sections
- Ivory 50/100: main page backgrounds and alternating sections
- Gold: restrained accents, rules, small labels, and focus details
- Ink 900: primary text
- Ink 700: supporting text
- White: text over dark imagery or forest backgrounds

## Contrast

All text and interactive states must meet WCAG 2.2 AA contrast requirements. Gold should not be used for small body text on ivory or white without verification.

---

# 4. Typography

## Font Roles

- Headings: elegant serif with good Latin support
- Body and UI: modern sans serif
- Simplified Chinese: approved CJK serif/sans fallbacks that preserve the intended contrast

Recommended font stacks:

```css
--font-heading: "Cormorant Garamond", "Noto Serif SC", Georgia, serif;
--font-body: "Inter", "Noto Sans SC", system-ui, sans-serif;
```

Web fonts must be licensed, optimised, and loaded without blocking core content.

## Type Scale

Use fluid sizing where appropriate:

```css
--text-hero: clamp(3rem, 7vw, 6.5rem);
--text-h1: clamp(2.5rem, 5vw, 4.75rem);
--text-h2: clamp(2rem, 3.5vw, 3.5rem);
--text-h3: clamp(1.5rem, 2.4vw, 2.25rem);
--text-lead: clamp(1.125rem, 1.6vw, 1.4rem);
--text-body: 1rem;
--text-small: 0.875rem;
--text-label: 0.75rem;
```

## Rules

- Keep headings concise
- Avoid all caps for long text
- Use moderate letter spacing for small English labels only
- Do not force Chinese text into artificial letter spacing
- Limit long-form text width to approximately 65–72 characters
- Maintain one logical `h1` per page

---

# 5. Spacing and Layout

## Spacing Scale

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-12: 3rem;
--space-16: 4rem;
--space-24: 6rem;
--space-32: 8rem;
```

## Containers

```css
--container-wide: 1440px;
--container-content: 1200px;
--container-text: 760px;
--page-gutter: clamp(1.25rem, 4vw, 4rem);
```

## Section Rhythm

- Desktop: typically 96–128px vertical spacing
- Tablet: typically 72–96px
- Mobile: typically 56–72px
- Reduce spacing based on content density, not arbitrarily

## Grid

- Desktop: 12-column conceptual grid
- Tablet: 8-column conceptual grid
- Mobile: 4-column conceptual grid
- Editorial sections may break the grid deliberately while maintaining alignment

---

# 6. Core Components

## Navbar

- Transparent over the homepage Hero
- Solid forest or ivory background after scroll, according to contrast needs
- Seven Phase 1 top-level items
- Contact styled as primary CTA
- `EN | 中文` remains visible
- Dropdowns limited to one submenu level
- Active page visually indicated
- At narrower desktop widths, reduce gaps before switching to the mobile menu

## Desktop Dropdown

- Opens by keyboard and pointer
- Remains open while focus is inside
- `Escape` closes and restores focus
- No third-level menus
- Motion is short and subtle

## Mobile Navigation

- Full-height or large-panel menu
- Expandable groups for About, Events, Accommodation, and Experiences
- International Programs is a direct top-level link
- Touch targets at least 44 × 44 CSS pixels
- Menu traps focus where appropriate and restores focus on close

## Buttons

Variants:

- Primary: forest background, ivory text
- Secondary: transparent or ivory background with forest border
- Inverse: white/ivory treatment over dark sections
- Text link: understated arrow or rule treatment

Rules:

- Minimum touch height: 44px
- Visible hover, active, disabled, and focus states
- Avoid large pill shapes unless approved for a specific context

## Section Header

May include:

- Optional eyebrow label
- Heading
- Concise supporting text
- Optional text-link CTA

Use left alignment by default. Centred headings are reserved for sections that benefit from a ceremonial or gallery-like presentation.

## Homepage Hero

- Height: approximately 90–100svh on desktop
- Uses the designated Dear Villa Hero image
- Subtle overlay only
- Text positioned to preserve the image subject
- One primary CTA and at most one secondary CTA
- Transparent Navbar overlays the image
- Responsive focal position must be configurable

## Editorial Split Section

- Image and text in a 55/45 or 60/40 relationship
- Optional alternating orientation
- Avoid card containers and heavy shadows
- On mobile, stack with the most meaningful content order

## Service Preview

- Used for the four business pillars
- Configurable title, description, image, route, and orientation
- May use editorial split or restrained image-led card variants
- Does not duplicate markup for each pillar

## Contact CTA

- One clear invitation and one primary action
- May use a dark forest section or strong estate image
- Avoid collecting form data directly inside every page CTA

## Forms

- Persistent visible labels
- Clear required/optional indication
- Inline validation near the relevant field
- Error summary where multiple errors occur
- No placeholder-only labels
- Bilingual success and error messages

## Footer

- Brand summary
- Primary and secondary navigation
- Contact details
- Language access if useful
- Privacy and legal links
- No hidden Membership link during Phase 1

---

# 7. Homepage Wireframe

```text
Transparent Navbar
↓
Hero
  - Estate image
  - Headline and concise introduction
  - Primary and optional secondary CTA
↓
About Preview
  - Estate story
  - Editorial image/text composition
↓
Events Preview
  - Weddings and corporate positioning
  - Strong enquiry-oriented CTA
↓
International Programs Preview
  - Independent business pillar
  - Study, wellness, travel, and hosting cues
↓
Accommodation Preview
  - Boutique Stay
  - Healing Retreat
↓
Experiences Preview
  - Tea Room and Private Dining overview
↓
Tea Room and Private Dining Preview
  - Image-led paired experiences
↓
Across the Estate / Gallery Preview
  - Horizontal looping carousel
  - View Gallery link
↓
Contact CTA
↓
Footer
```

The layout should vary section composition to create editorial rhythm. Do not turn every section into an identical card row.

---

# 8. Page Templates

## Overview Page

Used for About, Events, Accommodation, and Experiences:

```text
Page Hero
Introduction
Child-service previews
Supporting photography or proof
Contact CTA
Footer
```

## Service Detail Page

Used for Weddings, Corporate Events, Boutique Stay, Healing Retreat, Tea Room, and Private Dining:

```text
Page Hero
Value proposition
Key details or inclusions
Editorial image sections
Practical information
Relevant gallery
Enquiry CTA
Footer
```

## International Programs Page

```text
Page Hero
Programme introduction
Study Tours
Wellness Programs
Travel Experiences
Business Hosting
Supporting imagery or evidence
Programme enquiry CTA
Footer
```

The four categories remain within a single page and are not navigation children.

## Gallery Page

```text
Page Hero or compact introduction
Optional category filters
Curated image collection
Accessible image viewing
Contact CTA
Footer
```

The full Gallery page does not have to use the homepage carousel pattern.

## Contact Page

```text
Introduction
Contact details
Enquiry form
Map and arrival information
Privacy note
Footer
```

---

# 9. Homepage Gallery Carousel

## Purpose

Replace the static “Across the Estate” collage with a manual horizontal carousel that highlights authentic estate photography.

## Behaviour

- One dominant centre image
- Previous and next images partially visible on desktop/tablet
- Previous and next arrow controls
- Infinite manual loop in both directions
- No autoplay
- Keyboard navigation
- Touch swipe on mobile where practical
- Visible focus states and accessible labels
- Current position communicated accessibly where useful

## Responsive Layout

- Desktop: approximately three images visible; centre image dominant
- Tablet: centre image dominant; neighbouring images partially visible
- Mobile: one primary image, arrow controls, and swipe

## Image Treatment

- Consistent visual height within each breakpoint
- Preserve subjects with configurable `object-position`
- Avoid aggressive cropping
- Avoid heavy shadows and excessive rounding
- Store image order, paths, alt text, and focal points centrally

## Motion

- Use transform-based transitions
- Recommended duration: 350–500ms
- Recommended easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Under `prefers-reduced-motion: reduce`, remove or greatly shorten transitions

## Acceptance Criteria

- Last-to-first and first-to-last loops work
- Controls work with keyboard and pointer
- Mobile swipe does not block normal vertical scrolling
- Both languages render without control overlap
- Images remain replaceable through configuration

---

# 10. Imagery

## Selection

- Prefer authentic Dear Villa images
- Select by visible content, orientation, resolution, and context
- Use wide images for Heroes and editorial splits
- Use portrait/detail images for paired cards and carousel variation
- Avoid repeated use unless intentional

## Handling

- Never overwrite original files
- Optimise derived delivery assets where needed
- Use responsive image sizing
- Lazy-load below-the-fold images
- Supply descriptive bilingual alt text
- Decorative images should use empty alt text

## Focal Points

Focal position should be configurable in content data:

```js
{
  src: "...",
  altKey: "...",
  focalPoint: "50% 40%"
}
```

---

# 11. Motion

## Principles

- Motion clarifies state or adds subtle atmosphere
- No motion should delay access to content
- Avoid parallax that affects readability or performance
- Avoid autoplaying carousels and distracting loops

## Recommended Durations

- Hover/focus: 120–180ms
- Dropdown/menu: 180–240ms
- Section reveal: 300–500ms
- Carousel: 350–500ms

## Reduced Motion

Under reduced-motion preference:

- Disable section reveal movement
- Remove smooth-scroll dependence
- Minimise carousel animation
- Preserve immediate state changes and usability

---

# 12. Responsive System

Use content-driven breakpoints. Initial reference values:

```css
--breakpoint-mobile: 480px;
--breakpoint-tablet: 768px;
--breakpoint-laptop: 1024px;
--breakpoint-desktop: 1280px;
```

## Desktop

- Full navigation where space allows
- Wide editorial compositions
- Generous vertical spacing
- Carousel shows neighbouring images

## Tablet

- Earlier mobile-menu switch if labels crowd
- Simplified two-column sections
- Reduced section spacing

## Mobile

- Single-column reading order
- Hamburger navigation
- 44px minimum touch targets
- Hero uses `svh`-safe sizing
- Important CTAs remain visible without overcrowding
- Carousel shows one dominant image

No component should depend on hover alone.

---

# 13. Accessibility

Target WCAG 2.2 AA where practical.

Requirements:

- Semantic landmarks
- Logical heading hierarchy
- Skip link
- Keyboard-operable dropdowns, menu, carousel, and forms
- Visible focus indicators
- Colour contrast verification
- Descriptive link text
- Alternative text based on image purpose
- Form labels, instructions, and associated errors
- Status announcements for asynchronous form results
- 44 × 44px touch targets where possible
- Reduced-motion support
- Language attribute updates when language changes

Automated checks supplement, but do not replace, keyboard and visual review.

---

# 14. Content Rules

- User-facing copy lives in translation/content resources
- Temporary copy should be polished, concise, and clearly replaceable
- Avoid unsupported claims and generic luxury clichés
- Do not embed business content in low-level presentation components
- Chinese is translated naturally, not word-for-word
- Buttons use specific actions, such as “Explore Weddings” or “Enquire About a Stay”

---

# 15. Design Review Checklist

- Does the page clearly communicate its purpose?
- Is the relevant business pillar obvious?
- Is authentic photography doing meaningful work?
- Is the visual hierarchy stable in both languages?
- Is there one clear next action?
- Are spacing and typography consistent with tokens?
- Are keyboard, focus, touch, contrast, and reduced-motion needs met?
- Does the page avoid template-like cards, heavy shadows, and excessive rounding?
- Are image paths and content easy to replace?

