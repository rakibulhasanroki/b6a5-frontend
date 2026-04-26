# **Planora - Frontend Application**

## Project Overview

**Planora** is a modern event management platform where users can discover, create, and participate in events. The frontend is built with a scalable architecture using Next.js and integrates with a RESTful backend API built using Node.js and Express.js.

The application supports **public and private events**, **paid and free participation**, **dashboard-based management**, and **review systems**, all delivered through a responsive and user-friendly interface.

## Live Links

- Frontend: https://planora-event.vercel.app
- Backend: https://planora-api.vercel.app
- Repository: https://github.com/rakibulhasanroki/b6a5-frontend

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Validation:** Zod
- **Authentication (Client):** Better Auth
- **API Handling:** Custom Fetcher + Query Builder
- **Payment Integration:** Stripe

## Key Highlights

- Modular and scalable frontend architecture
- Feature-based component organization
- Centralized API handling using service layer
- Type-safe development with TypeScript
- Real-world features including payments, reviews, and dashboard system

## Environment Variables

```bash
# Environment
NODE_ENV=

# API
API_URL=

# Public (Client)
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_FRONTEND_URL=
```

## Setup Instructions

```bash
# Clone repository
git clone https://github.com/rakibulhasanroki/b6a5-frontend

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env

# Run development server
pnpm dev
```

## Features

### Authentication

- User registration and login
- Google OAuth integration
- Protected routes with middleware

### Public Pages

#### Home Page

- Hero section
- Categories
- Upcoming events
- Call-to-action

#### Events Page

- Search by title and organizer
- Filter (public/private, free/paid)

#### Event Details Page

- Full event information
- Participation actions
- Reviews and ratings

---

### Dashboard

A responsive dashboard with sidebar navigation.

#### Includes:

- Dashboard statistics (context-aware)
- Event management (create, update, delete)

#### Event Details:

- Participants
- Invitations
- Requests
- Reviews

#### Other Modules:

- Bookings management
- Invitations handling
- Payments tracking

---

### Event System

- Create and manage events
- Public / Private visibility
- Free / Paid registration
- Participation workflows
- Organizer controls (approval, rejection, banning)

---

### Payments

- Stripe-based payment integration
- Paid event participation flow
- Payment status tracking in dashboard

---

### Reviews & Ratings

- Add, edit, delete reviews

#### Integrated into:

- Public event details
- Dashboard event details

---

## API Integration

- Centralized fetcher utility
- Query builder for dynamic requests
- Service + actions architecture
- Type-safe API handling

---

## UI/UX Features

- Fully responsive design (mobile, tablet, desktop)
- Consistent Tailwind-based design system
- Reusable UI components

## Project Structure

```bash
src/
 ├── app/                # App Router (routes)
 │   ├── (common)/       # Public + Auth routes
 │   ├── (dashboard)/    # Protected dashboard routes
 │
 ├── components/
 │   ├── modules/        # Feature-based components
 │   ├── layouts/        # Navbar, Footer, Dashboard layout
 │   ├── ui/             # Reusable UI primitives
 │   └── custom/         # Structured reusable components
 │
 ├── service/            # API services (event, booking, etc.)
 ├── lib/                # Fetcher, utils, auth client
 ├── hooks/              # Custom hooks
 ├── types/              # TypeScript types
 ├── env.ts              # Environment validation
 └── proxy.ts            # Route protection
```

## Deployment

Frontend is deployed on **Vercel**.

---

## Notes

- Uses App Router with both server and client components
- API communication handled via a centralized service layer
- Dashboard behavior is context-driven (admin is the only strict role)
- Integrated with backend authentication and Stripe payment system

## Thank You

**GitHub:** [rakibulhasanroki](https://github.com/rakibulhasanroki)
