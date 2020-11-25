import React from 'react';

//<Pagination currentPage={currentPage} itemPerPage = {itemPerPage} length={customers.length} onPageChanged = {handleCurrentPage} />
const Pagination = ({currentPage, itemPerPage, length, onPageChanged}) => {

    const pageCount = Math.ceil(length / itemPerPage);
    const pages = [];



    for(let i = 1; i <= pageCount ; i++)
    {

        pages.push(i);

    }


    return (    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <           div className="btn-group mr-2" role="group" aria-label="First group"></div>
      
                    <li className={ currentPage <= 1 ? "btn btn-secondary disabled":"btn btn-secondary " }><a  href="javascript:;"
                            onClick={() => onPageChanged(currentPage-1, pageCount)}>&laquo;</a></li>

                        { pages.map( page => <li key={page} className={ (currentPage === page ?" btn btn-secondaryactive":"btn btn-secondary" ) }>
                            <a 
                        href="javascript:;"
                            onClick={() => onPageChanged(page, pageCount)}>{page}
                            </a></li> )}
                    
                            
                    <li className={ currentPage >= pageCount ? "btn btn-secondary disabled":"btn btn-secondary" }  ><a  href="javascript:;"
                            onClick={() => onPageChanged(currentPage + 1, pageCount)}>&raquo;</a></li>
                    </div>
         );
}
 
Pagination.getData = (items, currentPage, itemPerPage) =>{


    const start = currentPage * itemPerPage - itemPerPage;
    return items.slice(start, start + itemPerPage);

}
export default Pagination;