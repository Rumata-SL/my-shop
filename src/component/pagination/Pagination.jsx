import React from 'react';
import style from "./Pagination.module.scss"
import ReactPaginate from "react-paginate";

export const Pagination = (props) => {
    const {onChangePage} = props
    return (
        <ReactPaginate
            className={style.pagination}
            breakLabel="..."
            nextLabel=" >"
            onPageChange={(e)=>onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="< "
            renderOnZeroPageCount={null}
        />
    );
};
