'use client';

import { useState } from 'react';

export function AddCourseButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    alert('This is a Client Component - it runs in the browser!');
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isClicked 
          ? 'bg-green-600 text-white' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isClicked ? '✅ Course Added!' : '+ Add Course'}
    </button>
  );
}