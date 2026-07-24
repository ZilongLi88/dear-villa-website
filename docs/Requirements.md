# Dear Villa Resort Website

Version: 0.2  
Status: Planning

---

# 1. Project Overview

## Project Name

Dear Villa Resort Website

## Project Goal

Build a modern bilingual (English and Simplified Chinese) luxury estate website that showcases the estate, promotes its services and experiences, and encourages visitors to contact the estate.

The website should present a premium brand image while remaining simple, elegant, responsive, and easy to maintain.

The website architecture must also support the future addition of a membership system without requiring a major redesign.

---

# 2. Business Objectives

The website should help visitors:

- Discover the estate
- Learn about its history
- Explore weddings and corporate events
- Discover international programs
- View accommodation
- Explore the tea room and private dining experiences
- Contact the estate
- Access membership services in a future phase

## Primary Objective

Generate customer enquiries.

## Secondary Objectives

- Build awareness of the Dear Villa brand
- Present the estate as a premium destination
- Support event, accommodation, dining, and international program enquiries
- Create a scalable foundation for future membership and booking systems

---

# 3. Target Users

## Primary Users

- Wedding customers
- Corporate event customers
- Accommodation guests
- Tea room visitors
- Private dining customers
- International program participants
- Business hosting customers

## Secondary Users

- Study tour organizers
- Wellness program organizers
- Tourism partners
- Business partners
- Local community
- Future members

---

# 4. Website Language

The website will support:

- English
- Simplified Chinese

Users can switch languages from the navigation bar.

Language switch:

```text
EN | 中文
```

All navigation labels, page content, buttons, forms, and system messages should support both languages.

---

# 5. Website Pages

## Home

Landing page introducing the estate.

The homepage should provide previews of all major services and guide visitors toward relevant pages or the contact form.

---

## About

### Subpages

- Our History
- Gallery

### Our History

Introduce:

- The history of the estate
- The story behind Dear Villa
- The estate’s character and values
- Its connection to the local area

### Gallery

Display:

- Estate photography
- Accommodation
- Events
- Tea room
- Private dining
- Landscape and surroundings

---

## Events

The Events section should introduce the estate as a destination for weddings, corporate events, and international programs.

### Subpages

- Weddings
- Corporate Events
- International Programs

### Weddings

Introduce:

- Wedding venue
- Ceremony and reception spaces
- Wedding photography opportunities
- Private wedding experiences
- Wedding enquiry information

### Corporate Events

Introduce:

- Corporate functions
- Meetings and retreats
- Team events
- Business receptions
- Private venue hire

### International Programs

The International Programs page should introduce:

- Study Tours
- Wellness Programs
- Travel Experiences
- Business Hosting

These services should be presented within the International Programs page rather than as a third-level navigation menu.

---

## Accommodation

Introduce:

- Rooms
- Facilities
- Guest experience
- Estate surroundings
- Airbnb booking information
- External Airbnb booking link

The navigation label should be:

```text
Accommodation
```

---

## Experiences

The Experiences section should introduce the estate’s food, hospitality, and cultural experiences.

### Subpages

- Tea Room
- Private Dining

### Tea Room

Introduce:

- Tea culture
- Tea experiences
- Tea room environment
- Private tea sessions
- Group visits
- Tea room enquiry information

### Private Dining

Introduce:

- Private dining experiences
- Seasonal menus
- Chef-led dining
- Intimate celebrations
- Group dining
- Private dining enquiry information

---

## Membership

Membership is a future feature and is not included in the Phase 1 MVP.

The navigation item should remain hidden until the membership page or membership system is ready.

Future membership features may include:

- Membership introduction
- Membership applications
- Member registration and login
- Member profiles
- Exclusive events
- Member benefits and offers
- Member communications
- Membership administration

The website navigation must support adding Membership later without redesigning the header.

---

## Contact

Include:

- Contact form
- Phone
- Email
- Address
- Google Map
- Enquiry category selection

Suggested enquiry categories:

- Weddings
- Corporate Events
- International Programs
- Accommodation
- Tea Room
- Private Dining
- Future Membership
- General Enquiry

The Contact navigation item may be visually styled as the primary call-to-action button.

A separate “Make an Enquiry” navigation item is not required.

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

- Large photography
- Full-width sections
- Generous white space
- Serif headings
- Sans-serif body text
- Warm ivory background
- Minimal animations
- Refined dropdown navigation
- Clear call-to-action styling

The website should feel similar to a luxury boutique hotel, private estate, or premium countryside retreat.

---

# 7. Navigation

## Phase 1 Main Navigation

```text
Home | About | Events | Accommodation | Experiences | Contact
```

## Navigation Structure

```text
Home

About
- Our History
- Gallery

Events
- Weddings
- Corporate Events
- International Programs

Accommodation

Experiences
- Tea Room
- Private Dining

Contact
```

## International Programs Page Content

```text
Study Tours
Wellness Programs
Travel Experiences
Business Hosting
```

These items should appear within the International Programs page and should not create a third-level dropdown menu.

## Future Navigation

When the membership feature is ready, the navigation will become:

```text
Home | About | Events | Accommodation | Experiences | Membership | Contact
```

## Navigation Requirements

- Navigation items should be generated from a reusable configuration.
- Navigation items must not use fixed positioning based on the number of items.
- The header must support adding Membership later.
- Dropdown navigation should not exceed two levels.
- The Contact item may be styled as a prominent call-to-action button.
- Mobile navigation should use a clear expandable menu.
- The active page should be visually indicated.
- All navigation labels must support English and Simplified Chinese.

## Language Switch

```text
EN | 中文
```

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

## Homepage CTA Examples

- Explore the Estate
- Discover Our Events
- View Accommodation
- Explore Experiences
- Contact Us

The homepage should not display Membership during Phase 1 unless a future membership interest form is approved.

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
│   ├── /events/corporate
│   └── /events/international-programs
│
├── /accommodation
│
├── /experiences
│   ├── /experiences/tea-room
│   └── /experiences/private-dining
│
├── /membership
│
└── /contact
```

The `/membership` route may be reserved during development but should not be publicly displayed during Phase 1.

---

# 10. Technical Requirements

## Frontend

- React
- Vite
- React Router

## Styling

- CSS
- Responsive design
- Reusable design system
- Reusable navigation components

## Internationalization

- react-i18next
- English and Simplified Chinese translation files
- Language preference persistence

## Backend — Phase 2

- Node.js
- Express

## Deployment — Future

- Cloudflare Pages or Vercel

---

# 11. Responsive Requirements

Support:

- Desktop
- Tablet
- Mobile

Desktop layout should be the primary design reference.

All pages and navigation menus must work correctly on mobile devices.

## Mobile Navigation Requirements

- Use a hamburger menu on smaller screens.
- Dropdown sections should be expandable.
- International Programs should not open a third-level menu.
- Contact should remain easy to find.
- Language switching should remain accessible.
- Touch targets should be large enough for comfortable mobile use.

---

# 12. Phase 1 Scope — MVP

## Include

- Static pages
- Responsive layout
- Bilingual support
- Contact form
- Gallery
- Google Maps
- Airbnb external link
- Weddings page
- Corporate Events page
- International Programs page
- Accommodation page
- Tea Room page
- Private Dining page

## Do Not Include

- Online payment
- Membership system
- Member registration or login
- Booking management
- CMS
- Admin dashboard
- AI chatbot

The Membership navigation item should remain hidden during Phase 1.

---

# 13. Future Features

Possible future additions:

- Membership system
- Membership applications
- Member registration and login
- Member profiles
- Exclusive member events and offers
- Online accommodation booking
- Event booking
- Tea room reservations
- Private dining reservations
- International program applications
- Customer accounts
- Admin dashboard
- Blog
- Newsletter
- Image management
- Advanced SEO
- Google Analytics

---

# 14. Assets

## Current Status

### Images

Placeholder images will be used initially.

Final estate photos will be added later.

Required future photography may include:

- Estate exterior
- Estate interior
- Accommodation
- Weddings
- Corporate events
- International programs
- Tea room
- Private dining
- Landscape and surroundings

### Text

Placeholder content such as “XXXX” may be used during initial development.

Final English and Chinese copywriting will be added later.

### Logo

A temporary logo may be used during initial development.

The official logo will be provided later.

---

# 15. Success Criteria

The MVP will be considered successful if it:

- Presents a premium estate image
- Clearly explains available services
- Clearly separates Events, Accommodation, and Experiences
- Introduces Weddings, Corporate Events, and International Programs
- Introduces the Tea Room and Private Dining
- Works correctly on desktop, tablet, and mobile
- Supports English and Simplified Chinese
- Allows visitors to contact the estate
- Provides a clear path to customer enquiries
- Supports the future addition of Membership
- Is easy to expand in future versions