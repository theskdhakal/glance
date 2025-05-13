import React, { useState } from "react";



const Upload = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
 

  // Handle file input change
  const handleImageChange = (e:React.ChangeEvent) => {
    
 
  };

  // Handle form submission
  const handleUpload = async (e:React.FormEvent) => {
    e.preventDefault();

  
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Upload Image</h1>

      <form onSubmit={handleUpload} className="space-y-4">
        {/* Image preview */}
        {image && (
          <div>
            {/* <img src={image} alt="Preview" className="w-full h-auto rounded-md" /> */}
          </div>
        )}

        {/* File input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full"
          required
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description"
          className="border p-2 w-full"
        />

        {/* Upload button */}
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
