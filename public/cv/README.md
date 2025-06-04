# CV Directory

## Instructions

1. **Replace the placeholder CV**: Add your actual CV file to this directory with the name `Farhan_Fadhilah_CV.pdf`

2. **CV File Requirements**:

   - Format: PDF (recommended for compatibility)
   - Filename: `Farhan_Fadhilah_CV.pdf` (matches the download functionality)
   - Size: Keep under 5MB for web optimization

3. **Alternative Filenames**:
   If you prefer a different filename, update the following files:

   - `components/About.tsx` - line with `link.download` and API fetch
   - `pages/api/download-cv.ts` - the `cvPath` and filename in headers

4. **Security Note**:
   Your CV will be publicly accessible at `/cv/Farhan_Fadhilah_CV.pdf` when deployed. The API route provides better analytics and security controls.

## Features Implemented

✅ Download CV button in About section  
✅ API route for secure downloads with analytics  
✅ Fallback to direct download if API fails  
✅ Professional styling with hover animations  
✅ Mobile-responsive design
