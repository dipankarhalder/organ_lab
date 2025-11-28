import { types } from "../../../constant/types";
import { Delete, Exports, Search } from "../../../icons";

export const SearchBar = ({
  searchQuery,
  dispatch,
  selectedRows,
  onDelete,
  onExport,
}) => (
  <div className="app_table_search">
    <div className="app_table_search_cover">
      <Search />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) =>
          dispatch({ type: types.SETSEARCH, query: e.target.value })
        }
      />
    </div>
    {selectedRows.length > 0 && (
      <div className="app_table_top_btn">
        <button
          onClick={onExport}
          className="app_table_download"
          title="Export"
        >
          <Exports />
          <p>Export</p>
        </button>
        <button onClick={onDelete} className="app_table_delete" title="Delete">
          <Delete />
          <p>Delete</p>
        </button>
      </div>
    )}
  </div>
);
