"use client";

import { useEffect, useState } from 'react';

interface Photo {
  id: number;
  file_path: string;
  original_name: string;
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);

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