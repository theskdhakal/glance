import React, { useState } from 'react'
import { MainLayout } from '../layout/MainLayout'
import { Link } from 'react-router-dom';

export interface ImageData{
    id:string,
    url:string,
    description:string
}

const Home = () => {



    const [images, setImages] = useState<ImageData[]>([]);

//   // Fetch images from your backend or image storage
//   useEffect(() => {
//     const fetchImages = async () => {
//       // Example API request (replace with your own API)
//       const response = await fetch("/api/images"); // Your API endpoint
//       const data = await response.json();
//       setImages(data);
//     };

//     fetchImages();
//   }, []);

  return (
    <MainLayout>

<div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Gallery</h1>

      {/* Display uploaded images */}
      <div className="grid grid-cols-3 gap-4">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="bg-gray-200 p-2 rounded-md">
              <img
                src={image.url}
                alt={image.description || "Uploaded Image"}
                className="w-full h-auto rounded-md"
              />
            </div>
          ))
        ) : (
          <p>No images available yet!</p>
        )}
      </div>

      {/* Link to upload page */}
      <div className="mt-6">
        <Link
          to="/upload"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Upload Image
        </Link>
      </div>
    </div>
 
    </MainLayout>
  )
}

export default Home