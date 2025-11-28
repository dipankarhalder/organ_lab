import { Edit, Delete, Share, CrossTick, CirclePlus } from "../../../icons";

export const TableRow = ({
  row,
  headers,
  linkCol,
  shortId,
  isSelected,
  onToggleSelect,
  onAction,
  shortDesc,
}) => {
  return (
    <tr>
      <td>
        <input type="checkbox" checked={isSelected} onChange={onToggleSelect} />
      </td>
      {headers.map((key) => {
        if (key === "id" || key === "status") return null;

        return (
          <td key={key}>
            {row[key] !== null && row[key] !== undefined ? (
              key === shortId ? (
                <>...{row[key].toString().slice(-4)}</>
              ) : key === linkCol ? (
                <button
                  className="app_table_share"
                  onClick={() => onAction("view", row)}
                >
                  {row[key].toString()} <Share />
                </button>
              ) : key === shortDesc ? (
                <>
                  {row[key].toString().split(" ").slice(0, 4).join(" ") + "..."}
                </>
              ) : key === "role" ? (
                <p>
                  <span className={`role_${row[key].split(" ").join("_")}`}>
                    {row[key]}
                  </span>
                </p>
              ) : (
                row[key].toString()
              )
            ) : (
              ""
            )}
          </td>
        );
      })}
      <td>
        <div className="app_table_btn_group">
          <button
            onClick={() => onAction("status", row)}
            className={
              row.status
                ? "app_table_status_active"
                : "app_table_status_inactive"
            }
            title="Status"
          >
            {row.status ? <CrossTick /> : <CirclePlus />}
          </button>
          <button
            onClick={() => onAction("edit", row)}
            className="app_table_edit_btn"
            title="Edit"
          >
            <Edit />
          </button>
          <button
            onClick={() => onAction("delete", row)}
            className="app_table_delete_btn"
            title="Delete"
          >
            <Delete />
          </button>
        </div>
      </td>
    </tr>
  );
};
