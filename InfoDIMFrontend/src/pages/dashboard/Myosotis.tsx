import React from "react";
import { FaPen, FaPlus, FaUser, FaCalendarDays, FaVenusMars, FaBed, FaHouseMedical, FaLocationDot, FaComment } from 'react-icons/fa6';

const residents = [
  { number: "1", fullName: "Jean Dupont", sex: "M", birthDate: "01/01/1930", age: "91", gir: "4", bed: "A1", etab: "ULSD", location: "Chambre 101", comm: "" },
  { number: "2", fullName: "Marie Martin", sex: "F", birthDate: "12/03/1935", age: "86", gir: "3", bed: "A2", etab: "EHPAD", location: "Chambre 102", comm: "" },
  { number: "3", fullName: "Alain Bernard", sex: "M", birthDate: "22/11/1940", age: "81", gir: "2", bed: "B1", etab: "ULSD", location: "Chambre 103", comm: "" },
  { number: "4", fullName: "Sophie Thomas", sex: "F", birthDate: "01/05/1938", age: "83", gir: "4", bed: "B2", etab: "EHPAD", location: "Chambre 104", comm: "" },
  { number: "5", fullName: "Luc Petit", sex: "M", birthDate: "15/08/1932", age: "89", gir: "5", bed: "C1", etab: "ULSD", location: "Chambre 105", comm: "" },
];

export default function MyosotisTable() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 lg:mx-32 md:mx-8 dark:bg-gray-800">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-300">
            Liste des GIR USLD "Les MYOSOTIS"
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-500">
            Une liste de tous les résidents de l'établissement incluant leur
            numéro, nom complet, sexe, date de naissance, âge, GIR, lit,
            établissement, localisation et commune.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            <FaPlus className="inline mr-2" /> Ajouter résident
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 sm:pl-0"
                  >
                    N°
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300"
                  >
                    <FaUser className="inline mr-2" />Nom complet
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300"
                  >
                    <FaVenusMars className="inline mr-2" />Sexe
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300"
                  >
                    <FaCalendarDays className="inline mr-2" />DDN
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300"
                  >
                    <FaCalendarDays className="inline mr-2" />Age
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300"
                  >
                    <FaUser className="inline mr-2" />GIR
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300"
                  >
                    <FaBed className="inline mr-2" />Lit
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300"
                  >
                    <FaHouseMedical className="inline mr-2" />ETAB
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300"
                  >
                    <FaLocationDot className="inline mr-2" />LOC
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300"
                  >
                    <FaComment className="inline mr-2" />COMM
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-0">
                    <span className="sr-only">Modifier</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {residents.map((resident) => (
                  <tr key={resident.number}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-300 sm:pl-0">
                      {resident.number}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {resident.fullName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {resident.sex}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {resident.birthDate}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {resident.age}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {resident.gir}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {resident.bed}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {resident.etab}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {resident.location}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {resident.comm}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0 dark:text-gray-300">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        <FaPen className="inline mr-2" />Modifier
                        <span className="sr-only">
                          , {resident.fullName}
                        </span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

