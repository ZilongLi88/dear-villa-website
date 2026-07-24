# Dear Villa Resort Website

Design System  
Version: 0.2

---

# Design Philosophy

The website should communicate:

- Luxury
- Warmth
- Nature
- Simplicity
- Elegance
- Timelessness

The website should not look like a standard hotel booking platform.

Instead, the experience should feel closer to a luxury estate, boutique retreat, vineyard, or private countryside destination.

The design should balance premium presentation with clear and intuitive navigation.

---

# Brand Personality

## Keywords

- Premium
- Calm
- Sophisticated
- Welcoming
- Spacious
- Natural
- Modern Classic
- Refined
- Authentic

---

# Target User Feeling

Visitors should feel:

> “I would love to visit this place.”

The design should encourage visitors to:

- Explore the estate
- Discover events and experiences
- View accommodation
- Learn about international programs
- Stay longer on the website
- Contact the estate

---

# Colour Palette

## Primary Colour

### Deep Forest Green

Used for:

- Navigation
- Primary buttons
- Footer
- Important headings
- Selected states
- Highlights

The green should feel natural, premium, and calm rather than bright or highly saturated.

## Secondary Colour

### Warm Ivory

Used for:

- Page backgrounds
- Large content sections
- Cards
- Alternating section backgrounds

## Accent Colour

### Soft Gold

Used for:

- Small decorative elements
- Dividers
- Icons
- Hover effects
- Active navigation indicators
- Selected details

Soft Gold should be used sparingly and should not dominate the interface.

## Neutral Colours

### White

Used for:

- Text on dark backgrounds
- Cards
- Light content areas

### Light Grey

Used for:

- Borders
- Form fields
- Dividers
- Secondary backgrounds

### Dark Grey

Used for:

- Body text
- Secondary headings
- Form labels

Avoid pure black where possible. Use a softer charcoal tone for text.

---

# Typography

## Heading Font

Use an elegant serif font.

Examples:

- Cormorant Garamond
- Playfair Display

Used for:

- Hero headings
- Page titles
- Section headings
- Feature titles
- Editorial statements

## Body Font

Use a modern sans-serif font.

Examples:

- Inter
- Manrope

Used for:

- Paragraphs
- Navigation
- Buttons
- Forms
- Captions
- Supporting information

## Simplified Chinese Font

Use a clean and elegant Simplified Chinese font stack.

Possible options:

- Noto Serif SC for headings
- Noto Sans SC for body text
- System Chinese fonts as fallbacks

## Typography Rules

- Use large and elegant headings.
- Maintain comfortable line spacing.
- Keep paragraph width readable.
- Avoid long lines of text.
- Use consistent heading levels.
- Do not use too many font weights.
- English and Chinese layouts should maintain a similar visual hierarchy.
- Chinese text may require slightly different line height and letter spacing.

---

# Layout

## Content Width

Recommended maximum content width:

```text
1200–1400px
```

Long-form text sections should use a narrower reading width.

## Section Spacing

Use:

- Generous vertical spacing
- Large margins
- Clear separation between sections
- Consistent horizontal page padding

Avoid:

- Crowded layouts
- Too many small sections
- Excessive borders
- Unnecessary visual decoration

---

# Grid System

## Desktop

- 12-column grid
- Flexible content sections
- Two-column and three-column service layouts

## Tablet

- Two-column layout where appropriate
- Reduced spacing
- Simplified navigation

## Mobile

- Single-column layout
- Full-width cards
- Clear vertical hierarchy
- Comfortable touch spacing

---

# Navigation System

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

## Future Navigation

When the membership system is ready:

```text
Home | About | Events | Accommodation | Experiences | Membership | Contact
```

Membership should remain hidden during Phase 1.

## Desktop Navbar

The desktop navbar should:

- Be transparent over the homepage hero
- Become solid after scrolling
- Include the logo
- Include the main navigation
- Include the language switch
- Use a maximum of two navigation levels
- Display dropdown menus for About, Events, and Experiences
- Display Contact as the primary navigation call-to-action

A separate “Make an Enquiry” navigation button is not required.

## Contact Navigation Style

Contact may be styled as:

- A bordered button
- A solid forest green button on light backgrounds
- A light or gold-accented button on dark backgrounds

The treatment should remain elegant and should not feel overly promotional.

## Dropdown Menus

Dropdown menus should:

- Use a clean and spacious layout
- Open consistently
- Use clear text labels
- Include subtle hover states
- Support keyboard navigation
- Remain visually connected to the main navbar
- Avoid third-level dropdown menus

The Events dropdown should include:

- Weddings
- Corporate Events
- International Programs

The International Programs categories should appear on the International Programs page, not inside another dropdown.

## Language Switch

Display:

```text
EN | 中文
```

The language switch should remain visible and easy to access.

It should not compete visually with the main navigation or Contact button.

## Mobile Navigation

On mobile:

- Replace desktop navigation with a hamburger menu.
- Use a full-screen or large slide-in menu.
- Make dropdown groups expandable.
- Keep navigation to a maximum of two levels.
- Keep the language switch visible.
- Keep Contact easy to find.
- Use large and accessible touch targets.

---

# Images

Images are one of the most important design elements.

## Style

Images should be:

- Large
- Bright
- Natural
- High resolution
- Warm but realistic
- Carefully composed
- Consistent in colour treatment

## Cropping

- Use minimal cropping where possible.
- Keep important subjects visible.
- Use consistent aspect ratios for cards.
- Allow hero images to use responsive focal points.

## Avoid

- Generic stock-photo appearance
- Heavy filters
- Over-editing
- Excessively dark images
- Inconsistent colour grading
- Low-resolution images

---

# Components

## Navbar

Contains:

- Logo
- Main navigation
- Dropdown menus
- Language switch
- Contact call-to-action
- Mobile hamburger menu

States:

- Transparent over hero
- Solid after scrolling
- Active page
- Dropdown open
- Mobile menu open

---

## Hero

The homepage hero should include:

- Large estate image
- Main headline
- Short supporting description
- Primary CTA
- Optional secondary CTA

Possible CTA labels:

- Explore the Estate
- Discover Our Events
- View Accommodation
- Contact Us

Inner-page heroes may be shorter than the homepage hero.

---

## Buttons

### Primary Button

Style:

- Solid background
- Refined shape
- Comfortable padding
- Smooth hover animation
- Clear focus state

Used for:

- Contact
- Important enquiries
- Primary page actions

### Secondary Button

Style:

- Outline or text-link style
- Minimal appearance
- Subtle hover effect

Used for:

- Learn More
- View Gallery
- Explore Experiences
- Secondary actions

Buttons should not be excessively rounded. Slightly rounded or refined rectangular buttons are preferred.

---

## Cards

Cards may be used for:

- Weddings
- Corporate Events
- International Programs
- Accommodation
- Tea Room
- Private Dining
- Gallery previews

Each card may contain:

- Large image
- Title
- Short description
- Learn More link or button

Cards should use:

- Generous image space
- Minimal text
- Consistent spacing
- Subtle hover effects
- Clear visual hierarchy

Avoid heavy shadows and overly rounded card styles.

---

## International Program Cards

The International Programs page may use cards for:

- Study Tours
- Wellness Programs
- Travel Experiences
- Business Hosting

These cards should remain within the International Programs page.

They should not create a third-level navigation menu.

---

## Experience Cards

Experience cards should be used for:

- Tea Room
- Private Dining

The visual style should feel:

- Intimate
- Warm
- Refined
- Personal
- Hospitality-focused

---

## Accommodation Content

Accommodation sections may include:

- Large room photography
- Facilities
- Guest experience
- Estate surroundings
- Airbnb booking information
- External booking button

The Airbnb link should be visually clear but should not make the website feel like a booking platform.

---

## Gallery

The Gallery may use:

- Masonry layout
- Editorial grid
- Large image spacing
- Subtle hover animation
- Lightbox-ready interaction

The gallery should remain visually calm and should not feel crowded.

---

## Contact CTA

The Contact CTA should use:

- A large section
- A simple message
- One clear button
- Strong contrast
- Minimal supporting text

Possible CTA text:

```text
Plan Your Visit
```

```text
Start Your Enquiry
```

```text
Contact Dear Villa
```

---

## Forms

Forms should use:

- Clear labels
- Large input fields
- Comfortable spacing
- Visible focus states
- Simple validation messages
- Bilingual labels and system messages

The enquiry form may include categories for:

- Weddings
- Corporate Events
- International Programs
- Accommodation
- Tea Room
- Private Dining
- Future Membership
- General Enquiry

---

# Icons

Icons should use:

- Minimal design
- Thin line style
- Consistent stroke width
- Consistent sizing
- Simple and recognizable shapes

Avoid mixing multiple icon styles.

Icons should support content rather than become the main visual focus.

---

# Animations

Animations should remain subtle.

## Allowed

- Fade in
- Slide up
- Gentle image zoom
- Button hover
- Navigation transitions
- Dropdown fade
- Menu expansion
- Light parallax where appropriate

## Avoid

- Heavy animations
- Auto-play effects
- Complex transitions
- Excessive parallax
- Fast or distracting movement
- Animations that delay navigation

Animations should respect reduced-motion accessibility preferences.

---

# Responsive Design

The design should be desktop-first but fully responsive.

## Must Support

- Desktop
- Tablet
- Mobile

## Responsive Requirements

- Navigation becomes a hamburger menu on mobile.
- Dropdown sections become expandable menu groups.
- Cards change from multi-column to single-column layouts.
- Images use responsive sizes.
- Text remains readable at all screen sizes.
- Buttons remain easy to select on touch devices.
- English and Chinese content must both fit correctly.
- Adding Membership later must not break the desktop or mobile navigation.

---

# Accessibility

The website should include:

- High colour contrast
- Readable font sizes
- Keyboard navigation
- Descriptive alt text
- Visible focus states
- Semantic heading structure
- Accessible form labels
- Accessible dropdown menus
- Accessible mobile navigation
- Reduced-motion support
- Sufficient touch target sizes

Colour should not be the only way information is communicated.

---

# Language System

## Supported Languages

- English
- Simplified Chinese

## Language Requirements

- Language switch available from the navigation bar
- Consistent navigation structure in both languages
- Separate translation files
- Persistent language selection
- Bilingual form labels
- Bilingual validation messages
- Flexible layouts for different text lengths

English and Chinese content should feel equally considered and should not appear as an afterthought.

---

# Page Style

Every main page should include:

- Navbar
- Hero or page introduction
- Main content
- Relevant enquiry CTA
- Footer

Use consistent:

- Spacing
- Typography
- Image treatment
- Buttons
- Page transitions
- Content hierarchy

Not every page needs a full-screen hero. Inner pages may use shorter editorial-style headers.

---

# Page-Specific Design Direction

## About

Focus on:

- Heritage
- Estate story
- Architecture
- Landscape
- Editorial photography

## Events

Focus on:

- Emotion
- Atmosphere
- Venue flexibility
- Hospitality
- Memorable occasions

## International Programs

Focus on:

- Cultural exchange
- Premium hosting
- Education
- Travel
- Wellness
- Business relationships

## Accommodation

Focus on:

- Comfort
- Privacy
- Natural surroundings
- Room details
- Guest experience

## Experiences

Focus on:

- Tea culture
- Food
- Private hospitality
- Intimate moments
- Personal service

## Contact

Focus on:

- Simplicity
- Trust
- Clear communication
- Easy enquiry submission

## Membership — Future

The future Membership design should use the existing:

- Typography
- Colour palette
- Buttons
- Forms
- Cards
- Navigation system

It should not require a separate visual style or a major redesign.

---

# Photography Style

Use estate photography featuring:

- Natural light
- Wide-angle exterior views
- Interior lifestyle scenes
- Weddings
- Corporate events
- International programs
- Accommodation
- Tea experiences
- Private dining
- Garden
- Pool
- Landscape
- Architecture
- Food details
- Hospitality moments

Photography should feel authentic, warm, refined, and location-specific.

---

# References

## Primary Inspiration

- Puketutu Island Estate
- Settlers Country Manor
- Westbrook Winery
- Tea Tera

These websites are references only.

Do not copy layouts directly.

Use them only to guide:

- Overall atmosphere
- Typography
- Spacing
- Image presentation
- Navigation quality
- Editorial composition
- Luxury feeling

---

# Coding Principles

- Build reusable React components.
- Avoid duplicated code.
- Use semantic HTML.
- Keep components small and reusable.
- Use a responsive and mobile-friendly structure.
- Generate navigation from reusable configuration data.
- Keep Membership configurable and hidden during Phase 1.
- Do not hard-code navigation item positions.
- Keep dropdown menus to a maximum of two levels.
- Maintain consistent component behaviour in English and Chinese.
- Use accessible interactions for dropdown and mobile menus.

---

# Future Expansion

The design should be scalable for future features:

- Membership
- Online accommodation booking
- Event registration
- Tea room reservations
- Private dining reservations
- International program applications
- Customer accounts
- Admin dashboard
- Blog
- Newsletter
- Analytics

The visual style should remain consistent as the website grows.

Adding Membership in a future phase should only require:

- Enabling the Membership navigation item
- Adding Membership pages
- Adding account and application interfaces
- Reusing the existing design system

It should not require redesigning the main navigation or the wider website.