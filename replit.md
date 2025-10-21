# NaijaWealthSim (Sọ́ágỌ́) - Wealth Simulation Game

## Overview

NaijaWealthSim (Sọ́ágỌ́) is a mobile-first wealth simulation game where players start with ₦50M and build their fortune through strategic investments and luxury purchases. The game features dynamic currency conversion, taxes, maintenance costs, profit decay, and game-over scenarios with ad-based continuation. The primary objective is to collect all 20 luxury items while managing finances. The application is a single-page React app with an Express.js backend, designed for mobile devices with international currency support.

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
- **Core Game State:** Balance tracking, investment system (30% return, 7-minute decay), owned items, timers, win condition (20 luxury items).
- **Economic Systems:** Fixed 25% tax, per-item maintenance, profit decay (30% for 7 mins, then 0%), Account Manager feature. Investments are blocked if profit rate is 0% until a luxury item is purchased.
- **Luxury Items:** Categorized into Gadgets, Cars, Houses, Jets, and Yachts.
- **Silent Tutorial System:** Auto-starts for new players with visual (glowing button) guidance through key actions, without popups.
- **Game Over System:** Triggers when balance drops below ₦5M, displays detailed expense breakdown. Offers "Start Afresh" or "Continue (Ads)" (30-second ad simulation, wipes purchases but keeps balance).
- **Sound Effects:** Ka-ching for investment returns, deposit sound, alternating background music.
- **Home Page Design:** Simplified layout with Balance card, Account Manager card, Living Expenses info card with dynamic notification system showing detailed, historical expense breakdown.
- **Investment Blocking System:** Profit rate is 30% for 7 minutes, then instantly drops to 0%. A modal warns players, and investments are blocked until an item is purchased, which resets the rate and timer.
- **"How to Play" Guide:** Explains game objective, investment steps, profit rate system, critical warnings, and winning strategies.

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