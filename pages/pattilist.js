import React from 'react';

const Pattilist = () => {
  // Replace 'image_url_here' with your actual image URL
  const imageUrl = 'patti.png'; // Example image URL

  return (
    <div className="flex bg-white justify-center items-center">
      <div className="text-center">
        <img
          src={imageUrl}
          alt="Placeholder"
          className="mx-auto rounded-lg shadow-lg"
          style={{ maxWidth: '400px' }} // Optional: Limit image width
        />
      </div>
    </div>
  );
};

export default Pattilist;
