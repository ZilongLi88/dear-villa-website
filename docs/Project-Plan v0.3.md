# Dear Villa Resort Website

Project Plan  
Version: 0.3  
Status: Active  
Last updated: 27 July 2026

---

# 1. Project Status

## Current Phase

🟡 Homepage design and implementation

## Progress

- [x] Requirements baseline
- [x] Shared navigation and route skeleton
- [x] Initial bilingual configuration
- [ ] Design System v0.3 approval
- [ ] Homepage completion
- [ ] Inner pages
- [ ] Enquiry integration
- [ ] Quality assurance
- [ ] Deployment
- [ ] Launch

Status markers are planning aids and should be updated from verified repository state.

---

# 2. Project Principles

Dear Villa is organised around four business pillars:

- Events
- Accommodation
- Experiences
- International Programs

Development should prioritise:

- Reusable components
- Configuration-driven navigation
- Scalable information architecture
- Responsive layouts
- Bilingual content support
- Accessibility and performance
- Centralised content and image assignments
- Future feature extensibility

---

# 3. Approved Information Architecture

## Phase 1 Navigation

```text
Home | About | Events | Accommodation | Experiences | International Programs | Contact
```

## Future Navigation

```text
Home | About | Events | Accommodation | Experiences | International Programs | Membership | Contact
```

Membership remains configured but hidden during Phase 1.

## Page Hierarchy

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
├── Study Tours (page content)
├── Wellness Programs (page content)
├── Travel Experiences (page content)
└── Business Hosting (page content)

Membership (future; hidden)

Contact
```

International Program categories must not become third-level navigation.

---

# 4. Delivery Roadmap

## Phase 1 — Planning and Baseline

### Goal

Approve scope, business pillars, information architecture, and delivery approach.

### Tasks

- [x] Establish Requirements v0.3
- [x] Approve the four business pillars
- [x] Promote International Programs to top-level navigation
- [x] Define Boutique Stay and Healing Retreat
- [x] Confirm Experiences structure
- [x] Keep Membership hidden during Phase 1
- [ ] Confirm final owner content and operational details
- [ ] Confirm image publication permissions

### Deliverables

- `Requirements.md`
- `Project-Plan.md`
- Approved sitemap and route structure
- Content and asset inventory

### Exit Criteria

- No unresolved contradiction between scope, navigation, and routes
- Owner agrees with the four business pillars

---

## Phase 2 — Design System

### Goal

Define a consistent visual and interaction language before completing pages.

### Tasks

- [ ] Approve design principles and colour tokens
- [ ] Approve typography and spacing
- [ ] Define navigation, buttons, forms, cards, and section patterns
- [ ] Define homepage wireframe
- [ ] Define page templates
- [ ] Define horizontal Gallery Carousel
- [ ] Define motion and reduced-motion behaviour
- [ ] Define responsive and accessibility rules

### Deliverables

- `Design-System.md` v0.3
- Desktop, tablet, and mobile component rules
- Homepage wireframe and page templates

### Estimated Effort

1–2 working days

---

## Phase 3 — Architecture and Project Foundation

### Goal

Confirm the existing project foundation and document scalable conventions.

### Tasks

- [x] Establish shared routes
- [x] Establish configuration-driven navigation
- [x] Establish English and Simplified Chinese support
- [x] Reserve disabled Membership configuration
- [ ] Confirm actual framework and build commands
- [ ] Confirm folder ownership and import conventions
- [ ] Confirm content and image configuration locations
- [ ] Add continuous checks where missing

### Deliverables

- `Architecture.md` v0.1
- Working route skeleton
- Shared navigation configuration
- Bilingual resource structure

### Exit Criteria

- Production build succeeds
- Direct requests to Phase 1 routes succeed
- Membership remains hidden

---

## Phase 4 — Shared Components

### Goal

Build or refine reusable UI components.

### Components

- [x] Navbar
- [x] Desktop dropdown navigation
- [x] Mobile navigation
- [x] Language switch
- [ ] Footer
- [ ] Button and text-link variants
- [ ] Section Header
- [ ] Homepage Hero
- [ ] Editorial Split Section
- [ ] Service Preview
- [ ] Gallery Carousel
- [ ] Contact CTA
- [ ] Contact Form
- [ ] Breadcrumbs

### Deliverables

- Reusable component library
- Responsive bilingual component behaviour
- Component states and accessibility coverage

### Estimated Effort

2–3 working days, overlapping with homepage delivery

---

## Phase 5 — Homepage

### Goal

Complete the premium bilingual landing page.

### Sections

- [ ] Hero
- [ ] About Preview
- [ ] Events Preview
- [ ] International Programs Preview
- [ ] Accommodation Preview
- [ ] Experiences Preview
- [ ] Tea Room and Private Dining Preview
- [ ] Gallery Preview Carousel
- [ ] Contact CTA
- [ ] Footer

### Requirements

- Clearly present all four business pillars
- Keep International Programs independent from Events
- Use authentic Dear Villa photography where suitable
- Keep image assignments centralised
- Use temporary bilingual copy until final content is approved
- Keep Membership hidden
- Link previews to approved routes
- Support desktop, tablet, and mobile

### Validation

- [ ] Hero image and focal point verified
- [ ] Gallery Carousel loops manually in both directions
- [ ] Carousel supports keyboard controls and mobile swipe where implemented
- [ ] English and Chinese layouts reviewed
- [ ] Lint, build, and tests pass

### Estimated Effort

3–5 working days

---

## Phase 6 — About

### Pages

- [ ] About Overview
- [ ] Our History
- [ ] Gallery

### Deliverables

- Responsive bilingual About section
- Curated Gallery page
- Contact pathway

### Estimated Effort

2–3 working days

---

## Phase 7 — Events

### Pages

- [ ] Events Overview
- [ ] Weddings
- [ ] Corporate Events

### Deliverables

- Event service pages
- Relevant evidence, facilities, and photography
- Event enquiry pathways

### Estimated Effort

2–3 working days

---

## Phase 8 — Accommodation

### Pages

- [ ] Accommodation Overview
- [ ] Boutique Stay
- [ ] Healing Retreat

### Boutique Stay Content

- [ ] Rooms and facilities
- [ ] Guest experience
- [ ] Estate surroundings
- [ ] Practical stay information
- [ ] Direct enquiry CTA

### Healing Retreat Content

- [ ] Wellness-oriented positioning
- [ ] Retreat environment and programmes
- [ ] Relevant activities
- [ ] Stay options
- [ ] Direct enquiry CTA

### Deliverables

- Three responsive bilingual pages
- Enquiry-led accommodation pathway

### Estimated Effort

2–3 working days

---

## Phase 9 — Experiences

### Pages

- [ ] Experiences Overview
- [ ] Tea Room
- [ ] Private Dining

### Deliverables

- Experience pages
- Relevant menu or availability disclaimers
- Enquiry pathways

### Estimated Effort

2–3 working days

---

## Phase 10 — International Programs

### Goal

Present International Programs as an independent business pillar.

### Page Content

- [ ] Study Tours
- [ ] Wellness Programs
- [ ] Travel Experiences
- [ ] Business Hosting

### Requirements

- One top-level route
- No third-level navigation
- Clear audience and enquiry pathway for each category
- Bilingual content

### Deliverables

- International Programs page
- Programme enquiry pathway

### Estimated Effort

2 working days

---

## Phase 11 — Contact and Enquiry

### Tasks

- [ ] Contact details and map
- [ ] Enquiry category selection
- [ ] Conditional fields where justified
- [ ] Validation
- [ ] Delivery integration
- [ ] Success and error feedback
- [ ] Spam protection
- [ ] Privacy acknowledgement
- [ ] Bilingual labels and messages

### Enquiry Categories

- Weddings
- Corporate Events
- Boutique Stay
- Healing Retreat
- Tea Room
- Private Dining
- International Programs
- General Enquiry

### Deliverables

- Reliable enquiry system
- Responsive Contact page
- Documented operational destination

### Estimated Effort

1–3 working days, depending on integration

---

## Phase 12 — Responsive, Accessibility, and Performance

### Tasks

- [ ] Desktop, tablet, and mobile review
- [ ] Common laptop-width navigation review
- [ ] Mobile menu and dropdown testing
- [ ] Keyboard and focus testing
- [ ] Touch-target review
- [ ] Contrast and heading review
- [ ] Reduced-motion testing
- [ ] Image sizing and lazy loading
- [ ] Layout-shift review
- [ ] Cross-browser testing

### Deliverables

- Production-ready responsive frontend
- Accessibility checklist
- Performance findings and fixes

### Estimated Effort

2–3 working days

---

## Phase 13 — Content and Quality Assurance

### Tasks

- [ ] Replace or approve temporary copy
- [ ] Review English and Chinese content
- [ ] Verify business claims, capacities, schedules, and policies
- [ ] Review image choices and permissions
- [ ] Test every route and link
- [ ] Test language switching
- [ ] Test enquiry delivery
- [ ] Review metadata and social-sharing previews
- [ ] Run lint, build, tests, and broken-link checks

### Deliverables

- Approved content
- QA checklist
- Launch candidate

### Estimated Effort

2–3 working days

---

## Phase 14 — Deployment and Launch

### Tasks

- [ ] Confirm hosting platform
- [ ] Configure production build
- [ ] Configure custom domain and HTTPS
- [ ] Configure environment variables
- [ ] Configure SPA or framework route handling
- [ ] Add metadata, sitemap, robots rules, and social image
- [ ] Add analytics only with approval and appropriate privacy handling
- [ ] Perform post-deployment route, form, and device checks
- [ ] Document rollback procedure

### Deliverables

- Public website
- Working custom domain and HTTPS
- Launch checklist and rollback note

### Estimated Effort

1–2 working days

---

## Phase 15 — Future Membership and Booking

### Possible Capabilities

- Membership applications
- Registration, login, and profiles
- Email activity schedules
- Member event registration
- Exclusive benefits and offers
- Accommodation and event booking
- Tea Room and Private Dining reservations
- International Program applications
- Administration and reporting

These capabilities require separate discovery, privacy, security, backend, and operational planning.

---

# 5. Recommended Routes

```text
/
├── /about
│   ├── /about/history
│   └── /about/gallery
├── /events
│   ├── /events/weddings
│   └── /events/corporate
├── /accommodation
│   ├── /accommodation/boutique-stay
│   └── /accommodation/healing-retreat
├── /experiences
│   ├── /experiences/tea-room
│   └── /experiences/private-dining
├── /international-programs
├── /membership
└── /contact
```

`/membership` remains disabled and hidden during Phase 1.

---

# 6. Dependencies and Risks

| Dependency or risk | Impact | Mitigation |
|---|---|---|
| Final copy is delayed | Layout approval may use temporary text | Keep copy centralised and replaceable |
| Image quality varies | Premium presentation may suffer | Curate by resolution, composition, and context |
| Seven desktop navigation items | Possible laptop-width crowding | Responsive spacing and earlier menu breakpoint |
| Business details are unconfirmed | Incorrect public claims | Owner approval before launch |
| Enquiry delivery is undecided | Contact feature cannot launch | Confirm recipient and provider early |
| Bilingual text length differs | Layout instability | Test both languages at every breakpoint |
| Future Membership scope expands | Architecture pressure | Keep feature isolated and configuration-driven |

---

# 7. Definition of Done

A phase is complete only when:

- Required implementation is present
- English and Simplified Chinese are supported
- Desktop, tablet, and mobile behaviour is reviewed
- Accessibility requirements are met proportionately
- Lint, production build, and relevant tests pass
- Changed routes respond directly
- Documentation is updated
- No unrelated regression is introduced
- Owner review is completed where business approval is required

---

# 8. Current Priorities

1. Approve `Design-System.md` v0.3
2. Complete and review the homepage
3. Confirm final content and image permissions
4. Implement remaining Phase 1 pages
5. Complete enquiry integration
6. Perform QA and deploy

