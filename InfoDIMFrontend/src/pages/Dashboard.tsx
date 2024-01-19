import React from 'react';

const categories = [
  { name: 'Unités de soins', description: 'Description for Unités de soins', imageUrl: '../../public/images/health-care-units.png' },
  { name: 'Vue hôpital', description: 'Description for Vue hôpital', imageUrl: '../../public/images/huge-hospital.png' },
  { name: 'Pharmacie', description: 'Description for Pharmacie', imageUrl: '../../public/images/syringe.png' },
  { name: 'Myosotis', description: 'Description for Myosotis', imageUrl: '../../public/images/cyan-flower.png' },
  { name: 'S.C.S', description: 'Description for S.C.S', imageUrl: '../../public/images/doctor.png' },
  { name: 'PM SI', description: 'Description for PM SI', imageUrl: '../../public/images/computer-displaying-a-medical-application.png' },
  { name: 'FICHCOMP', description: 'Description for FICHCOMP', imageUrl: '../../public/images/health-care-units.png' },
  { name: 'Divers', description: 'Description for Divers', imageUrl: '../../public/images/health-care-units.png' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="relative isolate px-2 pt-6 lg:px-4">
      <h1 className="text-lg font-bold mb-3">Tableau de bord</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-1 aspect-h-1">
              <img className="object-cover" src={category.imageUrl} alt={category.name} />
            </div>
            <div className="p-2">
              <h2 className="text-md font-semibold mb-1">{category.name}</h2>
              <p className="text-xs">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;