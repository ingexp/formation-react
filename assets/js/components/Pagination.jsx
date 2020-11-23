import React from 'react';

//<Pagination currentPage={currentPage} itemPerPage = {itemPerPage} length={customers.length} onPageChanged = {handleCurrentPage} />
const Pagination = ({currentPage, itemPerPage, length, onPageChanged}) => {

    const pageCount = Math.ceil(length / itemPerPage);
    const pages = [];



    for(let i = 1; i <= pageCount ; i++)
    {

        pages.push(i);

    }


    return (    <ul className="pagination pagination-sm">
    <li className={ currentPage <= 1 ? "disabled":"" }><a  href="javascript:;"
            onClick={() => onPageChanged(currentPage-1, pageCount)}>&laquo;</a></li>

        { pages.map( page => <li key={page} className={ (currentPage === page ?"active":"" ) }>
            <a 
           href="javascript:;"
            onClick={() => onPageChanged(page, pageCount)}>{page}
            </a></li> )}
    
            
    <li className={ currentPage >= pageCount ? "disabled":"" }  ><a  href="javascript:;"
            onClick={() => onPageChanged(currentPage + 1, pageCount)}>&raquo;</a></li>
    </ul> );
}
 
Pagination.getData = (items, currentPage, itemPerPage) =>{


    const start = currentPage * itemPerPage - itemPerPage;
    return items.slice(start, start + itemPerPage);

}
export default Pagination;