import React, {FC} from 'react';
import ReactPaginate from "react-paginate";
import style from "./Pagination.module.scss"

type PaginationPropsType ={
    currentPage:number
    onChangePage:(e:number)=>void
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

