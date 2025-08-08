# Bella Vista Restaurant Management System

## Overview

A full-stack restaurant management application featuring a public-facing website for menu browsing and reservations, plus an admin dashboard for restaurant management. Built with React/TypeScript frontend, Express.js backend, and PostgreSQL database. The system integrates with Replit's authentication service and features a modern UI built with shadcn/ui components and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system featuring warm restaurant colors (browns, golds, creams)
- **Routing**: Wouter for client-side routing with conditional rendering based on authentication
- **State Management**: TanStack Query for server state, React Hook Form for form management
- **Typography**: Custom font system using Playfair Display (elegant serif) and Inter (modern sans-serif)

### Backend Architecture
- **Framework**: Express.js with TypeScript running in ESM mode
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Authentication**: Replit's OpenID Connect integration with session management
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **API Design**: RESTful API structure with role-based access control

### Database Schema
- **Users**: Replit-integrated user management with admin role support
- **Menu System**: Hierarchical structure with categories and items
- **Reservations**: Customer booking system with date/time management
- **Contact Messages**: Customer inquiry handling system
- **Sessions**: Secure session storage for authentication

### Authentication & Authorization
- **Provider**: Replit's OAuth2/OIDC system for seamless development environment integration
- **Session Management**: Server-side sessions with PostgreSQL storage
- **Role-Based Access**: Admin vs. regular user permissions with protected routes
- **Security**: HTTPS-only cookies, CSRF protection, and secure session handling

### Data Layer
- **ORM**: Drizzle ORM for type-safe database queries and migrations
- **Database**: PostgreSQL with Neon serverless for cloud deployment
- **Schema Management**: Code-first approach with automatic migration generation
- **Validation**: Zod schemas for runtime type validation and API request/response validation

### Development Environment
- **Build System**: Vite for fast development and optimized production builds
- **TypeScript**: Strict configuration with path mapping for clean imports
- **Code Quality**: ESM modules throughout, proper error boundaries
- **Hot Reload**: Development server with HMR and error overlay
- **Deployment**: Single-command build process for production deployment

## External Dependencies

### Core Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting with WebSocket support
- **Replit Authentication**: OAuth2/OIDC provider for user management and admin access
- **Replit Development Tools**: Banner integration and environment-specific tooling

### UI & Styling
- **Radix UI**: Headless component primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide Icons**: Consistent icon library for UI elements
- **Google Fonts**: Playfair Display and Inter font families

### State & Forms
- **TanStack Query**: Server state management with caching and background updates
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation for forms and API contracts

### Development & Build
- **Vite**: Build tool with React plugin and development server
- **TypeScript**: Type checking and developer experience
- **PostCSS**: CSS processing with Tailwind and Autoprefixer