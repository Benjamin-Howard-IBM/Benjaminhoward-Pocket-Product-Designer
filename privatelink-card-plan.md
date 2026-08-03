# PrivateLink Card - Welcome to Vault Wireframe Plan

## Overview

Create a new Storybook story file for the **Welcome to Vault** page wireframe.
The page does not yet exist in the codebase. It is modeled on the live IBM Vault
UI screenshot provided by Benjamin, and adds a PrivateLink CTA card in two
distinct design variants.

Both variants share the same page shell, header, side nav, and section structure.
They differ only in the placement and visual treatment of the PrivateLink card.

---

## Source context

- Existing wireframe pattern: `storybook/stories/wireframes/vault-next-secrets-dashboard/wireframes.tsx`
- All tokens, button primitives, Header, SideNav, and typography constants must be
  copied verbatim into the new file (no import dependency between story files).
- Stories go in: `storybook/stories/wireframes/vault-welcome/`
- New file: `storybook/stories/wireframes/vault-welcome/vault-welcome.stories.tsx`

---

## Page structure (common to both variants)

Drawn directly from the screenshot:

1. **Global header** - IBM Vault, dark nav bar, icon buttons top-right
2. **Side nav** - icon-only collapsed nav (5 icons matching screenshot)
3. **Hero area** - "Welcome to Vault!" H1, description subtitle, hero illustration placeholder (gray rectangle, right half)
4. **Cluster access** section - "Open user interface" secondary button + "Lock Vault" destructive-ghost button
5. **Cluster network access** section - left: label + "Edit access" button; right: Public URL row (populated) + Private URL row
6. **Access data plane** section - collapsed accordion chevron
7. **Cluster details** section - 4-row key/value table: Status (Active), Name, Region, Version
8. **Resources** section - 3-column card row: View documentation, CLI guide, API guide, Share feedback

---

## Sub-Task 1 - Page shell and shared primitives

**Intent:** Establish the new story file with all token definitions, style constants,
and shared components needed for the Welcome page. This is foundation work - nothing
is rendered yet except the bare shell.

**Expected outcomes:**
- File exists at `storybook/stories/wireframes/vault-welcome/vault-welcome.stories.tsx`
- Carbon grayscale token palette `C` defined (identical to secrets-dashboard pattern)
- `FONT_SANS` and `FONT_MONO` constants defined
- `shellStyle`, `headerStyle`, `bodyStyle`, `mainStyle` defined
- `Header` component renders the IBM Vault dark nav bar
- `SideNav` component renders the icon-only collapsed left nav (5 icon slots as gray squares)
- `PrimaryButton` and `SecondaryButton` primitives defined

**Todo:**
- [ ] Create the directory `storybook/stories/wireframes/vault-welcome/`
- [ ] Create `vault-welcome.stories.tsx` with token palette, font constants, and style objects
- [ ] Add `Header` component matching the dark nav bar in the screenshot
- [ ] Add icon-only `SideNav` (collapsed, 5 icon slots as 20x20 gray squares with subtle active state on first)
- [ ] Add `PrimaryButton` and `SecondaryButton` matching the existing pattern
- [ ] Add CSF3 meta block: `title: 'Wireframes/Welcome to Vault'`

**Relevant context:**
- `storybook/stories/wireframes/vault-next-secrets-dashboard/wireframes.tsx` lines 1-488
- Carbon token palette is `C` at line 13
- Button styles at lines 452-487

**Status:** [ ] pending

---

## Sub-Task 2 - Common page sections

**Intent:** Build the static page sections that appear identically in both variants:
hero area, Cluster access, Cluster network access (baseline), Access data plane,
Cluster details, and Resources. The Private URL row in Cluster network access should
render "No private URL available" as its baseline state before the card is added.

**Expected outcomes:**
- `WelcomePageBase` internal component renders all 6 sections correctly
- Hero renders "Welcome to Vault!" H1 + description subtitle + gray illustration rectangle
- "Cluster access" section shows "Open user interface" (secondary) and "Lock Vault" (ghost/outline) buttons
- "Cluster network access" shows left label/edit button, right column with Public URL (populated, monospace, copy icon placeholder) and Private URL ("No private URL available" in placeholder text color)
- "Access data plane" renders as a collapsed accordion row with chevron
- "Cluster details" renders a 4-row key/value table: Status (● Active), Name (vault_prod_xyz), Region (N. California US-west-1), Version (v.1.23.4)
- "Resources" renders 3-column card grid with icon, title, description, and arrow

**Todo:**
- [ ] Add section wrapper style (white card, border-subtle, padding 24px, margin-bottom 16px)
- [ ] Add `HeroSection` with H1, subtitle text, and gray illustration block (right half)
- [ ] Add `ClusterAccessSection` with two buttons
- [ ] Add `ClusterNetworkSection` base component - accepts a `privateUrlSlot` prop (ReactNode) so variants can inject the CTA without duplicating the section
- [ ] Add `AccessDataPlaneSection` collapsed accordion
- [ ] Add `ClusterDetailsSection` 4-row table
- [ ] Add `ResourcesSection` 3-column card grid
- [ ] Compose all into `WelcomePageBase({ privateUrlSlot })` component

**Relevant context:**
- `panelStyle` pattern from secrets-dashboard lines 239-256 (white card with padding)
- `tableBase`, `thStyle`, `tdStyle` patterns lines 302-323
- Screenshot shows sections as white cards on a light gray page background

**Status:** [ ] pending

---

## Sub-Task 3 - Version 1: Inline PrivateLink CTA (replaces the empty Private URL row)

**Intent:** Replace the "No private URL available" placeholder inside
Cluster network access with an inline call-to-action card. The card expands
in the same column slot, staying contextually tied to the network section.
This is the lower-interrupt, contextual variant.

**Expected outcomes:**
- The Private URL row is replaced by a bordered inline card (~120px tall)
- Card contains: lock icon (SVG or unicode placeholder), bold label "Connect via PrivateLink", short description (1 line), "Create PrivateLink" primary button
- A subtle top-border accent (2px solid, `C.borderStrong`) differentiates it from the plain URL row above
- Export as `PrivateLinkInline` story

**Todo:**
- [ ] Build `PrivateLinkInlineCTA` component - bordered box, lock icon, label, description, primary button
- [ ] Pass it as `privateUrlSlot` to `WelcomePageBase`
- [ ] Export `export const PrivateLinkInline: Story`

**Relevant context:**
- The Private URL row sits in the right column of `ClusterNetworkSection`
- `secondaryButtonStyle` / `primaryButtonStyle` from Sub-Task 1
- Keep the card within the existing column width - do not expand it full-width

**Status:** [ ] pending

---

## Sub-Task 4 - Version 2: Featured hero card (above Cluster access)

**Intent:** Promote the PrivateLink CTA to a featured card placed directly
below the hero banner, before "Cluster access." It sits at full content width,
uses an inverted dark background (C.navBg / C.textPrimary), and is the first
thing the user sees after the hero. This is the high-attention, above-the-fold variant.

**Expected outcomes:**
- Full-width dark card (~140px tall) between hero and Cluster access
- Card contains: left side - "Recommended" label (small caps), bold "Connect Vault" headline, 1-line description; right side - "Create PrivateLink" primary button (inverted: white bg, dark text since card is dark)
- The card's dark background makes it the only inverted element on the page - maximum contrast grab
- Cluster network access section still shows "No private URL available" in this variant (the CTA has been promoted, not removed)
- Export as `PrivateLinkFeatured` story

**Todo:**
- [ ] Build `PrivateLinkFeaturedCard` component - full-width, dark bg, two-column layout (text left, button right)
- [ ] Add inverted button style for use on dark background (white fill, dark text, same sizing)
- [ ] Place `PrivateLinkFeaturedCard` between `HeroSection` and `ClusterAccessSection` in this variant
- [ ] Export `export const PrivateLinkFeatured: Story`

**Relevant context:**
- `C.navBg = '#262626'` is the darkest wireframe token - matches the header, creates strong visual anchor
- `C.inverseText = '#ffffff'` for text on dark
- This card should NOT appear in the Version 1 story - each story is a distinct variant

**Status:** [ ] pending
