import React, { useState } from "react";
import { MainLayout } from "../layout/MainLayout";
import { uploadHandler } from "../api/api";
import {toast} from "react-hot-toast"

export interface uploadData{
  image:File,
  title:string
}

const Upload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");


  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    
   const file=e.target.files?.[0]
   if(file){
    setImage(file)
   }
 
  };

  // Handle form submission
  const handleUpload = async (e:React.FormEvent) => {
    e.preventDefault();

    if(!image) return;

    const formData=new FormData()
    formData.append("image",image);
    formData.append("title",title);
 
   try {

    const response =await uploadHandler(formData)
   
    if(response?.status === 201){
      toast.success("Image uploaded successfully");
      setImage(null);
      setTitle("")
    }
   
    
   } catch (error) {
      console.error("error while uploading image")
      return{

        message:error
      }
   }
  





  };

  return (
    <MainLayout>
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
    </MainLayout>
  );
};

export default Upload;
