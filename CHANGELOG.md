# Changelog

All notable changes to the **CubixSol** platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- JWT-based authentication with refresh tokens and multi-factor authentication (MFA).
- Redis caching layer for high-throughput public API endpoints.
- Automated end-to-end (E2E) test suite using Playwright.
- Multi-language localization (i18n) for international market expansion.

---

## [1.0.0] - 2026-09-10

### Added
- **Core Architecture**:
  - Full-stack decoupled architecture with React 19, Vite 8, and Express.js 5.
  - Responsive single-page application using TailwindCSS and Framer Motion micro-animations.
  - MongoDB database integration with Mongoose 9 schemas for 19 domain models.
  - Automated initial database seeding engine (`seedData.js`) covering services, solutions, industries, projects, FAQs, blogs, and settings.
- **Enterprise CMS & Admin Hub**:
  - Protected administrative dashboard (`/admin`) with session authentication.
  - Live CRUD management for Services, Solutions, Products, Industries, Case Studies, and Blogs.
  - Real-time page section content and site settings editor.
  - Unified media asset library with multi-file drag-and-drop upload and MIME type detection.
- **Interactive Tools**:
  - AI SEO Auditor tool (`/tools/ai-seo-auditor`) with real-time on-page score calculation, heading hierarchy analysis, OpenGraph checks, and actionable fix recommendations.
  - Multi-step Project Estimation Wizard for interactive cost and timeline resource allocation.
  - Dynamic Lucide icon resolver (`DynamicIcon.jsx`) supporting icon rendering across all CMS entities.
- **Media & Storage Pipeline**:
  - Multer multipart file upload middleware supporting single and multi-file transfers.
  - Automatic physical filesystem file deletion on media document removal to eliminate orphaned files.
- **Documentation**:
  - Adherence to the 21-section GTV engineering documentation standard in `README.md`.
  - Comprehensive API code examples for cURL, JavaScript, and PHP.
  - Dynamic Mermaid system architecture diagrams.

### Changed
- Migrated legacy static routes to dynamic schema-backed slug routes (`/services/:slug`, `/solutions/:slug`, `/industries/:slug`).
- Enhanced React Error Boundary to catch render failures gracefully without white-screen crashes.
- Upgraded linter configuration to Oxlint (`.oxlintrc.json`) for high-speed static code analysis.

### Security
- Added JSON 404 fallback handler ensuring API consumers never receive raw HTML error traces.
- Implemented cryptographically randomized filenames on media uploads to prevent path traversal and collision vulnerabilities.
- Protected administrative API mutation routes and client-side administrative views.

---

## [0.9.0] - 2026-08-15

### Added
- Dynamic service detail views with FAQ accordions, process timelines, and technology stack matrices.
- Industry vertical landing pages (FinTech, Healthcare, Education, E-Commerce, Logistics).
- Customer inquiry form submission pipeline with MongoDB storage.
- Hero carousel and client logo infinite marquee component.

### Fixed
- Resolved broken icon mapping in nested category sub-tabs.
- Fixed CORS header conflicts during local development multi-port concurrency.

---

## [0.1.0] - 2026-07-01

### Added
- Initial project scaffolding with React, Vite, and TailwindCSS.
- Basic Express server skeleton with static file hosting.
- Core component layout: Navigation Bar, Hero Section, and Footer.
