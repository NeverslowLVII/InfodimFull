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
    <div className="px-4 sm:px-6 lg:px-8 pt-8 lg:mx-32 md:mx-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Occupation des lits CHS SARREGUEMINES</h1>
          <p className="mt-2 text-sm text-gray-700">
            Un tableau récapitulatif de l'occupation des lits avec le nombre de patients présents et les lits disponibles.
          </p>
        </div>
      </div>
      <div className="flex justify-between pt-8">
        <div className="bg-blue-200 p-4 shadow rounded-lg w-1/2 mr-2">
          <h2 className="text-lg font-semibold text-gray-900">Patients présents</h2>
          <div className="mt-2 grid grid-cols-3 gap-4">
            <div>Total: {totalPatients.total}</div>
            <div>Hommes: {totalPatients.male}</div>
            <div>Femmes: {totalPatients.female}</div>
          </div>
        </div>
        <div className="bg-blue-200 p-4 shadow rounded-lg w-1/2 ml-2">
          <h2 className="text-lg font-semibold text-gray-900">Lits disponibles</h2>
          <div className="mt-2 grid grid-cols-3 gap-4">
            <div>Total: {availableBeds.total}</div>
            <div>Hommes: {availableBeds.male}</div>
            <div>Femmes: {availableBeds.female}</div>
          </div>
        </div>
      </div>
      <div className="pt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Unité
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Chambre
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Occupation du lit
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Mode
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {units.map((unit) => (
                  <tr key={`${unit.unit}-${unit.room}`}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {unit.unit}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{unit.room}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{unit.bedOccupancy}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{unit.mode}</td>
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