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