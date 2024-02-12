import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Column = {
  header: string;
  accessor: string;
};

type DataTableProps = {
  columns: Column[];
  data: any[];
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableSearch?: boolean;
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  enableExport?: boolean;
};

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  enableSorting = true,
  enablePagination = true,
  enableSearch = false,
  enableRowSelection = false,
  enableColumnVisibility = false,
  enableExport = false,
}) => {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((column) => column.accessor)
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (data.length === 0) {
        setIsEmpty(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSort = (column: string) => {
    if (!enableSorting) return;
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleRowSelect = (rowIndex: number) => {
    if (!enableRowSelection) return;
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((index) => index !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  const handleColumnVisibility = (column: string) => {
    if (!enableColumnVisibility) return;
    if (visibleColumns.includes(column)) {
      setVisibleColumns(visibleColumns.filter((col) => col !== column));
    } else {
      setVisibleColumns([...visibleColumns, column]);
    }
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page to avoid pagination errors
  };

  const sortedData = data
    .filter((row) => {
      for (let column of columns) {
        const cellValue = row[column.accessor];
        if (
          cellValue !== undefined &&
          cellValue !== null &&
          cellValue.toString().toLowerCase().includes(searchValue.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    })
    .sort((a, b) => {
      if (sortColumn) {
        if (
          typeof a[sortColumn] === "string" &&
          typeof b[sortColumn] === "string"
        ) {
          const comparison = a[sortColumn].localeCompare(b[sortColumn]);
          return sortDirection === "asc" ? comparison : -comparison;
        } else if (
          typeof a[sortColumn] === "number" &&
          typeof b[sortColumn] === "number"
        ) {
          return sortDirection === "asc"
            ? a[sortColumn] - b[sortColumn]
            : b[sortColumn] - a[sortColumn];
        }
      }
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const exportToPDF = () => {
    if (!enableExport) return;
    const doc = new jsPDF();
    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: currentItems.map((row) =>
        columns.map((col) => {
          const cellValue = row[col.accessor];
          return cellValue !== undefined ? cellValue.toString() : "";
        })
      ),
    });
    doc.save("exportation_donnees.pdf");
  };

  return (
    <div className="overflow-x-auto dark:bg-gray-800">
      <div className="align-middle inline-block min-w-full">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <div className="md:col-span-2">
            {enableSearch && (
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Rechercher..."
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-transparent dark:focus:outline-none"
              />
            )}
          </div>
          <div className="md:col-span-4 flex justify-end space-x-2">
            <div>
              {enableExport && (
                <button
                  onClick={exportToPDF}
                  className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-transparent"
                >
                  Exporter en PDF
                </button>
              )}
            </div>
            <div>
              {enablePagination && (
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-transparent dark:focus:outline-none"
                >
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              )}
            </div>
          </div>
        </div>
        {enableColumnVisibility && (
          <div className="mb-4">
            {columns.map((column, index) => (
              <label key={index} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(column.accessor)}
                  onChange={() => handleColumnVisibility(column.accessor)}
                  className="form-checkbox h-5 w-5 text-gray-600 dark:border-gray-700 dark:bg-gray-700"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">{column.header}</span>
              </label>
            ))}
          </div>
        )}
        {isLoading ? (
          <div>Chargement...</div>
        ) : isEmpty ? (
          <div>Aucune donnée disponible.</div>
        ) : hasError ? (
          <div>Erreur lors du chargement des données.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {enableRowSelection && <th></th>}
                  {columns
                    .filter((column) =>
                      visibleColumns.includes(column.accessor)
                    )
                    .map((column, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer text-center dark:text-white"
                        onClick={() => handleSort(column.accessor)}
                      >
                        <div className="flex items-center justify-center">
                          {column.header}
                          {sortColumn === column.accessor && (
                            <span className="ml-2">
                              {sortDirection === "asc" ? (
                                <FaAngleDown aria-hidden="true" />
                              ) : (
                                <FaAngleUp aria-hidden="true" />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {currentItems.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {enableRowSelection && (
                      <td className="text-center dark:text-white">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(rowIndex)}
                          onChange={() => handleRowSelect(rowIndex)}
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </td>
                    )}
                    {columns
                      .filter((column) =>
                        visibleColumns.includes(column.accessor)
                      )
                      .map((column, colIndex) => (
                        <td
                          key={colIndex}
                          className={`px-6 py-4 whitespace-nowrap text-sm dark:text-white ${
                            enableRowSelection ? "text-center" : ""
                          }`}
                        >
                          {row[column.accessor]}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {enablePagination && (
          <div className="flex justify-between p-4 dark:bg-gray-800">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50 dark:bg-gray-700 dark:text-white"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
            <span className="dark:text-white">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50 dark:bg-gray-700 dark:text-white"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
