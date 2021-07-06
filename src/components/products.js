import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAvailableProducts } from '../actions/products';
import { getAllCategories } from '../actions/categories';
import { getAllColors } from '../actions/colors';
import ProductItem from './productItem';
import './products.css';
import './productItem.scss';
import OuterWrapper from './OuterWrapper';
import Pagination from './Pagination';
import PropTypes from 'prop-types';
import Sort from './sort';
import { useHistory } from 'react-router-dom';
import AddRemoveButton from './AddRemoveButton';

function Products({ data ,allColors ,allCategories , getAllColors ,getAllCategories , getAvailableProducts, ...props }){
    const [productsData, setProductsData] = useState([]);
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const [paginationValue, setPaginationValue] = useState(1);
    const [colors, setColors] = useState(null);
    const [categories, setCategories] = useState(null);
    const history = useHistory();
    useEffect(() => {
        getAvailableProducts();
        getAllColors();
        getAllCategories();
    },[data && data.length === 0,allColors && allColors.length === 0,allCategories && allCategories.length === 0]);
    useEffect(() => {
        if(data && data.data && data.data.data && data.data.data.docs && data.success && !data.loading && !data.error){
            setProductsData([...data.data.data.docs]);
        }
    },[data]);
    useEffect(() => {
        if(allColors && allColors.data && allColors.data.data && allColors.success && !allColors.loading && !allColors.error){
            setColors([...allColors.data.data]);
        }
    },[allColors]);
    useEffect(() => {
        if(allCategories && allCategories.data && allCategories.data.data && allCategories.success && !allCategories.loading && !allCategories.error){
            setCategories([...allCategories.data.data]);
        }
    },[allCategories]);
    useEffect(() => {
        if(productsData && productsData.length > 0){
            setPaginatedProducts([...productsData.slice(4*(paginationValue - 1),4*(paginationValue))]);
        }
    },[paginationValue,productsData]);
    const showProduct = (id,info) => {
        history.push({ pathname: `/product/${id}`, state: { data: info } })
    };
    const showCategorizedProducts = id => {
        if(paginatedProducts && paginatedProducts.length === 0 && id !== 'all-categories'){
            let pagValue = paginationValue;
            if(pagValue === 1) setPaginationValue(++pagValue);
            else setPaginationValue(--pagValue);     
            if(id === 'all-categories') return;
        } 
        let allProducts = [...paginatedProducts];
        let filteredProducts = allProducts.filter(product => product.category._id === id);
        return setPaginatedProducts([...filteredProducts]);
    };
    const showColoredProducts = id => {
        if(paginatedProducts && paginatedProducts.length === 0 && id !== 'all-colors'){
            let pagValue = paginationValue;
            if(pagValue === 1) setPaginationValue(++pagValue);
            else setPaginationValue(--pagValue);   
            if(id === 'all-colors') return;  
        }
        let allProducts = [...paginatedProducts];
        let filteredProducts = allProducts.filter(product => product.color._id === id);
        return setPaginatedProducts([...filteredProducts]);
    }
    return(
        <div className='products'>
            <OuterWrapper containerClass={'container-fluid'} isGridLayout={true}>
                <div className='left-section col-lg-3 col-md-4 col-sm-6 mb-sm-0 mb-5'>
                    <ul>
                        <li>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle w-100 py-3" type="button" id="products" data-bs-toggle="dropdown" aria-expanded="false">
                                    All Products
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="products">
                                {
                                    productsData && productsData.length > 0 && productsData.map((product) => {
                                        return(
                                            <li key={product.id} className={'product-list-item'}>
                                                {
                                                    product.name &&
                                                    <a className="dropdown-item" onClick={() => showProduct(product.id,product)}>{product.name}</a>
                                                }                                                    
                                            </li>                                                
                                        )
                                    })
                                }
                                </ul>
                            </div>
                        </li>
                        <li className='mb-2'>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle w-100 py-3" type="button" id="categories" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="categories">
                                    {
                                        categories && categories.length > 0 && categories.map(category => {
                                            return(
                                                <li key={category.id}>
                                                    {
                                                        category.name &&
                                                        <a className="dropdown-item" onClick={() => showCategorizedProducts(category.id)}>{category.name}</a>
                                                    }                                                    
                                                </li>                                                
                                            )
                                        })
                                    }
                                    <li className={'dropdown-item'}>
                                        <a className="dropdown-item" onClick={() => showCategorizedProducts('all-categories')}>All</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className='mb-2'>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle w-100 py-3" type="button" id="colors" data-bs-toggle="dropdown" aria-expanded="false">
                                    Colors
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="colors">
                                    {
                                        colors && colors.length > 0 && colors.map(color => {
                                            return(
                                                <li key={color.id}>
                                                    {
                                                        color.name &&
                                                        <a className="dropdown-item" onClick={() => showColoredProducts(color.id)}>{color.name}</a>
                                                    }                                                    
                                                </li>
                                            )
                                        })
                                    }
                                    <li className={'dropdown-item'}>
                                        <a className="dropdown-item" onClick={() => showColoredProducts('all-colors')}>All</a>
                                    </li>
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
    data: state.products,
    allColors: state.colors,
    allCategories: state.categories,
    cart: state.cart
})

Products.propTypes = {
    data: PropTypes.object,
    getAvailableProducts: PropTypes.func,
    getAllColors: PropTypes.func,
    getAllCategories: PropTypes.func,
    allColors: PropTypes.object,
    allCategories: PropTypes.object,
    cart: PropTypes.object
}

export default connect( mapStateToProps, { getAvailableProducts, getAllColors, getAllCategories })(Products);
