import React, { useContext } from "react";
import { MovieContext } from "./MovieContext";

function Pagination() {
  const { currentPage, setCurrentPage, totalPages } = useContext(MovieContext);

  const prev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const next = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button onClick={prev} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} / {totalPages}
      </span>
      <button onClick={next} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;

