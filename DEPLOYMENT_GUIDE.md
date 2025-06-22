# Download CV Implementation & Deployment Guide

This guide shows you how to implement and deploy the Download CV feature in your portfolio.

## ✅ What's Already Implemented

1. **Download CV Button** in the About section with professional styling
2. **API Route** (`/api/download-cv`) for secure downloads with analytics
3. **Fallback System** - if API fails, direct download is used
4. **Responsive Design** - works on all devices
5. **Hero Section** - updated to use the new CV path

## 🚀 Deployment Steps

### 1. Add Your CV File

```bash
# Place your CV file in the public/cv directory
public/cv/Farhan_Fadhilah_CV.pdf
```

**Important**: Make sure your CV file is named exactly `Farhan_Fadhilah_CV.pdf` or update the code accordingly.

### 2. Deploy to Vercel

```bash
# If you haven't already, install Vercel CLI
npm i -g vercel

# Deploy your project
vercel

# Or use the Vercel dashboard by connecting your GitHub repo
```

### 3. Verify the Implementation

After deployment, test:

1. **Direct Access**: Visit `https://your-domain.vercel.app/cv/Farhan_Fadhilah_CV.pdf`
2. **API Route**: Visit `https://your-domain.vercel.app/api/download-cv`
3. **Download Button**: Click the "Download CV" button in the About section

## 🎨 Features

- **Professional Animation**: Button has hover effects and download icon
- **Analytics Ready**: API route logs downloads (extend to database if needed)
- **Error Handling**: Graceful fallback to direct download
- **SEO Friendly**: Proper meta tags and file handling

## 🔧 Customization Options

### Change CV Filename

If you want to use a different filename, update these files:

1. **components/About.tsx** (line ~40):

```typescript
link.download = 'Your_New_Filename.pdf'
```

2. **pages/api/download-cv.ts** (line ~12):

```typescript
const cvPath = path.join(process.cwd(), 'public', 'cv', 'Your_New_Filename.pdf')
```

3. **components/Hero.tsx**:

```typescript
href = '/cv/Your_New_Filename.pdf'
```

### Add Download Tracking

Extend the API route to track downloads:

```typescript
// In pages/api/download-cv.ts
console.log(
  `CV downloaded at ${new Date().toISOString()} from IP: ${
    req.headers['x-forwarded-for'] || req.connection.remoteAddress
  }`
)

// You can extend this to save to a database:
// await saveDownloadLog({
//   timestamp: new Date(),
//   ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
//   userAgent: req.headers['user-agent']
// });
```

### Style Customization

The button uses the existing `btn-secondary` class. You can customize it in `styles/globals.css`:

```css
.btn-secondary {
  /* Your custom styles */
}
```

## 🔒 Security Considerations

1. **File Size**: Keep CV under 5MB for performance
2. **Public Access**: CV will be publicly accessible at `/cv/filename.pdf`
3. **API Rate Limiting**: Consider adding rate limiting for the API route
4. **Content Type**: API ensures PDF content-type for security

## 📱 Mobile Optimization

The implementation is fully responsive:

- Touch-friendly button size
- Optimized for mobile downloads
- Proper viewport handling

## 🚨 Troubleshooting

### CV Not Found Error

- Ensure CV file exists in `public/cv/` directory
- Check filename matches exactly (case-sensitive)
- Verify file isn't corrupted

### API Route Not Working

- Check Next.js API routes are properly deployed on Vercel
- Verify the path in fetch request is correct
- Check browser console for errors

### Download Not Starting

- Some browsers block automatic downloads
- User might need to allow pop-ups/downloads
- Fallback to direct link should work

## 📈 Analytics & Monitoring

The API route logs downloads to console. For production, consider:

- Database logging
- Analytics integration
- Download conversion tracking
- Performance monitoring

## 🎯 Next Steps

1. Add your actual CV file
2. Test locally with `npm run dev`
3. Deploy to Vercel
4. Test all download methods
5. Monitor download analytics
6. Consider A/B testing button placement/styling
