import React from 'react';

const UnitesDeSoins = () => {
  // TODO: Remplacer par des données réelles ou générer des données aléatoires
  const data = {
    lits: ['ACACIAS', 'ROSEREAIE', 'LILAS', 'MIMOSAS', 'GLYCINES'],
    libres: [0, 2, 1, 3, 3],
    isolementsLibres: [0, 0, 0, 1, 0],
    reserves: [1, 3, 3, 1, 2],
    indisponibles: [0, 0, 0, 0, 0],
  };

  return (
    <div className="container mx-auto p-4 px-32">
      <h1 className="text-2xl font-bold mb-4">Unités de Soins</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="w-1/6 py-3 px-6 text-center">Lits</th>
              {data.lits.map((lit, index) => (
                <th key={index} className="py-3 px-6 text-center">{lit}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr>
              <td className="py-3 px-6 text-center">Libres</td>
              {data.libres.map((libre, index) => (
                <td key={index} className="py-3 px-6 text-center">{libre}</td>
              ))}
            </tr>
            <tr className="bg-gray-100">
              <td className="py-3 px-6 text-center">Isolements libres</td>
              {data.isolementsLibres.map((isolement, index) => (
                <td key={index} className="py-3 px-6 text-center">{isolement}</td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-6 text-center">Réservés</td>
              {data.reserves.map((reserve, index) => (
                <td key={index} className="py-3 px-6 text-center">{reserve}</td>
              ))}
            </tr>
            <tr className="bg-gray-100">
              <td className="py-3 px-6 text-center">Indisponibles</td>
              {data.indisponibles.map((indisponible, index) => (
                <td key={index} className="py-3 px-6 text-center">{indisponible}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnitesDeSoins;