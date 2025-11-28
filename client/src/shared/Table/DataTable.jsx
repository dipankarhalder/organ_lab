import { useReducer, useEffect, useState, useMemo } from "react";
import { types } from "../../constant/types";
import { useDebounce } from "../../hooks/useDebounce";
import { SearchBar } from "./components/SearchBar";
import { TableHeader } from "./components/TableHeader";
import { TableRow } from "./components/TableRow";
import { Pagination } from "./components/Pagination";
import { Plus, EmptyBox } from "../../icons";

const initialState = {
  currentPage: 1,
  searchQuery: "",
  sortBy: null,
  sortDirection: "asc",
};

function reducer(state, action) {
  switch (action.type) {
    case types.GOTOPAGE:
      return { ...state, currentPage: action.page };
    case types.NEXTPAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    case types.PREVPAGE:
      return { ...state, currentPage: state.currentPage - 1 };
    case types.SETSEARCH:
      return { ...state, searchQuery: action.query, currentPage: 1 };
    case types.SORT: {
      const { field } = action;
      if (!field) return state;

      const isSameField = state.sortBy === field;
      const newDirection =
        isSameField && state.sortDirection === "asc" ? "desc" : "asc";

      return {
        ...state,
        sortBy: field,
        sortDirection: newDirection,
      };
    }
    default:
      return state;
  }
}

export const DataTable = ({
  tableTitle,
  data,
  pageSize = 10,
  onAction,
  onAddAction,
  onSelectionChange,
  sortableFields = [""],
  addBtnContent = "",
  isAddBtn,
  linkCol,
  shortId,
  shortDesc = "",
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentPage, searchQuery, sortBy, sortDirection } = state;

  const [selectedRows, setSelectedRows] = useState([]);
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (onSelectionChange) onSelectionChange(selectedRows);
  }, [selectedRows, onSelectionChange]);

  const headers = useMemo(
    () => (data.length > 0 ? Object.keys(data[0]) : []),
    [data]
  );
  const filteredData = useMemo(() => {
    let result = [...data];

    if (debouncedSearch) {
      result = result.filter((item) =>
        Object.values(item).some((val) =>
          val?.toString().toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      );
    }

    if (sortBy) {
      result.sort((a, b) => {
        const aVal = a[sortBy]?.toString().toLowerCase() || "";
        const bVal = b[sortBy]?.toString().toLowerCase() || "";

        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [debouncedSearch, data, sortBy, sortDirection]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const currentPageData = filteredData.slice(start, start + pageSize);

  const isRowSelected = (row) =>
    selectedRows.some((r) => JSON.stringify(r) === JSON.stringify(row));
  const toggleRowSelection = (row) => {
    setSelectedRows((prev) =>
      isRowSelected(row)
        ? prev.filter((r) => JSON.stringify(r) !== JSON.stringify(row))
        : [...prev, row]
    );
  };

  const isAllPageSelected = currentPageData.every(isRowSelected);

  const toggleSelectAllCurrentPage = () => {
    if (isAllPageSelected) {
      setSelectedRows((prev) =>
        prev.filter(
          (row) =>
            !currentPageData.some(
              (r) => JSON.stringify(r) === JSON.stringify(row)
            )
        )
      );
    } else {
      const newSelections = currentPageData.filter(
        (row) => !isRowSelected(row)
      );
      setSelectedRows((prev) => [...prev, ...newSelections]);
    }
  };

  const handleAction = (actionType, rowData) => {
    if (onAction && typeof onAction === "function") {
      onAction(actionType, rowData);
    }
  };

  const handleDeleteSelected = () => {
    onAction?.("deleteSelected", selectedRows);
    setSelectedRows([]);
  };

  const handleExportCSV = () => {
    const csvHeaders = Object.keys(selectedRows[0] || {});
    const csvRows = [
      csvHeaders.join(","),
      ...selectedRows.map((row) =>
        csvHeaders.map((field) => `"${row[field] ?? ""}"`).join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app_table_cover">
      <div className="app_table_top_header">
        <div className="app_manage_heading_btn">
          <h1>{tableTitle}</h1>
          {isAddBtn && (
            <div className="app_new_btn">
              <button onClick={() => onAddAction()}>
                <Plus /> {addBtnContent}
              </button>
            </div>
          )}
        </div>
        <SearchBar
          searchQuery={searchQuery}
          dispatch={dispatch}
          selectedRows={selectedRows}
          onDelete={handleDeleteSelected}
          onExport={handleExportCSV}
        />
      </div>
      {headers.length ? (
        <div className="app_table_structure">
          <table>
            <thead>
              <TableHeader
                headers={headers}
                isAllSelected={isAllPageSelected}
                onSelectAll={toggleSelectAllCurrentPage}
                sortBy={sortBy}
                sortDirection={sortDirection}
                dispatch={dispatch}
                sortableFields={sortableFields}
              />
            </thead>
            <tbody>
              {currentPageData.map((row, idx) => (
                <TableRow
                  key={idx}
                  row={row}
                  headers={headers}
                  shortId={shortId}
                  linkCol={linkCol}
                  shortDesc={shortDesc}
                  isSelected={isRowSelected(row)}
                  onToggleSelect={() => toggleRowSelection(row)}
                  onAction={handleAction}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="noDataAvailable">
          <EmptyBox />
          <p>Not found any item for you</p>
        </div>
      )}

      {headers.length ? (
        <div className="app_table_pagination">
          <div className="app_select_item_view">
            <strong>
              {selectedRows.length} of {filteredData.length} row(s) selected
            </strong>
          </div>

          {filteredData.length > pageSize && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              dispatch={dispatch}
            />
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
