# NaijaWealthSim (Sọ́ágỌ́) - Wealth Simulation Game

## Overview

NaijaWealthSim (Sọ́ágỌ́) is a mobile-first wealth simulation game where players start with ₦60M and build their fortune through strategic investments and luxury purchases. The game features dynamic currency conversion, taxes, maintenance costs, and game-over scenarios. The primary objective is to collect all 18 luxury items while managing finances. Players land on the Store page by default when starting or returning to the game. The application is a single-page React app with an Express.js backend, designed for mobile devices with international currency support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework:** React 18+ with TypeScript, Vite for building.
- **UI:** Shadcn/ui components with Radix UI, Tailwind CSS for styling, mobile-first design (max-width: 448px).
- **State Management:** React hooks for local state, TanStack Query for server state.
- **Design System:** Custom color palette (emerald-green primary), DM Sans font, consistent spacing and shadows.

### Backend Architecture
- **Framework:** Express.js with TypeScript, ESM configuration.
- **Development:** TSX for direct TypeScript execution, esbuild for production.
- **Storage:** Interface-based in-memory storage, ready for persistent database integration.

### Data Architecture
- **Database:** PostgreSQL via Drizzle ORM and Neon Database serverless driver.
- **Schema:** Drizzle ORM for schema definition, Zod for runtime validation.

### Game Mechanics Architecture
- **Player Onboarding:** Welcome/signup, dynamic currency conversion (Nigeria: ₦, Others: $ at 1:1500), data persisted in localStorage.
- **Core Game State:** Balance tracking, investment system (30% return, 60-second wait), owned items, timers, win condition (18 luxury items).
- **Economic Systems:** Fixed 25% tax, per-item maintenance (20% of item price), Account Manager feature. Profit rate stays at 30% permanently.
- **Luxury Items:** Categorized into Gadgets, Cars (video format), Houses, Jets, and Yachts. All items priced 3× higher with 20% maintenance costs.
- **Silent Tutorial System:** Auto-starts for new players with visual (glowing button) guidance. Flow: Invest nav glows → ₦40M button glows → investment card glows with "wait for return" message (other nav buttons disabled until investment returns) → Store nav glows (after investment completes) → iPhone buy button glows (other nav buttons disabled while in store) → Invest nav glows (no amount highlighted) → second investment made → completion popup "Great job! Now you know the basics" (5s auto-hide) → Home nav glows → user clicks home → Living Expenses info card glows (3s) → countdown timer glows and starts → final message "Buy all the items to win the game! Good luck!" (5s auto-hide) → tutorial complete. Investment validation: minimum ₦1M, must keep ₦5M after investing (no safety buffer blocking).
- **Game Over System:** Triggers when balance drops below ₦5M, displays detailed expense breakdown, stops background music. Single "Try Again" button that resets everything: fresh start with ₦60M, loses all items and investments.
- **Sound Effects:** Ka-ching for investment returns, deposit sound, shuffled background music (3 tracks, each plays 2 times before switching).
- **Home Page Design:** Simplified layout with Balance card, Account Manager card, Living Expenses info card with dynamic notification system showing detailed, historical expense breakdown.
- **"How to Play" Guide:** Explains game objective, investment steps, permanent 30% profit rate, and winning strategies.

## External Dependencies

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework.
- **Radix UI**: Accessible component primitives.
- **Shadcn/ui**: Pre-built component library.
- **Lucide React**: Icon system.

### Data & API Layer
- **TanStack Query**: Server state management.
- **React Hook Form**: Form state management.
- **Zod**: Schema validation.
- **Drizzle ORM**: Type-safe SQL query builder.

### Database
- **Neon Database**: Serverless Postgres.
- **Drizzle Kit**: Database migration toolkit.

### Development Tools
- **Vite**: Build tool and dev server.
- **TypeScript**: Static type checking.
- **esbuild**: Production bundler.
- **TSX**: TypeScript execution in development.

### Utility Libraries
- **date-fns**: Date manipulation.
- **nanoid**: Unique ID generation.

## Recent Changes

### November 1, 2025 - Item Removal & Balance Adjustment
- **Items Removed:** Apple Vision Pro (₦19.5M) and Luxury Watch (₦75M) removed from Gadgets category
- **Win Condition Updated:** Players now need to collect 18 luxury items to win (reduced from 20)
- **Starting Balance Increased:** New and returning players now start with ₦60M (increased from ₦50M)
- **Updated Item Count:** All UI references and documentation updated to reflect 18-item goal
- **Store Default View:** Cars category now displays by default when entering the Store page (instead of "All")

### November 1, 2025 - Price Increases & Game Balance Overhaul
- **All Item Prices Tripled (3×):**
  - Gadgets: iPhone ₦7.5M, MacBook ₦14.4M
  - Cars: Mercedes ₦360M, Lamborghini ₦750M, Rolls Royce ₦1.35B, Bugatti ₦2.55B
  - Houses: Duplex ₦1.14B, Penthouse ₦1.95B, Villa ₦3.6B, Private Island ₦10.5B
  - Jets: Cessna ₦5.4B, Bombardier ₦9.6B, Gulfstream ₦16.5B, Boeing ₦36B
  - Yachts: Sport ₦7.5B, Luxury ₦14.4B, Mega ₦28.5B, Superyacht ₦54B
- **Maintenance Costs Increased:** All items now have 20% maintenance (₦1.5M - ₦10.8B per 30 seconds)
- **Profit Rate Reduction System Removed:** 
  - Removed 7-minute decay timer (decayTimer state variable)
  - Profit rate stays at 30% permanently - never drops to 0%
  - Removed investment blocking modal that appeared at 0% profit
  - Players can invest freely anytime without forced purchases
  - returnRate no longer persisted to localStorage to prevent legacy saves from loading at 0%
- **Car Video Display:** Cars now render as `<video>` elements (autoPlay, loop, muted, playsInline) in both Store and Portfolio
- **Tutorial Updates:** Removed all references to 7-minute timer, simplified to permanent 30% profit rate system
- **Legacy Save Compatibility:** Old saves with returnRate = 0 now correctly load with 30% profit rate

### October 23, 2025 - Critical Bug Fixes & Vercel ERR_CONNECTION_REFUSED Fix
- **Vercel ERR_CONNECTION_REFUSED Fix:** Fixed "site can't be reached" error after successful deployment. Root cause: old `vite.config.vercel.ts` file + server files being included in deployment confused Vercel. Solution: Deleted old config, created `.vercelignore` to exclude server code (only blocks server/, dist/index.js), simplified `vercel.json`. Build tested with production environment: 8.55s, 30MB total output including all 18 luxury items + 3 music files.
- **White Screen Fix:** Fixed critical bug where Store page wouldn't render on game start. Root cause was screen state mismatch - initialized to 'store' but rendering condition checked for 'luxury'. Changed all references throughout the codebase to consistently use 'store' for the Store page navigation and rendering.
- **Tutorial Restart Fix:** Fixed tutorial not restarting after game over. The handleTryAgain function now properly clears localStorage, resets tutorial state (tutorialActive = true, tutorialStep = 'click-invest'), clears completion flags, and resets screen to Store page for a complete fresh start.
- **Game Over Balance Fix:** Game over screen now displays the actual remaining balance after expense deductions (can be negative or below ₦5M), instead of showing the clamped ₦5M minimum.
- **Investment Return Bug Fix:** Fixed critical bug where investment returns weren't being credited to balance. Solution uses refs (tutorialActiveRef, tutorialStepRef, tutorialInvestmentIdRef) to maintain stable values across re-renders while allowing proper tutorial progression.
- **Code Quality:** Removed debug console logging, cleaned up state management, verified no regressions through comprehensive E2E testing.

## Deployment Configuration

### Vercel Deployment (Static SPA)
- **Build Config:** Uses existing `vite.config.ts` (works for both dev and production)
- **Routing:** `vercel.json` - Simplified configuration with SPA routing
- **Build Process:** Frontend-only build (no Express server) - all game state in localStorage
- **Build Command:** `vite build` (outputs to `dist/public`)
- **Output:** Static files in `dist/public` directory (30MB total with all assets)
- **Instructions:** See `VERCEL_DEPLOYMENT.md` for step-by-step deployment guide
- **Status:** ✅ Ready for deployment - simplified config, build tested (9.58s build time)