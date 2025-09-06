# Aurora Documentation Site

Aurora Documentation is a Docusaurus v3.7.0 static site that documents the Aurora operating system (Universal Blue KDE variant). The site is built with TypeScript, deployed to GitHub Pages, and includes comprehensive documentation for installation, usage, and development.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Build the Repository

- Install dependencies: `npm install` -- takes ~60 seconds. NEVER CANCEL. Set timeout to 120+ seconds.
- Build the site: `npm run build` -- takes ~10 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
- Type check: `npm run typecheck` -- takes ~5 seconds. Validates TypeScript configuration.

### Development and Testing

- Start development server: `npm run start` -- starts server at http://localhost:3000, takes ~45 seconds to fully compile. NEVER CANCEL. Set timeout to 120+ seconds.
- Serve built site: `npm run serve` -- serves production build at http://localhost:3000.
- Format code: `npm run prettier` -- formats all files with Prettier, takes ~5 seconds.
- Check formatting: `npm run prettier-lint` -- validates formatting without changing files.

### Docker Alternative

- Run with Docker: `docker compose up` -- pulls Node.js image, installs dependencies, and starts dev server. Takes ~120 seconds total. NEVER CANCEL. Set timeout to 300+ seconds.
- Accessible at http://localhost:3000 when ready.

### System Requirements

- Node.js >=18.0 (currently using v20.19.4)
- npm v10.8.2 or compatible
- Docker and Docker Compose (for container workflow)

## Validation

### CRITICAL: Manual Testing Requirements

- ALWAYS test the site functionality after making changes by navigating to http://localhost:3000
- Verify all navigation links work correctly
- Check that content renders properly without broken images or formatting
- Test at least one complete user journey (e.g., navigating from homepage to installation guide to basic usage)

### Pre-commit Validation

- ALWAYS run `npm run prettier` before committing changes or CI will fail
- ALWAYS run `npm run prettier-lint` to verify formatting
- ALWAYS run `npm run typecheck` to verify TypeScript correctness
- ALWAYS run `npm run build` to ensure the site builds successfully

## Repository Structure and Key Locations

### Important Directories

- `docs/` - All markdown documentation files (29 files total)
  - `docs/guides/` - User guides and tutorials
  - `docs/dx/` - Developer experience documentation
  - `docs/project-docs/` - Project information and policies
  - `docs/reference/` - Reference materials
  - `docs/lts/` - Long-term support documentation
- `src/` - Custom React components and CSS
- `static/` - Static assets (images, icons, etc.)
- `.github/workflows/` - CI/CD automation

### Configuration Files

- `docusaurus.config.ts` - Main Docusaurus configuration
- `sidebars.ts` - Navigation sidebar structure
- `package.json` - Dependencies and npm scripts
- `tsconfig.json` - TypeScript configuration
- `docker-compose.yml` - Container setup

### Content Organization

The site uses a hierarchical structure:

1. **Installation** - System requirements, install guides, troubleshooting
2. **User Guides** - Basic usage, software, VPN, gaming, etc.
3. **Developer Experience** - Aurora-DX, CLI tools, local development
4. **Project Information** - Credits, press kit, code of conduct

## Common Issues and Warnings

### Expected Warnings (Safe to Ignore)

- "unsupported file type: undefined (file: .../dino.avif)" - AVIF image format not fully supported
- "Browserslist: caniuse-lite is outdated" - Non-critical browser compatibility data
- npm security vulnerabilities (27 known) - Legacy dependencies, non-critical for static site

### Known Content Issues

- Broken anchors in `/guides/rescue-mode` linking to non-existent sections
- HTML validation warnings in `/guides/layerapp` with nested anchor tags

### Troubleshooting

- If build fails due to broken links: Check `onBrokenLinks: "throw"` setting in docusaurus.config.ts
- If development server fails to start: Ensure port 3000 is available
- If Docker fails: Check Docker daemon is running and image can be pulled

## CI/CD and Deployment

### Automated Workflows

- **Pages Deployment** (`.github/workflows/pages.yml`) - Deploys to GitHub Pages on main branch push
- **Prettier Formatting** (`.github/workflows/prettier.yml`) - Auto-formats code on push
- **Typos Check** (`.github/workflows/typos.yml`) - Spell checking for documentation
- **PDF Generation** (`.github/workflows/pdf.yml`) - Generates PDF version of docs
- **Renovate Validation** (`.github/workflows/renovate-validate.yml`) - Validates dependency updates

### Deployment Notes

- Site deploys automatically to https://docs.getaurora.dev/ on main branch changes
- Uses bun for production builds in CI (bun install --frozen-lockfile --production)
- PDF artifacts generated and attached to releases

## Best Practices

### Content Editing

- Use clear, imperative language for user instructions
- Include screenshots for UI-heavy procedures
- Cross-reference related documentation sections
- Keep installation guides up-to-date with latest Aurora releases

### Code Changes

- Test all Docusaurus configuration changes locally before committing
- Validate TypeScript changes with `npm run typecheck`
- Ensure all internal links resolve correctly
- Use Prettier formatting consistently

### Performance

- Optimize images before adding to static/ directory
- Keep bundle size minimal by avoiding unnecessary dependencies
- Use Docusaurus built-in features before adding custom components

## Development Timing Expectations

- Initial setup (fresh clone): `npm install` + `npm run build` = ~70 seconds total
- Development cycle: `npm run start` + manual testing = ~60 seconds to validate changes
- Pre-commit validation: `npm run prettier` + `npm run typecheck` + `npm run build` = ~20 seconds total
- Docker setup (fresh): `docker compose up` = ~180 seconds total

REMEMBER: NEVER CANCEL any build or long-running command. All operations complete quickly, but allow adequate timeout buffers for reliability.
