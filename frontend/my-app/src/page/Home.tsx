import { useEffect } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { Link } from 'react-router-dom';
import { getImages, toggleLike } from '../api/Api';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setImages, updatedLikeStatus } from '../components/ImageSlice';


export interface ImageData {
  id: string;
  image: string;
  title: string;
  uploaded_by: {
    username: string;
  };
  likes: number;
}

export interface ImageWithLike extends ImageData {
  isLiked: boolean;
}

const Home = () => {
  const dispatch = useAppDispatch();
  const {images} = useAppSelector((state) => state.images);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await getImages();
      if (Array.isArray(data)) {
        const updatedData = data.map((img) => ({ ...img, isLiked: false }));
        dispatch(setImages(updatedData));
      } else {
        console.error('Error fetching images', data.message);
      }
    };

    fetchImages();
  }, [dispatch]);

  const handleToggleLike = async (id: string) => {
    const response = await toggleLike(id);

    if (response?.status === 200) {
      dispatch(
        updatedLikeStatus({
          id: id,
          isLiked: response.data.liked,
          likes: response.data.like_count,
        })
      );
    }
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen flex flex-col items-center overflow-y-auto bg-gray-50">
        <div className="w-full max-w-full sm:max-w-md px-4 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-800">
            Your Feed
          </h1>

          {/* Image Feed */}
          <div className="flex flex-col gap-6">
            {images.length > 0 ? (
              images.map((image) => (
                <div
                  key={image.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Uploader info */}
                  <div className="flex items-center p-4">
                    <div className="w-10 h-10 rounded-full bg-blue-300 mr-3 flex-shrink-0" />
                    <p className="font-semibold text-gray-900">{image.uploaded_by.username}</p>
                  </div>

                  {/* Image */}
                  <img
                    src={image.image}
                    alt={image.title || 'Uploaded'}
                    className="w-full max-h-[400px] sm:max-h-[600px] object-cover"
                  />

                  {/* Caption + Likes */}
                  <div className="p-4">
                    <p className="text-base text-gray-800 font-medium mb-3">{image.title}</p>
                    <button
                      onClick={() => handleToggleLike(image.id)}
                      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-semibold 
                        ${
                          image.isLiked
                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        } transition-colors duration-200`}
                    >
                      <span>{image.isLiked ? '❤️' : '🤍'}</span>
                      <span>{image.likes}</span>
                      <span>Like</span>
                    </button>
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
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
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
