import React from 'react';

const Contact: React.FC = () => {
  // TODO: Implémenter la logique de la page de contact
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800">Page de Contact</h1>
      <p className="mt-4 text-lg text-gray-600">Cette page est en cours de développement.</p>
      <img 
        src="https://tailwindui.com/img/construction-image-placeholder.svg" 
        alt="En construction" 
        className="mt-10"
      />
    </div>
  );
};

export default Contact;