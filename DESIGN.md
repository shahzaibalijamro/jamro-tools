---
name: Jamro Utility System
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#434654'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#1b55d0'
  primary: '#003594'
  on-primary: '#ffffff'
  primary-container: '#004ac6'
  on-primary-container: '#b8c8ff'
  inverse-primary: '#b4c5ff'
  secondary: '#085ac0'
  on-secondary: '#ffffff'
  secondary-container: '#5b94fd'
  on-secondary-container: '#002c66'
  tertiary: '#6e2700'
  on-tertiary: '#ffffff'
  tertiary-container: '#943700'
  on-tertiary-container: '#ffba9d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
  glass-bg: rgba(255, 255, 255, 0.7)
  glass-border: rgba(226, 232, 240, 0.8)
  hero-gradient-start: '#E0E7FF'
  hero-gradient-mid: '#EEF2FF'
  hero-gradient-end: '#F5F3FF'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 24px
  container-max: 1280px
---

## Brand & Style
Jamro Utility System is a **Modern Corporate** aesthetic with a strong **Glassmorphic** influence. It is designed to feel like a "digital Swiss Army knife"—efficient, transparent, and multi-functional. The brand personality is utilitarian yet approachable, prioritizing immediate utility and privacy.

The visual style leverages a "fidelity" variant of Material 3 principles, blending high-contrast functional elements with soft, layered backgrounds. It uses vibrant color accents to categorize different toolsets while maintaining a professional, clean foundation. The use of glassmorphism (backdrop blurs and subtle borders) conveys a sense of lightness and speed, essential for a browser-based tool suite.

## Colors
The palette is rooted in a deep "Fidelity Blue" (#004ac6) which signals trust and technical precision. Secondary and tertiary colors (vibrant blues and warm oranges) are used functionally to distinguish between tool categories (e.g., Calculators vs. Graphics). 

Surface colors utilize a sophisticated range of tinted neutrals, moving from pure white `surface-container-lowest` to a slightly deeper `surface-container-high` for grouping related elements. Success and error states are handled with standard fidelity-mapped semantic colors to ensure high accessibility.

## Typography
The system relies exclusively on **Inter** to achieve a neutral, systematic, and utilitarian feel. The hierarchy is defined by significant weight shifts—using Semi-Bold (600) for all interactive labels and headers to ensure clarity against the glassmorphic backgrounds.

The `display-lg` style uses negative letter spacing to create a compact, modern look for hero statements, while `label-md` utilizes slight tracking for better readability in uppercase or navigation contexts. For mobile devices, display sizes are capped at 36px to prevent layout breakage.

## Layout & Spacing
The system uses a **Fixed Grid** approach with a maximum container width of 1280px. This ensures consistent reading lengths for tool documentation and interfaces. 

A strict 8px base rhythm (with 4px sub-increments) governs the spacing. Gutters are consistently 24px across desktop and tablet, scaling down to 16px on mobile. The layout is structured around sections with generous vertical padding (usually `xl` or 96px) to maintain a premium, uncluttered feel.

## Elevation & Depth
Depth is created through a combination of **Glassmorphism** and **Tonal Layers**. 

1.  **Level 0 (Base):** Background and hero gradients.
2.  **Level 1 (Glass):** Cards use `backdrop-filter: blur(12px)` with a semi-transparent white background and a 1px solid border. This creates a "hovering" effect without heavy shadows.
3.  **Level 2 (Containers):** Elements like the search bar use subtle tonal shifts (`surface-container-low`) and `shadow-sm` for a grounded, tactile feel.
4.  **Interactive:** Hover states on primary buttons use a slightly deeper shadow and a subtle Y-axis translation to simulate physical lift.

## Shapes
The design uses a "Rounded" (Level 2) shape language. Buttons, search bars, and badges utilize "full" rounding (capsule shapes) to emphasize the friendly and approachable brand personality. 

Functional containers like category cards and feature panels use a 12px (`rounded-xl` in this context) radius to provide a modern, soft structure. This balance between pill-shaped buttons and soft-rectangular cards creates a clear visual hierarchy between "actions" and "containers."

## Components
-   **Buttons:** Primary buttons are pill-shaped, using `primary` fill with `on-primary` text. They feature a slight hover lift and shadow expansion. Secondary buttons use a border and `surface-container-lowest` fill.
-   **Cards:** Category cards use a 1px border (`outline-variant`) and scale the interior icon by 10% on hover to indicate interactivity.
-   **Input Fields:** Search bars are capsule-shaped with a clear icon prefix. Focus states include a 2px ring with 20% opacity of the primary color.
-   **Glass Badges:** Floating status indicators (like the "Trusted" badge) use a primary-container/10 background to create a soft, integrated look.
-   **Bento Panels:** Large feature highlights use `inverse-surface` backgrounds to create a strong visual break and direct attention to critical information.