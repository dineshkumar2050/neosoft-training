import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAvailableProducts } from '../actions/products';
import ProductItem from './productItem';
import './products.css';
import './productItem.scss';
import OuterWrapper from './OuterWrapper';
import Pagination from './Pagination';
import PropTypes from 'prop-types';
import Sort from './sort';

function Products({ data, getAvailableProducts, ...props }){
    const [productsData, setProductsData] = useState([]);
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const [paginationValue, setPaginationValue] = useState(1);
    useEffect(() => {
        getAvailableProducts();
    },[data && data.length === 0]);
    useEffect(() => {
        if(data && data.data && data.data.data && data.data.data.docs && data.success && !data.loading && !data.error){
            setProductsData([...data.data.data.docs]);
        }
    },[data]);
    useEffect(() => {
        if(productsData && productsData.length > 0){
            setPaginatedProducts([...productsData.slice(4*(paginationValue - 1),4*(paginationValue))]);
        }
    },[paginationValue,productsData]);
    return(
        <div className='products'>
            <OuterWrapper containerClass={'container-fluid'} isGridLayout={true}>
                <div className='left-section col-lg-3 col-md-4 col-sm-6 mb-sm-0 mb-5'>
                    <ul>
                        <li>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle w-100 py-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    All Products
                                </button>
                            </div>
                        </li>
                        <li className='mb-2'>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle w-100 py-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a className="dropdown-item" href="#">Chair</a></li>
                                    <li><a className="dropdown-item" href="#">Sofa</a></li>
                                    <li><a className="dropdown-item" href="#">Bed</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className='mb-2'>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle w-100 py-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Colors
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a className="dropdown-item" href="#">Chair</a></li>
                                    <li><a className="dropdown-item" href="#">Sofa</a></li>
                                    <li><a className="dropdown-item" href="#">Bed</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='right-section col-lg-9 col-md-8 col-sm-6'>
                    {
                        paginatedProducts && paginatedProducts.length > 0 && 
                        <Sort 
                            arr={[...paginatedProducts]} 
                            setArr={setPaginatedProducts}
                        />
                    }
                    <div className='parent mb-5'>
                        {
                            paginatedProducts && paginatedProducts.length > 0 && paginatedProducts.map(item => {
                                return(
                                    <ProductItem 
                                        keyVal={item.id} 
                                        name={item.name} 
                                        src={item.mainImage} 
                                        price={item.price} 
                                        rating={item.avgRating}
                                        item={item}
                                    />
                                )
                            })
                        }
                    </div>
                    <Pagination 
                        productsData={productsData} 
                        setPaginationValue={setPaginationValue} 
                        setPaginatedProducts={setPaginatedProducts}
                        paginationValue={paginationValue}
                    />
                </div>
            </OuterWrapper>
        </div>
    )
}

const mapStateToProps = state => ({
    data: state.products
})

Products.propTypes = {
    data: PropTypes.object,
    getAvailableProducts: PropTypes.func
}

export default connect( mapStateToProps, { getAvailableProducts })(Products);
