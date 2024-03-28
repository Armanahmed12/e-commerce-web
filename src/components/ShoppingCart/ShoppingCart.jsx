import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const ShoppingCart = (props) => {
  
    // function for deleting  the cart data.
    const deleteTheCartData = props?.removeTheCartData;

    const selectedProducts = props.selectedCartProducts;
    let selectedProductItems = 0;
    let totalPrice = 0;
    let totalShippingCharge = 0;
    let tax = 0;
    let grandTotal = 0;
    for(let i = 0; i < selectedProducts?.length;i++){
            
    
            selectedProductItems = selectedProductItems + selectedProducts[i]["quantity"];
            totalPrice = totalPrice + (selectedProducts[i]["price"] * selectedProducts[i]["quantity"]);
            totalShippingCharge = totalShippingCharge + (selectedProducts[i]["shipping"] * selectedProducts[i]["quantity"]);
            tax = tax + ( totalPrice / 100) * 10;
            grandTotal = grandTotal + totalPrice + totalShippingCharge + tax;
           
    }

   
    return (
        <div className='leading-8'>
              <h2 className='text-center my-1 font-bold text-xl text-[#edff00]'>Order Summary</h2>
                <p>Selected Items : <span>{selectedProductItems}</span></p>
                <p>Total Price : <span>${Number.isInteger(totalPrice) ? totalPrice : totalPrice.toFixed(2)}</span></p>
                <p>Total Shipping Charge : <span>${ Number.isInteger(totalShippingCharge) ? totalShippingCharge : totalShippingCharge.toFixed(2)}</span></p>
                <p>Tax : <span>${ Number.isInteger(tax) ? tax : tax.toFixed(2)}</span></p>
                <p>Grand Total : <span>${ Number.isInteger(grandTotal) ? grandTotal : grandTotal.toFixed(2)}</span></p>
                <button onClick={deleteTheCartData} className='bg-red-500 w-full  rounded-md text-xl py-2 text-center mt-8 mb-3  flex justify-center items-center gap-3'>clear Cart <RiDeleteBin6Fill /></button>
               {props.children}
        </div>
    );
};

export default ShoppingCart;