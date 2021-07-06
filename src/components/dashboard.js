import React,{ useEffect, useState } from 'react';
import ProductItem from './productItem';
import './dashboard.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Chair from '../assets/chair.webp';
import { connect } from 'react-redux';
import { getAvailableProducts } from '../actions/products';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { useHistory } from 'react-router-dom';

const Dashboard = ({getAvailableProducts,data,isAuthenticated, ...props}) => {
    const [productsData, setProductsData] = useState([]);
    const [carouselData, setCarouselData] = useState([]);
    // const [isLoading, setIsLoading] = useState(null);
    const history = useHistory();
    const viewAllButton = e => {
        e.preventDefault();
    }
    async function getProducts(){
        await getAvailableProducts();
        return;
    }
    useEffect(() => {
        // setIsLoading(true);
        getProducts();
        // setIsLoading(false);
    },[]);
    useEffect(() => {
        if(data && data.data && data.data.data && data.data.data.docs && data.success && !data.loading && !data.error){
            setProductsData([...data.data.data.docs]);
        }
    },[data]);
    useEffect(() => {
        if(productsData && productsData.length > 0){
            let obj = {};
            let resultArr = [];
            for(const value of productsData){
                obj[value.category.id] = (obj[value.category.id] || 0) + 1;
            }
            for(const value of productsData){
                if(obj[value.category.id]){
                    resultArr.push({...value.category,imageUrl: value.mainImage})
                    if(obj[value.category.id] > 1){
                        obj[value.category.id] = obj[value.category.id] - 1;
                    } else {
                        delete obj[value.category.id];
                    }
                }                
            }
            setCarouselData([...resultArr]);
        }
    },[productsData]);
    if(!isAuthenticated){
        return history.push({ pathname: '/' })
    }
    console.log('data',isAuthenticated);
    return(
        data && data.loading ? 
        <Spinner /> :
        <div className='dashboard text-center container'>
            <div className='carousel'>
                <Carousel>
                    {
                        productsData && productsData.length > 0 && productsData.map(item => {
                            return(
                                <div className='text-center' key={item.id}>
                                    {
                                        item.mainImage &&
                                        <img src={item.mainImage} onError={ e => e.target.src=`${Chair}`} alt={item.name} />
                                    }
                                </div>
                            )
                        })
                    }
                </Carousel>
            </div>
            <div className='image-info-section'>
                <div className='my-3'>
                    <h4>Popular Products</h4>
                    <button onClick={viewAllButton} type='button'>View All</button>
                </div>
                <div className='parent'>
                    {
                        productsData && productsData.length > 0 && productsData.map(item => {
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
            </div>
        </div>
    )
}

Dashboard.propTypes = {
    data: PropTypes.object,
    getAvailableProducts: PropTypes.func,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    data: state.products,
    isAuthenticated: state.login.isAuthenticated,
})

export default connect(mapStateToProps, { getAvailableProducts })(Dashboard);
