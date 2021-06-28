import React from 'react'
import PropTypes from 'prop-types'
import './sort.scss';
import Button from './button';
import SortData from './SortData';

function Sort({method, arr, setArr, ...props}) {
    const handleSort = (e,sortBy) => {
        e.preventDefault();
        if(sortBy === 'rating'){
            return setArr(method([...arr],'avgRating'));
        } else if(sortBy === 'price-ascending'){
            return setArr(method([...arr],'price'));
        } else if(sortBy === 'price-descending'){
            return setArr(method([...arr],'price').reverse());
        }
    };
    return (
        <div className='sort d-flex align-items-center justify-content-end py-3'>
            <h2 className={'px-2'}>Sort By</h2>
            {'|'}
            <Button type='button' onClick={e => handleSort(e,'rating')}>
                <span class="iconify" data-icon="bx:bxs-star" data-inline="false"></span>
            </Button>
            {'|'}
            <Button type='button' onClick={e => handleSort(e,'price-ascending')}>
                <span className={'mx-0'}>&#8377;</span>
                <span class="iconify" data-icon="akar-icons:arrow-up" data-inline="false"></span>
            </Button>
            {'|'}
            <Button type='button' onClick={e => handleSort(e,'price-descending')}>
                <span className={'mx-0'}>&#8377;</span>
                <span class="iconify" data-icon="akar-icons:arrow-down" data-inline="false"></span>
            </Button>
        </div>
    )
}

Sort.propTypes = {
    method: PropTypes.func,
    arr: PropTypes.array,
    setArr: PropTypes.func.isRequired
}

export default SortData(Sort);
