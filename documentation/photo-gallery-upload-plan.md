# Photo Gallery Upload Feature Implementation Plan

## Overview
This document outlines the steps required to implement a photo upload feature for the photo gallery page. The gallery will display photos in a grid layout using Neobrutalism components, with a zoom-in feature for viewing individual photos.

## Proposed Features
- **Photo Upload**: Allow users to upload `.jpg` photos.
- **Grid Layout**: Display photos in a visually appealing grid.
- **Zoom-In Feature**: Enable users to click on a photo to view it in full-screen mode.
- **Database Integration**: Save photo metadata to the database.

## Integration Steps

### 1. Install Dependencies
Install the necessary packages for file uploads:
```bash
bun add multer
```

### 2. Configure File Uploads
Set up a file upload handler in `pages/api/upload-photo.ts`:
```typescript
import multer from 'multer';
import nextConnect from 'next-connect';
import pool from '../../lib/db';

const upload = multer({ dest: 'uploads/' });

const apiRoute = nextConnect();
apiRoute.use(upload.single('photo'));

apiRoute.post(async (req, res) => {
  const file = req.file;
  const { originalname, filename, path } = file;

  await pool.query(
    'INSERT INTO photos (original_name, file_name, file_path, created_at) VALUES ($1, $2, $3, NOW())',
    [originalname, filename, path]
  );

  res.status(200).json({ message: 'Photo uploaded successfully' });
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
```

### 3. Create Database Schema
Add a `photos` table to the database:
```sql
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  original_name VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Update Frontend
Enhance the photo gallery page to display uploaded photos:
```typescript
import { useEffect, useState } from 'react';

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('/api/get-photos')
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.file_path}
          alt={photo.original_name}
          className="cursor-pointer"
          onClick={() => window.open(photo.file_path, '_blank')}
        />
      ))}
    </div>
  );
}
```

### 5. Test Integration
- Test photo uploads and ensure they are saved to the database.
- Verify that the gallery displays photos correctly.
- Test the zoom-in feature for individual photos.

### 6. Deploy Changes
- Use a cloud storage solution (e.g., AWS S3) for storing photos in production.
- Ensure the production environment is configured for file uploads.

## Risks and Mitigation
- **Risk**: Large file uploads.
  - **Mitigation**: Set file size limits in the upload handler.
- **Risk**: Unauthorized uploads.
  - **Mitigation**: Authenticate users before allowing uploads.

## Next Steps
1. Review this plan and provide feedback.
2. Approve the implementation.
3. Begin development following the outlined steps.

---

**Prepared by**: hawk033