import { types } from "../../../constant/types";
import { Larrow, Rarrow } from "../../../icons";

export const Pagination = ({ currentPage, totalPages, dispatch }) => {
  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(3, totalPages); i++) pages.push(i);

    if (currentPage > 5) pages.push("...");
    const start = Math.max(4, currentPage - 1);
    const end = Math.min(totalPages - 3, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 4) pages.push("...");
    for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    return pages;
  };

  return (
    <div className="app_pagination_items">
      <button
        onClick={() => dispatch({ type: types.PREVPAGE })}
        disabled={currentPage === 1}
      >
        <Larrow />
      </button>
      {generatePageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="app_pager_dots">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => dispatch({ type: types.GOTOPAGE, page })}
            className={`${page === currentPage ? "btn_pagination_active" : ""}`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => dispatch({ type: types.NEXTPAGE })}
        disabled={currentPage === totalPages}
      >
        <Rarrow />
      </button>
    </div>
  );
};
