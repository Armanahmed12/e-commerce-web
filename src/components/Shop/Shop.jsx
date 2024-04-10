import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { setShoppingProduct } from '../../utilities/shop';
import { Link, useLoaderData } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

const Shop = () => {

    const [pageNum, setPageNum] = useState(1);
    const [products, setProducts] = useState([]);
    const [productsToRender, setProductsToRender] = useState([]);
    const [selectedCartProducts, setSelectedCartProducts] = useState([]);

    const totalProductsNumber = useLoaderData();
    const totalPages = Math.ceil(totalProductsNumber.totalProducts / 6);
    const pagesNum = [...Array(totalPages).keys()]
    pagesNum.shift()

    const updateProductsCart = async() => {

        let allSelectedProductsId = localStorage.getItem('shoppingCart');
        allSelectedProductsId = JSON.parse(allSelectedProductsId);
        if(!allSelectedProductsId){
            return;
        }
      const res = await  fetch('http://localhost:3500/selectedCartProducts', {

            method: 'POST',
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify(allSelectedProductsId)
        });
       const data = await res.json();
       console.log(data);
       setSelectedCartProducts(data)

    }


    useEffect(() => {

        fetch('http://localhost:3500/products/pageInfo?pageNum=1&limit=6')
            .then(res => res.json())
            .then(data => setProducts(data));
           updateProductsCart()
    }, []);

    // products for Rendering
    useEffect(() => {

        if (pageNum == 1) {

            setProductsToRender(products.slice(0, 6));
        
        }

    }, [pageNum, products]);

    // a function which will be  with Product's(component) button for adding an modifying the selected products.

    const getTheClickedProduct = (id) => {

        setShoppingProduct(id);
        updateProductsCart();
        toast.success("Added product", {

            position: 'top-center'
        })

    }

    // this function will delete all the cart Component data and make an empty cart.
    const removeTheCartData = () => {

        setSelectedCartProducts([]);
        localStorage.removeItem('shoppingCart');

    }

    // load data based on specific page number with
    const loadDataBasedOnPageNum = (perPageNum) => {

        setPageNum(parseInt(perPageNum));
        fetch(`http://localhost:3500/products/pageInfo?pageNum=${perPageNum}&limit=${6}`)
            .then(res => res.json())
            .then(data => setProductsToRender(data))
    }

    return (
        <div>
            <div className='grid grid-cols-4 md:p-5 p-2'>
                <div className="products-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 col-span-4 md:col-span-3 order-2 md:order-1">

                    {
                        productsToRender.map(product => <Product getTheProduct={getTheClickedProduct}
                            key={product._id} product={product} />)
                    }

                </div>
                <div className='cart-container md:col-span-1 col-span-4  md:ml-4 rounded-xl bg-[#1c2b35] text-white p-3 font-semibold  h-[420px] order-1 md:order-2 mb-4 md:my-0 '>

                    <ShoppingCart removeTheCartData={removeTheCartData} selectedCartProducts={selectedCartProducts}> <Link to={'/order-review'}> <button className='bg-orange-500 w-full rounded-md text-xl py-2 flex justify-center items-center gap-3'>Review Order<FaArrowRight /> </button></Link></ShoppingCart>
                    <ToastContainer className={"m-4"} />
                </div>
            </div>

            {/* pagination */}
            <div className='mx-auto text-center my-3'>
                <button className='text-white bg-red-500 font-bold rounded-sm border-2 border-solid border-red-600 px-4 py-2 mr-2'>&laquo;</button>
                {
                    pagesNum.map(eachPageNum => <button onClick={() => loadDataBasedOnPageNum(eachPageNum)} key={eachPageNum} className={`${(pageNum == eachPageNum) ? 'bg-red-500 text-white' : 'bg-white'} text-black rounded-sm border-2 border-solid border-red-600 px-4 py-2 mr-2`}>{eachPageNum}</button>)
                }
                <button className=' text-white bg-red-500 font-bold rounded-sm border-2 border-solid border-red-600 px-4 py-2 mr-2'>  &raquo; </button>
            </div>

        </div>
    );
};

export default Shop;