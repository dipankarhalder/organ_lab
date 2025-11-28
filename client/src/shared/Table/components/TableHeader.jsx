import { types } from "../../../constant/types";
import { Uarrow, Darrow, ActiveFilter } from "../../../icons";

export const TableHeader = ({
  headers,
  isAllSelected,
  onSelectAll,
  sortBy,
  sortDirection,
  dispatch,
  sortableFields = [],
}) => {
  return (
    <tr>
      <th>
        <input type="checkbox" checked={isAllSelected} onChange={onSelectAll} />
      </th>
      {headers.map((header) => {
        if (header === "id" || header === "status") return null;

        const isSortable = sortableFields.includes(header);
        const isActiveSort = sortBy === header;
        const isAsc = sortDirection === "asc";
        return (
          <th
            key={header}
            onClick={() =>
              isSortable && dispatch({ type: types.SORT, field: header })
            }
          >
            <p>
              {header.replace(/_/g, " ")}{" "}
              {isSortable && (
                <>
                  {isActiveSort ? (
                    isAsc ? (
                      <Uarrow />
                    ) : (
                      <Darrow />
                    )
                  ) : (
                    <>
                      <ActiveFilter />
                    </>
                  )}
                </>
              )}
            </p>
          </th>
        );
      })}
      <th>Action</th>
    </tr>
  );
};
