# Blog Editor Improvement Plan

## Overview
This document outlines the steps required to enhance the blog editor by allowing users to upload `.md` files with embedded images. The uploaded content will be saved to the database, enabling seamless integration with the existing blog system.

## Proposed Features
- **Markdown File Upload**: Allow users to upload `.md` files.
- **Image Embedding**: Support embedded images within the markdown content.
- **Database Storage**: Save the markdown content and images to the database.
- **Preview Functionality**: Provide a live preview of the uploaded content.

## Integration Steps

### 1. Install Dependencies
Install the necessary packages for handling file uploads and parsing markdown:
```bash
bun add multer remark remark-html
```

### 2. Configure File Uploads
Set up a file upload handler in `pages/api/upload.ts`:
```typescript
import multer from 'multer';
import nextConnect from 'next-connect';

const upload = multer({ dest: 'uploads/' });

const apiRoute = nextConnect();
apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
  const file = req.file;
  res.status(200).json({ file });
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
```

### 3. Parse Markdown Content
Use `remark` to parse the uploaded markdown file:
```typescript
import fs from 'fs';
import { remark } from 'remark';
import html from 'remark-html';

export async function parseMarkdown(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const processedContent = await remark().use(html).process(fileContent);
  return processedContent.toString();
}
```

### 4. Update BlogEditor Component
Enhance the `BlogEditor` component to support file uploads:
```typescript
import { useState } from 'react';

export default function BlogEditor() {
  const [preview, setPreview] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    const markdownContent = await parseMarkdown(data.file.path);
    setPreview(markdownContent);
  };

  return (
    <div>
      <input type="file" accept=".md" onChange={handleFileUpload} />
      <div dangerouslySetInnerHTML={{ __html: preview }} />
    </div>
  );
}
```

### 5. Save to Database
Update the API route to save the parsed content and images to the database:
```typescript
import pool from '../../lib/db';

export async function saveBlogPost(content: string, images: string[]) {
  await pool.query('INSERT INTO blog_posts (content, images) VALUES ($1, $2)', [content, images]);
}
```

### 6. Test Integration
- Test markdown file uploads with embedded images.
- Verify that the content is parsed correctly and saved to the database.
- Ensure the live preview matches the saved content.

### 7. Deploy Changes
- Ensure the production environment is configured for file uploads.
- Use a cloud storage solution (e.g., AWS S3) for storing images in production.

## Risks and Mitigation
- **Risk**: Large file uploads.
  - **Mitigation**: Set file size limits in the upload handler.
- **Risk**: Malicious content in markdown.
  - **Mitigation**: Sanitize markdown content before rendering.

## Next Steps
1. Review this plan and provide feedback.
2. Approve the implementation.
3. Begin development following the outlined steps.

---

**Prepared by**: hawk033