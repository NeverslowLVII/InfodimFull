import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center dark:bg-gray-800">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Page de Contact</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Cette page est en cours de développement.</p>
      <img 
        src="../../../public/images/construction.webp" 
        alt="En construction" 
        className="mt-10"
      />
    </div>
  );
};

export default Contact;