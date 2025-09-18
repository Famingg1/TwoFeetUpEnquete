# Overview

This is a TwoFeetUP AI Automation Survey application - an interactive survey platform designed to gather employee feedback about AI and automation preferences within the company. The application presents a multi-step survey experience with a modern, branded interface that follows TwoFeetUP's design guidelines. The survey collects anonymous responses about automation wishes, process experiences, and tasks employees want to keep manual, helping guide the company's AI implementation strategy.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks with TanStack Query for server state management
- **UI Framework**: Radix UI components with custom TwoFeetUP theming via Tailwind CSS
- **Styling**: Tailwind CSS with custom TwoFeetUP brand colors and component system

## Component Structure
- **Survey Flow**: Multi-step survey with welcome page, question progression, and thank you page
- **Question Types**: Support for multiple-choice, checkbox, text input, and rating questions
- **Progress Tracking**: Visual progress bar showing completion status
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Server**: Express.js with TypeScript
- **API Design**: RESTful endpoints for survey submission
- **Storage Interface**: Abstract storage layer with in-memory implementation for development
- **Validation**: Shared Zod schemas between client and server for consistent data validation

## Data Storage
- **Development**: In-memory storage using Map data structures
- **Production Ready**: Drizzle ORM configured for PostgreSQL with migration support
- **Database Schema**: 
  - Users table with username/password authentication structure
  - Survey responses table storing JSON responses with timestamps
- **Data Models**: Strongly typed with Drizzle and Zod integration

## Design System
- **Brand Consistency**: Custom TwoFeetUP color palette with purple gradient themes
- **Typography**: Inter font family with consistent sizing scales
- **Component Library**: Shadcn/ui components customized for TwoFeetUP branding
- **Responsive Design**: Mobile-first approach with Tailwind responsive utilities
- **Accessibility**: Radix UI primitives ensuring keyboard navigation and screen reader support

# External Dependencies

- **UI Components**: Radix UI primitives for accessible component foundation
- **Database**: Neon Database (PostgreSQL) with Drizzle ORM for data persistence
- **Styling**: Tailwind CSS for utility-first styling approach
- **Form Management**: React Hook Form with Hookform Resolvers for validation
- **Validation**: Zod for runtime type checking and schema validation
- **State Management**: TanStack React Query for server state and caching
- **Build Tools**: Vite for fast development and optimized production builds
- **Development**: Replit integration for cloud-based development environment