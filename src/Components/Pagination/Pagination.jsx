import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center gap-2 mt-4 text-sm">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                قبلی
            </button>

            <span className="px-2 py-1 text-primaryColor">
        صفحه {currentPage} از {totalPages}</span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded  disabled:opacity-50"
            >
                بعدی
            </button>
        </div>
    );
};

export default Pagination;
