'use client'
import { Progress } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { client } from "@/sanity/client"

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
const imageTypes = [ "image/jpeg", "image/png", "image/gif","image/webp"];

const FileInput = ({fileImage, setFileImage}:any) => {

    const [value, setValue] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        // If no file is selected, stop here
        if (!fileImage) return;
    
        // Start the progress simulation
        const interval = setInterval(() => {
          setValue((v) => {
            // If progress reaches 100%, clear the interval
            if (v >= 100) {
              clearInterval(interval);
              return 100; // Set to 100% when completed
            }
            return v + 10; // Increment progress by 10% every 500ms
          });
        }, 500);
    
        // Clear interval when component unmounts or fileImage changes
        return () => clearInterval(interval);
      }, [fileImage]);
  
    const onFileChange = async(event:any) => {
      setValue(0)
      const file = event.target.files[0];
      if (file) {
        if (!imageTypes.includes(file?.type)) {
          setErrorMessage(`${file?.name} is not a supported image type.`);
          return
        }
        if (file.size > MAX_FILE_SIZE) {
            setErrorMessage(`File size exceeds the 2MB limit. Please select a smaller file.`);
            return
        }
        try{
          const uploadedFile = await client.assets.upload('image', file, {contentType: file.type, filename: file.name})
          setFileImage(uploadedFile.url)
          setErrorMessage('');
        }catch(err){
            console.error('Upload failed:', err)
            setErrorMessage('Failied Upload');
        }
    }}

  return (
    <div className="flex mx-auto py-5 items-center flex-col justify-center max-w-md">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-foreground/50  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 2GB)</p>
               {value !==0 && <Progress aria-label="Uploading..." size="sm" value={value} color="success"
                    showValueLabel={true}
                    className="w-full"
                />}
                <p className="text-xs text-center text-gray-500 dark:text-gray-100">{fileImage?.name}</p>
            </div>
            <input  onChange={onFileChange} 
            id="dropzone-file" type="file" className="hidden" />
        </label>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
</div> 
  )
}

export default FileInput