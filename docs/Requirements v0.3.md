# Dear Villa Resort Website

Version: 0.3  
Status: Approved Baseline  
Last updated: 27 July 2026

---

# 1. Project Overview

## Project Name

Dear Villa Resort Website

## Project Goal

Build a modern bilingual luxury-estate website in English and Simplified Chinese that showcases Dear Villa, promotes its services and experiences, and encourages qualified customer enquiries.

The website must present a premium brand image while remaining elegant, responsive, accessible, performant, and easy to maintain. Its architecture must support future membership, booking, and administration capabilities without requiring a major redesign.

## Business Pillars

Dear Villa is presented around four primary business pillars:

- Events
- Accommodation
- Experiences
- International Programs

These four pillars should be consistently represented throughout the homepage, navigation, page hierarchy, enquiry pathways, and future website expansion.

---

# 2. Business Objectives

The website should help visitors:

- Discover the estate and learn about its history
- Explore weddings and corporate events
- Compare Boutique Stay and Healing Retreat accommodation
- Explore the Tea Room and Private Dining
- Discover International Programs
- Submit a relevant enquiry
- Access membership services in a future phase

## Primary Objective

Generate qualified customer enquiries.

## Secondary Objectives

- Build awareness of the Dear Villa brand
- Present the estate as a premium New Zealand destination
- Support event, accommodation, experience, and international-program enquiries
- Reduce repetitive manual explanations by presenting essential information clearly
- Establish a bilingual platform for local and international audiences
- Create a scalable foundation for future membership and booking systems

---

# 3. Target Users

## Primary Users

- Wedding customers
- Corporate event customers
- Boutique accommodation guests
- Healing-retreat guests
- Tea Room visitors
- Private Dining customers
- International Program participants and organisers
- Business-hosting customers

## Secondary Users

- Study-tour organisers
- Wellness-programme organisers
- Tourism partners
- Educational institutions
- Corporate delegations
- Business partners
- Local community members
- Future members

---

# 4. Website Language

The website will support:

- English
- Simplified Chinese

Users can switch languages from the shared navigation:

```text
EN | 中文
```

All navigation labels, page content, buttons, forms, validation messages, metadata, image alternative text, and system messages must support both languages. Language preference should persist between visits where technically practical.

---

# 5. Website Pages

## Home

The landing page introduces Dear Villa and the four business pillars. It should guide visitors toward relevant content and the Contact page.

## About

### Subpages

- Our History
- Gallery

### Our History

Introduce:

- The history of the estate
- The story behind Dear Villa
- The estate’s character, values, and philosophy
- Its connection to the local area

### Gallery

Display curated photography covering:

- Estate exterior and interior
- Accommodation
- Events
- Tea Room
- Private Dining
- International Programs
- Landscape and surroundings

The Gallery page requirement is content-based. Its detailed visual treatment is defined in `Design-System.md`.

## Events

The Events section presents Dear Villa as a premium destination for weddings and corporate gatherings.

### Subpages

- Weddings
- Corporate Events

### Weddings

Introduce:

- Ceremony and reception spaces
- Wedding photography opportunities
- Private wedding experiences
- Venue facilities and relevant capacity information
- Wedding enquiry information

### Corporate Events

Introduce:

- Corporate functions
- Meetings and retreats
- Team events
- Business receptions
- Private venue hire
- Corporate enquiry information

## Accommodation

The Accommodation section presents two distinct offerings.

### Subpages

- Boutique Stay
- Healing Retreat

### Boutique Stay

Introduce:

- Rooms and facilities
- Guest experience
- Estate surroundings
- Stay inclusions and practical information
- Direct enquiry pathway

### Healing Retreat

Introduce:

- Wellness-oriented accommodation
- A calm, nature-connected environment
- Retreat programmes and restorative experiences
- Relevant activities, subject to availability
- Short- and long-stay retreat options where offered
- Healing Retreat enquiry information

Phase 1 uses enquiry-led, manually managed accommodation requests. It does not require an Airbnb redirect or live booking engine.

## Experiences

The Experiences section introduces Dear Villa’s food, hospitality, and cultural experiences.

### Subpages

- Tea Room
- Private Dining

### Tea Room

Introduce:

- Tea culture and tea experiences
- Tea Room environment
- Private tea sessions
- Group visits
- Tea Room enquiry information

### Private Dining

Introduce:

- Private dining experiences
- Seasonal menus, subject to availability
- Chef-led or hosted dining where offered
- Intimate celebrations
- Group dining
- Private Dining enquiry information

## International Programs

International Programs is an independent top-level business area. It presents Dear Villa as a destination for education, cultural exchange, wellness, tourism, and premium business hosting.

### Page Content

- Study Tours
- Wellness Programs
- Travel Experiences
- Business Hosting

These categories appear within the International Programs page and must not create a third-level navigation menu.

The page should address:

- Educational institutions
- International visitors
- Wellness organisations
- Tourism partners
- Corporate and official delegations
- Cultural-exchange groups

## Membership

Membership is a future feature and is excluded from the Phase 1 MVP. Its route or configuration may be reserved during development, but it must remain hidden from public navigation and public Phase 1 content.

Future membership features may include:

- Membership introduction and applications
- Registration and login
- Member profiles
- Exclusive events, benefits, and offers
- Email communications and activity schedules
- Online activity registration
- Membership administration

The header and information architecture must support adding Membership later without a redesign.

## Contact

Include:

- Contact form
- Phone
- Email
- Address
- Map
- Enquiry-category selection
- Consent acknowledgement where required
- Success and error feedback

### Enquiry Categories

- Weddings
- Corporate Events
- Boutique Stay
- Healing Retreat
- Tea Room
- Private Dining
- International Programs
- General Enquiry

Membership must not be shown as an active Phase 1 enquiry category unless explicitly approved later.

Contact may be styled as the primary navigation call to action. A separate “Make an Enquiry” navigation item is not required.

---

# 6. Design Direction

## Keywords

- Elegant
- Luxury
- Natural
- Warm
- Calm
- Editorial
- Minimal

## Visual Style

- Large, authentic estate photography
- Full-width and editorial split sections
- Generous white space
- Serif headings and sans-serif body text
- Warm ivory backgrounds and deep forest-green accents
- Restrained use of soft gold
- Minimal, purposeful motion
- Refined dropdown navigation
- Clear enquiry calls to action

The website should feel like a private estate, boutique retreat, vineyard, or premium countryside destination—not a generic hotel-booking website.

Detailed component, carousel, motion, and responsive specifications belong in `Design-System.md`.

---

# 7. Navigation

## Phase 1 Main Navigation

```text
Home | About | Events | Accommodation | Experiences | International Programs | Contact
```

International Programs appears immediately before Contact.

## Navigation Structure

```text
Home

About
├── Our History
└── Gallery

Events
├── Weddings
└── Corporate Events

Accommodation
├── Boutique Stay
└── Healing Retreat

Experiences
├── Tea Room
└── Private Dining

International Programs

Contact
```

## Future Navigation

When Membership is ready:

```text
Home | About | Events | Accommodation | Experiences | International Programs | Membership | Contact
```

## Navigation Requirements

- Generate navigation from reusable configuration data
- Do not position items based on a fixed item count
- Limit dropdown navigation to two levels
- Keep International Program categories within their page
- Support desktop dropdowns and expandable mobile groups
- Indicate the active page
- Keep Contact visually prominent
- Keep `EN | 中文` accessible
- Support longer English and Chinese labels at common laptop widths
- Keep Membership configurable but disabled during Phase 1

---

# 8. Homepage Structure

1. Hero
2. About Preview
3. Events Preview
4. International Programs Preview
5. Accommodation Preview
6. Experiences Preview
7. Tea Room and Private Dining Preview
8. Gallery Preview
9. Contact CTA
10. Footer

The homepage should clearly present all four business pillars. International Programs should read as an independent offering rather than an Events subtype.

## Homepage CTA Examples

- Explore the Estate
- Discover Our Events
- View Accommodation
- Explore Experiences
- Discover International Programs
- Contact Us

Membership must not appear during Phase 1.

---

# 9. Recommended URL Structure

```text
/
├── /about
│   ├── /about/history
│   └── /about/gallery
│
├── /events
│   ├── /events/weddings
│   └── /events/corporate
│
├── /accommodation
│   ├── /accommodation/boutique-stay
│   └── /accommodation/healing-retreat
│
├── /experiences
│   ├── /experiences/tea-room
│   └── /experiences/private-dining
│
├── /international-programs
├── /membership
└── /contact
```

`/membership` may be reserved but must not be publicly discoverable during Phase 1. Existing published URLs should be redirected if route changes are introduced after launch.

---

# 10. Functional Requirements

## Content and Navigation

- All Phase 1 pages must be directly addressable by URL
- Homepage previews must link to the correct destination
- Language switching must preserve the current route where practical
- Missing content may use polished temporary copy stored in translation files
- No user-facing copy should be embedded unnecessarily in presentation components

## Enquiry Form

The Phase 1 enquiry form should support:

- Name
- Email
- Phone, optional unless business rules require it
- Enquiry category
- Preferred date or date range, where relevant
- Estimated guest count, where relevant
- Message
- Consent acknowledgement

The system must:

- Validate required fields and email format
- Provide bilingual validation, success, and error messages
- Deliver enquiries to the approved operational destination
- Include reasonable spam protection
- Avoid exposing private credentials in frontend code

---

# 11. Non-Functional Requirements

## Responsive Design

Support desktop, tablet, and mobile. Desktop is the primary visual reference, but all user journeys must remain complete on mobile.

## Accessibility

Target WCAG 2.2 AA where practical, including:

- Semantic landmarks and heading order
- Keyboard-operable navigation and controls
- Visible focus states
- Sufficient colour contrast
- Descriptive alternative text
- Form labels and accessible error association
- Comfortable touch targets
- Reduced-motion support

## Performance

- Optimise image dimensions and formats
- Lazy-load non-critical imagery
- Avoid unnecessary JavaScript
- Prevent avoidable layout shifts
- Keep the homepage usable on typical mobile connections

## SEO

- Unique bilingual titles and descriptions
- Semantic page structure
- Canonical URLs
- Sitemap and robots configuration
- Social-sharing metadata
- Descriptive image names and alternative text

## Security and Privacy

- Use HTTPS in production
- Validate and sanitise form input
- Store secrets only in server-side environment configuration
- Collect only necessary personal information
- Provide an appropriate privacy notice before launch

## Maintainability

- Reusable components and configuration-driven navigation
- Centralised content, translations, and image assignments
- Clear separation of content, presentation, and integration logic
- Automated lint, build, and route checks

---

# 12. Technical Requirements

## Frontend

- React-based application using the existing project framework
- Client-side routing compatible with production hosting
- Reusable shared layout and page components

The current repository implementation is authoritative if it differs from the original Vite/React Router assumption. Framework changes require explicit approval.

## Styling

- CSS and design tokens
- Responsive layouts
- Reusable design system
- Accessible interactive states

## Internationalisation

- Existing i18n solution
- English and Simplified Chinese translation resources
- Persistent language preference

## Backend — Future Phase

- API layer for enquiries, membership, activities, and bookings
- Technology selected when backend scope is approved

## Deployment

- CDN-based static or hybrid hosting
- Custom domain and HTTPS
- Environment-specific configuration
- Build and deployment checks

---

# 13. Phase 1 Scope — MVP

## Include

- Static bilingual pages
- Responsive navigation and layouts
- Contact and enquiry experience
- About, History, and Gallery
- Weddings and Corporate Events
- Boutique Stay and Healing Retreat
- Tea Room and Private Dining
- Independent International Programs page
- Authentic Dear Villa photography where suitable
- Map, contact details, basic SEO, and accessibility

## Do Not Include

- Online payment
- Live accommodation availability
- Booking management
- Membership registration or login
- Member activity booking
- CMS
- Admin dashboard
- Customer accounts
- AI chatbot

---

# 14. Future Features

- Membership applications, registration, login, and profiles
- Member email schedules and activity registration
- Online accommodation and event booking
- Tea Room and Private Dining reservations
- International Program applications
- Customer accounts
- Admin dashboard and CMS
- Newsletter and blog
- Image management
- Advanced SEO and analytics
- Payment integration

---

# 15. Assets and Content

## Images

Use authentic Dear Villa photography wherever suitable. Placeholder or stock imagery may only be used temporarily when no appropriate estate image exists.

Requirements:

- Preserve original image files
- Centralise homepage image assignments
- Select imagery by visible content, composition, orientation, and resolution
- Avoid unnecessary duplication or aggressive cropping
- Record uncertain image choices for manual review

## Text

Until final copy is approved, use polished temporary English and Simplified Chinese copy. Temporary copy must be:

- Concise and relevant to Dear Villa
- Stored in translation/content resources
- Easy to replace without modifying components
- Free from unsupported claims

## Logo

A temporary wordmark may be used until the official logo is supplied. Replacement must not require restructuring the header.

---

# 16. Assumptions, Constraints, and Dependencies

## Assumptions

- Final business details, pricing, capacities, schedules, and policies require owner approval
- Phase 1 enquiries are handled manually
- International Program categories remain page content, not navigation children
- Membership remains disabled until separately approved

## Constraints

- Final content and photography may arrive incrementally
- Bilingual content lengths will differ
- A seven-item desktop navigation must remain usable at common laptop widths

## Dependencies

- Approved contact details and enquiry recipient
- Approved map location
- Permission to publish supplied photographs and event references
- Final privacy wording
- Domain and hosting access before deployment

---

# 17. Acceptance and Success Criteria

The MVP is successful when:

- The four business pillars are clear on the homepage and in navigation
- International Programs is an independent top-level item
- Events contains only Weddings and Corporate Events as subpages
- Accommodation contains Boutique Stay and Healing Retreat
- Tea Room and Private Dining remain under Experiences
- Membership remains disabled and hidden
- All Phase 1 routes work directly
- English and Simplified Chinese layouts are stable
- Visitors can submit an enquiry successfully
- The website works across desktop, tablet, and mobile
- The experience presents a premium estate image
- Accessibility, performance, SEO, and security checks are completed
- The architecture supports future membership and booking features

---

# 18. Approval and Change Control

Version 0.3 is the approved Phase 1 baseline. Material changes to business pillars, navigation, routes, public features, or scope require:

1. A documented change request
2. Impact review across Requirements, Project Plan, Design System, and Architecture
3. A new document version
4. Owner approval before implementation

