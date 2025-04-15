import React, { useState } from "react";
import './Pagination.css';
import left from '../../images/left-page-arrow.svg'
import right from '../../images/right-page-arrow.svg'
export default function Pagination({ setPage, itemsPerPage, total }) {
  const [current, setCurrent] = useState(1);
  const pageCount = Math.ceil(total / itemsPerPage);

  const handlePageChange = (e) => {
    const selectedPage = e.selected + 1;
    setCurrent(selectedPage);
    setPage(selectedPage);
  };

  return (
    <div className="custom-pagination-wrapper">
      <button
        onClick={() => {
          if (current > 1) {
            handlePageChange({ selected: current - 2 });
          }
        }}
        className="custom-pagination-previous"
        disabled={current === 1}
      >
        <img src={left} alt="Previous" width="16" />
      </button>

      <span className="custom-pagination-info">
        {current} of {pageCount}
      </span>

      <button
        onClick={() => {
          if (current < pageCount) {
            handlePageChange({ selected: current });
          }
        }}
        className="custom-pagination-next"
        disabled={current === pageCount}
      >
        <img src={right} alt="Next" width="16" />
      </button>
    </div>
  );
}
