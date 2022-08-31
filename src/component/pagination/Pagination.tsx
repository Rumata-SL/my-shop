import React, {FC} from 'react';
import style from "./Pagination.module.scss"
import ReactPaginate from "react-paginate";

type PaginationPropsType ={
    onChangePage:(e:number)=>void
    currentPage:number
}

export const Pagination:FC<PaginationPropsType> = (props) => {
    const {onChangePage, currentPage} = props
    return (
        <ReactPaginate
            className={style.pagination}
            breakLabel="..."
            nextLabel=" >"
            onPageChange={(e)=>onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="< "
            renderOnZeroPageCount={()=>null}
        />
    );
};

