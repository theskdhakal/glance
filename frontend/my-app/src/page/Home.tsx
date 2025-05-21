import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { Link } from 'react-router-dom';
import { getImages } from '../api/api';

export interface ImageData {
  id: string;
  image: string;       // URL of image (adjust property name if needed)
  title: string;       // Title or description of image
  uploaded_by: {       // To show uploader username
    username: string;
  };
  likes: number;       // Number of likes
}

const Home = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await getImages();
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        console.error("Error fetching images", data.message);
      }
    };

    fetchImages();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-screen-xl mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Gallery</h1>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={image.image}
                  alt={image.title || 'Uploaded Image'}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg">{image.title || 'Untitled'}</h2>
                  <p className="text-sm text-gray-600">Uploaded by: {image.uploaded_by.username}</p>
                  <p className="text-sm text-gray-600 mt-1">Likes: {image.likes}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No images available yet!</p>
          )}
        </div>

        {/* Upload Button */}
        <div className="mt-8">
          <Link
            to="/upload"
            className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 transition"
          >
            Upload Image
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
