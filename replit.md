# NaijaWealthSim (Sọ́ágỌ́) - Wealth Simulation Game

## Overview
NaijaWealthSim (Sọ́ágỌ́) is a mobile-first wealth simulation game where players start with ₦60M and build their fortune through strategic investments and luxury purchases. The game features dynamic currency conversion, taxes, maintenance costs, and game-over scenarios. The primary objective is to collect all 20 luxury items while managing finances. Players land on the Store page by default when starting or returning to the game. The application is a single-page React app with an Express.js backend, designed for mobile devices with international currency support.

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
- **Core Game State:** Balance tracking, investment system (30% return, 60-second wait), owned items, timers, win condition (20 luxury items).
- **Economic Systems:** Fixed 25% living expenses (25% of balance every 30s), per-item maintenance (20% of item price), profit rate stays at 30% permanently.
- **Luxury Items:** Categorized into Gadgets, Cars, Houses, Jets, Yachts, Lifestyle, and Watery Money. All items priced 3× higher with 20% maintenance costs. Car items display as embedded YouTube videos.
- **Silent Tutorial System:** Auto-starts for new players with visual (glowing button) guidance, guiding through investment and first purchase.
- **Game Over System:** Triggers when balance drops below ₦5M or goes negative, displays detailed expense breakdown, stops background music. Balance never displays as negative (shows 0 minimum). "Try Again" button resets everything.
- **Sound Effects:** Ka-ching for investment returns, deposit sound, game over sound (woman laughing), shuffled background music (2 tracks, each plays 2 times before switching).
- **Home Page Design:** Simplified layout with Balance card (showing balance and Living Expenses countdown), Living Expenses info card with dynamic notification system showing detailed, historical expense breakdown, and WhatsApp Group card promoting community engagement.
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