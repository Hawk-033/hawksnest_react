// lib/image-upload.ts
import sharp from 'sharp';

export async function uploadAndConvert(formData: { get: (arg0: string) => any; }) {
  const file = formData.get('image');
  const buffer = Buffer.from(await file.arrayBuffer());

  const webpBuffer = await sharp(buffer)
    .webp({ quality: 80 })
    .toBuffer();

  // Save webpBuffer to your 'public/uploads'
  return { success: true, url: '/uploads/converted-image.webp' };
}