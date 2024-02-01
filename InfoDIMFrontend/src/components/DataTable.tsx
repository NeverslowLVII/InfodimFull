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

  // Simulate data loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Data loaded
      if (data.length === 0) {
        setIsEmpty(true);
      }
    }, 2000); // Simulate a fetch call
    return () => clearTimeout(timer);
  }, []);

  const handleSort = (column: string) => {
    if (!enableSorting) return; // Don't do anything if sorting is not enabled
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleRowSelect = (rowIndex: number) => {
    if (!enableRowSelection) return; // Don't do anything if row selection is not enabled
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((index) => index !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  const handleColumnVisibility = (column: string) => {
    if (!enableColumnVisibility) return; // Don't do anything if column visibility is not enabled
    if (visibleColumns.includes(column)) {
      setVisibleColumns(visibleColumns.filter((col) => col !== column));
    } else {
      setVisibleColumns([...visibleColumns, column]);
    }
  };

  const sortedData = data
    .filter((row) => {
      for (let column of columns) {
        if (
          row[column.accessor]
            .toString()
            .toLowerCase()
            .includes(searchValue.toLowerCase())
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
    if (!enableExport) return; // Don't do anything if export is not enabled
    const doc = new jsPDF();
    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: currentItems.map((row) =>
        columns.map((col) => row[col.accessor].toString())
      ),
    });
    doc.save("data_export.pdf");
  };

  return (
    <div className="overflow-x-auto">
      <div className="align-middle inline-block min-w-full">
        {/* Export Buttons */}
        {enableExport && (
          <div className="mb-4">
            <button onClick={exportToPDF} className="px-4 py-2 border rounded-md">
              Exporter en PDF
            </button>
          </div>
        )}
        {/* Search Input */}
        {enableSearch && (
          <div className="mb-4">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 border rounded-md"
            />
          </div>
        )}
        {/* Column Visibility */}
        {enableColumnVisibility && (
          <div className="mb-4">
            {columns.map((column, index) => (
              <label key={index} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(column.accessor)}
                  onChange={() => handleColumnVisibility(column.accessor)}
                  className="form-checkbox h-5 w-5 text-gray-600"
                />
                <span className="ml-2 text-gray-700">{column.header}</span>
              </label>
            ))}
          </div>
        )}
        {/* Loading Indicator */}
        {isLoading ? (
          <div>Loading...</div>
        ) : isEmpty ? (
          <div>No data available.</div>
        ) : hasError ? (
          <div>Error loading data.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th></th>
                  {columns
                    .filter((column) =>
                      visibleColumns.includes(column.accessor)
                    )
                    .map((column, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer text-center"
                        onClick={() => handleSort(column.accessor)}
                      >
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
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(rowIndex)}
                        onChange={() => handleRowSelect(rowIndex)}
                      />
                    </td>
                    {columns
                      .filter((column) =>
                        visibleColumns.includes(column.accessor)
                      )
                      .map((column, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
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
        {/* Pagination */}
        {enablePagination && (
          <div className="flex justify-between p-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
            <span>
              Page {currentPage} sur {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
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
