'use client'

    export const handleDownload = async (imageUrl: string) => {
      const imageName = 'my-image.jpg'; // Optional, rename the file
      
      try {
        // Fetch the image as a blob
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        // Create a link element, set its href to the blob URL, and download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = imageName || 'downloaded-image';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading the image:', error);
      }
    }