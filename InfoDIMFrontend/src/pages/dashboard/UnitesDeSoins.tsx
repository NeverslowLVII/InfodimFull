import React from "react";
import DataTable from "../../components/DataTable";

const UnitesDeSoins = () => {
  const data = {
    lits: ["ACACIAS", "ROSEREAIE", "LILAS", "MIMOSAS", "GLYCINES"],
    libres: [0, 2, 1, 3, 3],
    isolementsLibres: [0, 0, 0, 1, 0],
    reserves: [1, 3, 3, 1, 2],
    indisponibles: [0, 0, 0, 0],
  };

  // Définir les colonnes pour le composant DataTable
  const columns = [
    { header: "Unité de Soins", accessor: "lits" },
    { header: "Lits Libres", accessor: "libres" },
    { header: "Isolements Libres", accessor: "isolementsLibres" },
    { header: "Réservés", accessor: "reserves" },
    { header: "Indisponibles", accessor: "indisponibles" },
  ];

  // Transformer les données pour qu'elles correspondent au format attendu par DataTable
  const transformedData = data.lits.map((_, index) => ({
    lits: data.lits[index],
    libres: data.libres[index],
    isolementsLibres: data.isolementsLibres[index],
    reserves: data.reserves[index],
    indisponibles: data.indisponibles[index],
  }));

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 lg:mx-32 md:mx-8 font-sans">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900 font-title">
            Unités de Soins
          </h1>
          <p className="mt-2 text-md text-gray-700 font-sans">
            tableau des lits par unité de soins avec leur disponibilité.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <DataTable 
          columns={columns} 
          data={transformedData} 
          enableSorting={true}
          enablePagination={true}
          enableSearch={false}
          enableRowSelection={false}
          enableColumnVisibility={false}
          enableExport={true}
        />
      </div>
    </div>
  );
};

export default UnitesDeSoins;