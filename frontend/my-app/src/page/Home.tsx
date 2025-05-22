import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { Link } from 'react-router-dom';
import { getImages } from '../api/api';

export interface ImageData {
  id: string;
  image: string;
  title: string;
  uploaded_by: {
    username: string;
  };
  likes: number;
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
      <div className="w-full min-h-screen flex flex-col items-center overflow-y-auto bg-gray-50">
        <div className="w-full max-w-md px-4 py-6">
          <h1 className="text-2xl font-bold text-center mb-6">Your Feed</h1>

          {/* Image Feed */}
          <div className="flex flex-col gap-6">
            {images.length > 0 ? (
              images.map((image) => (
                <div
                  key={image.id}
                  className="bg-white border rounded-lg shadow-md overflow-hidden"
                >
                  {/* Uploader info */}
                  <div className="flex items-center p-4">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
                    <p className="font-semibold">{image.uploaded_by.username}</p>
                  </div>

                  {/* Image */}
                  <img
                    src={image.image}
                    alt={image.title || 'Uploaded'}
                    className="w-full max-h-[600px] object-cover"
                  />

                  {/* Caption + Likes */}
                  <div className="p-4">
                    <p className="text-sm text-gray-800 font-medium mb-1">
                      {image.title}
                    </p>
                    <button className="text-sm text-gray-500 cursor-pointer">❤️ {image.likes} likes</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No images uploaded yet.</p>
            )}
          </div>

          {/* Upload Button */}
          <div className="flex justify-center mt-10">
            <Link
              to="/upload"
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
            >
              + Upload
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
