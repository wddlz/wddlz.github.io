# Portfolio Modernization Plan
**Ian Drosos - Security & AI Designer/Developer Portfolio**

## Executive Summary
Transform the existing HTML5UP-based portfolio into a modern, dark-mode friendly website that reflects your trajectory as a security and AI designer/developer. The update will maintain all current content while implementing a sleek, modern design inspired by contemporary design systems like shadcn/ui and modern startup aesthetics.

---

## Phase 1: Planning & Design System (Day 1)

### 1.1 Design System Definition
- **Color Palette:**
  - Primary: Dark mode first with system preference detection
  - Background: `#0a0a0a` (dark) / `#ffffff` (light)
  - Surface: `#18181b` (dark) / `#f4f4f5` (light)
  - Accent: Blue/purple gradient for AI/security theme
  - Text: High contrast with WCAG AAA compliance

- **Typography:**
  - Display: Inter or Geist for headings
  - Body: System UI stack for performance
  - Code: JetBrains Mono or similar for technical content

- **Components:**
  - Glassmorphism cards for case studies
  - Subtle animations (framer-motion style)
  - Micro-interactions on hover/focus
  - Bento grid layout for portfolio section

### 1.2 Technology Stack
- **Framework:** Vanilla JS with modern ES6+ (no build step required)
- **Styling:** CSS custom properties + CSS modules approach
- **Icons:** Lucide or Heroicons (lighter than Font Awesome)
- **Animations:** CSS animations + Intersection Observer API
- **Dark Mode:** CSS media queries + localStorage preference

---

## Phase 2: Core Infrastructure Setup (Day 1-2)

### 2.1 File Structure Reorganization
```
/
├── index.html (main page)
├── case-studies/
│   ├── promptly.html
│   ├── wrex.html
│   └── fxd.html
├── assets/
│   ├── css/
│   │   ├── main.css (new modern styles)
│   │   ├── variables.css (design tokens)
│   │   └── components/ (modular CSS)
│   ├── js/
│   │   ├── main.js (new core functionality)
│   │   ├── theme.js (dark mode handler)
│   │   └── animations.js (scroll animations)
│   └── fonts/ (self-hosted web fonts)
├── images/ (optimized existing images)
├── docs/ (PDFs - resume, CV)
└── _config.yml (GitHub Pages config)
```

### 2.2 Remove HTML5UP Dependencies
- Delete all HTML5UP-specific files
- Remove jQuery and related plugins
- Remove Font Awesome (replace with lighter alternative)
- Clean up unused SASS files
- Remove template demo pages (elements.html, generic.html)

### 2.3 Performance Optimizations
- Implement lazy loading for images
- Use WebP format with fallbacks
- Inline critical CSS
- Preload key fonts
- Add service worker for offline capability

---

## Phase 3: Homepage Redesign (Day 2-3)

### 3.1 Hero Section
- **Design:** Full-screen with subtle gradient mesh background
- **Content:**
  - Name + Title animation (typewriter or fade-in)
  - Brief tagline: "Security & AI Designer/Developer"
  - Floating security/AI themed icons
  - Smooth scroll indicator
- **Dark Mode:** Inverted gradient with glow effects

### 3.2 About Section
- **Layout:** Split layout - text left, profile image right
- **Content:**
  - Current bio with security/AI focus
  - Key skills badges (animated on scroll)
  - Quick stats (publications, projects, experience)
- **Style:** Glassmorphism card with subtle border glow

### 3.3 Portfolio Section (Bento Grid)
- **Layout:** Modern bento grid with varying card sizes
- **Card Design:**
  - Hover: Subtle scale + glow effect
  - Featured image with gradient overlay
  - Title + description + tech stack badges
  - Publication/award badges (CHI, Best Paper, etc.)
- **Priority Order:**
  1. Promptly (large card - recent & AI-focused)
  2. Wrex (medium card - best paper)
  3. FxD (medium card - Excel Labs impact)
  4. Microsoft Contributions (small card)

### 3.4 Experience Timeline
- **Design:** Vertical timeline with alternating cards
- **Interactions:** Cards fade in on scroll
- **Content:** Current experience + education
- **Style:** Minimalist with accent color highlights

### 3.5 Contact Section
- **Design:** Simple centered layout
- **Links:** Modern icon buttons with hover effects
- **CTA:** Email button with copy-to-clipboard

---

## Phase 4: Case Study Pages Modernization (Day 3-4)

### 4.1 Consistent Template
- **Navigation:** Sticky header with progress indicator
- **Hero:** Full-width image with overlay text
- **Content:**
  - Max-width container for readability
  - Section anchors with smooth scroll
  - Code blocks with syntax highlighting
  - Image galleries with lightbox
- **Footer:** Next/previous case study navigation

### 4.2 Content Preservation
- Maintain all existing text and images
- Improve image presentation with modern galleries
- Add loading skeletons for images
- Enhance typography for better readability

---

## Phase 5: Technical Implementation (Day 4-5)

### 5.1 Core JavaScript Features
```javascript
// Theme switching
- System preference detection
- Manual toggle with localStorage
- Smooth transitions between modes

// Scroll animations
- Intersection Observer for fade-ins
- Parallax effects for hero sections
- Progress indicators for case studies

// Performance
- Lazy loading for images and iframes
- Debounced scroll handlers
- RequestAnimationFrame for animations
```

### 5.2 CSS Architecture
```css
/* Design Tokens */
:root {
  --color-background: #0a0a0a;
  --color-surface: #18181b;
  --color-accent: #3b82f6;
  /* ... */
}

/* Component Classes */
.card { /* Reusable card styles */ }
.button { /* Consistent button styles */ }
.section { /* Section containers */ }

/* Utility Classes */
.fade-in { /* Animation utilities */ }
.glass { /* Glassmorphism effect */ }
```

### 5.3 Accessibility Features
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Reduced motion support
- Screen reader optimizations

---

## Phase 6: Testing & Optimization (Day 5)

### 6.1 Browser Testing
- Chrome, Firefox, Safari, Edge
- Mobile responsive testing
- Dark/light mode in each browser
- Performance profiling

### 6.2 GitHub Pages Deployment
- Ensure all paths are relative
- Test CNAME configuration
- Verify all assets load correctly
- Check 404 handling

### 6.3 Performance Metrics
- Target: 95+ Lighthouse score
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Cumulative Layout Shift < 0.1

---

## Phase 7: Cleanup & Documentation (Day 6)

### 7.1 File Cleanup
- Remove all HTML5UP files
- Delete unused images
- Remove jQuery and plugins
- Clean up comments and attributions

### 7.2 Documentation
- Update README.md
- Add deployment instructions
- Document design system
- Create component usage guide

---

## Implementation Checklist

### Immediate Actions
- [ ] Backup current site
- [ ] Create new branch for development
- [ ] Set up local development environment
- [ ] Define color palette and typography

### Phase Execution
- [ ] **Phase 1:** Design system and planning
- [ ] **Phase 2:** Infrastructure setup and cleanup
- [ ] **Phase 3:** Homepage redesign
- [ ] **Phase 4:** Case study pages update
- [ ] **Phase 5:** JavaScript and interactions
- [ ] **Phase 6:** Testing and optimization
- [ ] **Phase 7:** Final cleanup and documentation

### Deliverables
- [ ] Modern, responsive portfolio site
- [ ] Dark mode with system preference detection
- [ ] Improved performance (no jQuery, lighter assets)
- [ ] Maintained content with better presentation
- [ ] GitHub Pages ready (no build step required)
- [ ] Complete removal of HTML5UP template

---

## Risk Mitigation

### Potential Issues & Solutions
1. **GitHub Pages limitations**
   - Solution: Use only static assets, no server-side processing

2. **Browser compatibility**
   - Solution: Progressive enhancement, fallbacks for older browsers

3. **Image optimization**
   - Solution: WebP with PNG fallbacks, lazy loading

4. **SEO preservation**
   - Solution: Maintain URL structure, add meta tags

---

## Success Metrics

### Technical
- ✓ Lighthouse score > 95
- ✓ Page load time < 3 seconds
- ✓ No jQuery dependencies
- ✓ Works offline with service worker

### Design
- ✓ Modern, professional appearance
- ✓ Reflects security/AI focus
- ✓ Smooth animations and interactions
- ✓ Excellent dark mode implementation

### Content
- ✓ All case studies preserved
- ✓ Improved content hierarchy
- ✓ Better image presentation
- ✓ Enhanced readability

---

## Timeline Summary
- **Day 1:** Planning, design system, infrastructure setup
- **Day 2-3:** Homepage implementation
- **Day 3-4:** Case study pages
- **Day 4-5:** Interactions and polish
- **Day 5-6:** Testing, optimization, and cleanup

**Total Estimated Time:** 5-6 days of focused development

---

## Notes
- The plan maintains your content flow while modernizing the presentation
- Security/AI theming will be subtle but consistent throughout
- All changes are GitHub Pages compatible (no build process needed)
- The site will be significantly faster without jQuery and heavy libraries
- Dark mode will be the default with elegant light mode support