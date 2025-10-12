# Design Guidelines for NaijaWealthSim Game Over & Ad Experience

## Design Approach
**Utility-Focused Mobile Game Interface** - This modification extends the existing NaijaWealthSim mobile game (max-width: 448px) with enhanced game-over decision flows. Maintain consistency with the established design system while creating clear, impactful choice moments.

## Core Design Principles
- **High-Stakes Clarity**: Make consequences of each choice immediately obvious
- **Mobile-First Urgency**: Design for quick comprehension and thumb-friendly interactions
- **Emotional Impact**: Use color psychology to reinforce decision weight
- **Seamless Continuation**: Ad experience should feel integrated, not jarring

## Color Palette

### Game Over Modal
- **Background Overlay**: `0 0% 0%` at 70% opacity (dramatic focus)
- **Modal Background**: `0 0% 100%` (clean white for clarity)
- **Warning Accent**: `0 84% 60%` (red for loss/restart severity)
- **Continue Accent**: `142 76% 36%` (emerald-600 - matches app, represents hope/recovery)

### Ad Simulation Screen
- **Ad Container**: `0 0% 5%` (dark charcoal, typical video player aesthetic)
- **Progress Bar**: `142 76% 46%` (emerald-500 for active countdown)
- **Skip Disabled State**: `0 0% 60%` at 40% opacity
- **Ad Content Area**: Gradient from `217 91% 60%` to `271 76% 53%` (blue-to-purple, typical ad aesthetic)

## Typography
- **Modal Headline**: text-2xl, font-bold (24px, clear hierarchy)
- **Body Copy**: text-sm (14px, readable decision context)
- **Button Text**: text-base, font-semibold (16px, actionable)
- **Countdown Timer**: text-3xl, font-bold (30px, prominent visibility)
- **Ad Simulation Text**: text-xl for headlines, text-sm for supporting text

## Layout System
**Tailwind spacing units: 2, 4, 6, 8** for consistent rhythm across modals

### Game Over Modal Layout
```
- Fixed overlay: inset-0, z-60
- Modal container: max-w-sm (384px), rounded-2xl, p-8
- Icon container: text-6xl, mb-6 (dramatic emoji presentation)
- Content stack: space-y-4 (clear information hierarchy)
- Button grid: grid-cols-2, gap-3 (equal prominence, easy thumb reach)
```

### Ad Simulation Layout
```
- Full screen takeover: inset-0, z-70 (above game over modal)
- Video container: aspect-video, rounded-xl, overflow-hidden
- Controls overlay: absolute positioning, p-4
- Countdown timer: top-right corner, bg-black/50, rounded-full, px-3 py-1
- Skip button: top-right, initially disabled for 30s
```

## Component Specifications

### Game Over Modal
- **Container**: White rounded-2xl card with shadow-2xl, centered in dark overlay
- **Emoji Icon**: 💸 at 60px size, centered above headline
- **Headline**: "Game Over!" in gray-900, text-2xl, font-bold
- **Consequence Cards** (two side-by-side):
  - **Restart Card**: Red-50 background, border-red-200, rounded-xl, p-4
    - Icon: 🔄 text-3xl
    - Title: "Restart" font-semibold
    - Description: "Start fresh from Level 1" text-xs, text-red-700
  - **Continue Card**: Emerald-50 background, border-emerald-200, rounded-xl, p-4
    - Icon: 📺 text-3xl
    - Title: "Continue (Ad)" font-semibold
    - Description: "Watch 30s ad • Keep 50% of investments • Lose all items" text-xs, text-emerald-700

### Button Design
- **Restart Button**: 
  - `bg-red-500 hover:bg-red-600` text-white
  - Full width in left column, py-3, rounded-xl
  - Icon: ↺ before text
  
- **Continue Button**:
  - `bg-gradient-to-r from-emerald-500 to-green-600`
  - `hover:from-emerald-600 hover:to-green-700`
  - Full width in right column, py-3, rounded-xl
  - Icon: ▶ before text

### Ad Simulation Screen
- **Background**: Black (0 0% 0%) full screen overlay, z-70
- **Ad Container**: 
  - Centered, max-w-md, aspect-video
  - Rounded-xl with gradient background (blue-to-purple)
  - Shadow-2xl for depth
  
- **Ad Content**:
  - Large icon: 🎬 or 📺 at 80px, centered
  - Headline: "Premium Feature" text-xl, white, font-bold
  - Supporting text: "Unlock exclusive benefits" text-sm, white/80
  - Fake product image placeholder or abstract gradient pattern

- **Countdown Timer**:
  - Position: Absolute top-4 right-4
  - Dark background: bg-black/70, backdrop-blur
  - White text: text-3xl, font-bold, tabular-nums
  - Format: "0:30" → "0:00"
  - Pulse animation when below 5s

- **Progress Bar**:
  - Fixed at bottom of ad container
  - Height: h-1
  - Background: white/20
  - Progress fill: emerald-500, transition-all duration-1000
  - Width decreases from 100% to 0% over 30s

- **Skip Button** (appears after 30s):
  - Position: Absolute top-4 right-4 (replaces countdown)
  - bg-white/90 hover:bg-white
  - text-gray-900, px-4, py-2, rounded-full
  - Text: "Skip ✕" font-semibold
  - Shadow-lg for prominence

## Animations
- **Modal Entry**: Fade-in overlay (200ms) + scale-up modal (300ms, ease-out)
- **Ad Transition**: Crossfade from game over (400ms) to ad screen
- **Countdown Pulse**: Scale 1.1 when timer < 5s, duration-200
- **Progress Bar**: Linear width transition, duration-1000, continuous
- **Button Hover**: Scale-105, duration-150 (both modals)
- **Ad Exit**: Fade-out (300ms) back to game with restored state

## Interactive States
- **Disabled Skip Button** (0-29s):
  - opacity-40, cursor-not-allowed
  - Text: "Skip in Xs" with dynamic countdown
  
- **Enabled Skip Button** (30s):
  - Full opacity, cursor-pointer
  - Text changes to "Skip ✕"
  - Hover effect: bg-white, scale-105

## Accessibility
- **Focus States**: 2px emerald-500 ring on all interactive elements
- **Touch Targets**: Minimum 44×44px for all buttons
- **Contrast**: All text meets WCAG AA (4.5:1 minimum)
- **Screen Reader**: Announce countdown timer updates every 5 seconds
- **Keyboard Navigation**: Tab order: Restart → Continue (Ad) → (in ad) Skip

## Microcopy
- **Game Over Message**: "Your balance dropped below ₦5M. Choose your next move:"
- **Restart Tooltip**: "Lose all progress, start Level 1"
- **Continue Tooltip**: "Watch ad to recover with penalties"
- **Ad Loading**: "Loading advertisement..." (brief, 1-2s)
- **Post-Ad Message**: "Welcome back! Your items have been reset. Invest wisely!"

## Visual Hierarchy
1. **Primary**: Decision buttons (equal visual weight, color-differentiated)
2. **Secondary**: Consequence descriptions (support decision-making)
3. **Tertiary**: Icon and headline (emotional context)
4. **Ad Screen Primary**: Countdown timer (urgent awareness)
5. **Ad Screen Secondary**: Skip button when enabled (clear exit)