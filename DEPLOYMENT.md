# Deployment Instructions for academy.itbjazz

## Prerequisites

1. **Supabase Account**: Create a free account at [supabase.com](https://supabase.com)
2. **Netlify Account**: Create a free account at [netlify.com](https://netlify.com)
3. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket

## Step 1: Setup Supabase Database

1. **Create New Project**:
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose your organization
   - Enter project name: `academy-itbjazz`
   - Set database password
   - Choose region closest to your users
   - Click "Create new project"

2. **Run Database Schema**:
   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `supabase-setup.sql`
   - Click "Run" to execute the SQL

3. **Get API Keys**:
   - Go to Settings > API
   - Copy your Project URL and anon public key
   - You'll need these for the environment variables

## Step 2: Configure Environment Variables

1. **Create `.env` file** in the project root:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Test locally**:
   ```bash
   npm install
   npm run dev
   ```

## Step 3: Deploy to Netlify

### Option A: Deploy from Git (Recommended)

1. **Connect Repository**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your Git provider
   - Select your repository

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

3. **Deploy**:
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be available at `https://your-site-name.netlify.app`

### Option B: Deploy from Local Build

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Sites" > "Add new site" > "Deploy manually"
   - Drag and drop the `dist` folder
   - Set environment variables in Site settings > Environment variables

## Step 4: Configure Custom Domain (Optional)

1. **Add Custom Domain**:
   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Enter your domain name
   - Follow DNS configuration instructions

2. **SSL Certificate**:
   - Netlify automatically provides SSL certificates
   - Enable "Force HTTPS" in Site settings > SSL/TLS

## Step 5: Add Content

### Upload Images to Supabase Storage

1. **Go to Storage** in your Supabase dashboard
2. **Upload to `posters` bucket**:
   - Upload poster images for modules
   - Note the public URLs

3. **Upload to `docs` bucket**:
   - Upload PDF files for modules
   - Note the public URLs

### Add Modules

1. **Go to Table Editor** in Supabase
2. **Select `modules` table**
3. **Add new module**:
   ```sql
   INSERT INTO public.modules (title, slug, description, poster_url, pdf_url, status) 
   VALUES ('Module Title', 'module-slug', 'Description', 'poster_url', 'pdf_url', 'published');
   ```

### Add Events

1. **Select `events` table**
2. **Add new event**:
   ```sql
   INSERT INTO public.events (type, title, description, status, starts_at) 
   VALUES ('Klinik', 'Event Title', 'Description', 'upcoming', '2025-01-01 10:00:00');
   ```

## Step 6: Monitor and Maintain

### Analytics
- Enable Netlify Analytics in Site settings
- Monitor performance and usage

### Updates
- Push changes to your Git repository
- Netlify will automatically rebuild and deploy

### Database Management
- Monitor usage in Supabase dashboard
- Free tier includes 500MB database and 1GB bandwidth

## Troubleshooting

### Common Issues

1. **Build Fails**:
   - Check environment variables are set correctly
   - Ensure all dependencies are in `package.json`
   - Check build logs in Netlify dashboard

2. **Supabase Connection Issues**:
   - Verify API keys are correct
   - Check RLS policies are disabled for public read
   - Ensure tables exist and have data

3. **Images Not Loading**:
   - Check image URLs in Supabase Storage
   - Verify storage bucket policies allow public access
   - Check file formats are supported

### Performance Optimization

1. **Image Optimization**:
   - Use WebP format for images
   - Compress images before uploading
   - Consider using Netlify's image optimization

2. **Caching**:
   - Netlify automatically caches static assets
   - Configure cache headers if needed

## Security Considerations

1. **API Keys**:
   - Never commit `.env` files to Git
   - Use environment variables in production
   - Rotate keys regularly

2. **Database Security**:
   - Keep RLS disabled for public read-only access
   - Monitor database usage
   - Consider enabling RLS for write operations

3. **Content Security**:
   - Validate all user inputs
   - Sanitize content before displaying
   - Use HTTPS everywhere

## Support

- **Netlify Documentation**: [docs.netlify.com](https://docs.netlify.com)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Project Issues**: Create issues in your Git repository