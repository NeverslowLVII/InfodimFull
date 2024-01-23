import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Définir l'interface Category
interface Category {
  ID: number;
  URL: string;
  NAME: string;
  POSITION: number;
  VISIBLE: string;
  IMAGEURL: string;
  
}

const Dashboard: React.FC = () => {
  // Utiliser l'interface Category pour l'état
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3333/routes')
      .then(response => {
        // Assurer que la réponse correspond à Category[]
        setCategories(response.data as Category[]);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des catégories:", error);
      });
  }, []);

  return (
    <div className="relative isolate px-2 py-6 lg:px-4">
      <h1 className="text-lg font-bold mb-3 pl-16">Tableau de bord</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-64">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-1 aspect-h-1">
              <img className="object-cover" src={category.IMAGEURL} alt={category.NAME} />
            </div>
            <div className="p-2">
              <h2 className="text-md font-semibold mb-1">{category.NAME}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;