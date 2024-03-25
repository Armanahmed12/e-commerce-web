import React, { useEffect, useState } from 'react';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { getAllSelectedProducts, setShoppingProduct } from '../../utilities/shop';
import { Link, useLoaderData } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaMoneyBill } from 'react-icons/fa';

const Order_Review = () => {

    // selected cart products state
    const [selectedCartProducts, setSelectedCartProducts] = useState([]);

    // all products for fltering the selected products
    const allProducts = useLoaderData();

    // selected Shopping-Cart products
    useEffect(()=>{
        const cartProducts = getAllSelectedProducts(allProducts);
        setSelectedCartProducts(cartProducts);
    },[])

    // this function will delete all the cart Component data and make an empty cart.
    const removeTheCartData = () => {

        setSelectedCartProducts([]);
        localStorage.removeItem('shoppingCart');

    }

   // remove a product with an Id from the ux as well as localStorage.

   const removeTheProduct = (id) =>{

           const cartProducts = selectedCartProducts.filter(eachSelectedCartPd => eachSelectedCartPd.id !== id);
           setSelectedCartProducts(cartProducts);
        //    delele from localStorage
        setShoppingProduct(id, true);
   }    
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 md:p-5 p-2'>
            <div className='md:col-span-2 col-span-3'>
                <div className='grid grid-cols-1 gap-5 mb-4'>
                    {
                        selectedCartProducts.map(eachCartProduct => <div key={eachCartProduct.id} style={{boxShadow:'0px 0px 3px 0.5px red'}} className='flex flex-col md:flex-row justify-between items-center p-2 border-[0.5px] border-solid border-red-400 rounded-lg mt-1'>
                            <div className='md:flex items-center gap-3 w-full'>
                                <img src={eachCartProduct.img} className='md:w-[125px] w-full h-[290px] md:h-[130px] rounded-lg' alt="" />
                                <div className='my-4 md:my-0'>
                                    <h2 className='font-bold text-lg text-[#1c2b35]'>{eachCartProduct.name}</h2>
                                    <h3 className='font-semibold'>Price : <span className='text-orange-500 font-bold'>${eachCartProduct.price}</span></h3>
                                    <h3 className='font-semibold'>Shipping Charge : <span className='text-orange-500 font-bold'>${eachCartProduct.shipping}</span> </h3>
                                </div>
                            </div>
                             
                             <span style={{boxShadow:'0px 0px 4px 0.5px red'}} className='border-[0.2px] border-solid border-red-500 inline-block p-3 my-3 md:my-0 rounded-full bg-red-50 hover:bg-red-100 hover:cursor-pointer' onClick={()=>removeTheProduct(eachCartProduct.id)}>
                               <MdDelete className='text-red-500 text-3xl'/>
                             </span>
                        </div>)
                    }
                </div>
            </div>

            <div className='cart-container md:ml-4 rounded-xl bg-[#1c2b35] text-white p-3 font-semibold h-[420px] order-1 md:order-2 mb-4 md:my-0'>
                <ShoppingCart selectedCartProducts={selectedCartProducts} removeTheCartData={removeTheCartData}>
                <Link to={'/proceed_checkout'}><button className='bg-orange-500 w-full rounded-md text-xl py-2 flex justify-center items-center gap-3'>Proceed Checkout<FaMoneyBill/> </button></Link>
                </ShoppingCart>
            </div>
        </div>
    );
};

export default Order_Review;