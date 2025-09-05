# academy.itbjazz

A living catalogue of ITBJazz Academy's programs, modules, and community projects.

## Overview

This is a lightweight public website showcasing ITBJazz Academy's organizational programs and work-in-progress projects. The site is designed to be deployed on Netlify (Free) and uses Supabase (Free) for content storage.

## Features

- **Homepage** with overview cards, upcoming events, and featured module
- **Modules Library** with grid gallery view
- **The Catz Module 1** - Interactive jazz piano learning page with:
  - Course detail layout (68% + 32%)
  - Progress tracking with localStorage
  - Media player for video/audio content
  - Sidebar checklist with 5 sections
  - Mobile responsive with accordion
- **Event Pages** for Klinik, Mentoring, and Jam & Jazz
- **Responsive Design** optimized for mobile and desktop
- **Supabase Integration** for dynamic content loading

## Tech Stack

- **Frontend**: Vanilla JavaScript with Vite
- **Styling**: Bootstrap + Custom CSS
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Netlify
- **Templates**: Adapted from aievent, edmate, and luma themes

## Project Structure

```
academy-itbjazz/
├── assets/
│   ├── css/
│   │   ├── academy.css          # Custom styles
│   │   ├── bootstrap.min.css    # Bootstrap framework
│   │   ├── style.css           # Template styles
│   │   └── vendors.css         # Vendor styles
│   ├── js/
│   │   ├── main.js             # Main application logic
│   │   ├── modules.js          # Modules page logic
│   │   └── supabase.js         # Supabase integration
│   └── images/                 # Images and assets
├── modules/
│   ├── index.html              # Modules listing page
│   └── catz.html              # The Catz' Module detail
├── events/                     # Event pages (placeholders)
├── public/
│   └── _redirects             # Netlify redirect rules
├── index.html                 # Homepage
├── package.json
├── vite.config.js
└── supabase-setup.sql         # Database schema
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd academy-itbjazz
npm install
```

### 2. Configure Supabase

1. Create a new Supabase project
2. Run the SQL from `supabase-setup.sql` in your Supabase SQL editor
3. Create a `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Development

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

### 5. Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

## Content Management

### Adding New Modules

1. Upload poster image to Supabase Storage (`posters` bucket)
2. Upload PDF to Supabase Storage (`docs` bucket)
3. Insert record into `modules` table:

```sql
INSERT INTO public.modules (title, slug, description, poster_url, pdf_url, status) 
VALUES ('Module Title', 'module-slug', 'Description', 'poster_url', 'pdf_url', 'published');
```

### Adding Events

```sql
INSERT INTO public.events (type, title, description, status, starts_at) 
VALUES ('Klinik', 'Event Title', 'Description', 'upcoming', '2025-01-01 10:00:00');
```

## Design System

### Color Palette

- **Primary**: #2FB2AB (Teal)
- **Secondary**: #27CFA7 (Green)
- **Accent**: #6142FF (Purple)
- **Warning**: #FA902F (Orange)

### Typography

- **Headings**: Lato, sans-serif
- **Body**: Roboto, sans-serif
- **Display**: Exo 2, sans-serif

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Lighthouse Performance: 90+
- Lighthouse SEO: 90+
- Lighthouse Best Practices: 90+
- Lighthouse Accessibility: 90+

## License

Copyright 2025 - academy.itbjazz