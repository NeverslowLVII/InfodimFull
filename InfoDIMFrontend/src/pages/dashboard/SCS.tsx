import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const units = [
  { unit: 'ACACIAS', room: '1.28', bedOccupancy: 'Mme Dupont Jacqueline', mode: 'SDRE 3213-6' },
  { unit: 'ROSEREAIE', room: '2.14', bedOccupancy: 'M. Martin Bernard', mode: 'SDRE 3213-6' },
  { unit: 'LILAS', room: '1.02', bedOccupancy: 'Mme Leroy Monique', mode: 'SDRE 3213-6' },
  { unit: 'MIMOSAS', room: '3.18', bedOccupancy: 'M. Durand Alain', mode: 'SDRE 3213-6' },
  { unit: 'GLYCINES', room: '4.07', bedOccupancy: 'Mme Moreau Céline', mode: 'SDRE 3213-6' },
]

export default function OccupancyTable() {
  const totalPatients = { total: 153, male: 81, female: 72 };
  const availableBeds = { total: 4, male: 1, female: 4 };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 lg:mx-32 md:mx-8 dark:bg-gray-800">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-300">Occupation des lits CHS SARREGUEMINES</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-500">
            Un tableau récapitulatif de l'occupation des lits avec le nombre de patients présents et les lits disponibles.
          </p>
        </div>
      </div>
      <div className="flex justify-between pt-8">
        <div className="bg-blue-200 p-4 shadow rounded-lg w-1/2 mr-2 dark:bg-blue-900">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-300">Patients présents</h2>
          <div className="mt-2 grid grid-cols-3 gap-4">
            <div className="text-gray-900 dark:text-gray-300">Total: {totalPatients.total}</div>
            <div className="text-gray-900 dark:text-gray-300">Hommes: {totalPatients.male}</div>
            <div className="text-gray-900 dark:text-gray-300">Femmes: {totalPatients.female}</div>
          </div>
        </div>
        <div className="bg-blue-200 p-4 shadow rounded-lg w-1/2 ml-2 dark:bg-blue-900">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-300">Lits disponibles</h2>
          <div className="mt-2 grid grid-cols-3 gap-4">
            <div className="text-gray-900 dark:text-gray-300">Total: {availableBeds.total}</div>
            <div className="text-gray-900 dark:text-gray-300">Hommes: {availableBeds.male}</div>
            <div className="text-gray-900 dark:text-gray-300">Femmes: {availableBeds.female}</div>
          </div>
        </div>
      </div>
      <div className="pt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead className="bg-white dark:bg-gray-700">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 sm:pl-0">
                    Unité
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">
                    Chambre
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">
                    Occupation du lit
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">
                    Mode
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
                {units.map((unit) => (
                  <tr key={`${unit.unit}-${unit.room}`}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-300 sm:pl-0">
                      {unit.unit}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{unit.room}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{unit.bedOccupancy}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{unit.mode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}