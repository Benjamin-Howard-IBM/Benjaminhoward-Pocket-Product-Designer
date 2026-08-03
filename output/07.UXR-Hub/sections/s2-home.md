## PAGE: Home (Landing Page)

**Route:** / (root)
**Carbon UI Shell:** Header visible. No SideNav on this page. Top nav links: Repository, Templates, Research Guidance, Bob AI Setup. None highlighted as active.

### Layout

Use the Carbon 2x Grid (max-width 1584px, centered, 16-column grid, 16px gutters). Background: Gray-10 (#f4f4f4).

---

### Zone 1: Header (Global - appears on all pages)

Render a Carbon Header component:
- Left: IBM logo mark (16x16 gray square placeholder) + site name "Product Design UXR Hub" in IBM Plex Sans SemiBold 14px Gray-100
- Center-right: Carbon HeaderNavigation with four HeaderMenuItem links: "Repository", "Templates", "Research Guidance", "Bob AI Setup"
- Far right: user avatar icon (Carbon User icon, 20px, Gray-70)
- Header background: White (#ffffff), bottom border: Gray-20
- Height: 48px

---

### Zone 2: Hero Section

Full-width band, White background, 64px padding top and bottom, 2x Grid container inside.

**Left column (col-span 8 of 16):**
- Label text above heading: "IBM DESIGN" in IBM Plex Sans Regular 11px, Gray-70, letter-spacing 0.16em, uppercase
- H1 heading: "Product Design UXR Hub" — IBM Plex Sans SemiBold, 42px, Gray-100, line-height 1.2
- Body text below heading (2 sentences, IBM Plex Sans Regular 16px, Gray-70, line-height 1.6):
  "A shared repository for UX research across IBM design teams. Find prior research, download templates, learn methodology, and set up AI research tooling — all in one place."
- Carbon Search component (large variant) below the body text:
  - Placeholder: "Search research by topic, product, or researcher..."
  - Width: 100% of column
  - Background: White, border: Gray-20

**Right column (col-span 8 of 16):**
- A Carbon Tile (Gray-10 background, 1px Gray-20 border, 24px padding, 8px border-radius) containing a simple stat block:
  - Stat 1: "10" in 48px SemiBold Blue-60, label "Research Artifacts" in 14px Gray-70
  - Stat 2: "6" in 48px SemiBold Blue-60, label "Templates Available" in 14px Gray-70
  - Stat 3: "15+" in 48px SemiBold Blue-60, label "Research Methods" in 14px Gray-70
  - Stats arranged in a 3-column internal grid inside the tile

---

### Zone 3: Entry-Point Cards

Section label: "GET STARTED" — IBM Plex Sans Regular 11px, Gray-70, letter-spacing 0.16em, 32px margin top, 16px margin bottom.

Four Carbon ClickableTile components arranged in a 4-column grid (col-span 4 each at large breakpoint, col-span 8 at medium, col-span 16 at small).

Each tile: White background, 1px Gray-20 border, 24px padding, 8px border-radius. On hover: Gray-10 background, Blue-60 left border 3px.

**Tile 1 — Repository:**
- Icon: Carbon "Document" icon, 24px, Blue-60, top-left
- Title: "Research Repository" — IBM Plex Sans SemiBold 18px, Gray-100
- Description: "Search and browse all UX research artifacts across IBM design teams. Filter by product, type, or date." — 14px Gray-70
- Link label: "Browse research →" — 14px Blue-60
- Click destination: Repository Browse page

**Tile 2 — Templates:**
- Icon: Carbon "Template" icon, 24px, Blue-60
- Title: "Research Templates"
- Description: "Download standardized templates for research planning, facilitation, synthesis, and reporting."
- Link label: "Browse templates →"
- Click destination: Template Library page

**Tile 3 — Research Guidance:**
- Icon: Carbon "Education" icon, 24px, Blue-60
- Title: "Research Guidance"
- Description: "Learn which research method fits your question. Includes pros, cons, effort levels, and a quick-selection guide."
- Link label: "Explore methods →"
- Click destination: Methodology Overview page

**Tile 4 — Bob AI Setup:**
- Icon: Carbon "Bot" icon, 24px, Blue-60
- Title: "Bob AI Setup"
- Description: "Set up Bob, IBM's AI design assistant, with UXR-specific skills to accelerate your research workflows."
- Link label: "Get started →"
- Click destination: Bob AI Setup page

---

### Zone 4: Recently Added Research

Section label: "RECENTLY ADDED" — IBM Plex Sans Regular 11px, Gray-70, letter-spacing 0.16em, 40px margin top, 16px margin bottom.
"See all research →" link aligned right, 14px Blue-60, links to Repository Browse page.

Three Carbon Tile components arranged in a 3-column grid (col-span 4 each, 4-col medium, 16-col small). White background, 1px Gray-20 border, 24px padding, 8px border-radius. Clickable — each links to its Artifact Detail page.

**Recent Artifact 1:**
- Title: "Vault Secrets Engine Discoverability - Unmoderated Test" — 16px SemiBold Gray-100
- Researcher: "James Okafor" — 13px Gray-70
- Date: "Feb 18, 2025" — 13px Gray-70
- Tags: Carbon Tag (Blue) "Usability Study" + Carbon Tag (Green) "Vault"

**Recent Artifact 2:**
- Title: "MCSP Cluster Sizing - Expert Interviews" — 16px SemiBold Gray-100
- Researcher: "Benjamin Howard" — 13px Gray-70
- Date: "Jan 22, 2025" — 13px Gray-70
- Tags: Carbon Tag (Blue) "Foundational Discovery" + Carbon Tag (Green) "MCSP"

**Recent Artifact 3:**
- Title: "Vault Onboarding Usability Study - Session 1" — 16px SemiBold Gray-100
- Researcher: "Maria Chen" — 13px Gray-70
- Date: "Feb 3, 2025" — 13px Gray-70
- Tags: Carbon Tag (Blue) "Usability Study" + Carbon Tag (Green) "Vault"

---

### Zone 5: Footer

Full-width, White background, 1px Gray-20 top border, 24px padding top and bottom.
- Left: "Product Design UXR Hub" — 13px Gray-70
- Right: "IBM Design" — 13px Gray-70
