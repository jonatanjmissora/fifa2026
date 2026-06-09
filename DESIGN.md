---
name: Pitch Dynamic
colors:
  surface: '#f7faf8'
  surface-dim: '#d7dbd9'
  surface-bright: '#f7faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f2'
  surface-container: '#ebefed'
  surface-container-high: '#e6e9e7'
  surface-container-highest: '#e0e3e1'
  on-surface: '#181c1b'
  on-surface-variant: '#3d4a3f'
  inverse-surface: '#2d3130'
  inverse-on-surface: '#eef1ef'
  outline: '#6d7b6e'
  outline-variant: '#bccabc'
  surface-tint: '#006d38'
  primary: '#006d38'
  on-primary: '#ffffff'
  primary-container: '#00a859'
  on-primary-container: '#003317'
  inverse-primary: '#59df89'
  secondary: '#705d00'
  on-secondary: '#ffffff'
  secondary-container: '#fcd400'
  on-secondary-container: '#6e5c00'
  tertiary: '#5f5e5e'
  on-tertiary: '#ffffff'
  tertiary-container: '#949291'
  on-tertiary-container: '#2b2b2b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#77fca3'
  primary-fixed-dim: '#59df89'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#ffe16d'
  secondary-fixed-dim: '#e9c400'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#f7faf8'
  on-background: '#181c1b'
  surface-variant: '#e0e3e1'
typography:
  display-lg:
    fontFamily: anybody
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: anybody
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: anybody
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: anybody
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: hankenGrotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: hankenGrotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: jetbrainsMono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  score-display:
    fontFamily: anybody
    fontSize: 24px
    fontWeight: '800'
    lineHeight: '1.0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  container-max: 1200px
---

## Brand & Style

This design system is engineered for the high-stakes, high-energy environment of the 2026 World Cup. It targets a global audience of fans, analysts, and casual viewers who require immediate access to fixture data without sacrificing the "match-day" excitement.

The aesthetic follows a **Corporate-Modern** foundation with **High-Contrast** accents. It leverages the structure of a professional sports broadcast—clean, systematic, and authoritative—while infusing it with rhythmic verticality and motion. The UI should evoke a sense of stadium grandeur: expansive, organized, and vibrantly alive. Key principles include:

*   **Athletic Precision:** Use of tight grids and disciplined typography to manage dense match data.
*   **Vibrancy:** Strategic use of stadium green and trophy gold to highlight victory and progression.
*   **Clarity:** A "data-first" approach that ensures national identifiers and scores are the primary focal points.

## Colors

The palette is rooted in the physical elements of the game: the turf, the trophy, and the clarity of the lines on the pitch.

*   **Primary (Stadium Green):** A high-performance, vibrant green used for primary actions, active states, and success indicators. It represents the field of play.
*   **Secondary (Trophy Gold):** Reserved for highlights, winners, and critical tournament milestones. It should be used sparingly as an accent to maintain its prestige.
*   **Tertiary (Pitch Black):** A deep, near-black for high-contrast typography and structural headers, providing an anchor for the lighter elements.
*   **Neutral (Canvas White/Gray):** A cool-toned light gray background that reduces eye strain during long sessions of data browsing while allowing team flags to remain distinct.

## Typography

The typography strategy splits duties between emotional impact and technical readability. 

**Anybody** is used for headlines and scores; its variable width and bold weights mimic the lettering on jerseys and stadium signage. **Hanken Grotesk** handles the heavy lifting of match details and group standings, offering a clean, contemporary feel. **JetBrains Mono** is utilized for secondary metadata (stadium names, kick-off times, coordinates), providing a precise, "live-feed" data aesthetic.

Headlines should utilize tight tracking and uppercase styling for a more aggressive, athletic appearance.

## Layout & Spacing

The system employs a **Fluid Grid** that prioritizes information density. 

*   **Desktop:** A 12-column grid. Fixture cards typically span 4 columns (3 per row) or 6 columns (2 per row) depending on the view density.
*   **Mobile:** A single-column vertical stack with 16px margins.
*   **Rhythm:** A 4px baseline grid ensures vertical harmony. Group sections use a 32px gap to separate distinct tournament stages, while individual fixtures within a group use a tighter 8px gap to maintain visual association.

Layouts should favor top-down scanning. Score inputs and team names are horizontally aligned to allow for rapid comparison across different matches.

## Elevation & Depth

To maintain a "clean and professional" look, depth is achieved through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows.

*   **Level 0 (Background):** Neutral light gray (#F4F7F5).
*   **Level 1 (Cards):** Pure white surfaces with a 1px solid border (#E2E8E4). 
*   **Level 2 (Active/Hover):** A subtle, ultra-diffused shadow (0px 4px 20px rgba(0, 168, 89, 0.08)) is applied to active match cards to make them "lift" from the pitch.
*   **Header Depth:** Global navigation uses a slight backdrop blur (12px) to stay separated from the content scrolling beneath it.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a professional, modern feel that avoids the "childish" look of fully rounded UI while remaining more approachable than sharp, brutalist corners.

*   **Score Inputs:** Slightly more rounded (0.5rem) to signify interactable areas.
*   **Flags:** Rectangular with a 2px radius to preserve the heraldic integrity of the national emblems.
*   **Buttons:** Standard primary buttons use the `rounded-lg` (0.5rem) token for a distinct call-to-action feel.

## Components

### Fixture Cards
Cards are the primary container. They feature a white background, a light gray border, and a 4px green accent bar on the left side to denote the "Stadium Green" theme. Information hierarchy: Date/Venue (Label-caps) > Teams/Flags > Score (Headline-md).

### Score Inputs
Inputs are styled as "Score Boxes." They are vertically centered between team names. The background is a very light gray (#EDF2EF), turning to Stadium Green with white text when a score is finalized or active.

### National Team Identifiers
Flags must always appear alongside the 3-letter ISO code (e.g., BRA, USA). The font weight for the country code is `bold` to ensure visibility against the card background.

### Chips & Status Tags
Use chips for match status (e.g., "LIVE", "FINAL", "UPCOMING"). 
*   **Live:** Stadium Green background with white text.
*   **Final:** Pitch Black background with white text.
*   **Upcoming:** Transparent with a gray border.

### Primary Buttons
Large, high-contrast buttons using Stadium Green. Typography is uppercase `anybody` at 14px for an energetic "Play" feel.