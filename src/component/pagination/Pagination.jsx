import React from 'react';
import style from "./Pagination.module.scss"
import ReactPaginate from "react-paginate";

export const Pagination = () => {
    return (
        <ReactPaginate
            className={style.pagination}
            breakLabel="..."
            nextLabel=" >"
            onPageChange={(e)=>console.log(e)}
            pageRangeDisplayed={8}
            pageCount={3}
            previousLabel="< "
            renderOnZeroPageCount={null}
        />
    );
};
