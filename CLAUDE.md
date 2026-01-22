# CLAUDE.md - Mezzarano Website

This file provides guidance for AI assistants working on this codebase.

## Project Overview

**Mezzarano Website** - A web application project for Mezzarano.

### Repository Status

This is a new repository that is being initialized. As the project develops, this document should be updated to reflect the actual codebase structure, technologies used, and development practices.

## Codebase Structure

```
Mezzarano_Website/
├── CLAUDE.md           # AI assistant guidance (this file)
├── README.md           # Project documentation (to be created)
├── src/                # Source code (to be created)
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components/routes
│   ├── styles/         # Stylesheets (CSS/SCSS/Tailwind)
│   ├── assets/         # Static assets (images, fonts, icons)
│   ├── utils/          # Utility functions
│   ├── hooks/          # Custom hooks (if React)
│   └── services/       # API services and external integrations
├── public/             # Public static files
├── tests/              # Test files
├── config/             # Configuration files
└── docs/               # Additional documentation
```

*Note: This structure is a template. Update as the actual project structure evolves.*

## Development Workflows

### Getting Started

1. Clone the repository
2. Install dependencies (command will depend on package manager used)
3. Start the development server
4. Make changes and test locally

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature development branches
- `bugfix/*` - Bug fix branches
- `claude/*` - AI-assisted development branches

### Commit Conventions

Use conventional commit messages:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example: `feat: add contact form to homepage`

### Pull Request Process

1. Create a feature branch from the appropriate base branch
2. Make changes and commit with clear messages
3. Push the branch and create a pull request
4. Request review and address feedback
5. Merge after approval

## Key Conventions

### Code Style

- Use consistent indentation (2 or 4 spaces, based on project config)
- Follow the established linting rules (ESLint, Prettier, etc.)
- Write descriptive variable and function names
- Keep functions small and focused
- Add comments for complex logic only

### File Naming

- Use kebab-case for file names: `my-component.tsx`
- Use PascalCase for component names: `MyComponent`
- Use camelCase for utility functions: `formatDate.ts`
- Test files should match source: `my-component.test.tsx`

### Component Guidelines

- Keep components small and reusable
- Separate concerns: logic, presentation, styling
- Use TypeScript for type safety when applicable
- Handle loading and error states appropriately

## AI Assistant Guidelines

### When Working on This Codebase

1. **Always read before editing** - Understand existing code before making changes
2. **Follow existing patterns** - Match the coding style and conventions already in use
3. **Keep changes focused** - Only modify what's necessary for the task
4. **Test your changes** - Run tests and verify functionality
5. **Document significant changes** - Update this file when adding major features or changing structure

### Task Approach

1. **Understand the request** - Clarify requirements if needed
2. **Explore the codebase** - Find relevant files and understand context
3. **Plan the implementation** - Break down complex tasks
4. **Implement incrementally** - Make small, testable changes
5. **Verify and commit** - Test changes and commit with clear messages

### Things to Avoid

- Over-engineering simple solutions
- Adding unnecessary dependencies
- Making changes outside the scope of the task
- Ignoring existing patterns and conventions
- Committing without testing

### Security Considerations

- Never commit secrets or API keys
- Validate user input
- Sanitize data before rendering
- Use HTTPS for external requests
- Follow OWASP guidelines for web security

## Common Commands

*Update these as the project develops:*

```bash
# Install dependencies
npm install          # or yarn install, pnpm install

# Start development server
npm run dev          # or yarn dev, pnpm dev

# Build for production
npm run build        # or yarn build, pnpm build

# Run tests
npm test             # or yarn test, pnpm test

# Lint code
npm run lint         # or yarn lint, pnpm lint

# Format code
npm run format       # or yarn format, pnpm format
```

## Environment Variables

Create a `.env.local` file for local development (never commit this file):

```env
# Example environment variables
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=your-database-url
SECRET_KEY=your-secret-key
```

## Dependencies

*Document major dependencies as they are added:*

| Package | Purpose | Version |
|---------|---------|---------|
| TBD | TBD | TBD |

## Troubleshooting

### Common Issues

*Document common issues and solutions as they arise:*

1. **Issue**: Description
   - **Solution**: Steps to resolve

## Contact & Resources

- **Repository**: SunsideAI/Mezzarano_Website
- **Documentation**: (link to docs when available)
- **Issue Tracker**: (link to issues when available)

---

*Last Updated: January 2026*

*This document should be updated as the project evolves. When adding new features, changing architecture, or establishing new conventions, please update the relevant sections.*
