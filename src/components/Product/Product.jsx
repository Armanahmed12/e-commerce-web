import React, { useEffect, useRef } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Product = (props) => {

    // function prop from shopping component
    const getTheProduct = props.getTheProduct;
    const imgRef = useRef('img-ref');
    const { name, seller, price, ratings, img, _id } = props.product;
  
   
    //  useEffect((()=>{
     
    //       imgRef.current.onerror = function(){ 
             
    //             imgRef.current.parentNode.style.display = 'none';
    //             num = num + 1;  
    //       };
         
    //  }),[]);
    
    return (
        <div className='border-2 border-solid border-[#1c2b35] md:h-[370px] h-[470px] rounded-lg flex flex-col'>
            <img ref={imgRef} className='p-2 rounded-2xl md:h-3/6 h-3/5' src={img} alt="" />
            <div className='px-2 pb-3 flex-1'>
                <h2 className='font-bold text-[#037ac9]'>{name}</h2>
                <h4 className='font-medium'>Price : ${price}</h4>
                <h5 className='mt-2'>Manufacturer : {seller}</h5>
                <h6>Rating : {ratings} stars</h6>
               
            </div>
            <button onClick={()=>getTheProduct(_id)} className='bg-[#1c2b35] hover:bg-[#024774] font-semibold text-white w-full py-2 flex justify-center items-center gap-3'>Add to Cart <FaShoppingCart/></button>
        </div>
    );
};

export default Product;