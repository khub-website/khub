# KHub - Replit Project

## Overview
A Next.js 16 web application (KHub) migrated from Vercel to Replit. Uses React 19, Tailwind CSS v4, and Framer Motion for animations.

## Project Structure
- `src/app/` — Next.js App Router pages and layouts
- `src/components/` — React components (Navbar, Hero, About, Domains, Programs, Impact, CTA, Footer)
- `public/` — Static assets

## Tech Stack
- **Framework**: Next.js 16.2.2 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS v4
- **Animations**: Framer Motion
- **Package Manager**: npm

## Running the App
- **Dev server**: `npm run dev` — starts on port 5000 (Replit compatible)
- The workflow "Start application" is configured to run `npm run dev` on port 5000

## Replit Configuration
- Port: 5000 (required for Replit webview)
- Host: 0.0.0.0 (required for Replit proxy to reach the app)
- Scripts updated to include `-p 5000 -H 0.0.0.0` for both dev and start commands
