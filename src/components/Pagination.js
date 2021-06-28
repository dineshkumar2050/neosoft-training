import React,{ useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import './Pagination.css';

function Pagination({productsData, setPaginationValue, setPaginatedProducts, paginationValue}) {
    const [maxPaginationValue, setMaxPaginationValue] = useState();
    const [paginationNumbersArr, setPaginationNumbersArr] = useState([1,2,3]);
    const showItems = 4;
    useEffect(() => {
        if(productsData && productsData.length > 0){
            setMaxPaginationValue(Math.ceil(productsData.length/showItems));
        }
    },[productsData]);
    const handlePrevNext = (e,type) =>{
        e.preventDefault();
        if(type === 'prev'){
            let arr = [...paginationNumbersArr];
            let arrFirstVal = arr[0];
            if(arrFirstVal > 1){
                arr.forEach((item,index,arr) => {
                    arr[index] = item - 1; 
                })
                setPaginationNumbersArr([...arr]);
            }
            setPaginationValue(--paginationValue);
            return;
        } else if(type === 'next'){
            let arr = [...paginationNumbersArr];
            let arrLastVal = arr[arr.length - 1]
            if(arrLastVal < maxPaginationValue){
                arr.forEach((item,index,arr) => {
                    arr[index] = item + 1; 
                })
                setPaginationNumbersArr([...arr]);
            }
            setPaginationValue(++paginationValue);
            return;
        }
    };
    const handlePaginationNumber = e =>{
        e.preventDefault();
        const { innerHTML, parentNode } = e.target;
        const elements = document.getElementsByClassName('page-item');
        let elementsLength = elements.length;
        for(let i = 0;i < elementsLength;i++){
            elements[i].classList.remove('active');
        }
        parentNode.classList.add('active')
        setPaginationValue(Number(innerHTML));
    };    
    return (
        <div className='pagination'>
            <nav aria-label="...">
                <ul className="pagination">
                    <li className={`page-item  ${paginationValue <= 1 ? 'disabled' : ''}`}>
                        <button disabled={paginationValue <= 1 ? true : false} className="page-link px-4 py-2" onClick={e => handlePrevNext(e,'prev')} tabIndex="-1" aria-disabled="true">Previous</button>
                    </li>
                    {/* <li className="page-item active left-value">
                        <button onClick={handlePaginationNumber} className="page-link px-4 py-2">1</button>
                    </li> */}
                    {
                        paginationNumbersArr && paginationNumbersArr.length > 0 && paginationNumbersArr.map((item,index) => {
                            return(
                                <li key={index} className={`page-item middle-value ${paginationValue === item ? 'active' : ''}`} aria-current="page">
                                    <button onClick={handlePaginationNumber} className="page-link px-4 py-2">{item}</button>
                                </li>
                            )
                        })
                    }
                    {/* <li className="page-item middle-value" aria-current="page">
                        <button onClick={handlePaginationNumber} className="page-link px-4 py-2">2</button>
                    </li>
                    <li className="page-item right-value" aria-current="page">
                        <button onClick={handlePaginationNumber} className="page-link px-4 py-2">3</button>
                    </li> */}
                    <li className={`page-item next ${paginationValue >= maxPaginationValue ? 'disabled' : ''}`}>
                        <button disabled={paginationValue >= maxPaginationValue ? true : false} onClick={e => handlePrevNext(e,'next')} className="page-link px-4 py-2">Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

Pagination.propTypes = {
    productsData: PropTypes.array,
    setPaginationValue: PropTypes.func,
    setPaginatedProducts: PropTypes.func,
    paginationValue: PropTypes.number
}

export default Pagination;
