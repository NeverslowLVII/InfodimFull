import React from "react";
import { FaBed, FaCircleCheck, FaShield, FaBan, FaPen, FaAngleDown } from 'react-icons/fa6';

const UnitesDeSoins = () => {
  // TODO: Remplacer par des données réelles ou générer des données aléatoires
  const data = {
    lits: ["ACACIAS", "ROSEREAIE", "LILAS", "MIMOSAS", "GLYCINES"],
    libres: [0, 2, 1, 3, 3],
    isolementsLibres: [0, 0, 0, 1, 0],
    reserves: [1, 3, 3, 1, 2],
    indisponibles: [0, 0, 0, 0, 0],
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 lg:mx-32 md:mx-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Unités de Soins
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Un tableau des lits par unité de soins avec leur disponibilité.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    <a href="#" className="group inline-flex">
                      <FaBed className="h-5 w-5 mr-2" aria-hidden="true" />
                      Lits
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <FaAngleDown
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  {data.lits.map((lit, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <a href="#" className="group inline-flex">
                        {lit}
                        <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                          <FaAngleDown
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </a>
                    </th>
                  ))}
                  <th scope="col" className="relative py-3.5 pl-3 pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <FaCircleCheck className="h-5 w-5 mr-2 inline" aria-hidden="true" />
                    Libres
                  </td>
                  {data.libres.map((libre, index) => (
                    <td key={index} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {libre}
                    </td>
                  ))}
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                      <a href="" className="text-blue-600 hover:text-blue-900">
                        <FaPen className="h-5 w-5 inline" aria-hidden="true" />
                        <span className="sr-only">Modifier</span>
                      </a>
                    </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <FaShield className="h-5 w-5 mr-2 inline" aria-hidden="true" />
                    Isolements Libres
                  </td>
                  {data.isolementsLibres.map((isolementLibre, index) => (
                    <td key={index} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {isolementLibre}
                    </td>
                  ))}
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                      <a href="" className="text-blue-600 hover:text-blue-900">
                        <FaPen className="h-5 w-5 inline" aria-hidden="true" />
                        <span className="sr-only">Modifier</span>
                      </a>
                    </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <FaCircleCheck className="h-5 w-5 mr-2 inline" aria-hidden="true" />
                    Réserves
                  </td>
                  {data.reserves.map((reserve, index) => (
                    <td key={index} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {reserve}
                    </td>
                  ))}
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                      <a href="" className="text-blue-600 hover:text-blue-900">
                        <FaPen className="h-5 w-5 inline" aria-hidden="true" />
                        <span className="sr-only">Modifier</span>
                      </a>
                    </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <FaBan className="h-5 w-5 mr-2 inline" aria-hidden="true" />
                    Indisponibles
                  </td>
                  {data.indisponibles.map((indisponible, index) => (
                    <td key={index} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {indisponible}
                    </td>
                  ))}
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                      <a href="" className="text-blue-600 hover:text-blue-900">
                        <FaPen className="h-5 w-5 inline" aria-hidden="true" />
                        <span className="sr-only">Modifier</span>
                      </a>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitesDeSoins;
