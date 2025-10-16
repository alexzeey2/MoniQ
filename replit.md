# NaijaWealthSim (Sọ́ágỌ́) - Wealth Simulation Game

## Overview

NaijaWealthSim (branded as "Sọ́ágỌ́") is a mobile-first wealth simulation game where players start with ₦50M (or currency equivalent) and build their fortune through strategic investments and luxury purchases. The game features a welcome/signup system with dynamic currency conversion, a progressive economy with taxes, maintenance costs, and decay mechanics. Players navigate high-stakes decisions including game-over scenarios with ad-based continuation options.

The application is built as a single-page React application with Express.js backend, designed specifically for mobile devices (max-width: 448px) with international support through currency conversion (Nigeria: ₦ Naira, Others: $ at 1:1500 rate).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing (no React Router dependency)
- Single-page application architecture with route-based code splitting

**UI Component System**
- Shadcn/ui components with Radix UI primitives for accessible, composable UI elements
- Tailwind CSS for utility-first styling with custom design tokens
- Custom CSS variables for theming (light mode focused with HSL color system)
- Mobile-first responsive design targeting max-width: 448px
- Component aliases configured via TypeScript paths (@/components, @/lib, @/hooks)

**State Management**
- React hooks (useState, useEffect) for local component state
- TanStack Query (React Query) for server state management and caching
- Custom hooks for reusable logic (useIsMobile, useToast)
- No global state management library (Redux/Zustand) - state kept local to components

**Design System**
- Custom color palette with emerald-green primary (#22c55e / emerald-600)
- Consistent spacing using Tailwind's 2, 4, 6, 8 unit system
- Typography scale from text-xs to text-3xl with DM Sans font family
- Shadow system with "elevate" utilities for hover/active states
- Border radius tokens: sm (3px), md (6px), lg (9px)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for type-safe backend development
- ESM (ES Modules) configuration throughout the stack
- Custom middleware for request logging and JSON response capture
- Centralized error handling with status code propagation

**Development Setup**
- TSX for running TypeScript directly in development
- Separate build process using esbuild for production bundle
- Vite integration in development with middleware mode
- Static file serving from dist/public in production

**Storage Layer**
- In-memory storage implementation (MemStorage class) for development/demo
- Interface-based design (IStorage) for easy swapping to persistent storage
- User CRUD operations with UUID-based identifiers
- Ready for database integration via the storage interface pattern

### Data Architecture

**Database Schema (Drizzle ORM)**
- PostgreSQL dialect configured via Drizzle Kit
- Schema-first approach with TypeScript types generated from Drizzle schema
- Zod integration for runtime validation (drizzle-zod)
- Migrations directory structure for version control
- Neon Database serverless driver (@neondatabase/serverless)

**Schema Design**
- Users table with UUID primary keys (gen_random_uuid())
- Username/password authentication fields
- Extensible schema structure for game state (investments, owned items, etc.)
- Type inference using Drizzle's $inferSelect for compile-time safety

**Data Validation**
- Zod schemas derived from Drizzle table definitions
- Insert schemas for input validation (insertUserSchema)
- Type-safe data flow from API to database

### Game Mechanics Architecture

**Welcome & Player Onboarding**
- Welcome/signup page shown on first visit (client/src/pages/welcome.tsx)
- Player information collection: name and country selection
- Dynamic currency conversion based on country:
  - Nigeria: ₦ (Naira) with 1:1 conversion rate
  - Other countries: $ (Dollar) with 1:1500 conversion rate
- Player data persisted in localStorage (key: 'naijaWealthSim_playerData')
- Returning players: skip welcome if player data exists
- Game over flow: clear game data, keep player info, return to welcome with pre-filled fields
- "Change Player" feature in profile to switch accounts

**Core Game State**
- Balance tracking (starting at ₦50M or $33,333 for non-Nigeria)
- Investment system with amount, timestamp, and return rate
- Owned items array with purchase tracking
- Timer-based mechanics (tax timer, decay timer, ad timer)
- Level progression system with level-up notifications
- All amounts displayed using player's currency with conversion applied via fmt() function

**Economic Systems**
- Fixed 25% tax rate on balance
- Per-item maintenance costs (stored in item.m property)
- 30% return rate on investments with instant decay after 7 minutes
- Profit decay: Rate stays at 30% for 7 minutes, then drops to 0% instantly
- Account manager feature (₦20M cost) for tax optimization
- Investment decay requiring player engagement (buy items to restore profit rate)

**Item Categories**
- Gadgets (iPhone, MacBook, Vision Pro, luxury watches, home theater)
- Cars (Mercedes G-Wagon, Lamborghini, Rolls Royce, Bugatti)
- Houses (Ikoyi Duplex, Lekki Penthouse, Banana Island Villa, Private Island)
- Jets (Cessna, Bombardier, Gulfstream, Boeing)
- Yachts (Sport, Luxury, Mega, Superyacht)

**Monetization Flow**
- Game-over modal with restart/continue options
- Ad simulation screen with 30-second countdown
- Continue option unlocked after watching ad
- Visual hierarchy emphasizing decision consequences (red for loss, emerald for recovery)

**Portfolio Summary Sections (October 2025)**
- **Home Page Enhancements**:
  - Investments section: Shows total invested capital and expected returns with color-coded gains
  - Next Expenses section: Preview of upcoming living expenses (25%) and item maintenance costs
  - Simplified UI: Removed profit rate tracking and decay bars for cleaner home screen
  - Removed duplicate navigation: Invest/Store cube buttons removed (use bottom nav instead)
  
- **Invest Page Enhancements**:
  - Investment Summary card: Shows total invested capital and expected returns before investment buttons
  - Investment History: Moved from home page, displays all active investments below buttons
  - Zero-rate protection: Investment buttons disabled when profit rate reaches 0%
  - Warning message: "Cannot Invest!" alert shown when rate is 0% with instructions to visit Store
  - Calculations: `invested = Σ(investment.amount)`, `returns = Σ(investment.amount × investment.rate)`

**Investment Blocking System (October 2025)**
- **Profit Decay Mechanics**:
  - Profit rate stays at 30% for exactly 7 minutes (420 seconds)
  - After 7 minutes, rate drops to 0% instantly (not gradual decay)
  - Timer counts down from 420s → 0s, rate stays constant until timer expires
  
- **Zero Rate Warning Popup**:
  - Triggers instantly when profit rate drops to 0% (after 7 minute timer expires)
  - Modal displays "Investment Blocked!" warning with explanation
  - Provides "Go to Store" button to help users restore investment ability
  - Dismissible with "Close" button
  - Investment buttons disabled at 0% with red warning message on invest page
  
- **Restoration**:
  - Buying ANY item from Store instantly resets profit rate back to 30%
  - Timer resets to 420 seconds (7 minutes)
  - Warning popup auto-closes when rate is restored

## External Dependencies

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Unstyled, accessible component primitives (@radix-ui/* packages)
- **Shadcn/ui**: Pre-built component library following Radix patterns
- **class-variance-authority**: CVA for variant-based component styling
- **clsx & tailwind-merge**: Conditional className utilities
- **Lucide React**: Icon system for consistent iconography

### Data & API Layer
- **TanStack Query**: Server state management with caching and background updates
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation and type inference
- **Drizzle ORM**: Type-safe SQL query builder and migrations

### Database
- **Neon Database**: Serverless Postgres (via @neondatabase/serverless)
- **Drizzle Kit**: Database migration toolkit
- **PostgreSQL**: Primary database dialect

### Development Tools
- **Vite**: Build tool and dev server with React plugin
- **TypeScript**: Static type checking across full stack
- **esbuild**: Production bundler for backend code
- **TSX**: TypeScript execution for development
- **Replit-specific plugins**: Runtime error overlay, cartographer, dev banner

### Session & Authentication (Configured but not actively used)
- **express-session**: Session middleware setup
- **connect-pg-simple**: PostgreSQL session store
- **Passport.js**: Authentication middleware (installed but not implemented)

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **cmdk**: Command palette component (installed but not visible in main game)
- **embla-carousel-react**: Carousel component library
- **input-otp**: OTP input component
- **react-day-picker**: Calendar/date picker
- **recharts**: Charting library for data visualization
- **vaul**: Drawer component library