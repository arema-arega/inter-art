/*import React, { useState } from 'react';

const ImageUploader = () => {
  const [imageUploaded, setImageUploaded] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setImageUploaded(image);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();

    if (!imageUploaded) {
      setError("Please select an image to upload.");
      return;
    }

    try {
        // Create a new FormData object to send the image file to the server
        const formData = new FormData();
        formData.append('image', imageUploaded);
  
        // Replace 'YOUR_UPLOAD_URL' with the actual URL to your server's image upload endpoint
        const response = await fetch('YOUR_UPLOAD_URL', {
          method: 'POST',
          body: formData,
        });
        
    setImageUploaded(null);
    setError(null); // Clear any previous errors.
  };

  return (
      <div>
          <ins class="scales_chords_api" chord="chord name" instrument="piano or guitar" output="sound or image" width="100px;" height="150px;" nolink="true or false"></ins>
      <form onSubmit={handleImageUpload}>
        <label>
          <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageChange} />
          <button className="ImageUploader" type="submit">
            Upload
          </button>
        </label>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ImageUploader;
*/