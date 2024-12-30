# Web Performance Analyzer v1.5.0

A modern web application for analyzing web performance metrics and calculating Lighthouse scores.

## Features

- URL Performance Analysis
- Device-specific Testing
- Core Web Vitals Monitoring
- Lighthouse Score Calculator
- Real-time Performance Metrics
- Detailed SSL Security Analysis
- Comprehensive Analysis Comments
- Progress Tracking
- Responsive Design
- PDF Report Export
- Docker Deployment

## What's New in v1.5.0 [Docker Support]
- Added Docker support for containerized deployment
- Multi-stage build optimization
- Nginx configuration with performance optimizations
- Gzip compression and caching
- Security headers configuration

## Docker Support

### Prerequisites
- Docker
- Docker Compose

### Running with Docker
1. Build the image:
   ```bash
   docker compose build
   ```

2. Start the container:
   ```bash
   docker compose up -d
   ```

3. Access the application:
   - Open http://localhost:80 in your browser

4. Stop the container:
   ```bash
   docker compose down
   ```

## Analysis Categories

### Performance
- First Contentful Paint (FCP)
- Time to Interactive (TTI)
- Core Web Vitals metrics
- Performance optimization recommendations

### Security
- SSL Certificate validation
- Security headers analysis
- HTTPS configuration
- Security best practices

### SEO
- Meta tags analysis
- Mobile-friendliness check
- Search engine optimization tips
- Content structure analysis

### Accessibility
- WCAG 2.1 compliance checks
- Contrast ratio analysis
- Semantic structure validation
- Accessibility recommendations

### Best Practices
- Modern web technologies usage
- Code quality analysis
- Console error detection
- Industry standard compliance

## PDF Report Features
- Professional layout with company branding
- URL and timestamp information
- Complete analysis results
- High-resolution graphics
- Automatic page formatting
- Easy sharing and archiving

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons
- jsPDF
- html2canvas
- Docker
- Nginx

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

## Components

- **URL Form**: Enter website URL for analysis
- **Device Selector**: Choose device type for testing
- **Core Web Vitals**: Monitor key performance metrics
- **Lighthouse Calculator**: Calculate performance scores based on:
  - First Contentful Paint (FCP)
  - Largest Contentful Paint (LCP)
  - Total Blocking Time (TBT)

## Build

To build for production:
```bash
npm run build
```

## License

MIT License
