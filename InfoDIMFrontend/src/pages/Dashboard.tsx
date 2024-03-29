import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

interface Category {
  ID: number;
  URL: string;
  NAME: string;
  POSITION: number;
  VISIBLE: string;
  IMAGEURL: string;
}

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3333/routes')
      .then(response => {
        setCategories(response.data as Category[]);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des catégories:", error);
      });
  }, []);

  return (
    <div className="relative isolate px-2 py-6 lg:px-4 dark:bg-gray-800">
      <h1 className="text-lg font-bold mb-3 pl-16 dark:text-gray-200">Tableau de bord</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-64">
        {categories.map((category, index) => {
          const cleanURL = DOMPurify.sanitize(`/tableau-de-bord${category.URL}`);
          const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
          const cleanImageURL = DOMPurify.sanitize(`${baseUrl}/${category.IMAGEURL}`);

          return (
            <a key={index} href={cleanURL} className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-700">
              <div className="aspect-w-1 aspect-h-1">
                <img className="object-cover object-center w-full h-full" src={cleanImageURL} alt={category.NAME} />
              </div>
              <div className="p-2">
                <h2 className="text-md font-semibold mb-1 dark:text-gray-300">{category.NAME}</h2>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;